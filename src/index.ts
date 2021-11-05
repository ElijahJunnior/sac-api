import express from 'express';
import { routes } from './routes/index';
import { config } from 'dotenv';
import { openConnection } from './Connection';

config();
openConnection();

const app = express();
app.use(express.json());
app.use(routes);
export { app };

app.listen(3030, () => {
    console.log('Server started on port 3030!');
});
