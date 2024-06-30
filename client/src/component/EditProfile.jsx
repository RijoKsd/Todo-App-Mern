import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const EditProfile = ({ user, onSaveClick }) => {
  const [userInfo, setUserInfo] = useState({
    image: user.image,
    name: user.name,
    email: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo({
          ...userInfo,
          image: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveClick(userInfo);
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">Edit Profile</Card.Title>
              <Form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                  <Card.Img
                    variant="top"
                    src={userInfo.image}
                    className="p-3 rounded-circle mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <Form.Group>
                    <Form.File
                      id="formImage"
                      label="Choose new image"
                      custom
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </Form.Group>
                </div>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    readOnly
                  />
                </Form.Group>
                <Button variant="primary" className="w-100 mt-3" type="submit">
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
