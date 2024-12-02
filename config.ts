import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Export environment variables as constants
export const config = {
    baseUrl: process.env.BASE_URL || '',
    username: process.env.STANDARDUSER || '',
    password: process.env.PASSWORD || '',
    lockedUser:process.env.LOCKEDOUTUSER||''
};
