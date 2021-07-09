import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faThumbsDown, 
  faThumbsUp 
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardHeader
} from "@material-ui/core/";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 100
  }
});

const BlogPreview = ({
  id,
  title,
  author,
  avatar,
  upvote,
  downvote
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={3} key={id}>
      <Card>
        <CardHeader
          title={title}
          subheader={`Post created by: ${author.username}`}
        />
        <CardMedia
          className={classes.media}
          image= "https://toyotaboshoku.ca/wp-content/uploads/2016/09/f7148507-7860-465b-950b-2f55b420cedb-1229-0000010877ffe7ca_tmp.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <div className="card-body">
            <div style={{ margin: "5px" }}>
              <button
                onClick={() => {
                  alert("View this blog to upvote it");
                }}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>{" "}
              {upvote}
              <span style={{ margin: "10px" }}></span>
              <button
                onClick={() => {
                  alert("View this blog to downvote it");
                }}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
              </button>
              {downvote}
            </div>
            <Link to={`/blogs/${id}`} className="btn btn-primary">
              Read blog
            </Link>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default BlogPreview;
