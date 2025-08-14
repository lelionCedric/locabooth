import { useEffect, useRef, useState } from 'react';
import './fonctionnement.css';

const Fonctionnement = () => {
    const [selectedStep, setSelectedStep] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const circleRef = useRef(null);

    useEffect(() => {
        // Détection mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Animation d'apparition du cercle
        const circle = circleRef.current;
        if (circle) {
            circle.style.opacity = '0';
            circle.style.transform = 'scale(0.8)';
            circle.style.transition = 'all 0.8s ease';

            setTimeout(() => {
                circle.style.opacity = '1';
                circle.style.transform = 'scale(1)';
            }, 200);
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const stepData = [
        {
            id: 1,
            title: "Démarrage",
            description: "Touchez l'écran pour commencer",
            icon: "📱",
            path: ["/process/step_1.png"],
        },
        {
            id: 2,
            title: "Format",
            description: "Choisissez votre style de photo",
            icon: "🖼️",
            path: ["/process/step_2.png", "/process/step_2_2.png"],
        },
        {
            id: 3,
            title: "Photo",
            description: "Souriez ! La photo est prise",
            icon: "📸",
            path: ["/process/step_5.png"],
        },
        {
            id: 4,
            title: "Montage",
            description: "Patientez le temps du montage",
            icon: "⏰",
            path: ["/process/step_4.png"],
        },
        {
            id: 5,
            title: "Rendu",
            description: "Visualisez vos photos",
            icon: "🖼️",
            path: ["/process/step_5.png", "/process/step_5_2.png", "/process/step_5_3.png"],
        }
    ];

    const multiImageSteps = [2, 5]; // Étapes avec 2 images

    const currentStep = stepData.find(step => step.id === selectedStep);

    // Fonction pour calculer les positions des étapes autour du cercle avec symétrie parfaite
    const getStepPosition = (index: number, total: number) => {
        // Angle calculé pour avoir une répartition parfaite, en commençant par le haut (12h)
        const angle = (index * 360 / total - 90) * Math.PI / 180; // -90° pour que la première étape soit en haut
        const radius = 140; // Distance parfaite du centre
        const centerX = 200; // Centre exact du conteneur (400px / 2)
        const centerY = 200; // Centre exact du conteneur (400px / 2)

        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    };

    // Fonction pour générer le chemin SVG d'une flèche entre deux points avec symétrie parfaite
    const getArrowPath = (fromIndex: number, toIndex: number) => {
        const fromPos = getStepPosition(fromIndex, stepData.length);
        const toPos = getStepPosition(toIndex, stepData.length);

        // Rayon des cercles d'étapes pour calculer les points de contact
        const stepRadius = 40;
        const dx = toPos.x - fromPos.x;
        const dy = toPos.y - fromPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Points de départ et d'arrivée sur les bords des cercles
        const startX = fromPos.x + (dx / distance) * stepRadius;
        const startY = fromPos.y + (dy / distance) * stepRadius;
        const endX = toPos.x - (dx / distance) * stepRadius;
        const endY = toPos.y - (dy / distance) * stepRadius;

        // Créer un arc parfaitement courbé vers l'extérieur pour une symétrie élégante
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;

        // Point de contrôle décalé vers l'extérieur pour créer un arc symétrique
        const perpX = -dy / distance * 30; // Courbure plus prononcée pour plus d'élégance
        const perpY = dx / distance * 30;
        const controlX = midX + perpX;
        const controlY = midY + perpY;

        return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
    };

    // Descriptions détaillées pour chaque étape
    const getDetailedDescription = (stepId: number) => {
        const descriptions = {
            1: "L'écran d'accueil du photobooth s'affiche. Touchez n'importe où pour démarrer votre session photo.",
            2: "Choisissez parmi les différents formats disponibles : photos individuelles, double, triple etc...",
            3: "Positionnez-vous devant l'objectif et suivez les instructions. Un compte à rebours vous aide à vous préparer.",
            4: "La photo est prise automatiquement. Vous pouvez voir un aperçu du résultat à l'écran.",
            5: "Vos photos sont enregistrées automatiquement. Un lien vous sera transmis pour les récupérer !"
        };
        return descriptions[stepId] || "";
    };

    // Rendu mobile spécifique
    const renderMobileLayout = () => (
        <div className="circle-container" ref={circleRef}>
            <div className="center-circle">
                <div className="center-content">
                    <div className="center-icon">{currentStep?.icon}</div>
                    <div className="center-info">
                        <div className="center-title">{currentStep?.title}</div>
                        <div className="center-description">{currentStep?.description}</div>
                    </div>
                </div>
            </div>

            {/* Étapes en grille sur mobile */}
            <div className="steps-mobile-container">
                {stepData.map((step) => (
                    <div
                        key={step.id}
                        className={`step-node ${selectedStep === step.id ? 'active' : ''}`}
                        onClick={() => setSelectedStep(step.id)}
                    >
                        <div className="step-number">{step.id}</div>
                        <div className="step-label">{step.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Rendu desktop (layout circulaire)
    const renderDesktopLayout = () => (
        <div className="circle-container" ref={circleRef}>
            <div className="center-circle">
                <div className="center-content">
                    <div className="center-icon">{currentStep?.icon}</div>
                    <div className="center-title">{currentStep?.title}</div>
                    <div className="center-description">{currentStep?.description}</div>
                </div>
            </div>

            {/* SVG pour toutes les flèches */}
            <svg className="arrows-svg">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon
                            points="0 0, 10 3.5, 0 7"
                            className="arrow-marker"
                        />
                    </marker>
                </defs>
                {stepData.map((step, index) => {
                    const nextIndex = (index + 1) % stepData.length;
                    return (
                        <path
                            key={`arrow-${step.id}`}
                            d={getArrowPath(index, nextIndex)}
                            className="arrow-path"
                            markerEnd="url(#arrowhead)"
                        />
                    );
                })}
            </svg>

            {/* Étapes positionnées autour du cercle */}
            {stepData.map((step, index) => {
                const position = getStepPosition(index, stepData.length);
                return (
                    <div
                        key={step.id}
                        className={`step-node ${selectedStep === step.id ? 'active' : ''}`}
                        style={{
                            left: `${position.x}px`,
                            top: `${position.y}px`
                        }}
                        onClick={() => setSelectedStep(step.id)}
                    >
                        <div className="step-number">{step.id}</div>
                        <div className="step-label">{step.title}</div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="photobooth-guide">
            <div className="container">
                <div className="header">
                    <h1>Guide Photobooth</h1>
                    <p>Cliquez sur une étape pour voir les captures d'écran</p>
                </div>

                <div className="main-content">
                    {/* Utilisation conditionnelle du layout selon la taille d'écran */}
                    {isMobile ? renderMobileLayout() : renderDesktopLayout()}

                    {/* Zone d'affichage des images */}
                    <div className="images-section">
                        <div className="images-container">
                            {multiImageSteps.includes(selectedStep) ? (
                                // Étapes avec 2 images
                                <div className="double-images">
                                    <div className="image-placeholder">
                                        <div className="placeholder-content">
                                            <img className="placeholder-icon" src={currentStep?.path[0]} alt={currentStep?.path[0]}/>
                                        </div>
                                    </div>
                                    <div className="image-placeholder">
                                        <div className="placeholder-content">
                                            <img className="placeholder-icon" src={currentStep?.path[1]} alt={currentStep?.path[1]}/>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Étapes avec 1 image
                                <div className="single-image">
                                    <div className="image-placeholder large">
                                        <div className="placeholder-content">
                                            <img className="placeholder-icon" src={currentStep?.path[0]} alt={currentStep?.path[0]}/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="step-details">
                            <h3>Étape {selectedStep} : {currentStep?.title}</h3>
                            <p>{getDetailedDescription(selectedStep)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fonctionnement;