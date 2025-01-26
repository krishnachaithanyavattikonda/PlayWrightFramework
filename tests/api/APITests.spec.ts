import { test } from "@playwright/test";
import{apiAssertions, APIAssertionsHelper} from '../../utils/APIAssertionsHelper';
import {apiHelper} from '../../utils/ApiHelper';

test.describe('API Tests',()=>{
    test.beforeAll(async ({baseURL})=>{
        await apiHelper.init(baseURL??'');
    });

    test('GET /users end point',async ()=>{
        const response=await apiHelper.get('/users');
        await APIAssertionsHelper.assertTruthy(response.ok());
    });

    test('POST /users endpoint', async () => {
        const payload = { name: 'John Doe', age: 30 };
        const response = await apiHelper.post('/users', payload);
        await APIAssertionsHelper.assertTruthy(response.ok());
        console.log(await response.json());
      });
})