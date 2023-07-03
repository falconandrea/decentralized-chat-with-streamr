# Chat with Streamr

LearnWeb3 Bounty: UX/DX Test Streamr documentation

## The challange

### Objective:

Our aim is to enhance the developer experience with Streamr, and we're inviting developers new to Streamr to participate in a paid coding challenge. The challenge involves building a small React chat decentralized application (dApp) utilizing provided resources. Following the development, there will be a short feedback call to gather insights and suggestions.

### Goal:

Develop a React chat dApp that enables data transmission across devices using the Streamr Network. Specifically, the application should allow users to send chat messages from sender A to recipient B via a data stream. There is no requirement for an elaborate interface; a basic implementation with an input field, submit button, and a text window to display incoming messages will suffice.

### Documentation:

Streamr Documentation: [here](https://docs.streamr.network/)

## Instructions

### Setup the stream

**Attention: A small amount of MATIC is used to pay for gas on Polygon mainnet.**

To setup the stream I created a js file to run inside the folder `setup`.

In the folder you have to copy the `.env.example` file in `.env` and insert your private key and the stream name (without initial /).

After that, you have to install the packages with `npm install`.

Finally, launch the command `node setup.js`.

The command returns your `stream ID` to use inside the frontend.

### For the frontend

Copy `.env.example` to `.env` file and update the `NEXT_PUBLIC_STREAM_ID` variable value.

Install packages with `npm install` and run local dev `npm run dev`.
