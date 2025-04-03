const students = [
  { suid: 123456, name: "Sue Flay", year: "senior", major: "Applied Data Analytics" },
  { suid: 234567, name: "Ella Vader", year: "junior", major: "Information Management and Technology" },
  { suid: 345678, name: "Chris P Bacon", year: "junior", major: "Innovation, Society and Technology" }
];



function App() {

  function handleClick(message) {
    console.log(message);
  }
  return (
    <div>
      <h1>Students</h1>
      <Students />
      <button onClick={() => handleClick("Button was clicked!")}>
        Click Me
      </button>
    </div>
  );
}



function Students() {
  return (
    <div>
      <ul>
        {
          students.map(function(student) {
            return <li key={student.suid}>Name: {student.name} <br/>
            Year: {student.year} <br/> Major: {student.major}  <br />
            </li>;
          })
        }
      </ul>
    </div>
  );
}

// Filtering for Sue Flay
const filteredStudents = students.filter(student => student.name === "Sue Flay");

console.log(filteredStudents); 

export default App;

















