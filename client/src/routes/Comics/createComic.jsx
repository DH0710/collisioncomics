import React, { useState } from 'react'
import NoImagePlaceholder from "../../assets/No-Image-Placeholder.svg.png"

const createComic = () => {

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [collision, setCollision] = useState(0);
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [submitted, setSubmitted] = useState("");
    const [image, setImage] = useState(NoImageSelected)

    const createComic = async (e) => {

        e.preventDefault();
        console.table([title, slug]);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("collisions", collision);
        formData.append("description", description);
        formData.append("category", categories);
        formData.append("thumbnail", thumbnail);

        try {

            const response = await fetch("http://localhost:8000/api/comics", {
                method: "POST",
                body: formData,

            });

            /* const response = await fetch("http://localhost:8000/api/comics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                     {
                         title: title,
                         slug: slug,
                         collisions: collisions,
                         description: description,
                         category: categories,
 
                     }),
 
             });
 
             */

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
    }






    return (
        <div>
            <h1>Create Comic</h1>

            <p> This is where we utilize NodeJs, Express & MongoDB to grab data. The
                data below is pulled from MongoDB database.
            </p>

            {submitted ? (

                <p> Data submitted successfully!</p>
            ) : (

                <form className='comicdetails' onSubmit={createComic}>
                    <div className='col-1'>
                        <label> Upload Thumbnail</label>
                        <img src={image} alt="preview image"></img>

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

                            <label> Thumbnail </label>
                            <input

                                type="null"
                                value={thumbnail}
                                onChange={(e) => setThumbnail(e.target.value)}>
                            </input>


                        </div>


                        <input type="submit"></input>



                    </div>








                </form>

            )}




        </div>
    )
}

export default createComic;
