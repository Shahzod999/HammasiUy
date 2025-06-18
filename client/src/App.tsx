import { useEffect } from "react";
import AppRouter from "./routes";
import "./i18n";
import { useCloudStorage } from "./hooks/useCloudStorage";
import i18n from "./i18n";
import { useLocation } from "./utils/locationUtils";
import { useCreateUserMutation } from "./api/endpoints/userApiSlie";
import Loading from "./components/common/Loading/Loading";
import { tg } from "./utils/telegramWebApp";
import { ErrorType } from "./types/commonType";

const App = () => {
  const { value: language } = useCloudStorage("language", "ru");
  const { handleLocation } = useLocation();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    handleLocation();
  }, [handleLocation]);

  // при первом заходе в приложение, создаем пользователя
  useEffect(() => {
    // if (localStorage.getItem("user")) {
    //   const user = JSON.parse(localStorage.getItem("user") || "{}");
    //   console.log(user);
    //   return;
    // }
    const handleCreateUser = async () => {
      const user = {
        user_id: tg?.initDataUnsafe?.user?.id || import.meta.env.VITE_USER_ID,
        user_name:
          tg?.initDataUnsafe?.user?.username || import.meta.env.VITE_USER_NAME,
        profile_name:
          tg?.initDataUnsafe?.user?.first_name ||
          import.meta.env.VITE_PROFILE_NAME,
        phone: "",
      };
      try {
        let res = await createUser(user).unwrap();
        // localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log(res);
      } catch (error) {
        console.log((error as ErrorType).data.message);
      }
    };
    handleCreateUser();
  }, []);

  if (isCreating) return <Loading />;
  return <AppRouter />;
};

export default App;
