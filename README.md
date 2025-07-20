# Quy tắc Đặt Tên Biến và Viết Commit

## Quy tắc Đặt Tên Biến

1. **Biến Thường**
   - Sử dụng **camelCase** cho tên biến thường.
   - Ví dụ: `userName`, `totalPrice`, `isActive`.

2. **Hằng Số**
   - Sử dụng **UPPER_CASE_SNAKE_CASE** cho tên hằng số.
   - Ví dụ: `MAX_CONNECTIONS`, `DEFAULT_TIMEOUT`.

3. **Tên Hàm**
   - Sử dụng **camelCase** cho tên hàm.
   - Tên hàm nên bắt đầu bằng động từ.
   - Ví dụ: `getUserInfo`, `calculateTotal`, `isUserActive`.

4. **Tên Lớp**
   - Sử dụng **PascalCase** cho tên lớp.
   - Ví dụ: `UserService`, `ProductRepository`.

5. **Biến Toàn Cục (Global Variables)**
   - Tránh sử dụng biến toàn cục nếu có thể.
   - Nếu phải sử dụng, hãy đặt tên biến bắt đầu bằng `g_` hoặc `global_`.
   - Ví dụ: `g_appConfig`, `globalUserCount`.

6. **Biến Thành Viên Lớp (Class Member Variables)**
   - Sử dụng **camelCase** và bắt đầu bằng `_` (underscore) nếu là biến private.
   - Ví dụ: `_userName`, `_totalPrice`.

7. **Biến Mảng và Danh Sách**
   - Đặt tên biến thể hiện rõ rằng đây là một mảng hoặc danh sách.
   - Ví dụ: `userList`, `productArray`.

8. **Biến Boolean**
   - Đặt tên biến bắt đầu bằng `is`, `has`, `can`, hoặc `should`.
   - Ví dụ: `isLoggedIn`, `hasAccess`, `canEdit`.

## Quy tắc Viết Commit

1. **Cấu trúc Commit Message**
   - Commit message nên bao gồm một dòng tiêu đề (summary) ngắn gọn, theo sau bởi mô tả chi tiết hơn (nếu cần).
   - Tiêu đề nên có độ dài tối đa là 50 ký tự và câu mô tả không quá 72 ký tự.

2. **Cú Pháp Commit Message**
"type": "subject"

3. **Các Loại Commit (Types)**

- **feat**: Thêm một tính năng mới.
  - Ví dụ: `feat: add login functionality`
- **fix**: Sửa lỗi.
  - Ví dụ: `fix: correct user login error`
- **docs**: Thay đổi về tài liệu.
  - Ví dụ: `docs: update API documentation`
- **style**: Thay đổi về mã mà không ảnh hưởng đến logic (dấu cách, dấu chấm phẩy, v.v.).
  - Ví dụ: `style: format code in user controller`
- **refactor**: Thay đổi mã mà không sửa lỗi hoặc thêm tính năng.
  - Ví dụ: `refactor: improve performance of data processing`
- **test**: Thêm hoặc sửa các bài kiểm tra.
  - Ví dụ: `test: add unit tests for user service`
- **chore**: Các thay đổi nhỏ hoặc không ảnh hưởng đến sản phẩm (cập nhật dependencies, cấu hình build, v.v.).
  - Ví dụ: `chore: update npm dependencies`

4. **Quy tắc Viết Tiêu Đề (Subject)**

- Sử dụng thì hiện tại (present tense).
- Không viết hoa chữ cái đầu tiên.
- Không kết thúc bằng dấu chấm câu.
  - Ví dụ: `fix: resolve issue with user authentication`

# Dreams Client Mobile Application

Ứng dụng mạng xã hội di động được xây dựng bằng React Native, cho phép người dùng kết nối và tương tác với nhau.

## Các Tính Năng Chi Tiết

### 1. Xác Thực & Bảo Mật
- Đăng nhập bằng email/số điện thoại và mật khẩu
- Đăng ký tài khoản mới
- Đăng nhập bằng tài khoản Google
- Đăng nhập bằng tài khoản Github 
- Xác thực OTP qua email
- Quên mật khẩu và đặt lại mật khẩu
- Đổi mật khẩu

### 2. Quản Lý Hồ Sơ Cá Nhân
- Thông tin cơ bản:
  - Ảnh đại diện
  - Họ và tên
  - Biệt danh
  - Ngày sinh
  - Giới tính
  - Quốc tịch
  - Quê quán
