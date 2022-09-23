import React, { useRef, useState } from "react";
import Router from "next/router";
import styled from "styled-components";
import authService from "../services/auth.service";
import { useDispatch } from "react-redux";
import { storeUser } from "../redux/reducers/user-slice";

const LoginFormContainer = styled.div`
  margin: 1em;
  form {
    display: flex;
    flex-direction: column;
    label {
      margin-top: 0.5em;
      display: flex;
      justify-content: space-between;
      input {
        width: 17em;
      }
    }
    button {
      width: fit-content;
      margin: 0.7em auto;
    }
  }
`;

const Login = () => {
  const { login } = authService;

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      setError("");
      setLoading(true);
      await login(credentials);
      if (typeof window !== "undefined") {
        dispatch(storeUser(JSON.parse(window.localStorage.getItem("user"))));
        Router.push('/');
      }
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <LoginFormContainer>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username: 
          <input type="text" ref={emailRef} />
        </label>

        <label>Password:
          <input type="password" ref={passwordRef} />
        </label>

        <button type="submit">Log In</button>
      </form>
    </LoginFormContainer>
  );
};

export default Login;
