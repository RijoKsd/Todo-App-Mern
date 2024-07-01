 
import { Container, Row, Col, Button } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";

const NotFoundPage = () => {
 const navigate = useNavigate()

  const handleGoBack = () => {
     navigate(-1);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="text-center">
        <Col>
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="mb-4">The page you are looking for does not exist.</p>
          <Button onClick={handleGoBack} variant="primary">
            Go Back 
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
