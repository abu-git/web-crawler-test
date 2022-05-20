import React, { useState } from 'react'
import axios from 'axios'
import Table from './Table'

function Home() {
    const [theUrl, setTheUrl] = useState('')


    //event handler when user clicks crawl button on screen
    const handleSubmit = (e) => {
        e.preventDefault()

        //send url to backend and start crawl
        axios.post('/crawl', {url : theUrl})
        .then( res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    return (
        <div className="bg-white container mx-auto">
            <h1 className="text-3xl font-bold text-center mt-8 mb-4">Entail Dev Test</h1>
            <hr />

            <div className="relative text-gray-700 mx-5 mt-20">
                <form onSubmit={handleSubmit}>
                    <input onInput={(e) => { setTheUrl(e.target.value)}} className="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="Paste URL here..."/>
                    <button type='submit' className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-blue-600 rounded-r-lg hover:bg-blue-500 focus:bg-blue-700">Crawl</button>
                </form>
            </div>

            <div className='mx-5 mt-10'>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className='bg-slate-200 h-12'>
                            <th className='border border-slate-600 sm:text-sm md:text-md'>URL</th>
                            <th className='border border-slate-600 sm:text-sm md:text-md'>Title</th>
                            <th className='border border-slate-600 sm:text-sm md:text-md'>Meta description</th>
                            <th className='border border-slate-600 sm:text-sm md:text-md'>H1</th>
                            <th className='border border-slate-600 sm:text-sm md:text-md'>H2</th>
                            <th className='border border-slate-600 sm:text-sm md:text-md'>Links count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Table />
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default Home