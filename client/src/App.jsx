import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/home.jsx";
import About from "./routes/About/about.jsx";
import Comics from "./routes/Comics/comics.jsx";
import SingleComic from "./routes/Comics/singleComic.jsx";
import CreateComic from "./routes/Comics/createComic.jsx";
import EditComic from "./routes/Comics/editComic.jsx";
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
          <Route path = "/comics/:slug" element = { <SingleComic/> } />
          <Route path = "/createcomic" element = { <CreateComic/> } />
          <Route path = "/editcomic/:slug" element = { <EditComic/> } />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}



export default App
