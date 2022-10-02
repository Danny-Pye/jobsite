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

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
    </div>
  );
}

export default CompanyDetail;
