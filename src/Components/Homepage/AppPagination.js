import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import Pagination from "./Pagination";
import axios from "axios";
function AppPagination() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate =(pageNumber)=>setCurrentPage(pageNumber)
  return (
    <div>
      <Posts loading={loading} posts={currentPosts}></Posts>
      <Pagination
        totalposts={posts.length}
        postsperpage={postsPerPage}
        paginate={paginate}
      ></Pagination>
    </div>
  );
}

export default AppPagination;
