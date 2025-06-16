import React, { useState } from "react";
import styles2 from "./SwipeTinderEffect.module.scss";

interface SwipeTinderEffectProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeTinderEffect: React.FC<SwipeTinderEffectProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(1);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const threshold = 90; // Порог свайпа

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null || !isSwiping) return;

    const diff = e.touches[0].clientX - startX;
    setCurrentX(diff);

    // Уменьшаем прозрачность в зависимости от расстояния свайпа
    setOpacity(1 - Math.abs(diff) / 150);
  };

  const handleTouchEnd = () => {
    if (startX === null) return;

    if (currentX > threshold) {
      onSwipeRight();
    } else if (currentX < -threshold) {
      onSwipeLeft();
    }

    // Сбрасываем состояние после завершения свайпа
    setCurrentX(0);
    setOpacity(1);
    setStartX(null);
    setIsSwiping(false);
  };

  return (
    <div
      className={styles2.swipeableItem}
      style={{
        transform: `translateX(${currentX}px)`,
        opacity: opacity,
        transition: isSwiping
          ? "none"
          : "transform 0.3s ease, opacity 0.3s ease",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      {children}
    </div>
  );
};

export default SwipeTinderEffect;
