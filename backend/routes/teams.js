// routes/teams.js — Rescue Teams + Assignments
const express = require('express');
const { getPool, sql } = require('../db');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();
router.use(authenticate);

// GET /api/teams
router.get('/', async (req, res) => {
    try {
        const pool = await getPool();
        const result = await pool.request().query(`
      SELECT team_id, team_name, team_type, current_location,
             availability_status, team_size, contact_number
      FROM   Rescue_Team
      ORDER BY availability_status, team_name
    `);
        res.json(result.recordset);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/teams/assign — assign team to report (wraps Transaction 1 logic)
router.post('/assign', authorize('System_Admin', 'Disaster_Coordinator', 'Rescue_Operator'), async (req, res) => {
    const { rescue_team_id, report_id, notes } = req.body;
    if (!rescue_team_id || !report_id)
        return res.status(400).json({ error: 'rescue_team_id and report_id required' });

    try {
        const pool = await getPool();

        // Check team is available
        const check = await pool.request()
            .input('tid', sql.Int, rescue_team_id)
            .query(`SELECT availability_status FROM Rescue_Team WHERE team_id = @tid`);

        if (!check.recordset.length) return res.status(404).json({ error: 'Team not found' });
        if (check.recordset[0].availability_status === 'Busy')
            return res.status(409).json({ error: 'Team is currently busy' });

        const result = await pool.request()
            .input('rescue_team_id', sql.Int, rescue_team_id)
            .input('report_id', sql.Int, report_id)
            .input('notes', sql.Text, notes || null)
            .query(`
        INSERT INTO Team_Assignment (rescue_team_id, report_id, assigned_at, status, notes)
        OUTPUT INSERTED.assignment_id
        VALUES (@rescue_team_id, @report_id, GETDATE(), 'Active', @notes)
      `);
        // TRG-01 fires here → sets team Busy automatically
        res.status(201).json({ assignment_id: result.recordset[0].assignment_id, message: 'Team assigned' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /api/teams/assignments/:id/complete
router.patch('/assignments/:id/complete', authorize('System_Admin', 'Disaster_Coordinator', 'Rescue_Operator'), async (req, res) => {
    try {
        const pool = await getPool();
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query(`UPDATE Team_Assignment SET status='Completed', completed_at=GETDATE() WHERE assignment_id=@id`);
        // TRG-02 fires here → frees the team
        res.json({ message: 'Assignment completed, team freed' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;