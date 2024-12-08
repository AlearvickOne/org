# Используем официальный образ MySQL
FROM mysql:9.0.1

# Устанавливаем переменные окружения для инициализации
ENV MYSQL_ROOT_PASSWORD=A123456
ENV MYSQL_DATABASE=org
ENV MYSQL_USER=alearvick
ENV MYSQL_PASSWORD=A123456
ENV MYSQL_TCP_PORT=3306

# Открываем порт для MySQL
EXPOSE 3306

# Запускаем MySQL
CMD ["mysqld"]