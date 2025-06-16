import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const tg = window.Telegram?.WebApp;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    headers.set(
      "user-id",
      tg?.initDataUnsafe?.user?.id?.toString() || import.meta.env.VITE_USER_ID
    );
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Properties", "Company"],
  endpoints: () => ({}),
});

// Экспорт хуков, автоматически генерируемых RTK Query
export const {
  // Здесь будут экспортироваться хуки, созданные для каждого эндпоинта
} = apiSlice;
