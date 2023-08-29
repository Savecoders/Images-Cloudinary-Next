import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

// submit image to cloudinary
import { v2 as cloudinary } from "cloudinary";

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function POST(request) {
  const data = await request.formData();

  //console.log(data.get("file"));
  const image = data.get("image");

  if (!image) {
    return NextResponse.json("no image submited", { status: 400 });
  }

  // arrayBuffer() is a method on the File object
  // https://developer.mozilla.org/en-US/docs/Web/API/File
  // arraybuffer is async so we need to await it
  const imageContents = await image.arrayBuffer();
  const buffer = Buffer.from(imageContents);

  // path
  //const filePath = path.join(process.cwd(), "public", image.name);

  // save in the public folder
  //await writeFile(filePath, buffer);

  // upload to cloudinary

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      })
      .end(buffer);
  });

  console.log(response.secure_url);

  return NextResponse.json({
    message: "image uploaded",
    url: response.secure_url,
  });
}
