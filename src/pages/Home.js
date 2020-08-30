import React, { useState, useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { PlayArrow, Stop } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 900,
    margin: 32,
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

const Home = () => {
  const classes = useStyles();
  const localVideo = useRef(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [localStream, setLocalStream] = useState(null);

  const handlePlayButton = () => {
    if (isBroadcasting) {
      localVideo.current.srcObject = null;
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      setIsBroadcasting(false);
    } else {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 360 },
          },
          audio: true,
        })
        .then((stream) => {
          setLocalStream(stream);
          localVideo.current.srcObject = stream;
          setIsBroadcasting(true);
        });
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">nicoPlayer</Typography>
        </Toolbar>
      </AppBar>
      <Card className={classes.root}>
        <CardContent>
          <video
            id="video"
            width="100%"
            autoPlay
            muted
            ref={localVideo}
          ></video>
        </CardContent>
        <CardActions>
          {isBroadcasting ? (
            <Button
              onClick={handlePlayButton}
              variant="contained"
              color="secondary"
            >
              <Stop />
              停止
            </Button>
          ) : (
            <Button
              onClick={handlePlayButton}
              variant="contained"
              color="primary"
            >
              <PlayArrow />
              再生
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default Home;
