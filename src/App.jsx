import './App.css';
import Navbar from './component/Navbar';
import Movies from './component/Movies';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Favourite from './component/Favourite';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>      
        <Route path ="/" element={
        <>
         <Movies />
        </>
        }>
        </Route>
        <Route path = "/favourite" element={<Favourite/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
