import React from "react";
import ReactDOM from "react-dom";
import poem from "./poem";

const CDN = "https://media.merriam-webster.com/audio/prons/en/us/mp3/";

function pronounceWord(text) {
  const word = text.replace(/[^\w\s]/gi, "").toLowerCase();
  const mp3 = `${`${word}00000`.slice(0, 6)}01.mp3`;
  const src = `${CDN}${word[0]}/${mp3}`;
  document.body.appendChild(
    Object.assign(document.createElement("audio"), {
      src,
      autoplay: true,
      style: { display: "none" }
    })
  );
}

function Word(text, i) {
  return (
    <span
      onTouchEnd={() => {
        pronounceWord(text);
      }}
    >
      {text}
    </span>
  );
}

function Para(body, i) {
  const words = body.split(/\s+/);
  return (
    <p key={i}>
      {words.map(Word).reduce((acc, word) => acc.concat(word, [" "]), [])}
    </p>
  );
}

function App() {
  const paras = poem.split(/\n{2,}/);
  return (
    <div style={{ fontFamily: "monospace" }}>
      {paras.map(Para)}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
