import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login"
import NotFound from "./NotFound/NotFound"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App