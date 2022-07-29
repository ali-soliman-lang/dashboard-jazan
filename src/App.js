import React from "react";
import "./App.css";
import { Route , Routes} from "react-router-dom";
import Dashboard from "./Components/dashboard/Dashboard";
import LogIn from "./Components/login/LogIn";



const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/*" element={<Dashboard />}/> {/* /dashboard/ */}
      </Routes>
    </div>
  );
};

export default App;
