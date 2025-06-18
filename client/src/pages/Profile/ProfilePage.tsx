import "./ProfilePage.scss";
import SVG from "react-inlinesvg";
import HorizontalCard from "../../components/common/ProductCard/HorizontalCard/HorizontalCard";
import Statistics from "../../components/common/ProductCard/ui/Statistics";
import SwipeableItem from "../../components/common/SwipeableItem/SwipeableItem";
import { useURLState } from "../../hooks/useURLState";
import OpenFromSide from "../../components/common/OpenFromSide/OpenFromSide";
import { AddNewForm } from "../../components/layout/AddNew";
import { weSendToServerHouse } from "../../types/home";
import { useEffect, useMemo, useState } from "react";
import {
  useGetMyPropertiesQuery,
  useUpdatePropertyMutation,
} from "../../api/endpoints/propertiesApiSlice";
import Loading from "../../components/common/Loading/Loading";
import ErrorPage from "../../components/common/ErrorPage/ErrorPage";
import { useDeletePropertyMutation } from "../../api/endpoints/propertiesApiSlice";
import ConfirmToast from "../../components/layout/ConfirmToast/ConfirmToast";
import { useUploadImgMutation } from "../../api/endpoints/uploadImg";
import {
  errorToast,
  infoToast,
  succesToast,
} from "../../store/slices/Toast/toastSlice";
import { useAppDispatch } from "../../hooks/redux";
import Me from "./Me/Me";
const AdminPage = () => {
  const dispatch = useAppDispatch();
  const [deleteProperty, { isLoading: isDeleting }] =
    useDeletePropertyMutation();
  const [updateProperty, { isLoading: isUpdating }] =
    useUpdatePropertyMutation();
  const { setParam, getParam, deleteParam } = useURLState();
  const [uploadImg, { isLoading: isUploading }] = useUploadImgMutation();

  const { data, isLoading, error } = useGetMyPropertiesQuery();

  const editProductId = getParam("editProduct");
  const confirmDelete = getParam("confirmDelete");

  const handleRemove = async (id: string | null) => {
    if (!id) return;
    try {
      await deleteProperty(id).unwrap();
    } catch (error) {
      console.log(error);
    }
    deleteParam("confirmDelete");
  };

  const editProduct = useMemo(
    () => data?.properties.find((item) => item._id === editProductId),
    [data, editProductId]
  );

  const [formData, setFormData] = useState<weSendToServerHouse | undefined>(
    editProduct
  );

  useEffect(() => {
    if (editProduct) {
      setFormData(editProduct);
    }
  }, [editProduct]);

  // позже надо обьеденить функции выгрузки изображения с AddNewProduct
  const handleUpload = async (files: File[]) => {
    try {
      const formData = new FormData();
      files?.forEach((file) => formData.append("images", file));
      const res = await uploadImg({ formData, multiple: true }).unwrap();
      return res;
    } catch (error) {
      console.log(error);
      dispatch(errorToast("Ошибка при загрузке изображений"));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData || !editProductId) return;
    // Separate new images (with file property) from existing images
    const newImageFiles = formData.images
      .filter((image) => image.file)
      .map((image) => image.file)
      .filter(Boolean);

    // Keep existing images (those without file property)
    const existingImages = formData.images.filter((image) => !image.file);

    // Only upload new images if there are any
    let newImages = [];
    if (newImageFiles.length > 0) {
      const res = await handleUpload(newImageFiles as File[]);
      newImages = Array.isArray(res?.filePath)
        ? res.filePath.map((path: string) => ({
            path,
            preview: path,
          }))
        : res?.filePath
        ? [{ path: res.filePath, preview: res.filePath }]
        : [];
    }

    // Combine existing images with new images
    const combinedImages = [...existingImages, ...newImages];
    const newFormData = { ...formData, images: combinedImages };
    setFormData(newFormData);

    try {
      await updateProperty({
        id: editProductId,
        property: newFormData,
      }).unwrap();
      dispatch(succesToast("Объявление успешно обновлено"));
    } catch (error) {
      console.log(error);
      dispatch(infoToast("Ошибка при обновлении объявления"));
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;
  return (
    <>
      {(isDeleting || isUpdating || isUploading) && <Loading />}
      <div className="profile-page container">
        <Me />
        {data?.properties.length === 0 ? (
          <div className="profile-page__empty">
            <SVG src="/svg/myHome.svg" />
            <p>У вас пока нет объявлений</p>
          </div>
        ) : (
          <main className="profile-page__content">
            {data?.properties.map((item) => (
              <SwipeableItem
                onEditIcon={"/svg/fix.svg"}
                onEdit={() => setParam("editProduct", item._id)}
                onDelete={() => setParam("confirmDelete", item._id)}
                key={item._id}>
                <div className="profile-page__card">
                  <HorizontalCard {...item} />
                  <Statistics details={item.details} />
                </div>
              </SwipeableItem>
            ))}
          </main>
        )}
      </div>

      <OpenFromSide
        isOpen={Boolean(editProductId)}
        onClose={() => deleteParam("editProduct")}>
        <div className="editProduct container">
          {formData && (
            <AddNewForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleUpdate}
            />
          )}
        </div>
      </OpenFromSide>

      <ConfirmToast
        isOpen={Boolean(confirmDelete)}
        title="Вы уверены, что хотите удалить объявление?"
        red="Отменить"
        blue="Удалить"
        ActionClick={() => handleRemove(confirmDelete)}
        onCancel={() => deleteParam("confirmDelete")}>
        <div className="confirmDelete__warning">
          <SVG src="/svg/error.svg" />
        </div>
      </ConfirmToast>
    </>
  );
};

export default AdminPage;

// обьеденить логику и функции с AddNewProduct
