// CompanyForm.jsx
import { useState, ChangeEvent, useEffect } from "react";
import "./CompanyForm.scss";
import Button from "../../../components/ui/Button/Button";
import HandleImage from "../../../components/common/HandleImage/HandleImage";
import { ImagePreview } from "../../../types/home";
import { useCreateCompanyMutation } from "../../../api/endpoints/companyApiSlice";
import Loading from "../../../components/common/Loading/Loading";
import {
  errorToast,
  succesToast,
} from "../../../store/slices/Toast/toastSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { CompanyType } from "../../../types/companyType";

const CompanyForm = ({
  data,
  isLoading,
}: {
  data: CompanyType | undefined;
  isLoading: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [createCompany, { isLoading: isCreating }] = useCreateCompanyMutation();

  const initialImages: ImagePreview[] = [];
  const initialForm = {
    images: initialImages,
    name: "",
    description: "",
    website: "",
    email: "",
  };

  const [images, setImages] = useState<ImagePreview[]>(initialImages);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        ...data,
      });
      setImages(data.images);
    } else {
      setFormData(initialForm);
      setImages(initialImages);
    }
  }, [data]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("name", formData.name);
    newForm.append("description", formData.description);
    newForm.append("website", formData.website);
    newForm.append("email", formData.email);

    // Handle images - only append new files, keep existing paths
    images.forEach((image) => {
      if (image.file) {
        newForm.append("images", image.file as File);
      } else if (image.path) {
        newForm.append("existingImages", image.path);
      }
    });

    try {
      await createCompany(newForm).unwrap();
      dispatch(succesToast("Компания успешно создана"));
    } catch (error) {
      console.error("Error creating company:", error);
      dispatch(errorToast("Ошибка при создании компании"));
    }
  };

  const handleImageChange = (images: ImagePreview[]) => {
    setImages(images);
    setFormData({ ...formData, images });
  };

  return (
    <form className="company-form" onSubmit={handleSubmit}>
      {(isCreating || isLoading) && <Loading />}
      <label className="image-upload">
        <HandleImage
          onChange={handleImageChange}
          images={images}
          setImages={setImages}
        />
      </label>

      <input
        type="text"
        name="name"
        placeholder="Название компании"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Описание компании"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="url"
        name="website"
        placeholder="Сайт (опционально)"
        value={formData.website}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Контактный Email"
        value={formData.email}
        onChange={handleChange}
      />

      <Button type="submit">Сохранить</Button>
    </form>
  );
};

export default CompanyForm;
