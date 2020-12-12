import React, { useState, useEffect } from "react";
import { QuestionWrapper } from "./style";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import Countdown from "react-countdown";

import { Correct, InCorrect } from "./../Result/Result";

function randomLetter() {
  var text = "";
  var possible = "ABCDEFGHIKLMNOPQRSTUVWXY";
  return possible.charAt(Math.floor(Math.random() * possible.length));
}

const Question = () => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [result, setResult] = useState("none");
  const URL = "data/";

  let model, webcam, labelContainer, maxPredictions;

  function mode(array) {
    if (array.length == 0) return null;
    var modeMap = {};
    var maxEl = array[0],
      maxCount = 1;
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    // console.log(maxEl);
    return maxEl;
  }

  function startTimer(duration, display) {
    var timer = duration,
      minutes,
      seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = seconds;

      if (seconds == 0) {
        console.log("TIME UP! JUDGEMENT IS UPON YOU");
        webcam.pause();
        console.log(answer);
        console.log(question);
        setResult(answer == question ? "correct" : "incorrect");
        console.log(answer == question ? "correct" : "incorrect");
      }

      if (--timer < 0) {
        timer = 0;
      }
    }, 1000);
  }

  // Load the image model and setup the webcam
  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    setQuestion(randomLetter);

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
  }

  async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  // run the webcam image through the image model
  async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    // console.log("predict", prediction);

    var ans;
    var max = 0;

    prediction.forEach((element) => {
      //   console.log(element);
      if (element.probability > max) {
        max = element.probability;
        ans = element.className;
      }
    });
    setAnswer(ans);
  }
  return (
    <QuestionWrapper>
      {result === "none" ? (
        <div className="main">
          <button
            type="button"
            className="start-button"
            onClick={(e) => {
              e.target.style.display = "none";
              document.querySelector(".show-later").style.display = "block";
              document.querySelector(".answer").style.display = "block";
              document.querySelector(".dash").style.display = "flex";
              init();
              var fiveMinutes = 10;
              var display = document.querySelector("#time");
              startTimer(fiveMinutes, display);
            }}
          >
            Start
          </button>
          <div className="dash">
            <div className="question show-later">
              Make sign for '{question}'
            </div>
            <div
              style={{ display: "none" }}
              className={`answer ${
                question === answer ? "correct" : "incorrect"
              }`}
            >
              [{answer}]
            </div>
            <div id="webcam-container"></div>
            <div id="time" className="count-down"></div>
          </div>
        </div>
      ) : question == answer ? (
        <Correct />
      ) : (
        <InCorrect question={question} />
      )}
    </QuestionWrapper>
  );
};

export default Question;
