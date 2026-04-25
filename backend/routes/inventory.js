
// ============================================================
// routes/inventory.js
// ============================================================
const express = require('express');
const { getPool, sql } = require('../db');
const { authenticate, authorize } = require('../middleware/auth');
const inventoryRouter = express.Router();
inventoryRouter.use(authenticate);

// GET /api/inventory — warehouse manager view
inventoryRouter.get('/', async (req, res) => {
    try {
        const pool = await getPool();
        const result = await pool.request().query(`
      SELECT * FROM vw_WarehouseManager_Inventory
      ORDER BY stock_alert DESC, current_stock ASC
    `);
        res.json(result.recordset);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/inventory/allocate — resource allocation (Transaction 1)
inventoryRouter.post('/allocate',
    authorize('System_Admin', 'Disaster_Coordinator', 'Rescue_Operator'),
    async (req, res) => {
        const { inventory_id, report_id, allocated_quantity } = req.body;
        if (!inventory_id || !report_id || !allocated_quantity)
            return res.status(400).json({ error: 'inventory_id, report_id, allocated_quantity required' });

        const pool = await getPool();
        const tx = new (require('mssql').Transaction)(await pool);

        try {
            await tx.begin();
            const request = new (require('mssql').Request)(tx);

            // Check stock
            const stock = await request
                .input('inv_id', sql.Int, inventory_id)
                .query(`SELECT quantity FROM Warehouse_Inventory WITH (UPDLOCK,ROWLOCK) WHERE inventory_id = @inv_id`);

            if (!stock.recordset.length) throw new Error('Inventory record not found');
            if (stock.recordset[0].quantity < allocated_quantity)
                throw new Error(`Insufficient stock. Available: ${stock.recordset[0].quantity}`);

            const req2 = new (require('mssql').Request)(tx);
            const alloc = await req2
                .input('inventory_id', sql.Int, inventory_id)
                .input('report_id', sql.Int, report_id)
                .input('requested_by', sql.Int, req.user.user_id)
                .input('allocated_quantity', sql.Int, allocated_quantity)
                .query(`
          INSERT INTO Resource_Allocation
            (inventory_id, report_id, requested_by, allocated_quantity,
             dispatched_quantity, consumed_quantity, allocation_date, status)
          OUTPUT INSERTED.allocation_id
          VALUES (@inventory_id, @report_id, @requested_by, @allocated_quantity,
                  0, 0, GETDATE(), 'Pending')
        `);

            await tx.commit();
            res.status(201).json({ allocation_id: alloc.recordset[0].allocation_id, message: 'Allocation created, pending approval' });
        } catch (err) {
            await tx.rollback();
            res.status(400).json({ error: err.message });
        }
    }
);

module.exports.inventoryRouter = inventoryRouter;
