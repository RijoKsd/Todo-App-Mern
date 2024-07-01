import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import useAxiosInstances from "../../hooks/useAxiosInstances.js"

const todoSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup.string().required("Priority is required"),
});

const TodoForm = ({ setUpdateId, updateId }) => {

  const { authenticatedAxios } = useAxiosInstances();
  const [loading, setLoading] = useState(false);
  const { getAllTodos } = useContext(StoreContext);

  const isEditable = updateId && Boolean(updateId);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(todoSchema),
  });

  const onSave = async (data) => {
    try {
      setLoading(true);

      let response;
      if (isEditable) {
        response = await authenticatedAxios.put(`/api/todo/update/${updateId}`, data)
        setUpdateId(null);
      } else {
        response = await authenticatedAxios.post("/api/todo/add", data)
      }
      toast.success(response.data?.message);

      getAllTodos();
      setLoading(false);

      reset();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response?.data?.message);
    }
  };

  // get todo by id
  const getTodoById = async (id) => {
    try {
      const response = await authenticatedAxios.get(`/api/todo/get/${id}`);
      let getByIdData = response.data;
      // use hook setvalue
      Object.keys(getByIdData).forEach((key) => {
        setValue(key, getByIdData[key]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (updateId) {
      getTodoById(updateId);
    }
  }, [updateId]);

  return (
    <Container className="form-container p-4 bg-white rounded shadow mb-2 mt-5 ">
      <h2 className="mb-4 text-center">
        {isEditable ? "Update New Todo" : "Add New Todo"}
      </h2>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(onSave)}>
            <Form.Group controlId="todoTitle">
              <Form.Label>Todo Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter todo title"
                className="mb-1"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </Form.Group>

            <Form.Group controlId="todoDescription" className="mt-2">
              <Form.Label>Todo Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter todo description"
                className="mb-1"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-danger">
                  {errors.description.message}
                </span>
              )}
            </Form.Group>

            <Form.Group controlId="todoPriority" className="mt-2">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                defaultValue="low"
                className="mb-3"
                {...register("priority")}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : isEditable ? (
                "Update Todo"
              ) : (
                "Add Todo"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoForm;
