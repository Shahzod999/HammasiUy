import { useEffect, useMemo, useState } from "react";
import SwipeTinderEffect from "../../components/common/SwipeableItem/SwipeTinderEffect";
import "./HomePage.scss";

import { House } from "../../types/home";
import { useAppDispatch } from "../../hooks/redux";
import { addToFavorite } from "../../store/slices/Product/productFavoriteSlice";
import HomeCard from "../../components/common/ProductCard/HomeCard/HomeCard";
import { useGetPropertiesQuery } from "../../api/endpoints/propertiesApiSlice";
import ErrorPage from "../../components/common/ErrorPage/ErrorPage";
import HomeCardSkeleton from "../../components/layout/Skeleton/HomeCardSkeleton/HomeCardSkeleton";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useGetPropertiesQuery("");
  const [properties, setProperties] = useState<House[]>([]);

  useEffect(() => {
    if (data?.properties) {
      setProperties(data.properties);
    }
  }, [data]);

  const handleSwipeRight = (house: House) => {
    dispatch(addToFavorite(house));
    console.log(house);

    if (properties.length > 0) {
      setProperties((prev) => prev.slice(1));
    }
  };

  const handleSwipeLeft = () => {
    if (properties.length > 0) {
      setProperties((prev) => prev.slice(1));
    }
  };

  const MAX_VISIBLE_CARDS = 3;
  const visibleProperties = useMemo(
    () => properties.slice(0, MAX_VISIBLE_CARDS),
    [properties]
  );

  if (error) return <ErrorPage />;
  if (properties?.length === 0) return;

  return (
    <main className="home-page container container__side">
      <section className="card-stack">
        {isLoading ? (
          <HomeCardSkeleton />
        ) : (
          visibleProperties?.map((house, index) => (
            <div
              className="card-stack__item"
              key={house._id}
              style={{
                zIndex: properties?.length - index,
                transform: `scale(${1 - index * 0.08})`,
              }}>
              <SwipeTinderEffect
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={() => handleSwipeRight(house)}>
                <HomeCard {...house} />
              </SwipeTinderEffect>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default HomePage;
