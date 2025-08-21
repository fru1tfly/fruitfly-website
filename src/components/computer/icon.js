import Window from "./Window";
import { useNavigate } from "react-router";

const Icon = (props) => {
    const {imgSrc, caption, isLink, url, children, open} = props;
    const navigate = useNavigate();

    const handleClick = () => {
        if(isLink) {
            navigate(url);
        }
    }

    const icon = (
        <>
            <img className="icon-image" alt={caption} src={imgSrc} onClick={handleClick}/>
            <div className="icon-caption" onClick={handleClick}>{caption}</div>
        </>
    );

    return (
        <Window wrapperClass="icon-container" wrapperContent={icon} caption={caption} open={open}>
            {children}
        </Window>
    );
}

export default Icon;