import { useContext, useState } from "react";
import { ListGroup, Button, Form, Badge } from "react-bootstrap";
import { StoreContext } from "../../context/StoreContext";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

const TodoList = () => {
  const { todos } = useContext(StoreContext);
  const [completedTodos, setCompletedTodos] = useState({});
  const [activeTab, setActiveTab] = useState("pending");

  const handleComplete = (id) => {
    setCompletedTodos((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };



  console.log(completedTodos, "completedTodos");
  return (
    <>
      <div className="text-center">
        <Button
          variant={activeTab === "pending" ? "primary" : "outline-primary"}
          className="mb-4"
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </Button>
        <Button
          variant={activeTab === "completed" ? "success" : "outline-success"}
          className="mb-4 ms-2"
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </Button>
      </div>

      {activeTab === "pending" ? (
        todos && todos.length > 0 ? (
          <ListGroup className=" p-4 bg-light rounded">
            {todos.map((todo) => (
              <ListGroup.Item key={todo._id}>
                <div className="d-flex justify-content-between align-items-start">
                  <h5>{todo.title}</h5>
                  <Badge
                    bg={
                      todo.priority === "low"
                        ? "success"
                        : todo.priority === "medium"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {todo.priority}
                  </Badge>
                </div>
                <p>{todo.description}</p>

                <div className="d-flex justify-content-between align-items-center">
                  <Form.Check
                    type="switch"
                    id={`custom-switch-${todo._id}`}
                    label="Mark as complete"
                    checked={completedTodos[todo._id] || false}
                    disabled={completedTodos[todo._id] || false}
                    onChange={() => handleComplete(todo._id)}
                  />
                  <div className="d-flex gap-3">
                    
                      <FaTrashAlt className="text-danger" title="Delete todo" role="button" />
                   

                    <MdModeEdit className="text-success" title="Update todo" role="button" />
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <h6 className="">
            No todos found. Please add some todos to see them in the list.
          </h6>
        )
      ) : (
        <h2>completed</h2>
      )}
    </>
  );
};

export default TodoList;
