import express from 'express';
import path from 'path';
import config from 'config';

const app = express();

app.use( '/', express.static(path.join(config.get('env.path'), '/public')) );

app.listen(config.get('env.port'), () => {
    console.log( 'Express is listening on port ', config.get('env.path') );
});
