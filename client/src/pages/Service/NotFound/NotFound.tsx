import "./notFound.scss";
import notFound from "../../../../public/utya/notFound.json";
import Lottie from "lottie-react";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404</h2>
      <Lottie
        animationData={notFound}
        loop={true}
        className="not-found__lottie"
      />
    </div>
  );
};

export default NotFound;
