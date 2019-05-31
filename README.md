## REST Mock 👻
REST API mocking using Node and JSON-defined responses (mock server)

### Contents
1. [Features](#features)
2. [Uses](#uses)
3. [Getting Started](#getting-started)
4. [Defining Endpoints](#defining-endpoints)
5. [Sequential Responses](#sequential-responses)
6. [License](#license)

### Features
- [Describe endpoints](#defining-endpoints) with JSON “definitions” or request matchers, which will respond to any request matching its Path and Method with the Status, Headers, and Response Body set for that definition
- [Sequential Responses](#sequential-responses) allow for different responses depending on how many times an endpoint has been called since server start

### Uses
- Decoupled development; start working on an app UI before backing services are available
- Testing your app against edge cases from endpoints you do not control or failure states that are difficult to reproduce

### Getting Started
1. Clone the repository
2. Edit the ‘definitions.json’ file to [define endpoints/responses](#defining-endpoints)
3. Open a terminal window in your cloned repository
4. Run ‘npm install’ (or first [install npm](https://www.npmjs.com/get-npm), if you haven’t already)
5. Run ‘npm start’
6. Send your requests to `http://localhost:3030`

![REST Mock Startup](https://i.ibb.co/F6ZsfMq/rest-mock-start.png)

### Defining Endpoints
- The ‘definitions.json’ file is where your endpoints are defined.  This is a single JSON object with an array of Definition objects, which define the Path and Method for the endpoint, as well as properties for the response, or an array of Response objects for [Sequential Responses](#sequential-responses).
```
interface Definition {
	path: string,
	method: string,
	status?: number,
	headers?: StringMap<string | number>,
	responseBody?: object,
	sequentialResponses?: Array<Response>,
}
```
- **If a [Sequential Responses](#sequential-responses) array is included, it will be used instead of the Status, Headers, and Response Body properties of the definition object.**
- There are examples in the `definitions.json` file to start, including setting headers and some sequential responses.
- Right now definitions are read in from `dist/definitions.json` on server start, but this is overwritten by the `definitions.json` file in the root project folder whenever the TypeScript project is compiled.  So, in order to update definitions, you should do *one* of the following:
  1. Just modify the `definitions.json` file in the ‘dist/’ directory and restart the app.  *This file will be overwritten if the project is recompiled (`tsc`) which is currently included in the npm post-install hook*
  
    **_or_**
  
  2. Modify the `definitions.json` file in the root project directory, then run `tsc` or `npm install` so that your changes end up in the dist/definitions.json file and restart the app
  
### Sequential Responses
- If the `sequentialResponses` array is defined in the endpoint definition, it will iterate through array elements, responding with the properties from each one, until it reaches the last element of the array.  It will continue to respond with the properties from the final element, if the endpoint is called again.
- The sequentialResponses property is an array of Response objects
```
interface Response {
	status: number,
	headers: StringMap<string | number>,
	responseBody: object,
}
```

### License
This project is licensed under the MIT License - see LICENSE.md for details

**[⬆ back to top](#contents)**
