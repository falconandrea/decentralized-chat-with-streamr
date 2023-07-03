import { useState } from "react"
import { publishMessage } from '@/utils/streamr'

export default function Form({setErrorMessage, setSuccessMessage, setLoading}) {
  const [message, setMessage] = useState('')

  const sendMessage = async (e) => {
    setLoading(true)
    try{
      setSuccessMessage('')
      setErrorMessage('')

      e.preventDefault()

      await publishMessage(message)

      setSuccessMessage('Message published')

      setLoading(false)
      setMessage('')
    }
    catch(err) {
      console.log(err)
      setErrorMessage('Problem during publishing message')
      setLoading(false)
    }
  }

  return (
    <form method="POST" onSubmit={sendMessage}>
      <div className="">
        <div className="pb-8">
          <div className="mt-4">
            <div className="col-span-full">
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">Insert new message</label>
              <div className="mt-2">
                <textarea value={message} onChange={e => setMessage(e.target.value)} id="message" name="message" rows="3" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm sm:text-sm sm:leading-6 outline-0"></textarea>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs">To publish a message (only the first) you need to have the permissions.<br />To receive the permissions you need some Matic on your account.</p>
        <div className="flex items-center justify-end">
          <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Save</button>
        </div>
      </div>
    </form>
  )
}
