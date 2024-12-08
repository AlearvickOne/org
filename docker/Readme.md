# Сборка образа
docker build -t ru_chat_roblox_db .

# Запуск контейнера
docker run -d --name ru_chat_roblox-container -p 3902:3902 ru_chat_roblox_db
