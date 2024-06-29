 import { Container, Row, Col } from "react-bootstrap";
import TodoForm from "../component/Todo/TodoForm";
import TodoList from "../component/Todo/TodoList";
import Header from "../component/Header";

const TodoApp = () => {
  

  return (
    <>
    <Header />
      <Container>
        <Row>
          <Col md={6}>
            <TodoForm  />
          </Col>
          <Col md={6}>
            <TodoList   />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TodoApp;
