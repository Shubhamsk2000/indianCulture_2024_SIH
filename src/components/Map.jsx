import { useState, useEffect } from 'react';
import SvgComponent from './SvgComponent'
import siteinfo from "../assets/sitesinfo.json"
import { Link } from 'react-router-dom';
import '../css/map.css'
import Transition from '../Transition';
import { motion } from 'framer-motion';




function Map() {
  

  const [selectedState, setSelectedState] = useState(null);
  const [transformCoor, setTransformCoor] = useState({ scale: 1, translateX: 0, translateY: 0 });
  const [culturalSites, setCulturalSites] = useState([]);

  useEffect(() => {
    const stateSites = siteinfo.states.find((state) => state.name === selectedState);
    if (stateSites) {
      setCulturalSites(stateSites.cultural_sites);
    } else {
      setCulturalSites([]);
    }
  }, [selectedState])

  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <Transition>
      <div className='map-container'>
        {
          selectedState && (
            <>
              <div className="sites-container">

                <div className="site-list">
                  <h1>Cultural Sites in <br />{selectedState}</h1>
                  <ul>
                    {
                      culturalSites.map((site, index) => (
                        <Link key={site.name} to={`/cultural-site/${site.name}`}>
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            custom={index}
                            variants={listVariants}
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
                            className="site">
                            <div
                              style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: "10px" }}
                            >

                              <img
                                src={site.image}
                                alt={site.name}
                                style={{ width: '150px', height: '100px', marginRight: '20px', borderRadius: '8px', objectFit: 'cover', }}
                              />
                              <h2>{site.name}</h2>
                            </div>
                            <p>Location :<b> {site.location} </b></p>
                            <p>{site.description}</p>

                          </motion.div>
                        </Link>
                      ))
                    }
                  </ul>
                </div>

              </div>
              <div className="close-btn">
                <button
                  onClick={() => {
                    setSelectedState(null);
                    setTransformCoor({ scale: 1, translateX: 0, translateY: 0 });
                  }}
                >
                  <span className="material-symbols-outlined">
                    close
                  </span>
                </button>
              </div>
            </>
          )
        }
        <SvgComponent selectedState={selectedState} setSelectedState={setSelectedState} transformCoor={transformCoor} setTransformCoor={setTransformCoor} />
      </div>
      
    </Transition>
  )
}

export default Map;
