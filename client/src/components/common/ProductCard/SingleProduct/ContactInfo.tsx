import { useCallback } from "react";
import SVG from "react-inlinesvg";
import { Contact } from "../../../../types/home";

interface ContactInfoProps {
  contact: Contact;
  inputNumber: string;
}

const ContactInfo = ({ contact, inputNumber }: ContactInfoProps) => {
  const handleCall = useCallback(() => {
    window.open(`tel:${inputNumber}`, "_blank");
  }, [inputNumber]);
  
  const handleChat = useCallback(() => {
    window.Telegram.WebApp.openTelegramLink(
      `https://t.me/${contact.user_name}`
    );
  }, [contact.user_name]);

  return (
    <div className="contact-info">
      <div className="contact-item">
        <SVG src="/svg/phone.svg" className="icon" />
        <span onClick={handleCall}>{inputNumber}</span>
      </div>
      <div className="contact-item">
        <SVG src="/svg/telegram.svg" className="icon" />
        <span onClick={handleChat}>{contact.user_name}</span>
      </div>
    </div>
  );
};

export default ContactInfo;
