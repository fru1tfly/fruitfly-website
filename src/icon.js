import Window from "./Window";

const Icon = (props) => {
    const {imgSrc, caption, children} = props;

    const icon = (
        <div className="icon-container">
            <img className="icon-image" alt={caption} src={imgSrc}/>
            <div className="icon-caption">{caption}</div>
        </div>
    );

    return (
        <Window wrapperClass="icon-container" wrapperContent={icon} caption={caption}>
            {children}
        </Window>
    );
}

export default Icon;