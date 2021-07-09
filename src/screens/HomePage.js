import PdfViewer from "../components/PdfViewer"
import RESUME from "../Resume/RESUME.pdf";
import {
  makeStyles,
  Container
} from "@material-ui/core/";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

const HomePage=() => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <h2>Resume</h2>
        <div>
          <PdfViewer pdf={RESUME} />
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
