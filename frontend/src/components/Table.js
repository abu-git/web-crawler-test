import axios from 'axios'
import React, { useState ,useEffect } from 'react'
import TableItem from './TableItem'

function Table() {

  const [crawledData, setCrawledData] = useState([])

  //on page render get all crawled data
  useEffect(() => {
    let dataArray = []
    axios.get('/crawl')
      .then(res => {
        //const query = res.data
        let index = 0
        for(let data in res.data){
          dataArray.push(res.data[index])
          index = index + 1
        }
        setCrawledData(dataArray)
      })
      .catch(err => console.log(err))
  },[crawledData])//keeping tabs on crawled data so as to render new data

  return (
    <>
      {
        crawledData.map((data, i) => {
          return <TableItem data={data} key={i} />
        })
      }
    </>
  )
}

export default Table