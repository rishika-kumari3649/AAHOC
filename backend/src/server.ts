import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { errorHandler } from './middleware/index.js';

const app = express();

// Global Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// Foundation Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    system: 'AAHOC Backend API Foundation',
    timestamp: new Date().toISOString(),
  });
});

// Global Error Handler
app.use(errorHandler);

const PORT = config.port;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[AAHOC Server] Running on http://localhost:${PORT}`);
  });
}

export default app;