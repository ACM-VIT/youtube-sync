export const port: string = process.env.PORT as string;
export const chatPort: string = process.env.CHAT_PORT as string;
export const host: string = process.env.HOST as string;
export const environment = process.env.NODE_ENV;

interface db {
  name: string;
}

export const db: db = {
  name: process.env.DB_NAME as string,
};

export const corsUrl = process.env.CORS_URL;
export const logDirectory = process.env.LOG_DIR;

export const ytKey = process.env.YT_KEY;
