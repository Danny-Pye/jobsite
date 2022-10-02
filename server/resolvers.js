import {Job, Company} from './db.js';

export const resolvers = {
    Query: {
        job:(_root,  args) => Job.findById(args.id),
        jobs: async () => Job.findAll(),
    },
    Job: {
        company: async (job) => Company.findById(job.companyId),
    }
};