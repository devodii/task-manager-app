"use client";

import { v2 as cloudinaryBase } from "cloudinary";

const api = "https://api.cloudinary.com/v1_1";

export const runtime = "nodejs";

export const cloudinary = cloudinaryBase.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

// export const upload = async (file: any) => {
//   console.log({
//     key: process.env.CLOUDINARY_API_KEY,
//     id: process.env.CLOUDINARY_CLOUD_NAME,
//   });

//   try {
//     const uploader = cloudinaryBase
//       .config({ api_key: process.env.CLOUDINARY_API_KEY })
//       .uploader.upload(file)
//       .then((res: any) => console.log({ res }));
//     // const signature = cloudinaryBase.utils.api_sign_request(
//     //   {
//     //     timestamp: new Date(),
//     //     public_id: "sample_image",
//     //   },
//     //   process.env.CLOUDINARY_API_SECRET!
//     // );

//     // console.log({ signature });

//     // if (signature) {
//     //   console.log("found a signature.");
//     //   const response = await fetch(
//     //     api + `/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
//     //     {
//     //       body: JSON.stringify({
//     //         file,
//     //         timestamp: new Date(),
//     //         api_key: process.env.CLOUDINARY_API_KEY,
//     //         public_id: "sample_image",
//     //         signature,
//     //       }),
//     //       method: "POST",
//     //     }
//     //   );

//     //   const data = await response.json();
//     //   console.log({ response, data });
//     // }

//     console.log({ uploader });
//   } catch (error) {
//     console.log("Error while uploading to cloudinary", { error });
//   }
// };
