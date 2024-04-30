import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants.js";
import { authString } from "../constants.js";

import { useParams } from "react-router-dom/dist";

const Edit = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const [post, setPost] = useState(null);

  const { id } = useParams();

  const modify = (e) => {
    // if (setNewTitle !== "" && newContent !== "") {
    e.preventDefault();
    fetch(`${baseApiUrl}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        status: "publish",
      }),
    });
  };
  console.log(id);

  useEffect(() => {
    fetch(`${baseApiUrl}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
    console.log("setPost", post);
    // console.log("id", id)
  }, []);

  if(post){
    console.log("post", post);
    console.log("post title", post.title.rendered)
    console.log("post content", post.content.rendered)
    return (
        <>
          <Form onSubmit={modify}>
            <Form.Group className="mb-2">
              <Form.Label>Nuovo titolo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci qui il titolo"
                value={post.title.rendered}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </Form.Group>
    
            <Form.Group className="mb-2">
              <Form.Label>Contenuto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci qui il testo del contenuto"
                value={post.content.rendered}
                onChange={(e) => setNewContent(e.target.value)}
                required
              />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Invia
            </Button>
          </Form>
        </>
      );
  }


};

export default Edit;
