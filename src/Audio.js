import { useState } from "react";

export const useAudio = (url) => {
    const [audio] = useState(new Audio(url));

    const playAudio = () => {
        audio.play();
    }

    return playAudio;
}