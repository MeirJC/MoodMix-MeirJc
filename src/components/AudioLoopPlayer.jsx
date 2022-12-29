import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AudioContext } from "./contexts/AudioContext1";
import { useAudioPlayer } from "react-audio-player";

function AudioLoopPlayer({ type }) {
  // Create the audio context and buffer array
  const audioContext = new AudioContext();
  const audioBuffers = useRef([]);

  // Use state to track the current loop index
  const [currentLoop, setCurrentLoop] = useState(0);
  const [loopIndex, setLoopIndex] = useState(0);
  // Data for the audio files
  const audioFiles = {
    drums: [
      { src: "./samples/Hdrm1.mp3" },
      { src: "./samples/Hdrm2.mp3" },
      { src: "./samples/Hdrm3.mp3" },
      { src: "./samples/Hdrm4.mp3" },
    ],
    bass: [
      { src: "./samples/Hbas1.mp3" },
      { src: "./samples/Hbas2.mp3" },
      { src: "./samples/Hbas3.mp3" },
      { src: "./samples/Hbas4.mp3" },
    ],
    piano: [
      { src: "./samples/Hkys1.mp3" },
      { src: "./samples/Hkys2.mp3" },
      { src: "./samples/Hkys3.mp3" },
      { src: "./samples/Hkys4.mp3" },
    ],
    guitar: [
      { src: "./samples/Hgtr1.mp3" },
      { src: "./samples/Hgtr2.mp3" },
      { src: "./samples/Hgtr3.mp3" },
      { src: "./samples/Hgtr4.mp3" },
    ],
  };

  const { play, pause, audio } = useAudioPlayer({
    src: node.src,
    autoPlay: false,
    loop: true,
    muted: true,
  });

  // Use the useAudioPlayer hook to create audio players
  const audioPlayers = audioFiles[type].map((node, index) => {
    return { play, pause, audio };
  });
  // Get the isPlaying and isLoading states and setIsPlaying function from the context
  const { isPlaying, isLoading, setIsPlaying } = useContext(AudioContext);

  // Function to handle button clicks
  const handleButtonClick = (index) => {
    if (audioPlayers[index].audio.muted) {
      // Unmute the audio player, set the current loop index, and set isPlaying to true
      audioPlayers[index].audio.muted = false;
      setCurrentLoop(index);
      setIsPlaying(true);
    } else {
      // Mute the audio player, set the current loop index to null, and set isPlaying to false if all audio players are muted
      audioPlayers[index].audio.muted = true;
      setCurrentLoop(null);
      setIsPlaying(audioPlayers.some((player) => !player.audio.muted));
    }
  };

  // Function to handle the "Save" button click
  const handleSaveClick = () => {
    // Retrieve the current loop index array
    const currentLoopIndices = audioPlayers.map((player, index) => {
      return player.audio.muted ? null : index;
    });
    // Save the current loop indices to local storage
    localStorage.setItem(
      "currentLoopIndices",
      JSON.stringify(currentLoopIndices)
    );
  };

  // Function to handle the "Load" button click
  const handleLoadClick = () => {
    // Retrieve the saved current loop indices from local storage
    const savedLoopIndices = JSON.parse(
      localStorage.getItem("currentLoopIndices")
    );
    // Set the current loop indices
    audioPlayers.forEach((player, index) => {
      player.audio.muted = !savedLoopIndices.includes(index);
    });
    setCurrentLoop(savedLoopIndices[0]);
    setIsPlaying(savedLoopIndices.length > 0);
  };

  // Render the audio players
  return (
    <div>
      {audioPlayers.map((player, index) => (
        <button onClick={() => handleButtonClick(index)}>
          {player._isMuted ? "Muted" : "Playing"}
        </button>
      ))}
    </div>
  );
}

export default AudioLoopPlayer;
