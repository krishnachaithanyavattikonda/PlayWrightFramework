import { request, APIResponse } from '@playwright/test';
import Ajv from 'ajv';

class APIHelper {
    private requestContext: any;

    // Initialize request context with base URL
    async init(baseURL: string): Promise<void> {
        this.requestContext = await request.newContext({ baseURL });
    }

    // GET Request
    async get(endPoint: string): Promise<APIResponse> {
        return this.requestContext.get(endPoint);
    }

    // POST Request
    async post(endPoint: string, payLoad: string | object): Promise<APIResponse> {
        return this.requestContext.post(endPoint, { data: payLoad, timeout: 10000 });
    }

    // PUT Request
    async put(endPoint: string, payLoad: string | object): Promise<APIResponse> {
        return this.requestContext.put(endPoint, { data: payLoad, timeout: 10000 });
    }

    // DELETE Request
    async delete(endPoint: string): Promise<APIResponse> {
        return this.requestContext.delete(endPoint, { timeout: 10000 });
    }

    // Add headers to all requests
    async setHeaders(headers: Record<string, string>): Promise<void> {
        await this.requestContext.setExtraHTTPHeaders(headers);
    }

    // Set Authorization Header (Bearer Token, Basic Auth, etc.)
    async setAuthorization(authType: 'Bearer' | 'Basic', token: string): Promise<void> {
        let authHeaderValue: string;
        if (authType === 'Bearer') {
            authHeaderValue = `Bearer ${token}`;
        } else if (authType === 'Basic') {
            authHeaderValue = `Basic ${token}`; // Assuming token is base64-encoded username:password
        } else {
            throw new Error('Unsupported auth type');
        }
        
        await this.setHeaders({ 'Authorization': authHeaderValue });
    }

    // Set Content-Type for requests
    async setContentType(contentType: 'application/json' | 'application/x-www-form-urlencoded'): Promise<void> {
        await this.setHeaders({ 'Content-Type': contentType });
    }

    // Set Accept header
    async setAcceptType(acceptType: 'application/json' | 'application/xml'): Promise<void> {
        await this.setHeaders({ 'Accept': acceptType });
    }

    // Set cookies (if required)
    async setCookies(cookies: Array<{ name: string, value: string }>): Promise<void> {
        await this.requestContext.addCookies(cookies);
    }

    // Clear cookies
    async clearCookies(): Promise<void> {
        await this.requestContext.clearCookies();
    }

    // Example of a method that tests the response
    async validateResponse(response: APIResponse, expectedStatus: number): Promise<boolean> {
        if (response.status() === expectedStatus) {
            console.log(`Response status matches: ${expectedStatus}`);
            return true;
        } else {
            console.error(`Expected ${expectedStatus}, but got ${response.status()}`);
            return false;
        }
    }

    // Validate JSON response schema
    async validateJsonSchema(response: APIResponse, schema: object): Promise<boolean> {
        const ajv = new Ajv();
        const validate = ajv.compile(schema);
        const data = await response.json();
        const valid = validate(data);
        if (!valid) {
            console.error('JSON schema validation errors:', validate.errors);
        }
        return valid;
    }

    // Validate JSON response field values
    async validateJsonField(response: APIResponse, field: string, expectedValue: any): Promise<boolean> {
        const data = await response.json();
        if (data[field] === expectedValue) {
            console.log(`Field ${field} matches expected value: ${expectedValue}`);
            return true;
        } else {
            console.error(`Field ${field} does not match expected value. Expected: ${expectedValue}, Got: ${data[field]}`);
            return false;
        }
    }

    // Validate sorting order of a field in JSON response
    async validateJsonSorting(response: APIResponse, field: string, order: 'asc' | 'desc'): Promise<boolean> {
        const data = await response.json();
        const values = data.map((item: any) => item[field]);
        const sortedValues = [...values].sort((a, b) => (order === 'asc' ? a - b : b - a));
        const isSorted = JSON.stringify(values) === JSON.stringify(sortedValues);
        if (isSorted) {
            console.log(`Field ${field} is sorted in ${order} order`);
        } else {
            console.error(`Field ${field} is not sorted in ${order} order`);
        }
        return isSorted;
    }
}

export const apiHelper=new APIHelper();
