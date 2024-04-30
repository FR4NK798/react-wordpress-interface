import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants.js";
import { Link } from "react-router-dom/dist";

import { authString } from "../constants.js";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteState, setDeleteState] = useState(null);



  const deletePost = (id) => {
    // if (setNewTitle !== "" && newContent !== "") {
    // e.preventDefault();
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

  useEffect(() => {
    fetch(`${baseApiUrl}/posts?page=${currentPage}`)
      .then((res) => {
        // recupera i dati della paginazione dagli header
        setLastPage(parseInt(res.headers.get("X-WP-TotalPages")));
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, [currentPage, deleteState]);

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

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title.rendered}</Link>
            <button onClick={() => deletePost(post.id)}>Elimina</button>
            <Link to={`/edit/${post.id}`}>Modifica</Link>
            {/* <button onClick={() => deletePost(post.id)}>Modifica</button> */}
          </li>
        ))}
      </ul>

      {/* <nav> */}
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
          <li key={page.n} className={`page-item ${page.active && "active"}`}>
            <span className="page-link" onClick={() => changePage(page.n)}>
              {page.n}
            </span>
          </li>
        ))}

        <li className={`page-item ${currentPage === "lastPage" && "disabled"}`}>
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
      {/* </nav> */}
    </>
  );
};

export default Home;
