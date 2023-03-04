export function objectToFormData(obj: any) {
  const formData = new FormData();
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      for (const file of obj[key]) {
        console.log(file);
        formData.append(`${key}[]`, file);
      }
    } else {
      formData.append(key, obj[key]);
    }
  }
  return formData;
}
