import React, { useState, useEffect } from 'react'
import NoImagePlaceholder from "../../assets/No-Image-Placeholder.svg.png";
import { Link, useParams } from "react-router-dom";


const editComic = () => {


    const urlSlug = useParams();
    const baseUrl = `http://localhost:8000/api/comics/${urlSlug.slug}`;


    const [comicId, setComicId] = useState("");
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [collision, setCollision] = useState(0);
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [submitted, setSubmitted] = useState("");
    const [image, setImage] = useState("")


    const fetchData = async () => {
        try {
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error("Failed to fetch data.");
            }

            const data = await response.json();
            setComicId(data._id);
            setTitle(data.title);
            setSlug(data.slug);
            setCollision(data.collision);
            setCategories(data.category);
            setDescription(data.description);
            setThumbnail(data.thumbnail);
        } catch (error) { }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const createComic = async (e) => {

        e.preventDefault();
        console.table([title, slug]);

        const formData = new FormData();
        formData.append("comicId", comicId);
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("collision", collision);
        formData.append("description", description);
        formData.append("category", categories);
        

        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        try {

            const response = await fetch("http://localhost:8000/api/comics", {
                method: "PUT",
                body: formData,

            });

            if (response.ok) {
                setTitle("");
                setSlug("");
                setSubmitted(true);

            } else {
                console.log("Failed to submit data")
            }

        } catch (err) {
            console.log(error);
        }
    };


    const handleCatergoryChange = (e) => {
        setCategories(e.target.value.split(",").map((category) => category.trim()));
    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setThumbnail(e.target.files[0])
        }
    };






    return (
        <div>
            <h1>Edit Comic</h1>

            <p> This is where we utilize NodeJs, Express & MongoDB to grab data. The
                data below is pulled from MongoDB database.
            </p>

            {submitted ? (

                <p> Data submitted successfully!</p>
            ) : (

                <form className='comicdetails' onSubmit={createComic}>
                    <div className='col-1'>
                        <label> Upload Thumbnail</label>

                        {image ? (
                            <img src={`${image}`} alt="preview image" />
                        ) : (
                            <img
                                src={`http://localhost:8000/uploads/${thumbnail}`}
                                alt="preview image"
                            />
                        )}

                        <input
                            onChange={onImageChange}
                            type="file" accept="image/gif, image/jpeg, image/png" />

                    </div>



                    <div className='col-2'>

                        <div>
                            <label> Title </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}>
                            </input>


                            <label> Slug </label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}>
                            </input>

                            <label> Collision Rating </label>
                            <input
                                type="text"
                                value={collision}
                                onChange={(e) => setCollision(e.target.value)}>
                            </input>

                            <label> Description </label>
                            <textarea
                                rows="4"
                                col="50"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}>
                            </textarea>

                            <label> Categories (comma-seperated) </label>
                            <input

                                type="text"
                                value={categories}
                                onChange={handleCatergoryChange}>
                            </input>


                        </div>


                        <input type="submit"></input>



                    </div>








                </form>

            )}




        </div>
    );

};


export default editComic
