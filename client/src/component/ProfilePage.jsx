import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "./Header";
import { StoreContext } from "../context/StoreContext";

const ViewProfile = ({  onEditClick }) => {
  const {currentUser} = useContext(StoreContext)
       
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
                  <Card.Img
                    variant="top"
                    src={currentUser?.image}
                    className="p-3 rounded-circle mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      objectPosition: " top center",
                    }}
                  />
                </div>
                <Card.Title className="text-center mb-2">
                  {currentUser?.name}
                </Card.Title>
                <Card.Text className="text-center text-muted mb-4">
                  {currentUser?.email}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    onClick={onEditClick}
                    className="w-50"
                  >
                    Edit Profile
                  </Button>
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
