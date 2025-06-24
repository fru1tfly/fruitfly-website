import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const MouseTracker = ({ children, mainPage, offset = { x: 0, y: 0} }) => {
    const element = useRef({});

    useEffect(() => {
        function handler(e) {
            const rect = mainPage.getBoundingClientRect();
            if (element.current) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                element.current.style.transform = `translate(${x}px, ${y}px)`;
                element.current.style.visibility = 'visible';
            }
        }
        document.addEventListener('mousemove', handler);
        document.addEventListener('mouseenter', handler);
        return () => {
            document.removeEventListener('mousemove', handler);
            document.removeEventListener('mouseenter', handler);
        }
    }, [offset.x, offset.y]);

    return createPortal(
        <div className="tooltip" ref={element}>
            <span>{children}</span>
        </div>
    , mainPage);
};