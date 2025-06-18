import "./toast.scss";

import { useEffect } from "react";
import {
  removeToast,
  selectToastMessage,
} from "../../../store/slices/Toast/toastSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import SVG from "react-inlinesvg";

const Toast = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector(selectToastMessage);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(removeToast());
      }, 1500); // Убираем тост через 3 секунды
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleRemoveToast = () => {
    dispatch(removeToast());
  };

  if (!message) return null;
  return (
    <div className="square">
      <div className="square__box">
        <div className="square__box__text">
          <div className={`toast-container ${message.state}`}>
            {message.state && <SVG src={`/svg/${message.state}.svg`} />}
          </div>

          {message.state == "error" && <h3>Ошибка</h3>}
          {message.state == "info" && <h3>Внимание</h3>}
          {message.state == "success" && <h3>Успешно</h3>}
          <p>{message.text}</p>
        </div>

        <button onClick={handleRemoveToast}>Ok</button>
      </div>
    </div>
  );
};

export default Toast;
