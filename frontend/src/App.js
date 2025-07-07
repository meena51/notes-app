import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateNote from "./components/CreateNote";
import ViewTasks from "./components/ViewTasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateNote />} />
        <Route path="/view" element={<ViewTasks />} />
      </Routes>
    </Router>
  );
}

export default App;
