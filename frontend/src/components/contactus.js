import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Container } from "react-bootstrap";
import Header from "../components/Header";

export const ContactUs = () => {
  const form = useRef();

  return (
    <Container>
      <Header />
      <form ref={form}>
        <label>Name</label>
        <input type="text" name="from_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </Container>
  );
};
