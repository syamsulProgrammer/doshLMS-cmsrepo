import { randomUUID } from 'crypto';

const ACCESS_KEY = '391784320c99a2906b50'
const SECRET_KEY = '5Exj18xuoYCK7RG+PL+H/rgEtazsQ9oNntgfN/RW'
const S3_URL = 'https://nos.wjv-1.neo.id'
// import * as AWS from "@aws-sdk/client-s3";
const AWS = require('@aws-sdk/client-s3')
const BiznetObjectStorage = new AWS.S3({ 
    region: "idn", 
    endpoint: 'https://nos.wjv-1.neo.id', 
    credentials: {"accessKeyId": "391784320c99a2906b50", 
    secretAccessKey: "5Exj18xuoYCK7RG+PL+H/rgEtazsQ9oNntgfN/RW"} 
});

const ObjectStorage = {
    upload: async (Body, mimeType)=>{
        try {
            BiznetObjectStorage.send(new AWS.PutObjectCommand({
                Bucket: 'development-bajio',
                Key: randomUUID(),
                Body,
                ContentType: mimeType,
                ACL: 'public-read'
            }))
            return true
        } catch (error) {
            throw error
        }
    },
    list: async ()=>{
        try {
            // bucket = BiznetObjectStorage.Bucket .get_bucket('bucket')
            return BiznetObjectStorage.listObjectsV2({
                Bucket: 'development-bajio'
            })
        } catch (error) {
            throw error
        }

    }
}

export default ObjectStorage