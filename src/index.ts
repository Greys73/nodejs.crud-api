import 'dotenv/config';
import { createServer } from 'http';
import { serverController } from './controllers/server';

const PORT = process.env.PORT || 3001;

const server = createServer(serverController);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
