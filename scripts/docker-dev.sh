#!/bin/bash

echo "🚀 Starting Dreams Client in Development mode..."

# Kiểm tra Docker đang chạy
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker không chạy. Vui lòng khởi động Docker Desktop trước."
    exit 1
fi

# Dừng và xóa container cũ nếu có
echo "🧹 Dọn dẹp container cũ..."
docker-compose down

# Build và chạy container mới
echo "🏗️ Building và starting container..."
docker-compose up --build -d

# Hiện logs
echo "📋 Hiển thị logs (Ctrl+C để thoát nhưng container vẫn chạy)..."
docker-compose logs -f