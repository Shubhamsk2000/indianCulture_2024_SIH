import Home, { NavigationBar, Map, Site, Translation, StateHistory } from './components/index';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Calender from './components/Calender';
import CulturalSites from './components/CulturalSites'; 
export default function App() {
  const location = useLocation();
  
  return (
    <div>
      <NavigationBar/>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' exact element={<Home />} />
          <Route path='/map' element={<Map />} />
          <Route path = '/cultural-site' element={<CulturalSites/>}/>
          <Route path='/cultural-site/:id'  element={<Site />} />
          <Route path = '/translation' element={<Translation/>}/>
          <Route path = '/calender' element={<Calender/>}/>
          <Route path = '/asd' element={<StateHistory/>}/>
        </Routes>
      </AnimatePresence>
    </div>
  )
}
