import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { PrismaClient } from './app/generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import router from './app/routes/index.js';
import swaggerDocument from './swagger.json' with { type: 'json' };

const app = express();

const databaseUrl = new URL(process.env.DATABASE_URL);
const adapter = new PrismaMariaDb({
  host: databaseUrl.hostname,
  port: Number(databaseUrl.port || 3306),
  user: databaseUrl.username,
  password: decodeURIComponent(databaseUrl.password),
  database: databaseUrl.pathname.replace('/', ''),
});

export const prisma = new PrismaClient({ adapter });
prisma
  .$connect()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(err));

app.use(cors({ origin: 'http://localhost:8080' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', router);

export default app;
