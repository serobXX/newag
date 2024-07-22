export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(String(reader.result));
    };
  });
