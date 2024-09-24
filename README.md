## Implementation Details

<!-- Provide a short description of your implementation (technologies used, brief overview of project architecture, etc.) -->

I used react/typescript for the frontend. The home page lives at `/`. All other pages are assumed to be redirects with a slug (e.g. `/slug123`). The fontend uses an env variable to configure the backend's base url. All the logic to communicate with the backend is in the api folder. The pages use react's built-in `useState` and similar to manage state.

The backend uses express/node/typescript and exposes a rest api. The backend is very simple and has two main endpoints, `/create` and `/:slugId` (more details below). All data is stored locally.

### POST /create

This is a POST method that takes in a url, validates it, and stores it. It generates a unique id using `nanoid` and returns that to the caller. The caller can later use that ID to lookup the original url. The nanoid is a cryptographically secure id with very little chance of running into a collision.

### GET /:slugId

This GET method looks up the URL for the slug and returns it. If none is found, it returns an error.

## How to Run

<!--
- Include instructions on how to run your implementation locally. Be sure to include any necessary setup steps, such as installing dependencies, as well as the commands to start the application.
-->

### Backend

First set up the backend using these commands

```sh
cd backend
npm ci
```

Then start the server with

```sh
npm run serve
```

### Frontend

Next, run the following set of commands in your terminal

```sh
cd frontend
npm ci
npm run dev
```

Then, open http://localhost:8000/ in your browser.

## Testing

<!-- Describe how you tested your solution (automated testing, manual testing process, screenshots, etc.) -->

I ran a few manual tests to make sure it was working:

1. Verify that non-http links aren't permitted
1. Verify that non-existant slugs did nothing
1. Verify that a new, valid slug can be created and navigated to using the browser

I also added one unit test to verify the http/https url validation

## Tools Used

<!--
- Describe any tools you used in developing your solution (e.g. ChatGPT for generating ideas and styles)
- Note: The use of AI tools is not discouraged, but they should be used judiciously.
-->

- I used copilot for basic syntax agnostic stuff
- I used claude to fix a CORS issue I was having
