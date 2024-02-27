import Navbar from "./components/Navbar";
import image from "./assets/Images/Radial-Gradient.png";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("Hello World!");
  const [delay, setDelay] = useState();
  const handleDelay = (e) => {
    setDelay(e.target.value);
  };

  const handleText = (e) => {
    setText(e.currentTarget.textContent);
  };

  const buttonClickHandler = () => {
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

  return (
    <>
      <div className="h-screen w-screen bg-repeat bg-bg-home">
        <div className="mx-10">
          <Navbar />
          <img className="absolute bottom-0 z-1" src={image} />
          {/* The input area */}
          <div className="mt-10 flex flex-col items-center justify-center gap-10 z-10">
            <input
              className="w-[50vw] p-2 text-xl text-green z-10 bg-[#060f11] rounded-xl shadow-xl  hover:outline hover:outline-green focus:outline focus:outline-green"
              type="text"
              placeholder="Delay in ms"
              value={delay}
              onChange={handleDelay}
            />
            <div
              className="text-4xl custom-scrollbar text-green font-gugi z-10 min-w-[50vw] rounded-xl p-2 min-h-[50vh] max-w-[60vw] max-h-[55vh] outline-none hover:outline hover:outline-green focus:outline focus:outline-green shadow-2xl overflow-y-scroll"
              contentEditable="true"
              onInput={handleText}>
              {text}
            </div>
            <button
              onClick={buttonClickHandler}
              className="flex items-center justify-center cursor-pointer z-10">
              <span class="material-symbols-outlined text-6xl text-white outline outline-4 outline-white bg-green rounded-full p-2 ">
                play_arrow
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
