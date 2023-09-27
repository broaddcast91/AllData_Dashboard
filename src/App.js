import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
// import Dashboard from './scenes/dashboard';
import Popup from './scenes/popup';
import Corporates from './scenes/Corporates';
// import Team from "./scenes/team";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import OnRoadPrice from './scenes/onroadprice';
import Finance from './scenes/finance';
import Insurance from './scenes/insurance';
import BookAService from './scenes/bookaservice';
import DrvingSchool from './scenes/DrvingSchool/DrvingSchool';
import { Login } from '@mui/icons-material';
import Logout from './components/Logout/Logout';
import AllData from './scenes/AllData';

// import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <Sidebar isSidebar={isSidebar} />
          <main className='content'>
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path='/' element={<Popup />} />
              {/* <Route path="/team" element={<Team />} /> */}
              {/* <Route path='/login' element={<Login />} /> */}
              <Route path='/popup' element={<Popup />} />
              <Route path='/onroadprice' element={<OnRoadPrice />} />
              <Route path='/corporates' element={<Corporates />} />
              <Route path='/finance' element={<Finance />} />
              <Route path='/insurance' element={<Insurance />} />
              <Route path='/alldata' element={<AllData />} />
              <Route path='/bookaservice' element={<BookAService />} />
              <Route path='/drvingschool' element={<DrvingSchool />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;