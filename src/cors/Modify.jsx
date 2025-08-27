import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {decode} from "base-64";
import axios from "axios";

function Modify(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const {num} = useParams();

  const [noteDTO, setNoteDTO] = useState({
    title : "",
    content : "",
    writerEmail : JSON.parse(decode(token.split('.')[1])).sub,
  });

  useEffect(() => {
    // 세션 스토리지에 있는 토큰값 가져오기
    if(token) {
      console.log(token);
      const tokenParts = token.split('.');
      const payload = tokenParts[1];
      const decodedPayload = decode(payload)
      const payloadObj = JSON.parse(decodedPayload);

      const email = payloadObj.sub;

      console.log(email);

      if (email === "") {
        navigate("/login"); // 이메일이 없을 때
      }
    }
    else {
      navigate("/login"); // 토큰이 없을 때
    }

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

  }, [])


  //Writer Email을 한 번 설정하는 것(토큰에서 가져오기)

  const handleChange = (e) => {

    const {name, value} = e.target;
    setNoteDTO((prev) => ({
      ...prev, [name] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!noteDTO.title || !noteDTO.content) {return}

    axios.post(`http://localhost:8080/notes/`, noteDTO ,{
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
        .then(res => {
          console.log(res.data);
          setNoteDTO(res.data);
          navigate("/list")
        })
        .catch(e => {
          console.log("e : ", e);
        })
  };

  return(
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={handleChange} placeholder="제목 입력" value={noteDTO.title}></input>
        <p></p>
        <textarea name="content" onChange={handleChange} placeholder="내용 입력" value={noteDTO.content}></textarea>
        <p></p>
        <button type="submit">등록</button>
      </form>
  );
}
export default Modify;