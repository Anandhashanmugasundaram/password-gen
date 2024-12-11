import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const generatepassword = useCallback(() => {
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789"
    let char = '!@#$%^&*_'
    if(numberAllowed)  str += num
    if(charAllowed) str += char
    for(let i=0 ; i < length ; i++){
     const character = Math.floor(Math.random() * str.length + 1 )
     pass += str.charAt(character)

     setPassword(pass)


      
    }
  },[length,numberAllowed,charAllowed])

  useEffect(() => {
    generatepassword()
  },[length,numberAllowed,charAllowed])

  const copytext = () => {
    window.navigator.clipboard.writeText(password)
    toast.success("Password copied successfully!", { // Show the success toast
      position: "top-center",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  
    

  }

  return (
<>
  <div className="flex flex-col p-4 sm:p-8 md:p-12 lg:p-16 justify-center items-center h-[100vh]">
    <div className="bg-black p-6 sm:p-8 md:p-12 rounded-md max-w-lg w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-white text-center m-4">
        Password Generator
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          className="outline-none border-none p-2 w-full sm:w-64"
        />
        <button
          className="outline-none rounded-md text-white bg-blue-500 p-2 mt-2 sm:mt-0 sm:ml-4"
          onClick={copytext}
        >
          Copy
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center mt-3 gap-2 text-white">
        <input
          className="cursor-pointer"
          onChange={(e) => setLength(e.target.value)}
          type="range"
          min={6}
          max={20}
          value={length}
        />
        <label className="text-white text-center p-2" htmlFor="length">
          Length: {length}
        </label>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <input
            className="cursor-pointer"
            onChange={() => setnumberAllowed((prev) => !prev)}
            type="checkbox"
            value={numberAllowed}
          />
          <label className="text-white text-center" htmlFor="number">
            Number: {numberAllowed}
          </label>

          <input
            className="cursor-pointer"
            onChange={() => setCharAllowed((prev) => !prev)}
            type="checkbox"
            value={charAllowed}
          />
          <label className="text-white text-center" htmlFor="character">
            Character: {charAllowed}
          </label>
        </div>
      </div>
    </div>
  </div>
  <ToastContainer />
</>

  );
}

export default App;
