import { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { StoreContext } from "../../context/StoreContext";

const TodoList = () => {
  const { todos } = useContext(StoreContext);
  return todos.length > 0 ? (
    <ListGroup className=" p-4 bg-light rounded">
      {todos.map((todo, index) => (
        <ListGroup.Item key={index}>
          <h5>{todo.title}</h5>
          <p>{todo.description}</p>
          <p>
            <strong>Priority:</strong> {todo.priority}
          </p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  ) : (
    <h4 className="text-center my-auto">No todos available</h4>
  );
};

export default TodoList;
