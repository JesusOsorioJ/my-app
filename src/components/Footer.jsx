import './scss/Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__contact">
          <h2 className="footer--title">Información de Contacto</h2>
          <div className="contact__body">
            <p className="footer--body">(123) 123 1234</p>
            <p className="footer--body">email@email.com</p>
          </div>
        </div>
        <div className="footer__hq">
        <h2 className="footer--title">&copy; MI APP 2022</h2>
          <div className="hq__body">
            <p className="footer--body">Address</p>
            <p className="footer--body">City</p>
          </div>
        </div>
      </div>
      <div className="footer__copyright">
        
        <div className="copyright__social-media">
          <div className="copyright__social-content">
            Jesus Osorio
            <div className="social-content__icon">
              <a href="https://github.com/JesusOsorioJ" target="_blank" rel="noopener noreferrer">
                <img src="/images/icons/github-icon-white.svg" alt="Facebook" />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <img src="/images/icons/linkedIn-logo-white.svg" alt="Facebook" />
              </a>
              <a href="mailto:jesdaos@hotmail.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/icons/email-logo-white.svg" alt="Facebook" />
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Footer;