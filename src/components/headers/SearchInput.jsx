import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index.js";
import { Search, Mic, MicOff  } from "lucide-react"; // Import Mic icon
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function SearchInput() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);

  // Function to handle search submission
  const searchVideos = async (data) => {
    navigate(`/search?title=${data.searchQuery}`);
  };

  // Start or Stop Voice Recognition
  const handleVoiceSearch = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: false, language: "en-US" });
      setIsVoiceSearch(true);
    }
  };

  // Automatically set the transcript as search input
  useEffect(() => {
    if (transcript && isVoiceSearch) {
      setValue("searchQuery", transcript);
      resetTranscript();
      setIsVoiceSearch(false);
    }
  }, [transcript, isVoiceSearch, setValue]);

  return (
    <div className="max-w-md mx-auto">
      <div className="w-full flex  gap-2 items-center rounded-full ">
        <form className="w-full flex gap-0.5" onSubmit={handleSubmit(searchVideos)}>
          <Input
            className="focus:outline-none focus:ring-2 focus:bg-neutral-400 focus:ring-indigo-600 focus:border-transparent focus:shadow-[0px_0px_8px_0px_rgba(0,170,255,0.5)]"
            rounded="rounded-l-full"
            bgColor="bg-neutral-300"
            type="text"
            placeholder="Search videos..."
            {...register("searchQuery")}
          />
          <Button bgColor="bg-gray-400" rounded="rounded-r-full" type="submit">
            <Search color="#000000" />
          </Button>
        </form>
        {/* Voice Search Button */}
        <button
          onClick={handleVoiceSearch}
          className={`p-2 rounded-full ${listening ? "bg-red-500" : "bg-gray-400"}`}
        >
         {listening? <MicOff strokeWidth={1.5} /> : <Mic  />}
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
