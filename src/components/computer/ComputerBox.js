const ComputerBox = ({children}) => {
    return (
        <div className="computer-border center-x">
            <div className="computer-border-row">
                <div className="computer-corner-top flipped"></div>
                <div className="computer-top"></div>
                <div className="computer-corner-top"></div>
            </div>
            <div className="computer-border-row middle-gap">
                <div className="computer-side flipped"></div>
                <div className="computer-side"></div>
            </div>
            <div className="computer-border-row">
                <div className="computer-corner-bottom flipped"></div>
                <div className="computer-bottom"></div>
                <div className="computer-corner-bottom"></div>
                <div className="computer-logo"></div>
                <div className="computer-floppy-bar">
                    <div className="computer-floppy-band"></div>
                    <div className="computer-floppy-drive"></div>
                </div>
            </div>
            <div className="scanlines">
                <div className="vignette">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ComputerBox;