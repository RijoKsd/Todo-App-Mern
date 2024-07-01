import { useContext, useState, useRef } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import Header from "./Header";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const ViewProfile = () => {
  const { currentUser, token, getAllTodos } = useContext(StoreContext);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [image, setImage] = useState(currentUser?.image || "");
  const [imageFile,setImageFile] = useState(null)
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  

  const onEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
   setImageFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

 

  const handleSave =async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name",name);
    if(imageFile){
      formData.append("image", imageFile);
    }
    try{
      const response = await axios.put(
        `http://localhost:5000/api/auth/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if(response.data?.success){
        getAllTodos();
        setIsEdit(false)
        setLoading(false);
      }
    }catch(err){
      console.log(err.message)
      setLoading(false)
    }
      
  };

  return (
    <>
      <Header />
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="shadow-lg p-3 mb-5 bg-white rounded">
              <Card.Body>
                <Card.Title className="text-center mb-4">
                  User Details
                </Card.Title>
                <div className="text-center mb-4">
                  {isEdit ? (
                    <div>
                      <label htmlFor="image">
                        <img
                          src={image || currentUser.image}
                          alt="Profile"
                          className="p-3 rounded-circle mx-auto d-block"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            objectPosition: "top center",
                            cursor: "pointer",
                          }}
                        />
                      </label>
                      <input
                        onChange={handleImageChange}
                        type="file"
                        id="image"
                        hidden
                        required
                        name="image"
                        ref={fileInputRef}
                        accept="image/*,.dng"
                      />
                    </div>
                  ) : (
                    <Card.Img
                      variant="top"
                      src={currentUser?.image}
                      className="p-3 rounded-circle mx-auto d-block"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        objectPosition: "top center",
                      }}
                    />
                  )}
                </div>
                <Card.Title className="text-center mb-2">
                  {isEdit ? (
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Name"
                    />
                  ) : (
                    currentUser?.name
                  )}
                </Card.Title>
                <Card.Text className="text-center text-muted mb-4">
                  {currentUser?.email}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  {isEdit ? (
                    <Button
                      onClick={() => handleSave()}
                      className="btn btn-success w-50"
                      disabled={loading}
                    >
                      {
                        loading ?  <Spinner animation="border" variant="light" /> : "Save"
                      }
                    </Button>
                  ) : (
                    <Button
                      onClick={onEditClick}
                      className="btn btn-primary w-50"
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ViewProfile;
