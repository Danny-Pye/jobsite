import JobList from './JobList';
import {getJobs} from "../GraphQL/queries";
import {useEffect, useState} from 'react';

function JobBoard() {
  const [jobList, setJobList] = useState([]);


  useEffect(() => {
      getJobs().then((jobs) => setJobList(jobs));

  }, []);

  console.log(jobList);


  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobList} />
    </div>
  );
}

export default JobBoard;
