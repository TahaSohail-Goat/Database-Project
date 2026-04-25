// routes/auth.js — login + current user
const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const { getPool, sql } = require('../db');
const { authenticate }  = require('../middleware/auth');

const router = express.Router();

// ── POST /api/auth/login ─────────────────────────────────────
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' });

  try {
    const pool   = await getPool();
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query(`
        SELECT u.user_id, u.username, u.password_hash,
               u.email, u.is_active, r.role_name
        FROM   [User] u
        INNER JOIN Role r ON r.role_id = u.role_id
        WHERE  u.username = @username
      `);

    const user = result.recordset[0];
    if (!user)
      return res.status(401).json({ error: 'Invalid credentials' });

    if (!user.is_active)
      return res.status(403).json({ error: 'Account is disabled' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { user_id: user.user_id, username: user.username, role: user.role_name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        user_id:  user.user_id,
        username: user.username,
        email:    user.email,
        role:     user.role_name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/auth/me ─────────────────────────────────────────
router.get('/me', authenticate, async (req, res) => {
  try {
    const pool   = await getPool();
    const result = await pool.request()
      .input('user_id', sql.Int, req.user.user_id)
      .query(`
        SELECT u.user_id, u.username, u.email, u.phone,
               r.role_name, u.created_at
        FROM   [User] u
        INNER JOIN Role r ON r.role_id = u.role_id
        WHERE  u.user_id = @user_id
      `);
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
