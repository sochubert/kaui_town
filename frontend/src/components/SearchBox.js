import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      className="d-flex flex-row justify-content-around"
    >
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="搜索产品"
      ></Form.Control>
<<<<<<< HEAD
      <Button type="submit" className="p-3">
        <i class="fa-solid fa-magnifying-glass"></i>
=======
      <Button type="submit" variant="primary" className="p-2">
        查询
>>>>>>> 4c5d266 (Chinese)
      </Button>
    </Form>
  );
};

export default SearchBox;
