import React, { useState } from "react";
import ReactDOM from "react-dom";

function DataList(props) {
  return (
    <div>
      <h2>code goes here</h2>
      <ul>
        props.map(val =>
        <li>
          <span>{val.name}</span>
          <span>{val.age}</span>{" "}
        </li>
        )
      </ul>
    </div>
  );
}
