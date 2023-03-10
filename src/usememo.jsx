import React, { useMemo, useState } from 'react'

const Usememo = () => {
    const [count,setcount ]=useState(0)
    const [data,setdata]=useState(5)
    const multiple=useMemo(()=>{
       console.warn('data') 
       return count * 5
        
    },[count])
  return (
    <div>
        <h2>{data}</h2>
        <h1>{count}</h1>
        <h3>{multiple}</h3>
        <button onClick={()=>setcount(count+1)}>update count</button>
        <button onClick={()=>setdata(data+5)}>data </button>

    </div>
  )
}

export default Usememo