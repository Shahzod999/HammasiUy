// Форматируем дату публикации
export const formatDate = (dateString?: string) => {
  if (!dateString) return "Недавно";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("ru-RU", options);
};
