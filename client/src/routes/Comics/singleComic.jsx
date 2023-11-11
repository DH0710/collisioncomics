import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


function singleComic() {
    const baseUrl = "http://localhost:8000/api/comics";
    const [data, setData] = useState([]);



    useEffect(() => {
        const fetchData = async () => {

            try {

            

                const response = await fetch(baseUrl);

                if (!response.ok) {
                    throw new Error("Failed to fetch data!")
                }

                const jsonData = await response.json()
                setData(jsonData);
                



            } catch (err) {
                console.log(err);
                
                

            }
        }
        fetchData();
    }, []);



  return (
    <div>
      
    </div>
  )
}

export default singleComic
