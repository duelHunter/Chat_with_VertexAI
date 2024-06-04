import "./App.css";
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function App() {

  const [message, setMessage] = useState("")
  const [btn_ctrl, setBtn_Ctrl] = useState(false)
  const [histryList, setHistryList] = useState([])
  const [newMSG_arry, setnewMSG_arry] = useState([])



  //define the history loading function
  const historyLoader = async () => {
    try {
      const historyData = await axios.post('http://127.0.0.1:5000/')
      setHistryList(historyData.data)
    }
    catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    historyLoader()
  }, [])



  //send the message to server when button clicked
  const sendToServer = async (e) => {
    e.preventDefault()
    setMessage("")
    const message_json = {
      message: message
    }
    //insert the new message to the array///////////////////////////////////////////
    setnewMSG_arry(prevArray => [
      ...prevArray,
      { newMSG: message, newRPLY: "" }
    ])


    try {
      const response = await axios.post('http://127.0.0.1:5000/gpt', message_json)
      console.log(response.data)
      //insert the new reply to array(newMSG_arry)
      setnewMSG_arry(prevArray => {
        const updatedArray = [...prevArray]
        updatedArray[updatedArray.length - 1].newRPLY = response.data
        return updatedArray
      })
    }
    catch (error) {
      console.error(error)
    }
    
  }

  //Send message when pressed enter
  const handleEnter = (event)=>{
    if(event.key === 'Enter' && !event.shiftKey){
      event.preventDefault()
      sendToServer(event)
    }
  }


  return (
    <div className="flex flex-col min-h-screen h-screen">

      <header className="text-center py-4 bg-gray-50 dark:bg-gray-700 fixed w-full">
        <h1 className="text-2xl font-bold text-green-500 ">Welcome to AI Chat</h1>
      </header>



      {/* Chat section */}
      <div className="flex flex-col items-center">

        <div className="flex-grow p-4 py-32 bg-white dark:bg-gray-800 w-2/5">

          {histryList.map((chat, index) => (
            <div key={index}>
              <div className="flex gap-2.5 justify-end mb-5">
                <div className="flex flex-col max-w-[900px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{chat.message}</p>
                </div>
              </div>
              <div className="flex gap-2.5 justify-start mb-5">
                <div className="flex flex-col max-w-[900px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{chat.reply}</p>
                </div>
              </div>
            </div>
          ))}
          {
            newMSG_arry.map((chat, index) => (
              <div key={index}>
                <div className="flex gap-2.5 justify-end mb-5">
                  <div className="flex flex-col max-w-[900px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{chat.newMSG}</p>
                  </div>
                </div>
                <div className="flex gap-2.5 justify-start mb-5">
                  <div className="flex flex-col max-w-[900px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{chat.newRPLY}</p>
                  </div>
                </div>
              </div>
            ))}

        </div>

        {/* Typing box */}
        <footer className="bg-gray-50 dark:bg-gray-700 p-4 w-2/5 fixed bottom-1 rounded-lg">
          <form className="flex items-center" onSubmit={sendToServer}>
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 18"
              >
                <path
                  fill="currentColor"
                  d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                />
              </svg>
              <span className="sr-only">Upload image</span>
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                />
              </svg>
              <span className="sr-only">Add emoji</span>
            </button>
            <textarea
              onChange={(event) => {
                setMessage(event.target.value)
                setBtn_Ctrl(event.target.value)
              }}
              onKeyDown={handleEnter}
              value={message}
              id="chat"
              rows="2"
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            ></textarea>
            <button
              disabled={!btn_ctrl}
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </form>
        </footer>
      </div>


    </div>
  );
}

export default App;

//Follow us
//https://github.com/duelHunter/
