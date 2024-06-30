import { useContext, useState } from "react";
import { ListGroup, Button, Form, Badge } from "react-bootstrap";
import { StoreContext } from "../../context/StoreContext";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import DeleteTodoModal from "../../pages/DeleteModel";
import { toast } from "react-toastify";

const TodoList = ({ updateTodo }) => {
  const { completedTodos, getAllTodos, pendingTodos, token } =
    useContext(StoreContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [completedStatus, setCompletedStatus] = useState({});
  const [activeTab, setActiveTab] = useState("pending");

  const handleComplete = async (id) => {
    setCompletedStatus((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    try {
      await axios.put(
        `http://localhost:5000/api/todo/update/${id}`,
        {
          completed: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Completed task")
      getAllTodos();
    } catch (err) {
      console.log(err);
    }
  };
  const handleShowModal = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setShowModal(false);
  };

  const handleConfirmDelete = (todoId) => {
    deleteTodo(todoId);
    handleCloseModal();
  };

  // delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/todo/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      getAllTodos();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };
  // update todo

  

  return (
    <>
      <div className="text-center">
        <Button
          variant={activeTab === "pending" ? "primary" : "outline-primary"}
          className="mb-4"
          onClick={() => {
            setActiveTab("pending");
            getAllTodos();
          }}
        >
          Pending
        </Button>
        <Button
          variant={activeTab === "completed" ? "success" : "outline-success"}
          className="mb-4 ms-2"
          onClick={() => {
            setActiveTab("completed");
            getAllTodos();
          }}
        >
          Completed
        </Button>
      </div>

      {activeTab === "pending" ? (
        pendingTodos && pendingTodos.length > 0 ? (
          <ListGroup className=" p-4 bg-light rounded">
            {pendingTodos.map((todo) => (
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
                    checked={completedStatus[todo._id] || false}
                    disabled={completedStatus[todo._id] || false}
                    onChange={() => handleComplete(todo._id)}
                  />
                  <div className="d-flex gap-3">
                    <FaTrashAlt
                      className="text-danger"
                      title="Delete todo"
                      role="button"
                      onClick={() => handleShowModal(todo)}
                    />

                    <MdModeEdit
                      className="text-success"
                      title="Update todo"
                      role="button"
                      onClick={() => updateTodo(todo._id)}
                    />
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <h6 className="">
            No todo found. Please add some todo to see them in the list.
          </h6>
        )
      ) : completedTodos && completedTodos.length > 0 ? (
        <ListGroup className=" p-4 bg-light rounded">
          {completedTodos.map((completedTodo) => (
            <ListGroup.Item key={completedTodo._id}>
              <div className="d-flex justify-content-between align-items-start">
                <h5>{completedTodo.title}</h5>
                <Badge
                  bg={
                    completedTodo.priority === "low"
                      ? "success"
                      : completedTodo.priority === "medium"
                      ? "warning"
                      : "danger"
                  }
                >
                  {completedTodo.priority}
                </Badge>
              </div>
              <p>{completedTodo.description}</p>

              <div className="d-flex justify-content-between align-items-center">
                <p
                  className="text-muted"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {new Date(completedTodo.completedAt).toDateString() +
                    " " +
                    new Date(completedTodo.completedAt).toLocaleTimeString()}
                </p>
                <div className="d-flex gap-3">
                  <FaTrashAlt
                    className="text-danger"
                    title="Delete todo"
                    role="button"
                    onClick={() => handleShowModal(completedTodo)}
                  />
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <h6 className="">
          No completed todo found. Please complete some todo to see them in the
          list.
        </h6>
      )}
      {showModal && (
        <DeleteTodoModal
          show={showModal}
          handleClose={handleCloseModal}
          handleDelete={handleConfirmDelete}
          todo={selectedTodo}
        />
      )}
    </>
  );
};

export default TodoList;
