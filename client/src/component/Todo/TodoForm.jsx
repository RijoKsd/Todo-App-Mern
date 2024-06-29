import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const todoSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup.string().required("Priority is required"),

})

const TodoForm = () => {
   const [loading, setLoading] = useState(false);
   const {
     register,
     handleSubmit,
     reset,
     formState: { errors },
   } = useForm({
     resolver: yupResolver(userSchema),
   });
  return (
    <Container className="form-container p-4 bg-white rounded shadow mb-2 mt-5 ">
      <h2 className="mb-4 text-center">Add New Todo</h2>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="todoTitle">
              <Form.Label>Todo Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter todo title"
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="todoDescription">
              <Form.Label>Todo Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter todo description"
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="todoPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Control as="select" name="priority" className="mb-3">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoForm;
