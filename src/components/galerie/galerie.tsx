import './galerie.css';
import {useEffect, useRef, useState} from "react";

interface Props {
    images: string[]; // La prop 'images' est un tableau de chaînes
}

const Galerie = ({ images }: Props) => {
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target instanceof HTMLElement) {
                        const index = parseInt(entry.target.dataset.index || "0", 10);

                        if (entry.isIntersecting) {
                            // Ajouter à l'ensemble des images visibles
                            setVisibleItems((prev) => new Set(prev.add(index)));
                        } else {
                            // Retirer de l'ensemble des images visibles
                            setVisibleItems((prev) => {
                                const newSet = new Set(prev);
                                newSet.delete(index);
                                return newSet;
                            });
                        }
                    }
                });
            },
            {
                threshold: 0.3, // 30% de visibilité pour activer/désactiver
            }
        );

        const container = containerRef.current;
        if (container) {
            const items = container.querySelectorAll(".gallery-item");
            items.forEach((item) => observer.observe(item));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="gallery-container" ref={containerRef}>
            {/* Overlay pour l'image sélectionnée */}
            {selectedImage && (
                <div className="overlay" onClick={() => setSelectedImage(undefined)}>
                    <img src={selectedImage} alt="Selected" className="overlay-image" />
                </div>
            )}

            {/* Grille d'images */}
            <div className="gallery-grid">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`gallery-item ${visibleItems.has(index) ? "visible" : "visible"}`}
                        data-index={index}
                        onClick={() => setSelectedImage(image)}
                    >
                        <img src={image} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Galerie;
