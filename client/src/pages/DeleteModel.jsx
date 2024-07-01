 import { Modal, Button } from "react-bootstrap";

const DeleteTodoModal = ({ show, handleClose, handleDelete, todo }) => {
   return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete To-Do</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the to-do item{" "}
        <strong>{todo.title}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => handleDelete(todo._id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTodoModal;
