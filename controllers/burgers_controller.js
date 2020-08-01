const express = require("express");
const router = express.Router();

const burger = require("../models/burger.js");


// --------- WHEN APP LOADS ----------- //
router.get("/", (req, res) => {
    burger.all((data) => {
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    })
});

// --------- CREATE NEW BURGER ----------- //
router.post("/api/burgers", (req, res) => {
    burger.create([
        "burger_name"
    ], [req.body.burger_name], (result) => {
        res.json({id: result.insertId});
    });
});

// --------- UPDATE BURGER DEVOURED ----------- //
router.put("/api/burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;
    console.log("condition", condition);
    console.log(req.body);
    burger.update({
        devoured: req.body.devoured
    }, condition, (result) => {
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
    
}); 

// --------- DELETE BURGER DEVOURED ----------- //
router.delete("/api/burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.delete(condition, (result)=> {
        if(result.affectedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
     });
    
});


module.exports = router;