const Card = ({children, className}) => {
    return (
        <div className={`heavy-border ${className}`}>
            {children}
        </div>
    );
};

export default Card;