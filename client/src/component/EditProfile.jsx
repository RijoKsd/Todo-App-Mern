 import { useContext } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { StoreContext } from "../context/StoreContext";

const EditProfile = ( ) => {
    const { currentUser } = useContext(StoreContext);

 

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">Edit Profile</Card.Title>
              <Form>
                <div className="text-center mb-4">
                  <Card.Img
                    variant="top"
                    src={currentUser?.image}
                    className="p-3 rounded-circle mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <Form.Group>
                    <Form.Control
                      type="file"
                      name="image"
                      accept="image/*,.dng"
                      className="mb-3"
                    />
                  </Form.Group>
                </div>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                     
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
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
