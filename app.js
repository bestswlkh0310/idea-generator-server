import express from 'express';

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});