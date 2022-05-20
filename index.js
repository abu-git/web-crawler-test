const puppeteer = require('puppeteer');

/*async function start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://en.wikipedia.org/wiki/JavaScript");
    await page.screenshot({ path: "screenshot.png", fullPage: true });
    await browser.close();
}*/

async function start(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://mernappbrad.herokuapp.com/login")
    //await page.goto("https://tunesketch.com")
    await page.screenshot({ path: "screenshot.png", fullPage: true });
    
    title = await page.evaluate(() => {
        if(document.querySelector("title") !== null){
            return document.querySelector("title").textContent.trim()
        }else{
            return 'No title tags found'
        }
        
        
    })

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

    h1 = await page.evaluate(() => {
        if(document.querySelectorAll("h1") !== null){
            h1_elements = document.querySelectorAll("h1")
            h1_array = Array.from(h1_elements)
            return h1_array.map(h1 => h1.textContent)
        }else{
            return 'No h1 tags found'
        }
        
    })

    h2 = await page.evaluate(() => {
        if(document.querySelectorAll("h2") !== null){
            h2_elements = document.querySelectorAll("h2")
            h2_array = Array.from(h2_elements)
            return h2_array.map(h2 => h2.textContent)
        }else{
            return 'No h2 tags found'
        }
        
        
    })

    atags = await page.evaluate(() => {
        if(document.querySelectorAll("a[href]") !== null){
            a_elements = document.querySelectorAll("a[href]")
            a_array = Array.from(a_elements)
            count = 0
            for(link in a_array){
                count++
            }
            //return a_array.map(a => a.href)
            return(count + " links found")
        }else{
            return 'No links tags found'
        }
        
        
    })

    console.log("title: " + title + "\n")
    console.log("desc: " + description + "\n")
    console.log("h1's: " +h1 + "\n")
    console.log("h2's: " + h2 + "\n")
    console.log("links: " + atags)
    await browser.close()
}

start()