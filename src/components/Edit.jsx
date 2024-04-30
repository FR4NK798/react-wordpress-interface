import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants.js";
import { authString } from "../constants.js";
import { baseApiPage } from "../constants.js";

import { useParams } from "react-router-dom/dist";

const Edit = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const [post, setPost] = useState(null);

  const { id } = useParams();

//   modifica articolo
  const modify = (e) => {
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


//   fetch articolo
  useEffect(() => {
    fetch(`${baseApiUrl}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
        setNewTitle(data.title.rendered);
        setNewContent(data.content.rendered)
      });
    console.log("setPost", post);
  }, []);

  if(post){

    return (
        <>
          <Form onSubmit={modify}>
            <Form.Group className="mb-2">
              <Form.Label>Nuovo titolo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci qui il titolo"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </Form.Group>
    
            <Form.Group className="mb-2">
              <Form.Label>Contenuto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci qui il testo del contenuto"
                value={newContent}
                onChange={(e) => {
                    setNewContent(e.target.value);
                }
            }
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
