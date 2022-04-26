import { Button, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Loading from "./loading";
import ErrorMessage from "./ErrorMessage";
const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    console.log(userInfo);
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const signInSubmitHandler = async (e) => {
    e.preventDefault();

    setError(false);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);

      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div classnName="outside"></div>
      <Container>
        <div className="form-container sign-in-container">
          {loading && <Loading />}
          {error && <ErrorMessage message={error} />}
          <Form onSubmit={signInSubmitHandler}>
            <h1>Sign in</h1>
            <Form.Control
              type="email"
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
            <a href="/">Forgot your password?</a>
            <Button type="submit">Sign In</Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Login;
