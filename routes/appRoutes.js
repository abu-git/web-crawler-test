const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

//import schema
const Crawled = require('../model/Crawled')

//puppeteer is my tool of choice for scraping/crawling
const puppeteer = require('puppeteer');

//async scraping/crawler function
async function start(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)


    //take screenshot of page (not required)
    await page.screenshot({ path: "screenshot.png", fullPage: true });
    
    title = await page.evaluate(() => {
        if(document.querySelector("title") !== null){
            return document.querySelector("title").textContent.trim()
        }else{
            return 'No title tags found'
        }
    })

    //get description from page
    description = await page.evaluate(() => {
        if((document.querySelector("meta[name='description']")) !== null){
            if(document.querySelector("meta[name='description']").getAttribute("content") !== null){
                return document.querySelector("meta[name='description']").getAttribute("content")
            }else {
                return 'No meta tag description found'
            }
            
        }else {
            return 'No meta description found'
        }
    })

    //get h1's from page
    h1 = await page.evaluate(() => {
        if(document.querySelectorAll("h1") !== null){
            h1_elements = document.querySelectorAll("h1")
            h1_array = Array.from(h1_elements)
            return h1_array.map(h1 => h1.textContent)
        }else{
            return 'No h1 tags found'
        }
        
    })

    //get h2's from page
    h2 = await page.evaluate(() => {
        if(document.querySelectorAll("h2") !== null){
            h2_elements = document.querySelectorAll("h2")
            h2_array = Array.from(h2_elements)
            return h2_array.map(h2 => h2.textContent)
        }else{
            return 'No h2 tags found'
        }
        
        
    })

    //get links from page and count them
    atags = await page.evaluate(() => {
        if(document.querySelectorAll("a[href]") !== null){
            a_elements = document.querySelectorAll("a[href]")
            a_array = Array.from(a_elements)
            count = 0
            for(link in a_array){
                count++
            }
            
            return(count)
        }else{
            return 'No links tags found'
        }
        
        
    })
    //link count
    const links_count = atags

    //mongoose schema instance
    const newCrawled = new Crawled({
        url, title, description, h1, h2, links_count
    })

    //save crawled instance on MongoDB
    newCrawled.save()
    .catch(err => console.log(err))

    await browser.close()
}

//post request to initiate crawl
router.post('/', (req, res) => {
    const theUrl = req.body.url
    start(theUrl)
})


//get request to populate crawled findings
router.get('/', async (req, res) => {
    all = await Crawled.find()
        .catch(err => console.log(err))
    //send to frontend
    res.json(all)
})

module.exports = router