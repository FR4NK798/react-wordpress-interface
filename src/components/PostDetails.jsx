import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import { baseApiUrl } from '../constants';
import { baseApiPage } from "../constants.js";
import { Link } from "react-router-dom/dist";
// import Edit from './Edit'

const PostDetails = () => {
    const [post, setPost] = useState(null);

    const { id } = useParams();

    // fetch articolo
    // useEffect(() => {
    //     fetch(`${baseApiUrl}/posts/${id}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data);
    //             setPost(data);
    //         });
    // }, [id]);

// fetch pagina
useEffect(() => {
    fetch(`${baseApiPage}/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setPost(data);
        });
}, [id]);

    return (
        post && (
            <>
                <h1>{post.title.rendered}</h1>
                {/* categories */}
                {/* author */}
                <div
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                ></div>
                          
            </>
        )
    );
};

export default PostDetails;
