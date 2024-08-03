import Navbar from "./components/Navbar";
import image from "./assets/Images/Radial-Gradient.png";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function App() {
  const text = `DELETE THIS and enter your text here.
THIS website converts your TEXT to AUDIO. 
The DELAY defines the time between each word in the audio file. 
DELAY is in milliseconds. 
TEXT is in English. 
Once you finish your text press the play button to listen to the audio.
The maximum number of characters for one request is 5000.
Made with ❤️ by Ramit.`;
  const [delay, setDelay] = useState();
  const textRef = useRef(null);
  const handleDelay = (e) => {
    setDelay(e.target.value);
  };

  const buttonClickHandler = () => {
    const text = textRef.current.innerText;
    console.log(text);
    if (!text) {
      alert("Please enter some text");
      return;
    }
    if (!delay || isNaN(Number(delay))) {
      alert("Please enter a valid delay value");
      return;
    }
    const data = {
      text: text,
      delay: Number(delay),
    };
    console.log(data);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}`, data, {
        responseType: "blob",
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
        console.log(res);
      });
  };
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}`);
  }, []);

  return (
    <>
      <div className="h-screen w-screen bg-repeat bg-bg-home">
        <div className="mx-10">
          <Navbar />
          <img className="absolute bottom-0 z-1" src={image} />
          <div className="mt-10 flex flex-col items-center justify-center gap-10 z-10">
            <input
              className="w-[50vw] p-2 text-xl text-green z-10 bg-[#060f11] rounded-xl shadow-xl  hover:outline hover:outline-green focus:outline focus:outline-green"
              type="text"
              placeholder="Delay in ms"
              value={delay}
              onInput={handleDelay}
            />
            <div
              className="text-4xl custom-scrollbar text-green font-gugi z-10 min-w-[50vw] rounded-xl p-2 min-h-[50vh] max-w-[60vw] max-h-[55vh] outline-none hover:outline hover:outline-green focus:outline focus:outline-green shadow-2xl overflow-y-scroll"
              style={{ whiteSpace: "pre-wrap" }}
              contentEditable="true"
              ref={textRef}>
              {text}
            </div>
            <button
              onClick={buttonClickHandler}
              className="flex items-center justify-center cursor-pointer z-10">
              <span className="material-symbols-outlined text-6xl text-white outline outline-4 outline-white bg-green rounded-full p-2 ">
                play_arrow
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
