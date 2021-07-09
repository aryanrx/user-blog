import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost, upvotePost, downvotePost } from "../service/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const BlogPage = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({});

  const handleUpvote = async (e) => {
    let blog = await upvotePost(blogData.upvote + 1, id);
    setBlogData(blog);
  };

  const handleDownvote = async (e) => {
    let blog = await downvotePost(blogData.downvote + 1, id);
    setBlogData(blog);
  };

  useEffect(() => {
    async function fetchBlog() {
      let data = await getPost(id);
      setBlogData(data);
    }
    fetchBlog();
  }, [id, blogData]);

  return (
    <div>
      <img
        src="https://toyotaboshoku.ca/wp-content/uploads/2016/09/f7148507-7860-465b-950b-2f55b420cedb-1229-0000010877ffe7ca_tmp.jpg"
        width="100%"
        height="400px"
        alt="avatar"
      />
      <h1>{blogData.title}</h1>
      <span>
        {blogData.author && `Post by ${blogData.author.username}`} on
        {blogData.created__at}
      </span>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: blogData.body }}></div>
      <hr />
      <div>
        <button onClick={handleUpvote}>
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>{" "}
        {blogData.upvote}
        <span style={{ margin: "10px" }}></span>
        <button onClick={handleDownvote}>
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
        {blogData.downvote}
      </div>
    </div>
  );
};

export default BlogPage;
