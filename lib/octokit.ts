import { Octokit } from '@octokit/core';
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods';

const MyOctokit = Octokit.plugin(restEndpointMethods);
const octokit = new MyOctokit({
  auth: process.env.GITHUB_API_TOKEN,
});

export default octokit;
