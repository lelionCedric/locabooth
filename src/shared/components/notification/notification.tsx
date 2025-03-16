import React, { createContext, useContext, useState } from 'react';
import './notification.css'

// Définir l'interface pour le contexte
interface NotificationContextType {
    addNotification: (type: string, message: string, duration?: number) => number;
    removeNotification: (id: number) => void;
}

// Créer le contexte avec une valeur initiale qui respecte l'interface
const NotificationContext = createContext<NotificationContextType>({
    addNotification: () => 0, // Retourne un ID fictif
    removeNotification: () => {} // Ne fait rien
});

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

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};