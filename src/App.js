import React, { useState, useEffect } from "react";
import AudioAnalyser from "./AudioAnalyser";
import hark from "hark";
import { useStopwatch } from "./Timer";

const App = () => {
  const [audio, setAudio] = useState(null);
  const [color, setColor] = useState("white");

  const {
    isRunning,
    elapsedTime,
    noiseTime,
    startNoiseTimer,
    stopNoiseTimer,
    startTimer,
    stopTimer,
    resetTimer,
  } = useStopwatch();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then((audioStream) => {
        setAudio(audioStream);
        const sound = hark(audioStream);
        sound.setInterval(10);
        sound.on("speaking", function () {
          setColor("red");
          startNoiseTimer();
        });

        sound.on("stopped_speaking", function () {
          setColor("white");
          stopNoiseTimer();
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleStartStop = () => {
    isRunning ? stopTimer() : startTimer();
  };

  return (
    <div className="App">
      {/* container card*/}
      <div className="container">
        <h1 className="header">Noise Timer</h1>
        <div className="audio-visualizer">
          {audio ? <AudioAnalyser audio={audio} color={color} /> : <h1>Microphone Not Available</h1>}
        </div>
        <div className="timeContainer">
          <div className="overAllTimeContainer">
            <h3>Overall Time (s):</h3>
            <h2>{elapsedTime}</h2>
          </div>
          <div className="noiseTimeContainer">
            <h3>Noise Time (s):</h3>
            <h2>{noiseTime}</h2>
          </div>
        </div>
        <div className="controls">
          <button onClick={handleStartStop}>{isRunning ? "Stop" : "Start"}</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default App;
