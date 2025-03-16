import React from "react";

// ErrorBoundary pour capturer les erreurs au niveau des composants
class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, { hasError: boolean }> {
    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.error("Erreur capturée par ErrorBoundary:", error);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Une erreur est survenue dans l'application.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;