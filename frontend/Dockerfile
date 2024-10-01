# Используем Node.js для сборки приложения
FROM node:18 AS build

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы и собираем приложение
COPY . .
RUN npm run build

# Используем nginx для раздачи статических файлов
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
