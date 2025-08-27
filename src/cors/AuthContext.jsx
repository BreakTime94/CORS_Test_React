import React, {createContext, useContext, useState} from "react";

// 1. context 생성
const AuthContext = createContext();

// 2. Context.Provider 에서 사용하는 변수, 함수 구현
  // 로그인 했을 시 token 저장, 로그아웃시 token 삭제, token 저장 변수
export default function AuthProvider(props) {
  const {children} = props;
  const [token, setToken] = useState(null); // 다른 컴포넌트에서 쓰기 위해 만든 변수

  const login = (newToken) => {
    setToken(newToken);
    // 로컬 스토리지 : 브라우저 꺼도 내용 남아있음.
    // 세션 스토리지 : 브라우저 끄면 내용 사라짐
    localStorage.setItem('token', newToken); // 토큰을 로컬 웹브라우저에 저장
    // 리턴해서 렌더링을 할때 값이 변함!
  }

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // 저장되어있던 토큰 삭제 * 로그인할때 저장한 토큰과 동일이름 사용.
  }

  return(
      <AuthContext.Provider value={{token, login, logout}}>
        {children}
      </AuthContext.Provider>
  )
}
// 3. 하위 컴포넌트에서 쉽게 사용할 수 있도록 커스텀 hook 구현
export const useAuth = () => useContext(AuthContext);

// 사용할때도 이렇게
// <AuthContext.Provider value={{token, login, logout}}
//      <App />
// </ AuthContext.Provider>
