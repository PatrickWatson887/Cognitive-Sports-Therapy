import { NextApiRequest, NextApiResponse } from 'next';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  region: process.env.S3_UPLOAD_REGION,
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
  signatureVersion: 'v4',
  apiVersion: '2006-03-01',
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, type } = req.body;
    const fileParams = {
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: name,
      Expires: 600,
      ACL: 'public-read',
      ContentType: type,
    };
    console.log(fileParams);
    const url = await s3.getSignedUrlPromise('putObject', fileParams);

    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
