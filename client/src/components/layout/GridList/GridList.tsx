import { useCallback } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { addToFavorite } from "../../../store/slices/Product/productFavoriteSlice";
import { House } from "../../../types/home";
import HorizontalCard from "../../common/ProductCard/HorizontalCard/HorizontalCard";
import SwipeableItem from "../../common/SwipeableItem/SwipeableItem";
import "./gridList.scss";

const GridList = ({ products }: { products: House[] | undefined }) => {
  const dispatch = useAppDispatch();

  const handleSwipeRight = (house: House) => {
    dispatch(addToFavorite(house));
  };
  const handleChat = useCallback((user_name: string) => {
    window.Telegram.WebApp.openTelegramLink(`https://t.me/${user_name}`);
  }, []);
  return (
    <div className="grid-list">
      {products?.map((item: House) => (
        <SwipeableItem
          onEditIcon={"/svg/telegram.svg"}
          onDeleteIcon={"/svg/whiteHeart.svg"}
          onEdit={() => handleChat(item.contact.user_name)}
          onDelete={() => handleSwipeRight(item)}
          key={item._id}>
          <HorizontalCard {...item} />
        </SwipeableItem>
      ))}
    </div>
  );
};

export default GridList;
