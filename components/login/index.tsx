import React from "react";
import Input from "../../shared/commonComponent/input";

const Login = () => {
  return (
    <div className="login">
      <div className="login-inner__wrapper">
        <h3>로그인</h3>
        <Input label="아이디" />
        <Input label="비밀번호" />
      </div>

      <style jsx>{``}</style>
    </div>
  );
};

export default Login;
