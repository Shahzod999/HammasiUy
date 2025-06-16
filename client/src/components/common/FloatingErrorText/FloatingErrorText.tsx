import "./FloatingErrorText.scss";

const FloatingErrorText = ({
  text,
  isVisible,
}: {
  text: string;
  isVisible: boolean;
}) => {
  if (!isVisible) return null;
  return (
    <div className="floating-error-text">
      <strong>{text}</strong>
    </div>
  );
};

export default FloatingErrorText;
