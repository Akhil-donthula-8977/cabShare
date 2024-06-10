import {Redis} from "ioredis"
const getRedisUrl=()=>{
    if(process.env.REDIS_URL){
        return process.env.REDIS_URL;
    }
    throw new Error("REDIS url is not defined")
}

export const redis=new Redis(getRedisUrl());