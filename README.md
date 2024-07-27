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
"<type>: <subject>"

3. ## Các Loại Commit (Types)

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

4. ## Quy tắc Viết Tiêu Đề (Subject)

- Sử dụng thì hiện tại (present tense).
- Không viết hoa chữ cái đầu tiên.
- Không kết thúc bằng dấu chấm câu.
  - Ví dụ: `fix: resolve issue with user authentication`
