# GitHub Repositories Search via REST API

[Demo](https://github-repos-three-beige.vercel.app/?type=org&searchTerm=google&page=1&sortBy=&sortDirection=&filterFor=all&itemsPerPage=10)

## The application must

- [x] Contain a form where a user can enter a GitHub username or organisation.
- [x] Allow a user to submit the form, returning a paginated list of public repositories for the entered user or organisation
- [x] Allow pagination, sorting and filtering by all of the options available on the API

## Tech Stack

- React 18
- TypeScript 5
- NextJS 13 (with the new App Router)
- Octokit
- MantineJS

NextJS 13 has been chosen for learning purposes, the new app router has many new advantages, the main one is fully supporting React Server Components. State management is done via query parameters via a combination of custom set hook and the built in router in NextJS. Octokit has been chosen for ease of use of the GitHub API. MantineJS is my go-to lib atm for quick prototyping.

## Steps to run

`$ npm i && npm run dev`

## Steps to make it deployable

`$ vercel deploy`

## Ideas for new features

- Generalise the search box, settings and the table view to be able to use the rest of the APIs
- Add input validation (for eg.: zod)
- Improve error handling of the GitHub API calls
- Add logging mechanism for errors to be able to trace down production bugs
- Display a loading spinner if a page loads for more than 200 ms
- Do not display the 'Next' page button if the requested number of items are more than the items in the response (therefore there are no more pages)
- Add support for automatic search upon typing without pressing enter / clicking on the submit button (but make sure to debounce the fn call)
- Add support for more detailed pagionation where total count is supported
- Add support for throttling API calls to avoid rate limiting (for eg.: https://github.com/octokit/plugin-throttling.js/)
- Add support for multiple languages
- Add support for mobile devices
