import "./error.css"

const Error = () => {
    const pabloGif = "/404_not_found.gif"
    return (
        <div className="error-container">
            <div className="error-message">
                <h1>Oups !</h1>
                <img src={pabloGif} alt="Pablo qui patiente devant la piscine" className="error-image"/>
                <p>L'URL que vous recherchez n'a pas été trouvée.</p>
                <p>Retournez à la page d'accueil ou essayez un autre lien.</p>
            </div>
        </div>
    );
};

export default Error;
