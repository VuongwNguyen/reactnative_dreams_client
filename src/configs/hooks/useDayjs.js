import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);

// Tạo locale tùy chỉnh cho dayjs
const customLocale = {
  ...dayjs.Ls.vi,
  relativeTime: {
    ...dayjs.Ls.vi.relativeTime,
    future: '%s',
    past: '%s trước',
    s: 'vài giây',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d năm',
  },
};

// Thiết lập ngôn ngữ với customLocale
dayjs.locale(customLocale);

// Export dayjs đã được cấu hình với locale tùy chỉnh
export const useDayjs = dayjs;
