const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const bodyParser = require("body-parser")
const app = express()
const PORT = 3000
require("./lib")

const { cors } = require("./middlewares/cors")
const { getData } = require("./middlewares/multer")

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(cors)

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.post("/file", 
  getData, 
  (req, res) => {
    const files = req.files.files.map(item => item.filename)
    console.log(req.files.files)
    return res.status(200).json({ files: files })
})

app.use((err, req, res, next) => {
  if (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error' })
  }
})
