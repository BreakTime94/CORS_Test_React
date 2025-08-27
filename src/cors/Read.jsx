import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";


export default function Read(props) {
  const [noteDTO, setNoteDTO] = useState({
    num : "",
    title : "",
    content : "",
  });
  const {num} = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // token이란 이름으로 저장된 녀석 가져오기
  console.log(num);
  useEffect(() => {

    axios.get(`http://localhost:8080/notes/${num}`, {
      headers : {
        'Authorization' : `Bearer ${token}`,
      }
    })
        .then(res => {
          console.log(res.data);
          setNoteDTO(res.data);
        })
        .catch(e => {
          console.log(e);
        })
  }, []);

  return (
    <div>
      <p>num: {noteDTO.num}</p>
      <p>title: {noteDTO.title}</p>
      <p>content: {noteDTO.content}</p>
      <button onClick={() => {
        navigate(`/modify/${noteDTO.num}`)
      }}>글 수정</button>
      <button onClick={() => {
        if(!window.confirm("진짜 삭제할거냐능?")) return;
        axios.delete(`http://localhost:8080/notes/${noteDTO.num}`, {
          headers: {
            'Authorization' : `Bearer ${token}`,
          }
        }).then((resp) => {
          console.log(resp.data)
          navigate("/list")
        }).catch((e) => {
          console.log("error : ", e);
        })
      }}>글 삭제</button>
    </div>
  );
}
