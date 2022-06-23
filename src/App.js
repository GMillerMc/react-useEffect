import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  const [students, setStudents] = useState([]);
  const [cohort, setCohort] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState(true);

  


  useEffect(() => {
    
    const fetchStudents = async (searchTerm) => {
      searchTerm ||= 'auguste'
      try {

    const url= `https://raw.githubusercontent.com/GMillerMc/fp_study_notes_hello_github/main/${searchTerm}/roster.json`

    //const { data: { students } } = await axios.get(URL)
    
    const { data } = await axios.get(url)
    console.log('I was Mounted')
    setStudents(data.students)
    setStatusMessage('')
    setError('')
    } catch (err) {
      setError(err)
      setStatusMessage('Loading...')
  
    }
  }
  const timeoutId = setTimeout(() => {
    fetchStudents(search)
  }, 400);

  return () => {
    clearTimeout(timeoutId)
  }

  }, [search])


  console.log(cohort)
  const renderedStudents = students.map(st => {
    return (
      <li key={st.github}>{st.github}</li>
      ) //renders the students from the cohort - changed to github etc
  })



  const onInputChange = (e) => {
    setCohort(e.target.value)
  }

  const onformSubmit = (e) => {
    e.preventDefault()
    setSearch(cohort)
    setCohort('')
  }


  return (
    <div className="App">
      <header className="App-header">
      {error
          ? <h1>Sorry, we could not find a {search} cohort</h1>
          : <div>
            <h3> {statusMessage ? statusMessage : true } </h3>
            <ul> {renderedStudents} </ul>
          </div>
        }
      
        <form onSubmit={onformSubmit}>
          <label htmlFor="cohort"> Cohort
          </label>
          <input 
          type="text"
          id="cohort" 
          value={cohort}
          onChange={onInputChange}
          />

      
        </form>
    
      </header>
    </div>
  );
}

export default App;
