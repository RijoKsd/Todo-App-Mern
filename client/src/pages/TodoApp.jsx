import { Container, Row, Col } from "react-bootstrap";
import TodoForm from "../component/Todo/TodoForm";
import TodoList from "../component/Todo/TodoList";
import Header from "../component/Header";
import { useState } from "react";

const TodoApp = () => {
  const [updateId, setUpdateId] = useState(null);
  const updateTodo = (id) => {
    setUpdateId(id);
     
  };
  return (
    <>
      <Header />
      <Container>
        <Row className="d-flex flex-column-reverse flex-md-row">
          <Col md={6}>
            <TodoForm 
            updateId={updateId}
            setUpdateId={setUpdateId}
            />
          </Col>
          <Col md={6}>
            <TodoList updateTodo={updateTodo} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TodoApp;
