import { weSendToServerHouse } from "../types/home";

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateFormData = (data: weSendToServerHouse): ValidationResult => {
  const errors: string[] = [];

  // Основная информация
  if (!data.title?.trim()) {
    errors.push("Заголовок объявления обязателен");
  }

  if (!data.text?.trim()) {
    errors.push("Описание объявления обязательно");
  }

  // Адрес
  if (!data.address?.city?.trim()) {
    errors.push("Город обязателен");
  }

  if (!data.address?.district?.trim()) {
    errors.push("Район обязателен");
  }

  if (!data.address?.street?.trim()) {
    errors.push("Улица обязательна");
  }

  if (!data.address?.house_number?.trim()) {
    errors.push("Номер дома обязателен");
  }

  // Координаты
  if (!data.address?.coordinates?.lat || !data.address?.coordinates?.long) {
    errors.push("Укажите местоположение на карте");
  }

  // Детали недвижимости
  if (!data.details?.type) {
    errors.push("Тип недвижимости обязателен");
  }

  if (!data.details?.year_built) {
    errors.push("Год постройки обязателен");
  }

  if (!data.details?.material?.trim()) {
    errors.push("Материал стен обязателен");
  }

  if (!data.details?.area) {
    errors.push("Площадь обязательна");
  }

  if (data.details?.rooms === undefined || data.details?.rooms === null) {
    errors.push("Количество комнат обязательно");
  }
  if (!data.details?.floor?.trim()) {
    errors.push("Этаж обязателен");
  }

  if (!data.details?.price) {
    errors.push("Цена обязательна");
  } else if (data.details.price <= 0) {
    errors.push("Цена должна быть больше 0");
  }

  if (!data.details?.renovation?.trim()) {
    errors.push("Тип ремонта обязателен");
  }

  if (!data.details?.bathroom?.trim()) {
    errors.push("Тип санузла обязателен");
  }

  if (!data.details?.ceiling_height) {
    errors.push("Высота потолков обязательна");
  }

  // Для новостроек
  if (
    data.details?.completion_year &&
    (data.details.completion_year < new Date().getFullYear() ||
      data.details.completion_year > new Date().getFullYear() + 20)
  ) {
    errors.push("Укажите корректный год сдачи новостройки");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
