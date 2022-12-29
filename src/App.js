import React, { useState } from "react";
import { AudioContext } from "./contexts/AudioContext";
import AudioLoopPlayer from "./components/AudioLoopPlayer";
//import AudioContext

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleStopClick = () => {
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, setIsPlaying }}>
      <div>
        <button onClick={handlePlayClick}>Play</button>
        <button onClick={handleStopClick}>Stop</button>
        <AudioLoopPlayer type="drums" />
        <AudioLoopPlayer type="bass" />
        <AudioLoopPlayer type="piano" />
        <AudioLoopPlayer type="guitar" />
      </div>
    </AudioContext.Provider>
  );
}

export default App;

// Data for the audio files
// const audioFiles = {
//   drums: [
//     { src: './samples/Hdrm1.mp3' },
//     { src: './samples/Hdrm2.mp3' },
//     { src: './samples/Hdrm3.mp3' },
//     { src: './samples/Hdrm4.mp3' }
//   ],
//   bass: [
//     { src: './samples/Hbas1.mp3' },
//     { src: "./samples/Hbas2.mp3" },
//     { src: "./samples/Hbas3.mp3" },
//     { src: "./samples/Hbas4.mp3" }
//   ],
//   piano: [
//     { src: "./samples/Hkys1.mp3"  },
//     { src: "./samples/Hkys2.mp3"  },
//     { src:  "./samples/Hkys3.mp3" },
//     { src:  "./samples/Hkys4.mp3" }
//   ],
//   guitar: [
//     { src: 'loop1.mp3' },
//     { src: 'loop2.mp3' },
//     { src: 'loop3.mp3' },
//     { src: 'loop4.mp3' }
//   ]
// };
