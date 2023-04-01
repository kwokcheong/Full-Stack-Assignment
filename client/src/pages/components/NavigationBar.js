import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logoImg from '../../School_Portal.png';
import '../../nav.css';
import { useEffect, useState } from 'react';

function NavigationBar() {
  // set default classes
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    // Set active link based on URL path on page load
    const path = window.location.pathname;
    setActiveLink(path);
  }, []);

  return (
    <Navbar className="nav" fixed="top">
      <Container>
        <a
          href="/"
          style={{
            width: '230px',
            height: '50px',
            marginTop: '7px',
            marginRight: '80px',
          }}
        >
          <img src={logoImg} alt="" style={{ width: '95%', height: '70%' }} />
        </a>
        <Nav className="me-auto">
          <Nav.Link
            className={`nav-link ${
              activeLink === '/viewClass' ? 'current' : ''
            }`}
            href="/viewClass"
          >
            Classes
          </Nav.Link>
          <Nav.Link
            className={`nav-link ${
              activeLink === '/viewTeacher' ? 'current' : ''
            }`}
            href="/viewTeacher"
          >
            Teachers
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
