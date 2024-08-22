import '../css/navigation.css';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from './index';
import { motion, AnimatePresence } from 'framer-motion';

const variant = {
  open: {
    width: 440,
    height: 500,
    top: "-10px",
    right: "-10px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0",
    right: "0",
    transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
  },
};

const navlink_animation = {
  initial: {
    opacity: 0,
    rotateX: 90,
  },
  enter: (index) => ({
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: 0.5 + index * 0.1,
    },
  }),
  exit: {
    opacity: 0,
  },
};

const Links = [
  { name: "Home", href: "/" },
  { name: "Map", href: "/map" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const NavigationBar = ({ mode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset isOpen state whenever the route changes
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {mode === "full-width" ? (
        <nav className="navbar">
          <div className="logo">
            <h1>MyLogo</h1>
          </div>
          <ul className="nav-links">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/map">Map</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navbar-half">
          {/* <div className="logo navbar-half-left">
            <h1>MyLogo</h1>
          </div> */}
          <div className="navbar-half-right">
            <motion.div
              className="menu"
              variants={variant}
              animate={isOpen ? "open" : "closed"}
              initial="closed"
            >
              <AnimatePresence>
                <div className="nav-link-container">
                  {isOpen &&
                    Links.map((link, index) => (
                      <motion.div
                        className="nav-half-link"
                        variants={navlink_animation}
                        key={index}
                        animate="enter"
                        exit="exit"
                        initial="initial"
                        custom={index}
                      >
                        <Link to={link.href}>{link.name}</Link>
                      </motion.div>
                    ))}
                </div>
              </AnimatePresence>
            </motion.div>
            <Button
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        </nav>
      )}
    </>
  );
};

export default NavigationBar;
