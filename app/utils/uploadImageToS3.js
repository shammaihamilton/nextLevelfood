import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: process.env.AWS_REGION,
});

if (!process.env.AWS_REGION || !process.env.S3_BUCKET) {
  throw new Error(
    "AWS_REGION and S3_BUCKET must be defined in the environment variables."
  );
}

export async function uploadImageToS3(file, slug) {
  const extension = file.name.split(".").pop() || "jpg";

  const uniqueFileName = `${slug}-${Date.now()}.${extension}`;
  const bufferedImage = await file.arrayBuffer();
  if (!bufferedImage) {
    throw new Error("Image data is missing.");
  }

  try {
    await s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: uniqueFileName,
      Body: Buffer.from(bufferedImage),
      ContentType: file.type || "image/jpeg",
    });
    return uniqueFileName;
  } catch (error) {
    throw new Error("Failed to upload image to S3: " + error.message);
  }
}
