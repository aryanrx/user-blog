import { useEffect, useState } from "react";
import BlogPreview from "../components/BlogPreview";
import { getPosts } from "../service/models";
import {
  Grid
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
}));

const AllBlogPage = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    blogs: [],
    clone: []
  });
  const [searched, setSearched] = useState("");

  useEffect(() => {
    async function fetchBlogs() {
      let data = await getPosts();
      setState({blogs: data, clone: data});
    }
    fetchBlogs();
  }, []);

  const handleSearch = (searchedVal) => {
    const searchQuery =searchedVal.toLowerCase();
    let updatedBlogs = state.clone.filter(function(el) {
      const searchValue = el.data.title.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    console.log(updatedBlogs)
    setState(
      {
        ...state,
        blogs: updatedBlogs
      });
  }

  const cancelSearch = () => {
    setSearched("");
    handleSearch(searched);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={12}>
          <SearchBar
            value={searched}
            onChange={(searchVal) => handleSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </Grid>

        {state.blogs.length > 0
          ? state.blogs.map((blog, idx) => (
              <BlogPreview
                key={idx}
                id={blog.ref.value.id}
                title={blog.data.title}
                author={blog.data.author}
                avatar={blog.data.avatar}
                upvote={blog.data.upvote}
                downvote={blog.data.downvote}
              />
            ))
          : "No blog has been created yet. Be the first to create"}
      </Grid>
    </div>
  );
}

export default AllBlogPage;
