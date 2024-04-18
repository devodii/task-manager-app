"use server";

export const createProfile = async (formdata: FormData) => {
  const image = formdata.get("image") as FormDataEntryValue;

  const imageSrc = await uploadImage(image);

  // upload other data to backend, with imgSrc
};

const uploadImage = async (image: any): Promise<string> => {
  const data = new FormData();
  data.append("file", image);
  data.append("api_key", process.env.CLOUDINARY_API_KEY!);
  data.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/deyz1mlpt/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const file = await response.json();

  return file.secure_url;
};
