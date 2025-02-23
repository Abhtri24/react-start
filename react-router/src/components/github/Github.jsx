import React, { useState } from "react";
import { useEffect } from "react";

function Github(){
const [data,setData] = useState([])
    useEffect(()=>{
        fetch('https://github.com/Abhtri24')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            setData(data)
        })
    },[])
    return (
        <div className="bg-green-500 text-center m-4 text-white" >
            Github Followers: {data.followers}
        </div>
    )
}

export default Github;