import 'dotenv/config';
import { createServer, request } from 'http';
import { serverController } from './../controllers/server';
import cluster from "cluster";
import { availableParallelism } from "os";


const PORT = Number(process.env.PORT) || 3000;
const cpusCount = availableParallelism();
let currentPort = PORT;

const getActivePort = () => {
  currentPort = currentPort + 1;
  currentPort = (currentPort >= (PORT + cpusCount)) ?  PORT + 1 : currentPort;
  return currentPort;
}

if(cluster.isPrimary) {
  createServer((req, res) => {
    const options = {
      hostname: 'localhost',
      port: getActivePort(),
      path: req.url,
      method: req.method,
      headers: req.headers
    };
    const server = request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode!, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    req.pipe(server, { end: true });
  })
  .listen(PORT, () => {
    console.log(`Primary Server: http://localhost:${PORT}`);
  });

  for (let i = 1; i < cpusCount; i++) {
    cluster.fork({ WPORT: PORT + i });
  }
}

if(cluster.isWorker) {
  const WPORT = process.env.WPORT;
  const server = createServer(serverController);
  server.listen(WPORT, () => {
    console.log(`Worker Server: http://localhost:${WPORT}`);
  });
  server.on('request', (() => console.log(`Processed on ${WPORT} port`)))
}