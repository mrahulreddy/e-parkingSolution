import React, { useEffect } from "react";
import axios from "axios";

const MyData = () => {
  const fetchData = async () => {
    const { data } = await axios.get("/mydata");
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>MyData</div>;
};

export default MyData;