- Thông tin mở rộng:
  - Mô tả bản thân
  - Vị trí hiện tại
  - Công việc
  - Học vấn
  - Cung hoàng đạo
  - Sở thích
  - Tình trạng mối quan hệ
- Cài đặt quyền riêng tư cho từng thông tin (công khai/riêng tư)
- Chỉnh sửa thông tin cá nhân
- Xem số lượng người theo dõi và đang theo dõi

### 3. Tính Năng Xã Hội
- Bài đăng:
  - Tạo bài đăng mới với văn bản, hình ảnh và video
  - Gắn thẻ người dùng trong bài đăng
  - Sử dụng hashtag
  - Cài đặt quyền riêng tư cho bài đăng
  - Chỉnh sửa và xóa bài đăng
- Tương tác:
  - Like/Unlike bài đăng
  - Bình luận và trả lời bình luận
  - Chia sẻ bài đăng
- Theo dõi:
  - Theo dõi/Hủy theo dõi người dùng khác
  - Xem danh sách người theo dõi/đang theo dõi
  - Xem dòng thời gian của người dùng khác

### 4. Trò Chuyện Thời Gian Thực
- Chat cá nhân:
  - Nhắn tin văn bản
  - Gửi hình ảnh
  - Trả lời tin nhắn cụ thể
  - Hiển thị trạng thái online/offline
- Chat nhóm:
  - Tạo nhóm chat mới
  - Thêm/xóa thành viên
  - Đổi tên nhóm
  - Quản lý nhóm (dành cho admin)
- Cuộc gọi:
  - Gọi âm thanh
  - Gọi video
  - Hỗ trợ cả cuộc gọi nhóm

### 5. Tìm Kiếm & Khám Phá
- Tìm kiếm người dùng
- Tìm kiếm bài đăng
- Tìm kiếm theo hashtag
- Lọc kết quả tìm kiếm

### 6. Thông Báo
- Thông báo về lượt thích
- Thông báo về bình luận
- Thông báo về người theo dõi mới
- Thông báo tin nhắn
- Thông báo cuộc gọi
- Bật/tắt thông báo

### 7. Cài Đặt & Tùy Chỉnh
- Đa ngôn ngữ (Tiếng Việt, Tiếng Anh)
- Cài đặt quyền riêng tư
- Chính sách quyền riêng tư
- Quản lý tài khoản

## Yêu Cầu Hệ Thống

### Android
- Android 5.0 (API 21) trở lên
- 50MB bộ nhớ trống

### iOS  
- iOS 12.0 trở lên
- 100MB bộ nhớ trống

## Công Nghệ Sử Dụng

### Frontend
- React Native
- Redux + Redux Toolkit cho quản lý state
- Socket.IO Client cho kết nối realtime
- Firebase cho push notification
- React Navigation cho điều hướng
- i18next cho đa ngôn ngữ
- Axios cho gọi API
- React Native Reanimated cho animation
- React Native Image Picker
- React Native WebRTC cho video call

### Backend Services
- RESTful API: https://dreams-server-bmd-4sx0.onrender.com
- WebSocket cho real-time chat và cuộc gọi
- Firebase Cloud Messaging
- MongoDB Atlas

## Hướng Dẫn Cài Đặt và Chạy Dự Án

### Yêu Cầu Môi Trường
1. **Node.js**
   - Cài đặt Node.js phiên bản 14.0.0 trở lên
   - Link download: https://nodejs.org/

2. **Java Development Kit (JDK)**
   - Cài đặt JDK 11 trở lên
   - Link download: https://www.oracle.com/java/technologies/downloads/

3. **Android Development Tools**
   - Android Studio 
   - Android SDK
   - Android SDK Platform-Tools
   - Android Emulator/Thiết bị thật

4. **iOS Development Tools (cho macOS)**
   - Xcode 12.0 trở lên
   - CocoaPods
   - iOS Simulator/Thiết bị thật

### Các Bước Cài Đặt

1. **Clone dự án**
```bash
git clone <repository-url>
cd reactnative_dreams_client
```

2. **Cài đặt dependencies**
```bash
# Cài đặt các package npm
npm install

# Cài đặt pods cho iOS (chỉ trên macOS)
cd ios && pod install && cd ..
```

3. **Cấu hình môi trường**

