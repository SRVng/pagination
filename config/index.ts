const dev = process.env.NODE_ENV !== 'production';

export const server = {
    url: dev ? process.env.DEV_URL : process.env.PRODUCTION_URL
}