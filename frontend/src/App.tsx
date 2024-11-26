import { BrowserRouter, Routes, Route } from "react-router";
import RideSolicitation from "./pages/RideSolicitation";
import MainLayout from "./layout/MainLayout";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={< RideSolicitation/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
