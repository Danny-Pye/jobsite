import { request, gql } from 'graphql-request';

const GRAPH_QL_URL = 'http://localhost:9000/graphql';

export const getJobs = async () => {
    const query = gql`
        query {
            jobs {
                id
                title
                company {
                    name
                }
            }
        }
    `;
    const {jobs} = await request(GRAPH_QL_URL, query);
    return jobs;
}

export const getOneJob = async (id) => {
    const query = gql`
        query jobQuery($id: ID!) {
            job(id: $id) {
                id
                title
                description
                company {
                    id
                    name
                }
            }
        }
    `;
    const variables = { id };
    const {job} = await request(GRAPH_QL_URL, query, variables);
    return job;
}


export const getCompany = async (id) => {
    const query = gql`
        query companyQuery($id: ID!) {
            company(id: $id) {
                id
                name
                description
                jobs {
                    id
                    title
                    description
                }
            }
        }
    `;
    const variables = { id };
    const {company} = await request(GRAPH_QL_URL, query, variables);
    return company;
}