// Скрипт инициализации базы данных MongoDB
// Выполняется при первом запуске контейнера

// Создание базы данных homemarket
db = db.getSiblingDB("homemarket");

// Создание необходимых коллекций
db.createCollection("users");
db.createCollection("properties");

// Вывод информации в лог
print("База данных HomeMarket успешно инициализирована!");
