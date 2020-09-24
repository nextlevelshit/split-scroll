import React from "react";
import { render } from "react-dom";
import Canvas from "./canvas/canvas";

const App = () => (
  <>
    <Canvas />
  </>
);

render(<App />, document.getElementById("root"));

