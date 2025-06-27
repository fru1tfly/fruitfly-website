import { useRef, useState, useContext } from "react";
import { SoundContext } from "./SoundContext";

import clickSfx from './assets/sfx/click.mp3';
import closeSfx from './assets/sfx/close.mp3';

import { useAudio } from './Audio';

const Window = ({ wrapperClass, wrapperContent, caption, children, isChild = false, open = false, popup = false }) => {
    const soundOn = useContext(SoundContext);

    const [isOpen, setIsOpen] = useState(open);
    const [isOpening, setIsOpening] = useState(false);

    const playClickSfx = useAudio(clickSfx);
    const playCloseSfx = useAudio(closeSfx);

    const win = useRef(null);

    const openWindow = () => {
        setIsOpen(true);
        setIsOpening(true);
        setTimeout(() => setIsOpening(false), 200);

        if(soundOn) {
            playClickSfx();
        }
    }

    const closeWindow = () => {
        const openWindow = win.current;
        openWindow.className = "window" + (isChild ? " child-window window-exit-child" : " main-window window-exit");
        setTimeout(() => setIsOpen(false), 100);
        setIsOpening(true);

        if(soundOn) {
            playCloseSfx();
        }
    };

    let windowClassName;
    if(!isChild && !popup) {
        windowClassName = "window main-window window-enter";
    } else if(isChild) {
        windowClassName = "window child-window window-enter-child";
    } else if(popup) {
        windowClassName = "window popup-window";
    }

    return (
        <>
            <div className={wrapperClass} onClick={openWindow}>
                {wrapperContent}
            </div>
            {isOpen &&
                <div className={windowClassName} ref={win}>
                    <div className="window-header">
                        <div className="window-title">{caption}</div>
                        {!popup && 
                            <div className="close-window-button" onClick={closeWindow}>✖</div>

                        }
                    </div>
                    <div className="window-body">
                        {!isOpening && children}
                    </div>
                </div>
            }
        </>
    )
};

export default Window;