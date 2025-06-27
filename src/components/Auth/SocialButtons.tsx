import { FaGoogle, FaTwitter, FaDiscord } from 'react-icons/fa';

export const SocialButtons = () => {
  return (
    <>
      <div className="divider"></div>
      <p className="text-center mb-3">O inicia sesión con:</p>
      <button type="button" className="social-btn">
        <FaGoogle className="me-2" /> Google
      </button>
      <button type="button" className="social-btn">
        <FaTwitter className="me-2" /> Twitter
      </button>
      <button type="button" className="social-btn">
        <FaDiscord className="me-2" /> Discord
      </button>
    </>
  );
};