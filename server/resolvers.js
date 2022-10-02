import {Job, Company} from './db.js';

export const resolvers = {
    Query: {
        job: (_root,  args) => Job.findById(args.id),
        jobs: () => Job.findAll(),
        company: (_root, args) => Company.findById(args.id),
    },
    Job: {
        company: async (job) => Company.findById(job.companyId),
    }
};