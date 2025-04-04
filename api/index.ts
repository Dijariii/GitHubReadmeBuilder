import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import compression from 'compression';
import { storage } from '../server/storage';
import { registerRoutes } from '../server/routes';

// Create Express application
const app = express();

// Middleware
app.use(compression());
app.use(express.json());

// Set up routes
registerRoutes(app);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(process.cwd(), 'dist');
  
  app.use(express.static(distPath, {
    maxAge: '1d',
    immutable: true,
    index: false
  }));
  
  // Catch-all route for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
  });
});

// Port configuration with fallback for Vercel
const port = process.env.PORT || 5000;

// Only start the server if not running in Vercel
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;