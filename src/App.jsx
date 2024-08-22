import Home, { NavigationBar, Map, Site } from './components/index';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function App() {
  const location = useLocation();
  const [mode, setMode] = useState("full-width");
  
  useEffect(()=>{
    if(location.pathname !== '/'){
      setMode("half-width");
    }else{
      setMode("full-width");
    }

  },[location.pathname])
  return (
    <div>
      <NavigationBar mode={mode}/>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' exact element={<Home />} />
          <Route path='/map' element={<Map />} />
          <Route path='/cultural-site/:id'  element={<Site />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
