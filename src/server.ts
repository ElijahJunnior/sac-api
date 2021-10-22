import { app } from './app';
import { OpenConnection } from './Connection';

app.listen(3030, () => {
    console.log('Server is Running!');
    OpenConnection();
});
