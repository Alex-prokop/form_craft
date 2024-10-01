# Используем официальный Node.js образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Собираем TypeScript
RUN npm run build

# Экспонируем порт
EXPOSE 3001

# Запускаем сервер
CMD ["node", "dist/index.js"]
