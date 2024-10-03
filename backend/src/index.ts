import app from './app';
import { port } from './config/envConfig';

app.listen(port, () => {
  console.log(`Бэкенд запущен на порту ${port}`);
});
