import React, { useState } from 'react'
import NoImagePlaceholder from "../../assets/No-Image-Placeholder.svg.png"

const createComic = () => {

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");

    const createComic = async(e) => {

        e.preventDefault();
        console.table([title, slug]);

        try {
            const response = await fetch("http://localhost:8000/api/comics", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(
                {
                    title: title,
                    slug: slug,

                }
                )

            })

            if(response.ok) {
                setTitle("");
                setSlug("");
            } else {
                console.log("Failed to submit data")
            }









        } catch (err) {
            console.log(error);

        }





    }


    




    return (
        <div>
            <h1>Create Comic</h1>

            <p> This is where we utilize NodeJs, Express & MongoDB to grab data. The
                data below is pulled from MongoDB database.
            </p>

            <form className='comicdetails' onSubmit={createComic}>
                <div className='col-1'>
                    <label> Upload Thumbnail</label>
                    <img src={NoImagePlaceholder} alt="preview image"></img>

                    <input type="file" accept="image/gif, image/jpeg, image/png" />



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


                    </div>


                    <input type="submit"></input>



                </div>








            </form>






        </div>
    )
}

export default createComic;
