import fs from "fs";
import path from "path";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

s3upload();

async function s3upload() {
  if (process.argv.length !== 3) {
    console.log("Specify the file to upload on the command line");
    process.exit(1);
  }

  try {
    const filePath = process.argv[2];
    const client = new S3Client({ region: "us-east-1" });

    const fileContent = fs.readFileSync(filePath);

    const params = {
      Body: fileContent,
      Bucket: "abram-aanderud-s3-upload-2026-381527",
      Key: path.basename(filePath),
    };

    const command = new PutObjectCommand(params);
    const response = await client.send(command);

    console.log(
      "File upload successful with",
      response.$metadata.httpStatusCode,
    );
  } catch (error) {
    console.log(error);
  }
}
