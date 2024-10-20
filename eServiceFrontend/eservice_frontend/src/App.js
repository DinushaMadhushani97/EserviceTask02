import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Service from './components/Service';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AddEservice from './components/Eservice/AddEservice';
import AddTenant from './components/Tenant/AddTenant';
import AddServer from './components/Server/AddServer';
import AddResource from './components/Resource/AddResource';
import AddUserList from './components/UserList/AddUserList';
import AddNewTenant from './components/Tenant/AddNewTenant';
import AddNewServer from './components/Server/AddNewServer';
import EserviceManagementView from './components/Main/EserviceManagementView';
import ServerView from './components/Server/ServerView';
import CombinedForm from './components/Main/CombinedForm';
import TenantView from './components/Tenant/TenantView';
import ResourceView from './components/Resource/ResourceView';
import EserviceView from './components/Eservice/EserviceView';
import UpdateResource from './components/Resource/UpdateResource';
import DisableResource from './components/Resource/DisableResource';
import DisableEservice from './components/Eservice/DisableEservice';


// temp import files
import CreateTenant from './components/Temp/CreateTenant';
import CreateEservice from './components/Temp/CreateEservice';
import ParentComponent from './components/Temp/ParentComponent';
const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isLoginPage && <NavBar />}
      <main style={{ flex: 1 }}>
        <Routes>

          {/* Common pages routes */}

          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />

          {/* Tenant Management Routes */}
          <Route path="/tenant/addTenant/:eId" element={<AddTenant />} /> 
          <Route path="/tenant/addNewTenant/:eId" element={<AddNewTenant />} />
          <Route path="/tenant/tenantView" element={<TenantView />} /> 

          {/* Eservice Management Routes */}
          <Route path="/eservice/addEservice" element={<AddEservice />} /> 
          <Route path="/eservice/eserviceView" element={<EserviceView />} /> 
          {/* <Route path="/eservice/updateEservice/:eId" element={<UpdateEservice />} /> */}
          <Route path="/eservice/disableEservice/:eId" element={<DisableEservice />} />
          
          {/* Document/Resource Management Routes */}
          <Route path="/resource/addResource" element={<AddResource />} />
          <Route path="/resource/resourceView" element={<ResourceView />} /> 
          <Route path="/resource/updateResource/:rId" element={<UpdateResource />} />
          <Route path="/resource/disableResource/:rId" element={<DisableResource />} />
          
          {/* Server Management Routes */}
          <Route path="/server/addNewServer" element={<AddNewServer />} />
          <Route path="/server/addServer" element={<AddServer />} /> 
          <Route path="/server/serverView" element={<ServerView />} /> 

          {/* UserList Management Routes */}
          <Route path="/userList/addUserList" element={<AddUserList />} />

          {/* Additional Test Pages Routes */}
          <Route path="/main/eserviceManagementView" element={<EserviceManagementView />} /> 
          <Route path="/main/combinedForm" element={<CombinedForm />} /> 

          {/* temp folder Routes */}
          <Route path="/temp/createTenant" element={<CreateTenant />} /> 
          <Route path="/temp/createEservice/:tId" element={<CreateEservice />} />
          <Route path="/temp/parentComponent" element={<ParentComponent />} /> 




        </Routes>
      </main>
      <div style={{ height: '100px' }}>
        {!isLoginPage && <Footer />}
      </div>
    </div>
  );
};

export default App;
