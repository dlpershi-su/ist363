import { useState } from "react";
import About from './About'


// ./ means same folder as App.jsx file

function Home () {
  return (
    <div>
    <h1>Home Page</h1>
    </div>
  );
}

// conditional rendering aka nav SPAs
function App () {
  const [page, setPage] = useState('home');
  return (
    <>
    <nav class='text-danger'>
    <a onClick={() => setPage('home')}>Home</a>
    <a onClick={() => setPage('about')}>About</a>
    </nav>
    {page === 'home' && <Home />}
    {page === 'about' && <About />}
    </>
  );
}



export default App;






