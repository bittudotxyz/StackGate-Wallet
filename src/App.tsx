import { Routes, Route } from "react-router-dom";
import "./wallet/session";
import "./wallet/requests";
import Connect from "./pages/Connect";

function App() {
  return (
    <Routes>
      {/* AppKit expects /wc */}
      <Route path="/wc" element={<Connect />} />

      {/* fallback */}
      <Route path="*" element={<Connect />} />
    </Routes>
  );
}

export default App;
