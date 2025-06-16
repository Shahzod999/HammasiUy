import "./formSection.scss";
import useRequestPhoneNumber from "../../../hooks/useRequestPhoneNumber";
import { ChangeEvent } from "react";
import SVG from "react-inlinesvg";

interface ContactFormProps {
  number: string;
  onChange: (data: string) => void;
}

const ContactForm = ({ number, onChange }: ContactFormProps) => {
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id;
  const userName = tg?.initDataUnsafe?.user?.username;
  const { requestPhoneNumber } = useRequestPhoneNumber();

  const numberFormater = (value: string) => {
    const forfatedValue = value.startsWith("+") ? value : `+${value}`;
    return forfatedValue;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const forfatedValue = numberFormater(value);
    onChange(forfatedValue);
  };

  const handleRequestPhone = async () => {
    try {
      const phoneNumber = await requestPhoneNumber();
      const forfatedValue = numberFormater(phoneNumber);
      onChange(forfatedValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-section">
      <h2 className="form-section__title">Контактная информация</h2>

      <div className="form-section__content">
        <div className="form-field">
          <label htmlFor="phone" className="form-field__label">
            Телефон
          </label>
          <div className="form-field__input-wrapper">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={number}
              onChange={handleChange}
              className="form-field__input"
              placeholder="+998 (XX) XXX-XX-XX"
              required
              inputMode="tel"
            />

            <span
              onClick={handleRequestPhone}
              className="form-field__request-phone shimer">
              <SVG src="/svg/contact.svg" />
            </span>
          </div>

          <span className="form-field__helper-text">Формат: +998XXXXXXXXX</span>
        </div>

        <div className="form-field">
          <label htmlFor="telegram" className="form-field__label">
            Telegram
          </label>
          <input
            type="text"
            id="telegram"
            name="telegram"
            value={`@${userName}`}
            disabled
            className="form-field__input"
            placeholder="@username"
          />
        </div>

        <div className="form-field">
          <label htmlFor="user_id" className="form-field__label">
            ID пользователя
          </label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={userId}
            disabled
            className="form-field__input"
            placeholder="ID пользователя в системе"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
