import express from 'express';
import path from 'path';
import config from 'config';

import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY

import mongoose from 'mongoose';
import session from 'express-session';

import api from '~/routes';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect( config.get('db.mongo') );
 
/* use session */
app.use(session({
    secret: config.get('session.secret'),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: config.get('session.maxAge') * config.get('session.millisecond')
    }
}));

app.use( '/', express.static(path.join(config.get('env.path'), '/public')) );
app.use( '/api', api );

app.listen(config.get('env.port'), () => {
    console.log( 'Express is listening on port ', config.get('env.port') );
});
