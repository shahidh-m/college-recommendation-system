import React from "react";

function Footer() {
  return (
    <footer id="footer" className="bg-dark text-white py-4">
      <div className="container text-center">
        <p>&copy; 2025 College Guide. All rights reserved.</p>

        {/* Contact Information */}
        <div className="mt-3">
          <p>Contact Us:</p>

          {/* Sample Instagram Icon */}
          <a href="#" className="text-white me-3">
            <i className="bi bi-instagram fs-4"></i> {/* Bootstrap Instagram Icon */}
          </a>

          {/* Sample Email Address */}
          <a href="mailto:sample.email@example.com" className="text-white">
            <i className="bi bi-envelope fs-4 me-2"></i>
            sample.email@example.com
          </a>
        </div>

        {/* Footer Links */}
        <ul className="list-inline mt-3">
          <li className="list-inline-item">
            <a href="#terms" className="text-white">Terms of Service</a>
          </li>
          <li className="list-inline-item">
            <a href="#privacy" className="text-white">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
