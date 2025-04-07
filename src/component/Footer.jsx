import React from "react";
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub, FaHome, FaEnvelope, FaPhone, FaPrint } from "react-icons/fa";
import '../App.css';
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer  bg-dark text-center text-lg-start text-white">
      {/* Social MediLink Section */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <Link to={'#'} className="me-4 text-reset"><FaFacebookF /></Link>
          <Link to={'#'} className="me-4 text-reset"><FaTwitter /></Link>
          <Link to={'#'} className="me-4 text-reset"><FaGoogle /></Link>
          <Link to={'#'} className="me-4 text-reset"><FaInstagram /></Link>
          <Link to={'#'} className="me-4 text-reset"><FaLinkedin /></Link>
          <Link to={'#'} className="me-4 text-reset"><FaGithub /></Link>
        </div>
      </section>

      {/* Links Section */}
      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            {/* Company Info */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Company Name</h6>
              <p>
                Here you can use rows and columns to organize your footer content.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>

            {/* Products */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p><Link href="#" className="text-reset">Angular</Link></p>
              <p><Link href="#" className="text-reset">React</Link></p>
              <p><Link href="#" className="text-reset">Vue</Link></p>
              <p><Link href="#" className="text-reset">Laravel</Link></p>
            </div>

            {/* Useful Links */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
              <p><Link href="#" className="text-reset">Pricing</Link></p>
              <p><Link href="#" className="text-reset">Settings</Link></p>
              <p><Link href="#" className="text-reset">Orders</Link></p>
              <p><Link href="#" className="text-reset">Help</Link></p>
            </div>

            {/* Contact Info */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><FaHome className="me-3" /> New York, NY 10012, US</p>
              <p><FaEnvelope className="me-3" /> info@example.com</p>
              <p><FaPhone className="me-3" /> + 01 234 567 88</p>
              <p><FaPrint className="me-3" /> + 01 234 567 89</p>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Section */}
      <div className="text-center p-4 footer-bottom">
        © 2024 Copyright: <Link className="text-reset fw-bold" href="https://yourwebsite.com/">YourWebsite.com</Link>
      </div>
    </footer>
  );
};

export default Footer;
