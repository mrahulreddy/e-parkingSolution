import { Button, Container, Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

import SucessMessage from "./SucessMessage";

import Loading from "./loading";
import ErrorMessage from "./ErrorMessage";
const Signup = ({ history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);

  const form = useRef();

  const signUpSubmitHandler = async (e) => {
    e.preventDefault();

    setError(false);
    setSucess(false);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);

      const { data } = await axios.post(
        "/api/users/",
        { name, email, password },
        config
      );
      console.log(data);

      setLoading(false);
      setSucess(name + " you are Sucessfully Signup ....Please login!!!");
      emailjs
        .sendForm(
          "service_r1b9r68",
          "template_8btovxs",
          form.current,
          "rm0b1LaHrEM0ma_XW"
        )
        .then(
          (result) => {
            console.log("mail sucess");
          },
          (error) => {
            console.log("mail fail");
          }
        );
    } catch (error) {
      setSucess(false);
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div classnName="outside"></div>
      <Container>
        <div className="form-container sign-up-container">
          {loading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {sucess && <SucessMessage message={sucess} />}
          <Form ref={form} onSubmit={signUpSubmitHandler}>
            <h1>Create Account</h1>
            <Form.Control
              type="name"
              name="user_name"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />

            <Form.Control
              type="email"
              name="user_email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Sign Up</Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Signup;
