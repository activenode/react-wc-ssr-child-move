import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import parse from "html-react-parser";

import App from "./App";

var ID = function() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

const WCApp = props => {
  const renderId = props.renderId || ID();

  return (
    <x-app data-render-id={renderId} data-rid={props.rid} rid={props.rid}>
      <App wcRenderId={renderId}>{props.children}</App>
    </x-app>
  );
};

const wcappStr = ReactDOMServer.renderToString(
  <WCApp>
    <WCApp>
      <div>Hello I am a simple div kid</div>
    </WCApp>
  </WCApp>
);

const div = document.createElement("div");
div.innerHTML = wcappStr;

document.body.appendChild(div);

customElements.define(
  "x-app",
  class extends HTMLElement {
    connectedCallback() {
      console.log("connectedCallback called for x-app");
      if (!this.innerHTML) {
        return;
      }

      const renderId = this.dataset.renderId;
      const children = this.querySelectorAll(`[data-rid="${renderId}"]`);

      let childrenHtml = "";

      children.forEach(childNode => {
        const clonedNode = childNode.cloneNode(true);
        childrenHtml += clonedNode.outerHTML;
      });

      const childrenInReact = parse(childrenHtml);

      ReactDOM.hydrate(
        <App wcRenderId={renderId}>{childrenInReact}</App>,
        this
      );
    }
  }
);
