import { useCallback, useEffect, useState } from "react";
import "./addNewProduct.scss";
import { ImagePreview, weSendToServerHouse } from "../../types/home";
import { useCreatePropertyMutation } from "../../api/endpoints/propertiesApiSlice";
import { AddNewForm } from "../../components/layout/AddNew";
import { useUploadImgMutation } from "../../api/endpoints/uploadImg";
import Loading from "../../components/common/Loading/Loading";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectedUserLocation } from "../../store/slices/userLocationSlice";
import { useURLState } from "../../hooks/useURLState";
import { errorToast, infoToast, succesToast } from "../../store/slices/Toast/toastSlice";
import { validateFormData } from "../../utils/validateFormData";

const AddNewProduct = () => {
  const dispatch = useAppDispatch();
  const { getParam } = useURLState();
  const initialCategory = getParam("main-new-product");
  const newConstruction = getParam("new-construction");

  const [createProperty, { isLoading: isCreating }] =
    useCreatePropertyMutation();
  const [uploadImg, { isLoading: isUploading }] = useUploadImgMutation();
  const userLocation = useAppSelector(selectedUserLocation);

  const getInitialFormData = (
    isNewConstruction: boolean = false
  ): weSendToServerHouse => ({
    title: "",
    text: "",
    address: {
      city: "",
      district: "",
      street: "",
      house_number: "",
      apartment: null,
      coordinates: {
        lat: userLocation.lat,
        long: userLocation.lon,
      },
    },
    images: [] as ImagePreview[],
    property_class: "Комфорт",
    inputNumber: "",
    details: {
      type: isNewConstruction ? newConstruction : initialCategory,
      year_built: new Date().getFullYear(),
      material: "",
      area: "",
      rooms: 0,
      floor: "",
      price: 0,
      currency: "rub",
      price_per_m2: 0,
      nearby_facilities: [],
      comment: "",
      renovation: "",
      bathroom: "",
      balcony: "",
      mortgage: false,
      is_urgent: false,
      views: 0,
      favorites: 0,
      heating: "",
      ceiling_height: "",
      parking: "",
      published_date: new Date().toISOString(),
      ...(isNewConstruction && {
        completion_year: new Date().getFullYear() + 10,
      }),
    },
  });

  const [formData, setFormData] = useState<weSendToServerHouse>(() =>
    getInitialFormData(Boolean(newConstruction))
  );

  useEffect(() => {
    if (newConstruction) {
      setFormData(getInitialFormData(true));
    } else if (initialCategory) {
      setFormData(getInitialFormData(false));
    }
  }, [newConstruction, initialCategory]);

  const handleUpload = useCallback(
    async (files: File[]) => {
      try {
        const formData = new FormData();
        files?.forEach((file) => formData.append("images", file));
        const res = await uploadImg({ formData, multiple: true }).unwrap();
        return res;
      } catch (error) {
        console.log(error);
        dispatch(errorToast("Ошибка при загрузке изображений"));
      }
    },
    [uploadImg]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.images.length == 0) {
        dispatch(infoToast("Пожалуйста добавьте изображения"));
        return;
      }

      const validationResult = validateFormData(formData);
      if (!validationResult.isValid) {
        dispatch(infoToast(validationResult.errors.join("\n")));
        return;
      }

      // 1. Разделяем изображения на новые и уже загруженные
      const existingImages = formData.images.filter(
        (img) => img.path && !img.file // уже загруженные, нет file
      );

      const newFiles = formData.images
        .filter((img) => img.file) // новые, есть file
        .map((img) => img.file!); // убираем undefined

      let uploadedImages: { path: string; preview: string }[] = [];

      // 2. Загружаем новые изображения, если есть
      if (newFiles.length > 0) {
        try {
          const res = await handleUpload(newFiles);
          if (Array.isArray(res?.filePath)) {
            uploadedImages = res.filePath.map((path: string) => ({
              path,
              preview: path,
            }));
          } else if (res?.filePath) {
            uploadedImages = [{ path: res.filePath, preview: res.filePath }];
          }
        } catch (error) {
          console.log("Ошибка загрузки изображений", error);
          dispatch(infoToast("Ошибка загрузки изображений"));
          return;
        }
      }
      // 3. Объединяем все изображения
      const allImages = [...existingImages, ...uploadedImages];

      const newFormData = { ...formData, images: allImages };
      setFormData(newFormData);

      try {
        let res = await createProperty(newFormData).unwrap();
        console.log(res);
        dispatch(succesToast("Объявление успешно создано"));
      } catch (error) {
        console.log(error);
        dispatch(infoToast("Пожалуйста заполните все поля внимательно"));
      }
    },
    [formData, createProperty]
  );

  return (
    <div className="add-new-product container">
      {(isCreating || isUploading) && <Loading />}

      <div className="add-new-product__container">
        <AddNewForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddNewProduct;

//  врозникла ошибка если изображение уже загржено на сервер и после успешной загрузки мы получили ошибку в других частях кода и исправив код при повторнрой отправке мы уже получаем ошибку изображения говорится то что нет такого изображения в файлах потому что уже вторая попытка не хранит себе в изображения файлы а хранит лишь пути к серверу и было придумано решение сделать так чтобы вторая попытка хранила и файлы и пути к серверу allImages
// Кратко о работе кода:
// Проверка: Если нет изображений — выводим сообщение и прерываем отправку.
// Разделение изображений:
// Отдельно сохраняем уже загруженные (с path, но без file).
// Отдельно собираем новые изображения (с file).
// Загрузка новых файлов: Отправляем только новые изображения на сервер.
// Объединение изображений: Склеиваем старые и только что загруженные в один массив images.
// Формируем итоговые данные и отправляем их на сервер.
// Обработка ошибок: Если что-то пошло не так — выводим ошибку в консоль.
// Таким образом, уже загруженные изображения не перезагружаются, а новые добавляются корректно.
