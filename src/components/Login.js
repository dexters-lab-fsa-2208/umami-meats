import React, { useRef, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import styled from "styled-components";
import authService from "../services/auth.service";
import { useDispatch } from "react-redux";
import { storeUser } from "../redux/reducers/user-slice";
import { clearCart } from "../redux/reducers/cart-slice";
import { motion } from "framer-motion";

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
  p {
    margin: auto;
    text-align: center;
    font-style: italic;
    a {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const { login } = authService;

  const emailRef = useRef();
  const passwordRef = useRef();
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      // setError("");
      // setLoading(true);
      await login(credentials);
      if (typeof window !== "undefined") {
        let user = JSON.parse(window.localStorage.getItem("user"));
        console.log(user);
        let userData = {
          id: user.id,
          email: user.email,
          name: user.firstName + " " + user.lastName,
          admin: user.isAdmin,
        };
        dispatch(storeUser(userData));
        //work on posting to users cart on sign in later
        dispatch(clearCart());
        Router.push("/");
      }
    } catch (err) {
      console.log("Failed to sign in");
      console.error(err);
      // setError("Failed to sign in");
    }
    // setLoading(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoginFormContainer>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" ref={emailRef} />
          </label>

          <label>
            Password:
            <input type="password" ref={passwordRef} />
          </label>

          <button type="submit">Log In</button>
        </form>
        <p>
          Need an account? <Link href="/signup">Register here</Link>
        </p>
      </LoginFormContainer>
    </motion.div>
  );
};

export default Login;
