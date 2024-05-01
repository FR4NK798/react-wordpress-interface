import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { baseApiUrl } from "../constants";
import { baseApiPage } from "../constants.js";
import { Link } from "react-router-dom/dist";
// import Edit from './Edit'

const PostDetails = () => {
  const [post, setPost] = useState(null);

  const { id } = useParams();

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const [obj, setObj] = useState(null);

  const fetchObj = async (e) => {
    try {
      let response = await fetch(`${baseApiUrl}/posts/${id}`);
      if (response.ok) {
        console.log(response);
        fetch(response.url)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log("articolo", data);
            setObj("article");
            setPost(data);
            console.log("oggetto", obj);
            console.log("titolo", data.title.rendered);
            console.log("content", data.content.rendered);
            setNewTitle(data.title.rendered);
            setNewContent(data.content.rendered);
          });
      } else {
        let response = await fetch(`${baseApiPage}/${id}`);
        console.log(response);
        fetch(response.url)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log("pagine", data);
            setObj("page");
            console.log("oggetto", obj);
            setPost(data);
            console.log("titolo", data.title.rendered);
            console.log("content", data.content.rendered);
            setNewTitle(data.title.rendered);
            setNewContent(data.content.rendered);
          });
      }
    } catch (error) {
      //   alert(error);
    }
  };
  useEffect(() => {
    fetchObj();
  }, [id]);

  // return (
  //     post && (
  //         <>
  //             <h1>{post.title.rendered}</h1>
  //             {/* categories */}
  //             {/* author */}
  //             <div
  //                 dangerouslySetInnerHTML={{ __html: post.content.rendered }}
  //             ></div>

  //         </>
  //     )
  // );

  if (post) {
    return (
      <>
        <h1>{newTitle}</h1>
        <div dangerouslySetInnerHTML={{ __html: newContent }}></div>
      </>
    );
  }
};

export default PostDetails;