- Tạo file `.env` trong thư mục gốc và thêm các biến môi trường:
```
API_URL=https://dreams-server-bmd-4sx0.onrender.com
GOOGLE_WEB_CLIENT_ID=650950443769-ogc8o7mqb2viqkrct0ls5vqtt4ajei9n.apps.googleusercontent.com
```

4. **Cấu hình Firebase**
- Tải file `google-services.json` từ Firebase Console
- Đặt file vào thư mục `android/app/`
- Với iOS, tải file `GoogleService-Info.plist` và thêm vào project qua Xcode

### Chạy Ứng Dụng

1. **Chạy trên Android**
```bash
# Khởi động Metro bundler
npm start

# Mở terminal mới và chạy ứng dụng trên Android
npm run android
```

2. **Chạy trên iOS (chỉ trên macOS)**
```bash
# Khởi động Metro bundler
npm start

# Mở terminal mới và chạy ứng dụng trên iOS
npm run ios
```

### Gỡ Lỗi Thông Thường

1. **Metro Bundler không khởi động**
```bash
# Xóa cache của metro
npm start -- --reset-cache
```

2. **Lỗi build Android**
```bash
# Xóa thư mục build
cd android && ./gradlew clean && cd ..
```

3. **Lỗi build iOS**
```bash
# Xóa thư mục Pods và cài đặt lại
cd ios
pod deintegrate
pod install
cd ..
```

4. **Lỗi không tìm thấy thiết bị Android**
```bash
# Khởi động lại ADB server
adb kill-server
adb start-server
```

### Triển Khai (Release)

1. **Android**
- Tạo keystore cho ứng dụng (nếu chưa có)
```bash
keytool -genkey -v -keystore android/app/my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

- Build APK Release
```bash
cd android
./gradlew assembleRelease
```
File APK sẽ được tạo tại `android/app/build/outputs/apk/release/app-release.apk`

2. **iOS**
- Mở project trong Xcode
- Chọn scheme Release
- Archive và upload lên App Store Connect

## Docker Scripts

Dự án cung cấp các script để đơn giản hóa việc sử dụng Docker:

### Development Mode
```bash
# Cấp quyền thực thi cho script
chmod +x scripts/docker-dev.sh

# Chạy môi trường development
./scripts/docker-dev.sh
```

Script này sẽ:
- Kiểm tra Docker đang chạy
- Dọn dẹp các container cũ
- Build và chạy container mới với môi trường development
- Hiển thị logs (có thể thoát logs bằng Ctrl+C mà không dừng container)

### Production Mode
```bash
# Cấp quyền thực thi cho script
chmod +x scripts/docker-prod.sh

# Build bản production
./scripts/docker-prod.sh
```

Script này sẽ:
- Build image production với tối ưu hóa
- Tạo APK release
- Copy file APK ra thư mục output/
- Dọn dẹp container tạm thời

### Các Lệnh Docker Hữu Ích

1. **Xem logs**
```bash
docker logs dreams-client
```

2. **Truy cập container**
```bash
docker exec -it dreams-client sh
```

3. **Dừng container**
```bash
docker-compose down
```

4. **Rebuild và chạy lại**
```bash
docker-compose up --build
```

### Cấu Trúc Docker
- `Dockerfile`: Cấu hình build image chính
- `.dockerignore`: Loại bỏ các file không cần thiết khi build
- `docker-compose.yml`: Cấu hình development environment

### Lưu Ý
- Metro bundler có thể truy cập qua `localhost:8081`
- Debug port có thể truy cập qua `localhost:9090`
- Các thay đổi code sẽ được cập nhật tự động nhờ volume mounting
- Build APK release sẽ được lưu tại `android/app/build/outputs/apk/release/`

### Cấu Trúc Thư Mục
```
src/
├── components/    # Các component tái sử dụng
├── configs/       # Cấu hình ứng dụng
├── contexts/      # React contexts
├── lang/         # File ngôn ngữ
├── navigations/  # Cấu hình điều hướng
├── screen/       # Màn hình ứng dụng
├── store/        # Redux store
├── styles/       # Style và theme
└── utils/        # Các hàm tiện ích
```

### Scripts NPM Hữu Ích
```bash
# Chạy tests
npm test

# Kiểm tra lint
npm run lint

# Format code
npm run format

# Xây dựng bản release Android
npm run android-release

# Xây dựng bản release iOS
npm run ios-release
```
