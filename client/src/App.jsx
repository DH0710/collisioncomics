import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/home.jsx";
import About from "./routes/About/about.jsx";
import Comics from "./routes/Comics/comics.jsx"
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";



function App() {
  return (
    <>
    
      <Router>
        <Header/>
        <Routes>
          <Route path = "/" element = { <Home/> } />
          <Route path = "/about" element = { <About/> } />
          <Route path = "/comics" element = { <Comics/> } />
         
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}



export default App
