import React from 'react'

//each web crawled data is displayed with this TableItem component

/*I still couldn't figure out a way to display the h1 and h2 tags seperated by a new line
 but let me not let that stop me from submitting a working prototype on time */


function TableItem({data}) {

    return (
        <tr className='mb-5'>
            <td className='border border-slate-600 text-sm font-light pl-2'>{data.url}</td>
            <td className='border border-slate-600 text-sm font-light pl-2'>{data.title}</td>
            <td className='border border-slate-600 text-sm font-light pl-2'>{data.description}</td>
            <td className='border border-slate-600 text-sm font-light pl-2'>{data.h1}</td>
            <td className='border border-slate-600 text-sm font-light pl-2'>{JSON.parse(JSON.stringify(data.h2))}</td>
            <td className='border border-slate-600 text-sm font-light pl-2'>{data.links_count}</td>
        </tr>
    )
}

export default TableItem