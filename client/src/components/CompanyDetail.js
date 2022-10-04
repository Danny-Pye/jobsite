import { useParams } from 'react-router';
import {useState, useEffect} from 'react';
import {getCompany} from "../GraphQL/queries";

function CompanyDetail() {
  const { companyId } = useParams();

    const [company, setCompany] = useState(null);

    useEffect(() => {
        getCompany(companyId).then(setCompany);
    }, [companyId]);

    if (!company) {
        return null;
    }
    console.log(company);

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>

        {company.jobs.map((each) => {
            return (
                <div key={each.id}>
                    <h3>{each.title}</h3>
                    <p>{each.description}</p>
                    <hr/>
                </div>
            );
        })}


    </div>
  );
}

export default CompanyDetail;
