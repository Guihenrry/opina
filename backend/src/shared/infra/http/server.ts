import 'reflect-metadata';

import express from 'express';

const app = express();

app.get('/', (request, response) => {
  const a = 5;
  const b = 5;
  const c = a + b;

  return response.json(c);
});

app.listen(3333, () => {
  console.log('🚀 server started in port 3333');
});
