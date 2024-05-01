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

  const [obj, setObj] = useState(null);

  const { id } = useParams();

  //   modifica articolo
  const modify = (e) => {
    e.preventDefault();
    if (obj === "article") {
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
    } else {
      fetch(`${baseApiPage}/${id}`, {
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
    }
  };

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
    // setNewTitle(post.title.rendered);
    // setNewContent(post.content.rendered);
    // console.log('newTitle', newTitle)
    // console.log('newContent', newContent)
  }, [obj]);

  if (post) {
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
