import Lottie from "lottie-react";
import Button from "../../ui/Button/Button";
import empty from "../../../../public/utya/empty.json";
import { useNavigate } from "react-router-dom";
import "./emptyPage.scss";
const EmptyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="empty">
      <Lottie animationData={empty} className="emptyAnimation" />
      <p>Пока ничего нет </p>
      <Button variant="primary" size="large" onClick={() => navigate("/")}>
        Перейти в каталог
      </Button>
    </div>
  );
};

export default EmptyPage;
