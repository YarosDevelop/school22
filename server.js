const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Подключаем папку с фронтендом

// Обработка входа на главную страницу
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Слушаем подключения от клиентов
io.on('connection', (socket) => {
  console.log('A user connected');

  // Получение сообщений от клиента
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);  // Отправка сообщения всем клиентам
  });

  // Отключение пользователя
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Настройка порта
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
