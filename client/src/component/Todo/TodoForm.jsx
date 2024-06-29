import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const TodoForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to backend or store in state
    console.log(formData);
    // Reset form fields
    setFormData({
      title: "",
      description: "",
      priority: "medium",
    });
  };

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
                value={formData.title}
                onChange={handleInputChange}
                required // Example of adding HTML attributes directly
                className="mb-3" // Bootstrap class for margin bottom
              />
            </Form.Group>

            <Form.Group controlId="todoDescription">
              <Form.Label>Todo Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter todo description"
                value={formData.description}
                onChange={handleInputChange}
                className="mb-3" // Bootstrap class for margin bottom
              />
            </Form.Group>

            <Form.Group controlId="todoPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="mb-3" // Bootstrap class for margin bottom
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" block className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoForm;
