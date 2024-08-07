import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
// import Popup from './scenes/popup';
// import Corporates from './scenes/Corporates';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
// import OnRoadPrice from './scenes/onroadprice';
// import Finance from './scenes/finance';
// import Insurance from './scenes/insurance';
// import BookAService from './scenes/bookaservice';
// import DrvingSchool from './scenes/DrvingSchool/DrvingSchool';
import Logout from './components/Logout/Logout';
import ArenaAllData from './scenes/AllData';
import Login from './components/Login/Login';
import SabooGroups from './scenes/SabooGroups'
import NexaAllData from './scenes/nexa';
import AutoZone from './scenes/AutoZone';
// import Service from './scenes/Service';
// import Dashboard from "./scenes/Dashboard/Dashboard";
import Commercial from './scenes/Commercial/Commercial';
import Dashboard2 from './scenes/Dashboard2/Dashboard2';
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const [dataRefreshCounter, setDataRefreshCounter] = useState(0); // Add this state variable

  // Check if the current location is the login page or the root path
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  const refreshData = () => {
    // You can implement your data refresh logic here
    // You might want to fetch new data or update state as needed
    // Increment the dataRefreshCounter to trigger a re-render
    setDataRefreshCounter(dataRefreshCounter + 1);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          {/* Conditionally render the Sidebar and pass the refreshData callback */}
          {isLoginPage ? null : (
            <Sidebar isSidebar={isSidebar} refreshData={refreshData} />
          )}
          <main className='content'>
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/dashboard' element={<div style={{ backgroundColor:  '#1d3a8a' ,minHeight: '100vh' }}>
      <Dashboard2 />
    </div>} />
              {/* <Route path='/popup' element={<Popup />} /> */}
              {/* <Route path='/onroadprice' element={<OnRoadPrice />} /> */}
              {/* <Route path='/corporates' element={<Corporates />} /> */}
              {/* <Route path='/finance' element={<Finance />} /> */}
              {/* <Route path='/insurance' element={<Insurance />} /> */}
              <Route path='/alldata' element={<ArenaAllData />} />
              <Route path='/nexadata' element={<NexaAllData />} />
              <Route path='/autozonedata' element={<AutoZone />} />
              {/* <Route path='/service' element={<Service />} /> */}
              {/* <Route path='/bookaservice' element={<BookAService />} /> */}
              {/* <Route path='/drvingschool' element={<DrvingSchool />} /> */}
              <Route path='/saboogroups' element={<SabooGroups />} />
              <Route path='/commercial' element={<Commercial/>} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

