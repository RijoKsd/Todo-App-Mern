import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TodoForm from "../component/Todo/TodoForm";
import TodoList from "../component/Todo/TodoList";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <Container >
      <Row>
        <Col md={6}>
          <TodoForm addTodo={addTodo} />
        </Col>
        <Col md={6}>
          <TodoList todos={todos} />
        </Col>
      </Row>
    </Container>
  );
};

export default TodoApp;
