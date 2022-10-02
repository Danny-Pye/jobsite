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

