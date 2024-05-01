import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants.js";
import { baseApiPage } from "../constants.js";
import { Link } from "react-router-dom/dist";

import { authString } from "../constants.js";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Home = () => {
  // articoli
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteState, setDeleteState] = useState(null);

  //   pagine
  const [pages, setPages] = useState([]);
  const [lastPagePages, setLastPagePages] = useState(null);
  const [currentPagePages, setCurrentPagePages] = useState(1);
  const [deleteStatePages, setDeleteStatePages] = useState(null);

  // fetch pagine
  useEffect(() => {
    fetch(`${baseApiPage}/?page=${currentPagePages}`)
      .then((res) => {
        // recupera i dati della paginazione dagli header
        setLastPage(parseInt(res.headers.get("X-WP-TotalPages")));
        return res.json();
      })
      .then((data) => {
        console.log("pagine", data);
        setPages(data);
      });

    // fetch articoli
    fetch(`${baseApiUrl}/posts?page=${currentPage}`)
      .then((res) => {
        // recupera i dati della paginazione dagli header
        setLastPagePages(parseInt(res.headers.get("X-WP-TotalPages")));
        return res.json();
      })
      .then((data) => {
        console.log("post", data);
        setPosts(data);
      });
  }, [currentPage, deleteState, currentPagePages, deleteStatePages]);

  //   article
  const changePage = (page) => {
    setCurrentPage(page);
  };

  const generatePaginationArray = () => {
    let paginationArr = [];
    for (let index = 1; index <= lastPage; index++) {
      paginationArr.push({
        n: index,
        active: currentPage === index,
      });
    }
    return paginationArr;
  };

  //   pages
  const changePagePages = (page) => {
    setCurrentPagePages(page);
  };

  const generatePaginationArrayPages = () => {
    let paginationArrPages = [];
    for (let index = 1; index <= lastPagePages; index++) {
      paginationArrPages.push({
        n: index,
        active: currentPagePages === index,
      });
    }
    return paginationArrPages;
  };

  // elimina post
  const deletePost = (id) => {
    fetch(`${baseApiUrl}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setDeleteState(true);
      });
  };

  // elimina pagina
  const deletePages = (id) => {
    fetch(`${baseApiPage}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setDeleteStatePages(true);
      });
  };

  return (

    <Container>
      <Row>
        <Col>
        <p className="fs-3">Articoli</p>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title.rendered}</Link>
                <Button variant="danger" onClick={() => deletePost(post.id)}>Elimina</Button>
                <Link to={`/edit/${post.id}`}> <Button variant="primary">Modifica</Button></Link>
              </li>
            ))}
          </ul>

          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <span
                className="page-link"
                onClick={() => currentPage !== 1 && changePage(currentPage - 1)}
              >
                Previous
              </span>
            </li>

            {generatePaginationArray().map((page) => (
              <li
                key={page.n}
                className={`page-item ${page.active && "active"}`}
              >
                <span className="page-link" onClick={() => changePage(page.n)}>
                  {page.n}
                </span>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === "lastPage" && "disabled"
              }`}
            >
              <span
                className="page-link"
                onClick={() =>
                  currentPage !== lastPage && changePage(currentPage + 1)
                }
              >
                Next
              </span>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
        <p className="fs-3">Pagine</p>
        <ul>
            {pages.map((pagina) => (
              <li key={pagina.id}>
                <Link to={`/posts/${pagina.id}`}><div className="btn">{pagina.title.rendered}</div></Link>
                <Button variant="danger" onClick={() => deletePages(pagina.id)}>Elimina</Button>
                <Link to={`/edit/${pagina.id}`}> <Button variant="primary">Modifica</Button></Link>
              </li>
            ))}
          </ul>

          <ul className="pagination">
            <li className={`page-item ${currentPagePages === 1 && "disabled"}`}>
              <span
                className="page-link"
                onClick={() => currentPagePages !== 1 && changePagePages(currentPagePages - 1)}
              >
                Previous
              </span>
            </li>

            {generatePaginationArrayPages().map((page) => (
              <li
                key={page.n}
                className={`page-item ${page.active && "active"}`}
              >
                <span className="page-link" onClick={() => changePagePages(page.n)}>
                  {page.n}
                </span>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPagePages === "lastPage" && "disabled"
              }`}
            >
              <span
                className="page-link"
                onClick={() =>
                  currentPagePages !== lastPagePages && changePagePages(currentPagePages + 1)
                }
              >
                Next
              </span>
            </li>
          </ul>
        </Col>
      </Row>
      </Container>


  );
};

export default Home;
