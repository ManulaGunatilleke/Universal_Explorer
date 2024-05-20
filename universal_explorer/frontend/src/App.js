import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserContext from "./components/ContextComponents/ContextComponents";

// User management
import Index from './pages/Index/index';
import Login from './components/Auth/login';

// User
import UserHome from './pages/User/UserHome/UserHome';
// import UserHeader from './components/Common/user/header/userHeader';
import UserFooter from './components/Common/user/footer/userFooter';
// import UserNavbar from './components/Common/user/Navbar/Navbar';
import DayExplorer from './pages/User/DayExplorer/DayExplorer';
import MarsRoverExplorer from './pages/User/MarsRoverExplorer/MarsRoverExploper';
import AddTaskList from './pages/User/AddTaskList/AddTaskList';
//import Authentication from './pages/User/Authentication/Authentication';
import MachineLearning from './pages/User/MachineLearning/MachineLearning';
import Hosting from './pages/User/Hosting/Hosting';
import Functions from './pages/User/Functions/Functions';
import Database from './pages/User/Database/Database';
import Storage from './pages/User/Storage/Storage';


// SystemAdmin
import SystemAdminHome from './pages/SystemAdmin/SystemAdminHome/SystemAdminHome';
import Management from './pages/SystemAdmin/ManageComponents/ManageComponents';
// import SystemAdminHeader from './components/Common/systemAdmin/header/systemAdminHeader';
// import SystemAdminFooter from './components/Common/systemAdmin/footer/systemAdminFooter';
import AdminAuthentication from './pages/SystemAdmin/Authentication/Authentication';
import AdminMachineLearning from './pages/SystemAdmin/MachineLearning/MachineLearning';
import AdminHosting from './pages/SystemAdmin/Hosting/Hosting';
import AdminFunctions from './pages/SystemAdmin/Functions/Functions';
import AdminDatabase from './pages/SystemAdmin/Database/Database';
import AdminStorage from './pages/SystemAdmin/Storage/Storage';

// import DeleteAllocation from ''
import { ThemeProvider } from '@mui/material/styles';
import { dashboardTheme } from './dashboardTheme';


function App() {
  // user details pass
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('User');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem('User', JSON.stringify(user));
    } else {
      localStorage.removeItem('User');
    }
  }, [user]);

  return (
    <ThemeProvider theme={dashboardTheme}>
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">

          {/* Conditional rendering of headers based on user type */}
          {/* {user && user.UserType === 'User' && <UserNavbar />} */}
          {/* {user && user.UserType === 'SystemAdmin' && <SystemAdminHeader />} */}

          {/* Routes */}
          <Routes>
            {/* user management */}
            <Route path="" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* user */}
            <Route path="/userHome" element={<UserHome />}>
              <Route path="addTaskList" element={<AddTaskList />} />
              <Route path="dayExplorer" element={<DayExplorer />} />
              <Route path="marsRoverExplorer" element={<MarsRoverExplorer />} />
              <Route path="database" element={<Database />} />
              <Route path="functions" element={<Functions />} />
              <Route path="hosting" element={<Hosting />} />
              <Route path="machine-learning" element={<MachineLearning />} />
              <Route path="storage" element={<Storage />} />
            </Route>
            

            {/* systemAdmin */}
            <Route path="/systemAdminHome" element={<SystemAdminHome />} >
              <Route path="management" element={<Management />} />
              <Route path="authentication" element={<AdminAuthentication />} />
              <Route path="database" element={<AdminDatabase />} />
              <Route path="functions" element={<AdminFunctions />} />
              <Route path="hosting" element={<AdminHosting />} />
              <Route path="machine-learning" element={<AdminMachineLearning />} />
              <Route path="storage" element={<AdminStorage />} />
            </Route>

            {/* <Route path='/deleteAllocation/:id' element={<DeleteAllocation/>} /> */}



          </Routes>

        </div>

        {/* Conditional rendering of footers based on user type */}
        {/* {user && user.UserType === 'user' && <UserFooter />}
        {user && user.UserType === 'SystemAdmin' && <SystemAdminFooter />} */}

      </UserContext.Provider>

    </Router>
    </ThemeProvider>
  );
}

export default App;