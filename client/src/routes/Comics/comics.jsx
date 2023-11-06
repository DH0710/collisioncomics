import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Comics() {

    const baseUrl = "http://localhost:8000/api/comics";

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl);

                if (!response.ok) {
                    throw new Error("Failed to fetch data!")
                }

                const jsonData = await response.json()
                setData(jsonData)



            } catch (err) {
                console.log(err);

            }
        }
        fetchData();
    }, [])



    return (

        <div>

            <h1> Comics </h1>

            <p> Comic book database will be displayed here  </p>

            <h2> Fetch Example </h2>

            <pre>{JSON.stringify(data, null, 1)}</pre>









        </div>




    )





}

export default Comics