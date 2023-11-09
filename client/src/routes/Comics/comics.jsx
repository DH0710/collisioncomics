import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Comics() {

    const baseUrl = "http://localhost:8000/api/comics";

    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchData = async () => {

            try {

                let url = baseUrl;
                if(selectedCategory) {
                    url += `?category=${selectedCategory}`
                }

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Failed to fetch data!")
                }

                const jsonData = await response.json()
                setData(jsonData);
                setisLoading(false)



            } catch (err) {
                console.log(err);
                setError("Error fetching data. Please try again later.");
                setisLoading(false);

            }
        }
        fetchData();
    }, [selectedCategory]);



    return (

        <div>

            <h1> Comics </h1>

            <p></p>

            <h2></h2>

            {/* <pre>{JSON.stringify(data, null, 1)}</pre> */}

            <div className ="filters">
                <label>Categories</label>

                <select onChange={(e)=> setSelectedCategory(e.target.value)}>

                    <option value="mystery">Mystery</option>
                    <option value="action">Action</option>
                    <option value="science-fiction">Science Fiction</option>





                </select>



            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (

                <ul className="comics">

                    {data.map((item) => (

                        <li key={item._id}>
                            <Link to={`/comics/${item.slug}`}>

                                <img src={`http://localhost:8000/uploads/${item.thumbnail}`} 
                                alt={item.title} />
                                <h2>{item.title}</h2>
                            </Link>
                        </li>
                    ))}

                </ul>
            )}
        </div>
    )
}

export default Comics