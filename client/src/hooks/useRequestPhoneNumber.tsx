import { useState } from "react";

const useRequestPhoneNumber = () => {
  const [isLoading, setIsLoading] = useState(false);

  const requestPhoneNumber = () => {
    return new Promise<string>((resolve, reject) => {
      if (!window.Telegram?.WebApp) {
        reject("Telegram WebApp не доступен");
        return;
      }

      const webAppVersion = window.Telegram.WebApp.version;
      if (parseFloat(webAppVersion) < 6.0) {
        reject("Метод requestContact больше не поддерживается в версии 6.0+");
        return;
      }

      setIsLoading(true);

      window.Telegram.WebApp.requestContact((sent: any, event: any) => {
        setIsLoading(false);

        if (sent && event?.responseUnsafe?.contact?.phone_number) {
          const phone = "+" + event.responseUnsafe.contact.phone_number;
          resolve(phone);
        } else {
          reject("Пользователь отклонил запрос");
        }
      });
    });
  };

  return { isLoading, requestPhoneNumber };
};

export default useRequestPhoneNumber;
