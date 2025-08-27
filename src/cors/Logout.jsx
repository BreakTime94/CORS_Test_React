import React from "react";
import {useAuth} from "./AuthContext";
import {useNavigate} from "react-router-dom";

export default function Logout(){
  const {logout} = useAuth();
  const navigate = useNavigate();
  return (
      <div>
        <button onClick={() => {
          logout();
          navigate("/")
        }}>로그아웃</button>
      </div>
  );
}