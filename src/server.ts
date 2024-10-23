import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Add a department
app.post('/api/add-department', ({ body }, res) => {
  const sql = `INSERT INTO department (department_name)
    VALUES ($1)`;
  const params = [body.department_name];

  pool.query(sql, params, (err, _result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

// List all departments
app.get('/api/get-departments', (_req, res) => {
  const sql = `SELECT id, department_name AS department FROM department`;

  pool.query(sql, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const { rows } = result;
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// Delete department
app.delete('/api/rem-department/:id', (req, res) => {
  const sql = `DELETE FROM department WHERE id = $1`;
  const params = [req.params.id];

  pool.query(sql, params, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Department not found',
      });
    } else {
      res.json({
        message: 'Department deleted',
        changes: result.rowCount,
        id: req.params.id,
      });
    }
  });
});