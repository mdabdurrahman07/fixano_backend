import app from './app';
import config from './config/config.dotenv';

if (config.node_env !== 'production') {
  async function server() {
    const port = 8080;
    try {
      app.listen(port, () => {
        console.log(`Fixano backend server is running on ${port}`);
      });
    } catch (error) {
      console.log('Error starting the server', error);
    }
  }
  server();
}
