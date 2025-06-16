import Lottie from "lottie-react";
import heart from "../../../../public/utya/heart.json";
import "./heart.scss";

const Heart = () => {
  return (
    <div className="toast__heart">
      <div className="toast__heart__content">
        <Lottie animationData={heart} />
      </div>
    </div>
  );
};

export default Heart;
