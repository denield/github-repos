import { RequestError } from '@octokit/request-error';
import octokit from './octokit';

type Params = {
  type: string;
  searchTerm: string;
  page?: number;
  sortBy?: 'created' | 'updated' | 'pushed' | 'full_name' | undefined;
  sortDirection?: 'asc' | 'desc' | undefined;
  itemsPerPage?: number;
  filterFor?: string;
};

export default async function getData({
  type,
  searchTerm,
  page,
  sortBy,
  sortDirection,
  itemsPerPage,
  filterFor,
}: Params) {
  if (type === 'org') {
    try {
      const result = await octokit.rest.repos.listForOrg({
        org: searchTerm,
        page,
        sort: sortBy,
        direction: sortDirection,
        per_page: itemsPerPage,
        type: filterFor as 'all' | 'public' | 'private' | 'forks' | 'sources' | 'member',
      });
      return result.data;
    } catch (error) {
      if (error instanceof RequestError) {
        console.warn('There was an issue with the GitHub API Request: ', error);
        return null;
      }
      throw new Error('Unhandled error while fetching data');
    }
  } else if (type === 'user') {
    try {
      const result = await octokit.rest.repos.listForUser({
        username: searchTerm,
        page,
        sort: sortBy,
        direction: sortDirection,
        per_page: itemsPerPage,
        type: filterFor as 'all' | 'member' | 'owner',
      });
      return result.data;
    } catch (error) {
      if (error instanceof RequestError) {
        console.warn('There was an issue with the GitHub API Request: ', error);
        return null;
      }
      throw new Error('Unhandled error while fetching data');
    }
  }
  return null;
}
