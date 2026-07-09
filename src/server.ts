import app from './app';
import config from './config/config.dotenv';
import { prisma } from './lib/prisma';

if (config.node_env !== 'production') {
  async function server() {
    const port = config.port;
    try {
      await prisma.$connect();
      console.log('DB is connected');
      app.listen(port, () => {
        console.log(`Fixano backend server is running on ${port}`);
      });
    } catch (error) {
      console.log('Error starting the server', error);
      await prisma.$disconnect();
      process.exit(1);
    }
  }
  server();
}

export default app;
