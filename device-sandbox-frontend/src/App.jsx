import { BrowserRouter as Router, Routes, Route } from "react-router";
import Sandbox from "./layout/Sandbox";
import FanSandbox from "./pages/FanSandbox";
import LightSandbox from "./pages/LightSandbox";
import WelcomeScreen from "./pages/WelcomeScreen";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sandbox />}>
          <Route index element={<WelcomeScreen />} />
          <Route path="fan" element={<FanSandbox />} />
          <Route path="light" element={<LightSandbox />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
