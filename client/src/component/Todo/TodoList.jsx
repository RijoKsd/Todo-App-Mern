import React from "react";
import { ListGroup } from "react-bootstrap";

const TodoList = ({ todos }) => {
  return (
    <ListGroup className=" p-4 bg-light rounded">
      {/* {todos.map((todo, index) => (
        <ListGroup.Item key={index}>
          <h5>{todo.title}</h5>
          <p>{todo.description}</p>
          <p>
            <strong>Priority:</strong> {todo.priority}
          </p>
        </ListGroup.Item>
      ))} */}

      <ListGroup.Item>
        <h5> title</h5>
        <p>description</p>
        <p>
          <strong>Priority:</strong>priority
        </p>
      </ListGroup.Item>

      <ListGroup.Item>
        <h5> title</h5>
        <p>description</p>
        <p>
          <strong>Priority:</strong>priority
        </p>
      </ListGroup.Item>
      <ListGroup.Item>
        <h5> title</h5>
        <p>description</p>
        <p>
          <strong>Priority:</strong>priority
        </p>
      </ListGroup.Item>
      <ListGroup.Item>
        <h5> title</h5>
        <p>description</p>
        <p>
          <strong>Priority:</strong>priority
        </p>
      </ListGroup.Item>
      <ListGroup.Item>
        <h5> title</h5>
        <p>description</p>
        <p>
          <strong>Priority:</strong>priority
        </p>
      </ListGroup.Item>
      <ListGroup.Item>
        <h5> title</h5>
        <p>description</p>
        <p>
          <strong>Priority:</strong>priority
        </p>
      </ListGroup.Item>
      <ListGroup.Item>
        <h5> title</h5>
        <p>description</p>
        <p>
          <strong>Priority:</strong>priority
        </p>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default TodoList;
