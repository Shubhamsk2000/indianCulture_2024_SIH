import '../css/navigation.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';




const Links = [
  { name: "Home", href: "/" },
  { name: "Map", href: "/map" },
  { name: "Translation", href: "/translation" },
  { name: "Calender", href: "/calender" },
];

const NavigationBar = () => {
  const location = useLocation();

  console.log(location.pathname)
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(100);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    if (currentScrollY > 100) {
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);


  return (
    <>
      <nav className={`navbar ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div className='navbar-div'>
          <div className="logo">
            <Link to="/">
            <img 
              style={{
                width: "70px",
               
              }}
            src="/ti.png" alt="" />
            </Link>
          </div>
          <ul className="nav-links">
            {
              Links.map((link, index) => (
                <li key={index}>
                  <NavLink to={link.href}>{link.name}</NavLink>
                </li>
              ))
            }
          </ul>
        </div>

        {/* {
          location.pathname === "/map" ? 
          <div className='search-bar'>
            <input type="text" />
          </div> 
          : null
        } */}
        {/* <ul className="nav-links">
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
          </ul> */}
      </nav>
      {/* <nav className="navbar-half">
          
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
        </nav> */}
    </>
  );
};

export default NavigationBar;
