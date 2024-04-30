import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants.js";
import { authString } from "../constants.js";
// import { Link } from "react-router-dom/dist";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddPost = () => {
  //   const [posts, setPosts] = useState([]);
  //   const [form, setForm] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  //   const [currentPage, setCurrentPage] = useState(1);

  const addFromForm = (e) => {
    // if (setNewTitle !== "" && newContent !== "") {
    e.preventDefault();
    fetch(`${baseApiUrl}/posts`, {
      method: "POST",
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

  return (
    <>
      <Form onSubmit={addFromForm}>
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
          {/* {console.log(newTitle)}
          {console.log(newContent)} */}
          Invia
        </Button>
      </Form>
    </>
  );
};

export default AddPost;
