import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getOneJob} from "../GraphQL/queries";


function JobDetail() {
  const [job, setJob] = useState(null);
  // useParams to extract the id from the url
  const { jobId } = useParams();

  useEffect(() => {
      //.then(setJob) is the same as .then((job) => setJob(job))
      getOneJob(jobId).then(setJob);
  }, [jobId]);

  if (!job) {
    return null;
  }

  return (
    <div>
      <h1 className="title">
        {job.title}
      </h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>
          {job.company.name}
        </Link>
      </h2>
      <div className="box">
        {job.description}
      </div>
    </div>
  );
}

export default JobDetail;
