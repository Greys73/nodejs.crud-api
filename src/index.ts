import { serverController } from './controllers/server';
import { createServer } from 'http';

const PORT = 3000;

const server = createServer(serverController);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});