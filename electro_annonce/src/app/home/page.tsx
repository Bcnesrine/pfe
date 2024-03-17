import React, { useEffect } from 'react'


async function getData() {
    const res = await fetch('http://localhost:3000/api/movies')


   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function page() {


    const data = await getData()



  return (
    <div>
        <h1>Home</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>

  )
}
