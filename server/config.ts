import cors from 'cors';

const config = {
  __dirname: __dirname,
  corsOptions: cors({
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization',
      'Access-Control-Allow-Origin'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    exposedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Access-Control-Allow-Origin'
    ],
    preflightContinue: false
  })
};

export default config;
