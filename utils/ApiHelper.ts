import { APIRequestContext,APIResponse,request } from "@playwright/test";

export class ApiHelper{
    private requestContext!:APIRequestContext;

    constructor(){}

    async init(baseURL:string):Promise<void>{
        this.requestContext=await request.newContext({baseURL});
    }
    async get(endPoint:string):Promise<APIResponse>{
        return this.requestContext.get(endPoint);
    }
    async post(endPoint:string,payLoad:string):Promise<APIResponse>{
        return this.requestContext.post(endPoint,{data:payLoad,timeout:10000});
    }
    async put(endPoint:string,payLoad:string):Promise<APIResponse>{
        return this.requestContext.put(endPoint,{data:payLoad,timeout:10000});
    }
    async delete(endPoint:string):Promise<APIResponse>{
        return this.requestContext.delete(endPoint,{timeout:10000});
    }
}

export const apiHelper=new ApiHelper();