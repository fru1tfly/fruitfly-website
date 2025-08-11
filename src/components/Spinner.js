import { ScaleLoader } from 'react-spinners';

const Spinner = ({ visible, children }) => {
    return (
        <>
            {visible && 
                <div className="spinner-background">
                    <div className="full-center spinner">
                        <ScaleLoader
                            loading={visible}
                            size={150}
                        />
                    </div>
                </div>
            }
            {children}
        </>
    );
};

export default Spinner;