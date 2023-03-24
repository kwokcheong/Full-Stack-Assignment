import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logoImg from '../School_Portal.png';
import '../nav.css';
import { useEffect } from 'react';

function NavigationBar() {
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link');

    const handleNavLinkClick = (event) => {
      navLinks.forEach((link) => {
        link.classList.remove('current');
      });
      event.currentTarget.classList.add('current');
    };

    navLinks.forEach((link) => {
      if (link.getAttribute('href') === window.location.pathname) {
        link.classList.add('current');
      }
      link.addEventListener('click', handleNavLinkClick);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener('click', handleNavLinkClick);
      });
    };
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
          <Nav.Link className="nav-link" href="/viewClass">
            Classes
          </Nav.Link>
          <Nav.Link className="nav-link" href="/viewTeacher">
            Teachers
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
