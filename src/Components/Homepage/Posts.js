import React from "react";

function Posts({ posts, loading }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  console.log(posts);
  return (
    <div>
      <ul className="list-group mb-4">
        {posts.map((el) => (
          <li key={el.id} className="list-group-item">
            {el.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
