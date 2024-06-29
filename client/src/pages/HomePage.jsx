import { Container, Row, Col } from "react-bootstrap";
import AboutContent from "../component/AboutContent";
import RegisterForm from "../component/Auth/RegisterForm";

const HomePage = () => {
  return (
    <div >
      <Container>
        <Row>
          <Col md={6}>
            <AboutContent />
          </Col>
          <Col md={6}>
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
