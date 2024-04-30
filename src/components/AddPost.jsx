import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants.js";
import { baseApiPage } from "../constants.js";
import { authString } from "../constants.js";
// import { Link } from "react-router-dom/dist";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const AddPost = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const [decision, setDecision] = useState("articolo");

  const addFromForm = (e) => {
    e.preventDefault();
    console.log("decision dopo", decision);
    if (decision === "articolo") {
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
    } else {
      fetch(`${baseApiPage}`, {
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
    }
  };

  return (
    <>
      <Form onSubmit={addFromForm}>
        <Form.Group className="mb-2">
          <Form.Label>Articolo o pagina</Form.Label>
          <Form.Control
            as="select"
            value={decision}
            onChange={(e) => {
              setDecision(e.target.value);
            }}
          >
            <option value="articolo">Articolo</option>
            <option value="pagina">Pagina</option>
          </Form.Control>
        </Form.Group>

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
};

export default AddPost;
