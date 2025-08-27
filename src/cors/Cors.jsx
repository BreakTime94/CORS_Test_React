import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";

export default function Cors(props) {
  const [data, setData] = useState();

  const handleClick = () => {
    axios.get("http://localhost:8080/notes/7")
        .then(res => {

        })
        .catch((e) => {

        })

  }

  return (
      <div>
        <button onClick={handleClick}>CORS확인</button>
        <p>{data}</p>
      </div>
  )

}