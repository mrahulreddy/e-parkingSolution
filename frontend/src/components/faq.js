import React, { useEffect, useState } from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import Accordians from "./accordians";
import Header from "./Header";

const Faq = () => {
  const [faq, setFaq] = useState([]);
  useEffect(() => {
    const answers = [
      { question: "question1", answer: "answer1" },
      { question: "question2", answer: "answer2" },
      { question: "question3", answer: "answer3" },
      { question: "question4", answer: "answer4" },
      { question: "question5", answer: "answer5" },
      { question: "question6", answer: "answer6" },
    ];
    setFaq(answers);
  }, []);
  return (
    <div>
      <Header />

      <Container>
        <center>
          <h1>Frequently Asked Questions</h1>
        </center>
        <Accordians data={faq} />
      </Container>
    </div>
  );
};

export default Faq;
