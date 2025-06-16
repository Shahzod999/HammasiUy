# Используем официальный образ MongoDB
FROM mongo:6.0

# Создаем директорию для данных
RUN mkdir -p /data/db

# Устанавливаем права доступа
RUN chown -R mongodb:mongodb /data/db

# Копируем скрипт инициализации (если есть)
COPY ./init-mongo.js /docker-entrypoint-initdb.d/

# Открываем стандартный порт MongoDB
EXPOSE 27017

# Запускаем MongoDB с оптимизированными настройками для проекта
CMD ["mongod", "--bind_ip_all"] 