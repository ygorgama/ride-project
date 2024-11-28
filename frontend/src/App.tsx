import { BrowserRouter, Routes, Route } from "react-router";
import RideSolicitation from "./pages/RideSolicitation";
import MainLayout from "./layout/MainLayout";
import TravellingOption from "./pages/TravellingOption";
import TravellingHistory from "./pages/TravelingHistory";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={< RideSolicitation/>}/>
          <Route path="/traveling-options" element={< TravellingOption/>}/>
          <Route path="/travel-history/:id?" element={< TravellingHistory/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
