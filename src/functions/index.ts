import moment from 'moment';
import { formatDistance, format, subYears, subDays, subMonths, subHours, subMinutes } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';

import * as yup from 'yup';
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

export const schemaCreatePost = (target: string, description: string, medias: string) => {
  return yup.object().shape({
    [target]: yup.string().required(),
    [description]: yup.string().required("Can't empty description! "),
    [medias]: yup
      .mixed()
      .test('has-image-or-video', 'At least one image or video is required', (files: any) => {
        return files.some((file: File) => {
          return file.type.startsWith('image') || file.type.startsWith('video');
        });
      })
      .test('max-size', 'File size must not exceed 5MB', (files: any) => {
        return files.some((file: File) => {
          const fileSizeLimit = 5 * 1024 * 1024; // 1MB in bytes
          const isWithinSizeLimit = file.size >= fileSizeLimit;
          return !isWithinSizeLimit;
        });
      })
  });
};
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

export const getSubTimeFromDayFNS = (date: Date, language: string) => {
  const locale = language === 'vi' ? vi : enUS;
  const now = moment(); // Lấy thời điểm hiện tại
  const startDate = moment(date); // Ngày bắt đầu tính
  const diffInYears = now.diff(startDate, 'years'); // Tính số năm khác nhau
  const diffInMonths = now.diff(startDate, 'months'); // Tính số tháng khác nhau
  const diffInDays = now.diff(startDate, 'days'); // Tính số ngày khác nhau
  const diffInHours = now.diff(startDate, 'hours'); // Tính số giờ khác nhau
  const diffInMinutes = now.diff(startDate, 'minutes'); // Tính số giờ khác nhau
  if (diffInYears >= 1) {
    return formatDistance(subYears(new Date(), diffInYears), new Date(), { locale, addSuffix: true });
  } else if (diffInMonths >= 1) {
    return formatDistance(subMonths(new Date(), diffInMonths), new Date(), { locale, addSuffix: true });
  } else if (diffInDays >= 1) {
    return formatDistance(subDays(new Date(), diffInDays), new Date(), { locale, addSuffix: true });
  } else if (diffInHours >= 1) {
    return formatDistance(subHours(new Date(), diffInHours), new Date(), { locale, addSuffix: true });
  } else {
    return formatDistance(subMinutes(new Date(), diffInMinutes), new Date(), { locale, addSuffix: true });
  }
};
