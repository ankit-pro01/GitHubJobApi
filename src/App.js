import { useState } from 'react';
import './App.css';
import UseFetchGitJobs from './UseFetchGitJobs';
import Job from "./Job"
import Form from './Form';
import Pagination from './Pagination';

function App() {

  const [params, setParams] = useState({})

  const [page, setPage] = useState(1)

  const { jobs, loading, error, hasNextPage} = UseFetchGitJobs(params, page)

  console.log(jobs);

  const handleParamsChange = (e) => {
      const name = e.target.name
      const value = e.target.value
      setPage(1)
      setParams({...params, [name] : value})
  }

  return (
    <div className="App">
      <header>
        <h1>GitHub <span>Jobs</span></h1>
      </header>
      <Form params = {params} handleParamsChange = {handleParamsChange}/>
      <Pagination page = {page} setPage = {setPage} hasNextPage = {hasNextPage}/>
      {loading && <p>Loading</p>}
      {error && <p>error</p>}
      {
        jobs.map((job)=> <Job key = {job.id} job = {job}/>)
      }
    </div>
  );
}

export default App;
