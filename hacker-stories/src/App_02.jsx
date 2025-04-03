
function App() {
  const handleChange = (event) => {
    // whole event
    console.log(event);
    // value of the thing that is typed
    console.log(event.target.value);
  }

  return (
    <div>
     <label htmlFor='search'>Search: </label>
     <input id='search' type='text' onChange={handleChange} />
    </div>
  );
}

export default App
















