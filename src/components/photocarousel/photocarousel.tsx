import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import CSS
import { Carousel } from "react-responsive-carousel";
import './photocarousel.css';

interface Props {
    images: string[]; // La prop 'images' est un tableau de chaînes
}

const PhotoCarousel = ({ images  } : Props) => {
    return (
        <div className="carousel-container">
            <h2>  </h2>
            <Carousel
                showArrows={true}
                showThumbs={true}
                showStatus={false}
                infiniteLoop
                autoPlay
                swipeable
                emulateTouch
            >
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default PhotoCarousel;