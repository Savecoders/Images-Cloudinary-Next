"use client";

import Image from "next/image";
import { useState } from "react";

function Page() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  return (
    <div className="grid grid-flow-row grid-rows-1 space-y-6 justify-center">
      <form
        action=""
        className="flex flex-col items-center justify-center space-y-6"
        onSubmit={async (e) => {
          // Prevent the default browser behavior of submitting the form
          e.preventDefault();

          // create a new FormData object
          // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
          const formData = new FormData();
          formData.append("image", image);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log(data);
          setImageUrl(data.url);
        }}
      >
        <input
          type="file"
          name="fileInput"
          id="fileInput"
          className="px-12 py-6  rounded-lg bg-zinc-800"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="px-9 py-3 rounded-md bg-blue-500">Submit</button>
      </form>
      {imageUrl && (
        <Image
          src={imageUrl}
          width={440}
          height={400}
          objectFit="cover"
          alt="Image submited"
          className="filter drop-shadow-[0_4px_4px_rgba(255,255,255,0.05)] rounded-lg "
        />
      )}
    </div>
  );
}

export default Page;
