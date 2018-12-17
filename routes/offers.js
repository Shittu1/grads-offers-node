const express = require("express");
const router = express.Router({ mergeParams: true});
const db = require("../db");

// Get all offers for a specific grad
router.get("/:id/offers", async (req, res, next) => {
    try {
        // Get the specific graduate based on the id in the URL
        const graduate = await db.query(
            "SELECT * FROM graduates WHERE id=$1",
            [req.params.id]
        );
          // Get all the offers where the graduate_id is the same as on the one in the URL
        const offers = await db.query(
            "SELECT * FROM offers WHERE graduate_id=$1",
            [req.params.id]
        );  
        graduate.rows[0].offers = offers.rows;
        return res.status(200).json(graduate.rows[0]);
    } catch(err) {
        next(err);
    }
});

router.post("/:id/offers", async (req, res, next) => {
    try {
        const graduate = await db.query(
            "INSERT INTO offers (title, graduate_id) VALUES ($1, $2)", 
            [req.body.title, req.params.id]
        );
        return res.status(201).json({ message: "Created"});
    } catch(err) {
        return next(err);
    }
});

// Get a specific offers for a specific grad
router.get("/:graduate_id/offers/:id", async (req, res, next) => {
    try {
        // Get the specific graduate based on the id in the URL
        const graduate = await db.query(
            "SELECT * FROM graduates WHERE id=$1",
            [req.params.graduate_id]
        );
          // Get one offer
        const offers = await db.query(
            "SELECT * FROM offers WHERE graduate_id=$1 AND id=$2",
            [req.params.graduate_id, req.params.id]
        );  
        graduate.rows[0].offers = offers.rows;
        return res.status(200).json(graduate.rows[0]);
    } catch(err) {
        next(err);
    }
});

// Update a specific offers for a specific grad
router.patch("/:graduate_id/offers/:id", async (req, res, next) => {
    try {
          // Update one offer
        const offer = await db.query(
            "UPDATE offers SET title=$1, graduate_id=$2 WHERE id=$3",
            [req.body.title, req.body.graduate_id, req.params.id]
        );  
        return res.status(200).json({ message: "Offer Updated" });
    } catch(err) {
        next(err);
    }
});

// Delete a specific offers for a specific grad
router.delete("/:graduate_id/offers/:id", async (req, res, next) => {
    try {
          // delete one offer
        const offer = await db.query(
            "DELETE FROM offers WHERE graduate_id=$1 AND id=$2",
            [req.params.graduate_id, req.params.id]
        );  
        return res.status(200).json({ message: "Offer Deleted" });
    } catch(err) {
        next(err);
    }
});

module.exports = router;