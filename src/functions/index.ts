import moment from 'moment';

export function objectToFormData(obj: any) {
  const formData = new FormData();
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      for (const file of obj[key]) {
        formData.append(`${key}[]`, file);
      }
    } else {
      formData.append(key, obj[key]);
    }
  }
  return formData;
}
export const getTimeFromDay = (date: Date) => {
  const now = moment(); // Lấy thời điểm hiện tại
  const startDate = moment(date); // Ngày bắt đầu tính

  const diffInYears = now.diff(startDate, 'years'); // Tính số năm khác nhau
  const diffInMonths = now.diff(startDate, 'months'); // Tính số tháng khác nhau
  const diffInDays = now.diff(startDate, 'days'); // Tính số ngày khác nhau
  const diffInHours = now.diff(startDate, 'hours'); // Tính số giờ khác nhau

  if (diffInYears >= 1) {
    return diffInYears + 'y';
  } else if (diffInMonths >= 1) {
    return diffInMonths + 'm';
  } else if (diffInDays >= 1) {
    return diffInDays + 'd';
  } else {
    return diffInHours + 'h';
  }
};
