import Nav from 'react-bootstrap/Nav';
import logoImg from '../School_Portal.png';
import '../nav.css';
import { useEffect } from 'react';

function Navbar() {
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
    <nav className="nav">
      <a
        href="/products/"
        style={{
          width: '230px',
          height: '50px',
          marginTop: '15px',
          marginRight: '55px',
        }}
      >
        <img src={logoImg} alt="" style={{ width: '95%', height: '70%' }} />
      </a>
      <a href="/" className="nav-link">
        Classes
      </a>
      <a href="/createTeacher" className="nav-link">
        Teachers
      </a>
    </nav>
  );
}

export default Navbar;
