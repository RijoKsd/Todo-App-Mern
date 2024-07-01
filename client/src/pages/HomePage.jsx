import { Container, Row, Col } from "react-bootstrap";
import AboutContent from "../component/AboutContent";
import RegisterForm from "../component/Auth/RegisterForm";
import LoginPage from "../component/Auth/LoginForm";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div >
      <Container>
        <Row>
          <Col md={6}>
            <AboutContent />
          </Col>
          <Col md={6}>
           <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
