import { StreamrClient, StreamPermission } from 'streamr-client'

const STREAM_ID = process.env.NEXT_PUBLIC_STREAM_ID

const getClientAndAddress = async () => {
  const streamr = new StreamrClient({
    auth: {
      ethereum: window.ethereum,
    },
  })

  // Get user address
  const address = window.ethereum.selectedAddress

  // Get stream
  const stream = await streamr.getOrCreateStream({
    id: STREAM_ID,
  })

  return { streamr, stream, address }
}

const checkSetPermissions = async (type) => {
  const { stream, address } = await getClientAndAddress()

  // Check permissions
  const permissionStatus = await stream.hasPermission({
    permission: type === 'publish' ? StreamPermission.PUBLISH : StreamPermission.SUBSCRIBE,
    user: address,
    allowPublic: true
  })

  console.log('permissionStatus', type, permissionStatus)

  // Set if missing
  if(!permissionStatus) {
    await stream.grantPermissions({
      user: address,
      permissions: [type === 'publish' ? StreamPermission.PUBLISH : StreamPermission.SUBSCRIBE],
    })
  }
}

const publishMessage = async (message) => {
  const { stream, address } = await getClientAndAddress()

  console.log(stream, address)

  // Check and set permissions
  await checkSetPermissions('publish')

  // Publish message
  await stream.publish(
    {
      message: message,
      author: address
    }
  )
}

export { publishMessage, getClientAndAddress }
