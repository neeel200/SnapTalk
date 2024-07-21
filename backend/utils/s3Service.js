const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const s3 = new S3Client({});

const getS3SignedURL = asyncHandler(async (req, res, next) => {
    const { fileName } = req.query;
    if (!fileName) {
        return next(new Error("please provide a filename !"))
    }
    const s3PutParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        ContentType: 'image/*'
    };

    const url = await getSignedUrl(s3, new PutObjectCommand(s3PutParams), { expiresIn: 300 }); // 5 mins expiry

    return res.status(200).json({ msg: "Success", url })
});

const getProfileImageFromS3 = asyncHandler(async (req, res, next) => {
    const { key } = req.query;
    if (!key) {
        return next(new Error("key not provided !"))
    }
    const s3GetParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    };

    const s3Url = await getSignedUrl(s3, new GetObjectCommand(s3GetParams), { expiresIn: 3600 }); // 1 hr expiry

    return res.status(200).json({ msg: "Success", s3Url })
})

module.exports = { getS3SignedURL, getProfileImageFromS3 }