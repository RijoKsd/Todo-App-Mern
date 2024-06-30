import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const todoSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup.string().required("Priority is required"),

})

const TodoForm = () => {
   const [loading, setLoading] = useState(false);
   const { token, getAllTodos } = useContext(StoreContext);
   const {
     register,
     handleSubmit,
     reset,
     formState: { errors },
   } = useForm({
     resolver: yupResolver(todoSchema),
   });

   const onSave = async(data)=>{
    try{
    setLoading(true)
        const response = await axios.post("http://localhost:5000/api/todo/add",data,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
     toast.success(response.data.message)
    getAllTodos();
    setLoading(false)
    reset()
    }catch(err){
      console.log(err)
      setLoading(false)
      toast.error(err.response?.data?.message)
    }
 


    
   }
  return (
    <Container className="form-container p-4 bg-white rounded shadow mb-2 mt-5 ">
      <h2 className="mb-4 text-center">Add New Todo</h2>
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
