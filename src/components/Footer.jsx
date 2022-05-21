import './scss/Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <img className="footer__logo" src="/images/logo/quick-call-logo--mobile--colored.svg" alt="Quick Call logo" />
      <div className="footer__container">
        <div className="footer__contact">
          <h2 className="footer--title">Información de Contacto</h2>
          <div className="contact__body">
            <p className="footer--body">(123) 123 1234</p>
            <p className="footer--body">email@email.com</p>
          </div>
        </div>
        <div className="footer__hq">
          <h2 className="footer--title">Quick Call HQ</h2>
          <div className="hq__body">
            <p className="footer--body">Address</p>
            <p className="footer--body">City</p>
          </div>
        </div>
      </div>
      <div className="footer__copyright">
        <p className="footer--body">Siguenos en nuestras redes sociales</p>
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
          <div className="copyright__social-content">
            Francisco Huertas
            <div className="social-content__icon">
              <a href="https://github.com/franciscocruz29" target="_blank" rel="noopener noreferrer">
                <img src="/images/icons/github-icon-white.svg" alt="Facebook" />
              </a>
              <a href="https://www.linkedin.com/in/francisco-huertas-cruz/" target="_blank" rel="noopener noreferrer">
                <img src="/images/icons/linkedIn-logo-white.svg" alt="Facebook" />
              </a>
              <a href="mailto:franciscohuertas25@gmail.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/icons/email-logo-white.svg" alt="Facebook" />
              </a>
            </div>
          </div>
          <div className="copyright__social-content">
            Luis Salcedo Salas
            <div className="social-content__icon">
              <a href="https://github.com/Luis-S-S" target="_blank" rel="noopener noreferrer">
                <img src="/images/icons/github-icon-white.svg" alt="Facebook" />
              </a>
              <a href="https://www.linkedin.com/in/luis-salcedo-salas/" target="_blank" rel="noopener noreferrer">
                <img src="/images/icons/linkedIn-logo-white.svg" alt="Facebook" />
              </a>
              <a href="mailto:rideluis@hotmail.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/icons/email-logo-white.svg" alt="Facebook" />
              </a>
            </div>
          </div>
        </div>
        <h2 className="footer--title">&copy; Quick Call. 2022</h2>
      </div>
    </div>
  );
}

export default Footer;