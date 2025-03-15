# AI Chatbot
## `/public` folder
This folder includes the frontend of this project. It has the UI and the AI "heart" in responses.json.
### File: `chat.js`
This file includes the instructions for the AI to respond the user's requests. It interacts with `responses.json` using the `fetch()` API requesting
the responses for the user's input and sending them to index.html. That is the 2nd most important file here after `responses.json`.
### File: `responses.json`
This is the most important file on this project. Contains all the AI knowledge base and is requested with `fetch()` by `chat.js` to handle AI's responses. It contains
all the information the AI needs
