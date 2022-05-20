const mongoose = require('mongoose')

//Crawled Data Schema to fit test directive
const CrawledSchema = new mongoose.Schema({
    url: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    h1: [{}]
    ,
    h2: [{}],
    links_count: {
        type: Number
    }
    
})

const Crawled = mongoose.model('Crawled', CrawledSchema)

module.exports = Crawled