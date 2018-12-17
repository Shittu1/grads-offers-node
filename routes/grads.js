const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const result = await db.query("SELECT * FROM graduates");
        return res.status(200).json(result.rows);
    } catch(err) {
        return next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const result = await db.query(
            "INSERT INTO graduates (name) VALUES ($1) RETURNING *", 
            [req.body.name]
        );
        return res.status(201).json(result.rows[0]);
    } catch(err) {
        return next(err);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const result = await db.query(
            "UPDATE graduates SET name=$1 WHERE id=$2 RETURNING *",
            [req.body.name, req.params.id]
        );
        return res.status(200).json(result.rows[0]);
    } catch(err) {
        return next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const result = await db.query(
            "DELETE FROM graduates WHERE id=$1", [req.params.id]
        );
        if(!result) return res.status(404).json({ message: 'Not Found'});
        return res.status(200).json({ message: 'Deleted'});
    } catch(err) {
        return next(err);
    }
});

module.exports = router;