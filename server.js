const express = require('express')
const cors = require('cors')
const app = express()

const routes = require('./routes/appRoutes')
const mongoose = require('mongoose')

const db = require('./config/keys').MongoURI

const PORT = process.env.PORT || 6000

//app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(db)
.then(() => {
    console.log('MongoDB connected...')
})
.catch(err => console.log(err))


app.use('/api/crawl', routes)

app.listen(PORT, () => {
    console.log("Port runnning on: " + PORT)
})