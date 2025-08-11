const ErrorTooltip = ({ text }) => {
    return (
        <div className="error-tooltip-container">
            <div className="error-tooltip-header">
                Error
            </div>
            <div className="error-tooltip-body">
                {text}
            </div>
        </div>
    );
};

export default ErrorTooltip;