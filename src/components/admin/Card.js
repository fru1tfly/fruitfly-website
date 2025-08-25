const Card = ({children}) => {
    return (
        <div className={`heavy-border login-card full-center`}>
            {children}
        </div>
    );
};

export default Card;