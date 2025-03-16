import "./social-network.css";
import {SocialIcon} from "react-social-icons";

const SocialNetwork = () => {
    return (
        <div className="list__social_icon">
            <SocialIcon network="facebook" style={{ height: 30, width:30}}/>
            <SocialIcon network="instagram"  style={{ height: 30, width:30}}/>
            <SocialIcon network="twitter" style={{ height: 30, width:30}}/>
        </div>
);
};
export default SocialNetwork;
