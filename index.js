import express from "express"
import dishes from "./dishes.js"
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()

app.use(express.json())

// Routes
app.get("/", (req, res) => {
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
        res.send(dish)
    } else {
        res.status(404).send({ message: "Dish not found" })
    }
})

app.listen(3000, () => {
    console.log("Running on http://localhost:3000")
})