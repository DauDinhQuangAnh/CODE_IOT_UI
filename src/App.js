import Activate_tools from "./components/Activate_tools";
import Infor from "./components/Infor";
import Login from "./components/Login";
import './assets/css/App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Activate_tools /> },
  { path: "/infor", element: <Infor /> },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
  
}

export default App;
