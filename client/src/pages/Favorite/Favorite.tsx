import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  clearFavorites,
  deleteFromFavorite,
  selectedProductFavoriteSlice,
} from "../../store/slices/Product/productFavoriteSlice";
import "./favorite.scss";
import HorizontalCard from "../../components/common/ProductCard/HorizontalCard/HorizontalCard";
import SwipeableItem from "../../components/common/SwipeableItem/SwipeableItem";
import { useCallback, useState } from "react";
import ConfirmToast from "../../components/layout/ConfirmToast/ConfirmToast";
import uSure from "../../../public/utya/delete.json";
import HeaderTitle from "../../components/common/HeaderTitle/HeaderTitle";
import EmptyPage from "../../components/common/EmptyPage/EmptyPage";

const Favorite = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectedProductFavoriteSlice);
  const [confirm, setConfirm] = useState(false);

  const handleRemove = (id: string) => {
    dispatch(deleteFromFavorite(id));
  };

  const handleDelete = () => {
    setConfirm(true);
  };

  const clearFavorite = () => {
    dispatch(clearFavorites());
    setConfirm(false);
  };

  const handleChat = useCallback((user_name: string) => {
    window.Telegram.WebApp.openTelegramLink(`https://t.me/${user_name}`);
  }, []);

  return (
    <div className="favorite container">
      <HeaderTitle
        title="Избранное"
        icon={products.length !== 0 ? "/svg/trash.svg" : undefined}
        iconClick={handleDelete}
      />

      <ConfirmToast
        isOpen={confirm}
        red="нет"
        blue="yes"
        ActionClick={clearFavorite}
        onCancel={() => setConfirm(false)}
        tgs={uSure}
        title="Уверены очистить избранное?"
      />

      {products.length === 0 ? (
        <EmptyPage />
      ) : (
        <div className="favorite__list  container__side">
          {products.map((item) => (
            <SwipeableItem
              onEditIcon={"/svg/telegram.svg"}
              onEdit={() => handleChat(item.contact.user_name)}
              onDelete={() => handleRemove(item._id)}
              key={item._id}>
              <HorizontalCard {...item} />
            </SwipeableItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
