import express from "express"

const app = express()

app.use(express.json())

// Routes
app.get("/", (req, res) => {
    res.send({ code: 200, msg: "OK" })
})

app.listen(3000, () => {
    console.log("Running on http://localhost:3000")
})