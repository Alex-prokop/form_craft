# Используем официальный Node.js образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --build-from-source bcrypt

# Копируем весь проект
COPY . .

# Собираем TypeScript
RUN npm run build

# Экспонируем порт
EXPOSE 5000

# Добавляем команду для выполнения миграций и запуска приложения
CMD ["sh", "-c", "npm run migration:run && node dist/index.js"]
