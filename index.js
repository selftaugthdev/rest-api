import express from "express";
import dishes from "./dishes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import blockUser from "./middlewares.js";
import dotenv from "dotenv";
dotenv.config();

const app = express()

app.use(express.json())

// Routes
app.get("/dishes/popular", (req, res) => {
    const sortedDishes = [...dishes].sort((a, b) => b.clickCount - a.clickCount);
    res.send({
        message: "These are the most popular dishes ranked by most visited",
        popularDishes: sortedDishes
    });
});

app.get("/", blockUser, (req, res, next) => {
    res.send(dishes)
})

app.get("/info", (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, 'instructions.html'));
});

/* app.get("/dishes/:dish", (req, res) => {
    const dish = dishes.find(dish => dish.name === req.params.dish)
    res.send(dish)
}) */

app.get("/dishes/:dish", (req, res) => {
    const dish = dishes.find(d => d.name.toLowerCase() === req.params.dish.toLowerCase())
    if (dish) {
        dish.clickCount++
        res.send(dish)
    } else {
        res.status(404).send({ message: "Dish not found" })
    }
})

app.listen(3000, () => {
    console.log("Running on http://localhost:3000")
})