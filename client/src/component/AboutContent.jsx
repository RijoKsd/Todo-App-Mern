 import { Container, Row, Col } from "react-bootstrap";
import "../styles.css";

const AboutContent = () => {
  return (
    <Container className="about-content p-4 bg-light rounded">
      <Row>
        <Col>
          <h2 className="text-primary mb-4">Welcome to My To-Do App</h2>
          <p className="text-secondary">
            Stay organized and manage your tasks efficiently with our To-Do App.
            Whether you&#39;re planning your day, keeping track of your work
            projects, or just jotting down reminders, our app has got you
            covered.
          </p>
          <h4 className="text-dark mb-3">Features:</h4>
          <ul className="list-unstyled text-secondary">
            <li className="mb-2">
              <strong className="text-info">User Authentication:</strong>{" "}
              Securely sign up and log in to manage your tasks.
            </li>
            <li className="mb-2">
              <strong className="text-info">Task Management:</strong> Add, edit,
              and delete tasks as needed.
            </li>
            <li className="mb-2">
              <strong className="text-info">Task Prioritization:</strong> Mark
              tasks as important to stay focused on what matters most.
            </li>
            <li className="mb-2">
              <strong className="text-info">Reminders:</strong> Set reminders
              for your tasks to never miss a deadline.
            </li>
            <li className="mb-2">
              <strong className="text-info">Responsive Design:</strong> Use the
              app on any device, be it your phone, tablet, or desktop.
            </li>
            <li className="mb-2">
              <strong className="text-info">Password Recovery:</strong> Forgot
              your password? No problem. Easily recover it using our secure OTP
              process.
            </li>
          </ul>
          <p className="text-secondary">
            Join now and start managing your tasks more effectively!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutContent;
