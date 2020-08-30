import React, { useState, useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { PlayArrow, Stop } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const nicoJSLib = require("nicojs");

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
  const [nicoJS, setNicoJS] = useState(null);

  const handlePlayButton = () => {
    if (isBroadcasting) {
      // 再生中(停止処理)
      localVideo.current.srcObject = null;
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      setIsBroadcasting(false);
    } else {
      // 停止中(再生処理)
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 360 },
          },
          audio: true,
        })
        .then((stream) => {
          localVideo.current.srcObject = stream;
          const nico = new nicoJSLib({
            app: document.getElementById("comment-screen"),
            width: 500,
            height: 300,
            font_size: 36,
            speed: 8,
            color: "#FFF",
          });
          setNicoJS(nico);
          nico.listen();
          setLocalStream(stream);
          setIsBroadcasting(true);
        });
    }
  };

  const sendMessage = () => {
    const message = document.getElementById("comment-field").value;
    nicoJS.send({ text: message });
    document.getElementById("comment-field").value = null;
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
          <div id="comment-screen">
            <video
              id="video"
              width="500px"
              height="300px"
              autoPlay
              muted
              ref={localVideo}
            ></video>
          </div>
        </CardContent>
        <CardActions>
          {isBroadcasting ? (
            <div>
              <Button
                onClick={handlePlayButton}
                variant="contained"
                color="secondary"
              >
                <Stop />
                停止
              </Button>
              <TextField id="comment-field" color="primary" label="コメント" />
              <Button onClick={sendMessage} variant="contained" color="primary">
                送信
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={handlePlayButton}
                variant="contained"
                color="primary"
              >
                <PlayArrow />
                再生
              </Button>
            </div>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default Home;
