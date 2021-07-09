import {useState, useRef,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {config} from 'dotenv';
import {createPost} from '../service/models';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  makeStyles,
  Container
} from "@material-ui/core/";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
 
const CreateBlog = ()  => {
  const classes = useStyles();
  const history = useHistory()

  const [content, setContent] = useState('<h4>Your article here...</h4>')
  const tags = useRef('')
  const title = useRef('')

  useEffect(() => {
    config();
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!title.current.value || !tags.current.value) {
      alert('You need to add title and body...')
    } else {
      await createPost(
        title.current.value,
        content, localStorage.getItem('userId'),
        tags.current.value.split(',')
      )
      alert('Blog post created successfully, signing you in...')
      history.push('/blogs/')
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            inputRef={title} 
            type="text" 
            name="title"
            label="Title"
            autoComplete="Enter title here..."
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Tag"
            type="text"
            name="tag"
            id="tag"
            inputRef={tags}
            autoComplete="Enter tag here..."
          />
          <div className="form-group">
            <CKEditor
              editor={ ClassicEditor }
              data={content}
              row={100}
              onReady={ editor => { } }
              onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  setContent(data)
              }}
            />
        </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleCreate}
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default CreateBlog;