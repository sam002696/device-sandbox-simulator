import { BrowserRouter as Router, Routes, Route } from "react-router";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Sandbox from "./layout/Sandbox";
import FanSandbox from "./pages/FanSandbox";
import LightSandbox from "./pages/LightSandbox";
import WelcomeScreen from "./pages/WelcomeScreen";
import NotFound from "./pages/NotFound";

import { useDispatch, useSelector } from "react-redux";
import Toast from "./components/ui/Toast";
import { hideToast } from "./redux/shared/toastSlice";

function App() {
  // Getting toast state from Redux store
  const { message, type, source } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  return (
    // Setting up DnD context and routing
    // allowing drag-and-drop functionality and navigation
    <DndProvider backend={HTML5Backend}>
      <Router>
        {message && (
          <Toast
            message={message}
            type={type}
            source={source}
            onClose={() => dispatch(hideToast())}
          />
        )}
        <Routes>
          <Route path="/" element={<Sandbox />}>
            <Route index element={<WelcomeScreen />} />
            <Route path="fan" element={<FanSandbox />} />
            <Route path="light" element={<LightSandbox />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
