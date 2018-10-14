import dotenv from 'dotenv';

dotenv.config({ silent: true });

export default () => console.log(`Node env: ${process.env.NODE_ENV}`);
