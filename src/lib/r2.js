import { S3Client } from '@aws-sdk/client-s3';

export const r2 = new S3Client({
  region: import.meta.env.PUBLIC_R2_REGION,
  endpoint: import.meta.env.PUBLIC_R2_ENDPOINT,
  credentials: {
    accessKeyId: import.meta.env.PUBLIC_R2_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.PUBLIC_R2_SECRET_ACCESS_KEY,
  },
});
