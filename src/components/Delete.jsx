import { baseApiUrl } from "../constants.js";
import { authString } from "../constants.js";
import { useParams } from 'react-router-dom/dist';
import { useEffect, useState } from 'react';

const Delete = () =>{
    const { id } = useParams();

    const deletePost = () => {
        // if (setNewTitle !== "" && newContent !== "") {
        // e.preventDefault();
        fetch(`${baseApiUrl}/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${authString}`,
          }
        })
        .then((res)=>res.json())
        .then((data)=>{
            // console.log(data)
        })
      };

      useEffect(() => {
        deletePost()

    }, [id]);



    return(
<></>
    )
}
export default Delete