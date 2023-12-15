function blockUser(req, res, next) {
    const API_KEY = process.env.API_KEY
    if(req.body.key !== API_KEY) {
        res.status(403).send({ message: "You Don't Have The Correct Key!!" })
    } else {
        next()
    }
}

export default blockUser