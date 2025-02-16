import React, { useState, useEffect } from 'react';
import './Snackbar.scss';

interface SnackbarProps {
    message: string;
    duration?: number;
    type?: 'success' | 'error' | 'info';
    onClose?: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
                                               message,
                                               duration = 3000,
                                               type = 'info',
                                               onClose
                                           }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return isVisible ? (
        <div className={`snackbar snackbar-${type}`}>
            <p className="snackbar-message">{message}</p>
            <button
                className="snackbar-close"
                onClick={() => {
                    setIsVisible(false);
                    if (onClose) onClose();
                }}
            >
                ×
            </button>
        </div>
    ) : null;
};

export default Snackbar;