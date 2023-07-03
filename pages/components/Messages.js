import { getClientAndAddress } from "@/utils/streamr"
import { useEffect, useState } from "react"

const STREAM_ID = process.env.NEXT_PUBLIC_STREAM_ID

export default function Messages() {
  const [messages, setMessages] = useState([])

  const getMessages = async () => {
    const { streamr } = await getClientAndAddress()

    await streamr.subscribe(STREAM_ID, (content) => {
      const msg = {
        message: content.message,
        author: `${content.author.slice(0,3)}...${content.author.slice(-5)}`
      }
      setMessages(msgs => [...msgs, msg]);
    })
  }

  const unsubscribe = async () => {
    const { streamr } = await getClientAndAddress()

    await streamr.unsubscribe(STREAM_ID)
  }

  useEffect(() => {
    getMessages()
    return () => unsubscribe()
  }, [])

  return (
    <div className="text-center mb-8">
      { messages.length > 0 ? (
        messages.map((msg, i) => (
          <div className="w-full border-b-2 border-gray-100 text-left py-2" key={i}>
            <p className="w-full text-right"><small>from {msg.author}</small></p>
            <p>{msg.message}</p>
          </div>
        ))
      ) : (
        <p className="text-center py-8">No messages...</p>
      )}
    </div>
  )
}



