import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


function singleComic() {
    const [data, setData] = useState([]);
    const urlSlug = useParams();
    const baseUrl = `http://localhost:8000/api/comics/${urlSlug.slug}`;



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

    function StarRating({ numberOfStars }) {
        const stars = []

        for (let i = 0; i < numberOfStars; i++) {
            stars.push(<span key={i}>💥</span>)
        }

        return <div> Rating: {stars} </div>
    }





    return (
        <div>

            <Link to={"/comics"}> Back to Comics</Link>

            <div className="comicdetails">

                <div className="col-1">

                    <img src={`http://localhost:8000/uploads/${data?.thumbnail}`}
                        alt={data?.title} />
                        <Link to={`/editcomic/${data.slug}`}>Edit</Link>



                </div>



                <div className="col-2">

                    <h1>{data?.title}</h1>
                    <p>{data?.description}</p>
                    <StarRating numberOfStars={data?.stars}></StarRating>


                    <p>Category</p>
                    <ul>
                        {data?.category?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>


                </div>






            </div>


















        </div>
    )
}

export default singleComic
