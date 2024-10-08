import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 5001;
export const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
