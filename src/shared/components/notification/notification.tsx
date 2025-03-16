import React, { useState } from 'react';
import './notification.css'
import { NotificationContext } from './hook/hook-notification';

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Array<{ id: number; type: string; message: string }>>([]);

    const addNotification = (type: string, message: string, duration = 3000): number => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, type, message }]);

        setTimeout(() => {
            removeNotification(id);
        }, duration);

        return id;
    };

    const removeNotification = (id: number): void => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ addNotification, removeNotification }}>
            {children}
            <div className="notification-container">
                {notifications.map(({ id, type, message }) => (
                    <div
                        key={id}
                        className={`notification ${type === "success" ? "success" : "error"}`}
                    >
                        <span>{message}</span>
                        <button
                            onClick={() => removeNotification(id)}
                            className="close-button"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};