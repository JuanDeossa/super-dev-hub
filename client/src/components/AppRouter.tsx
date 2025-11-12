import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};
