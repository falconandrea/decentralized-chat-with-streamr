require('dotenv').config()
const PRIVATE_KEY = process.env.PRIVATE_KEY
const STREAM_NAME = process.env.STREAM_NAME

// Import the Streamr client
const StreamrClient = require("streamr-client")

// Function to create a stream
const createStream = async () => {
  // Initialize the client with an Ethereum account
  const streamr = new StreamrClient({
    auth: {
        privateKey: PRIVATE_KEY,
    },
  })

  // Requires MATIC tokens (Polygon blockchain gas token)
  const stream = await streamr.createStream({
    id: `/${STREAM_NAME}`,
  })

  return stream.id
}

(async () => {
  try {
    const STREAM_ID = await createStream()
    console.log(`Your stream ID is ${STREAM_ID}`)
  } catch (error) {
    console.error(error)
  }
})()
