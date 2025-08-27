import React from "react";
import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom"; // 비로그인시 로그인페이지로 보내기위해서 사용
import {decode} from "base-64";
import axios from "axios";


export default function List(props) {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  let email = "";
  let token = "";

  useEffect(() => {
    // 세션 스토리지에 있는 토큰값 가져오기
    console.log("useEffect 수행 하냐? ")
    token = localStorage.getItem("token");

    if(token) {
      const tokenParts = token.split('.');
      const payload = tokenParts[1];
      const decodedPayload = decode(payload)
      const payloadObj = JSON.parse(decodedPayload);

      email = payloadObj.sub;


      if (email === "") {
        navigate("/login"); // 이메일이 없을 때
      }
    }
    else {
      navigate("/login"); // 토큰이 없을 때
    }
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:8080/notes/all?email=${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
        .then(res => {
          console.log(res.data);
          setList(res.data);
        })
        .catch(e => {
          console.log("e : ", e);
        })
  }, []);

  return (
      <div>
        <table>

          <thead>
          <tr>
            <th>글번호</th>
            <th>글제목</th>
            <th>작성자</th>
          </tr>
          </thead>

          <tbody>
          {list.map((list) => (
              <tr onClick={() => {
                navigate(`/read/${list.num}`)
              }} key={list.num}>
                <td>{list.num}</td>
                <td>{list.title}</td>
                <td>{list.writerEmail}</td>
              </tr>
          ))}
          </tbody>

          <tfoot>
          <tr>
            <td colSpan="3">
              <button onClick={() => navigate("/register")}>글작성</button>
            </td>
          </tr>
          </tfoot>

        </table>
      </div>
  );
}