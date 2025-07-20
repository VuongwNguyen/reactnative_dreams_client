#!/bin/bash

echo "🚀 Building Dreams Client for Production..."

# Kiểm tra Docker đang chạy
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker không chạy. Vui lòng khởi động Docker Desktop trước."
    exit 1
fi

# Build production image
echo "🏗️ Building production image..."
docker build -t dreams-client:prod --build-arg NODE_ENV=production .

# Tạo thư mục output nếu chưa tồn tại
mkdir -p ./output

# Copy APK từ container
echo "📦 Copying APK từ container..."
docker create --name temp-container dreams-client:prod
docker cp temp-container:/app/android/app/build/outputs/apk/release/app-release.apk ./output/
docker rm temp-container

echo "✅ Build hoàn tất!"
echo "📱 File APK được lưu tại: ./output/app-release.apk"