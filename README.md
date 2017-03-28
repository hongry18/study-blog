# Study

## 애플리케이션 구조

* proxy nginx
* RESTful Api ( port 3000, nodejs, express, mongoDB)
* front ( nodejs, reactJS )

## NPM Install

nodeJS Site에서 nodejs 최신 소스 다운로드 후 설치

[https://nodejs.org/ko/download/](https://nodejs.org/ko/download/) 에서 소스코드 다운로드

>  \# tar zxf node-v*.tar.gz<br>
 \# cd node-*<br>
 \# ./configure<br>
 \# make<br>
 \# make install<br>


## npm package install
> * local install<br>
 \# npm install packageName<br>
> * global insatll<br>
 \# npm install packageName -g

## mongoDB Install
> \# rpm -ivh https://repo.mongodb.org/yum/redhat/7/mongodb-org/3.4/x86_64/RPMS/mongodb-org-mongos-3.4.2-1.el7.x86_64.rpm<br>
\# rpm -ivh https://repo.mongodb.org/yum/redhat/7/mongodb-org/3.4/x86_64/RPMS/mongodb-org-shell-3.4.2-1.el7.x86_64.rpm<br>
\# rpm -ivh https://repo.mongodb.org/yum/redhat/7/mongodb-org/3.4/x86_64/RPMS/mongodb-org-server-3.4.2-1.el7.x86_64.rpm<br>
\# rpm -ivh https://repo.mongodb.org/yum/redhat/7/mongodb-org/3.4/x86_64/RPMS/mongodb-org-tools-3.4.2-1.el7.x86_64.rpm<br>
\# rpm -ivh https://repo.mongodb.org/yum/redhat/7/mongodb-org/3.4/x86_64/RPMS/mongodb-org-3.4.2-1.el7.x86_64.rpm<br>

## install package

### express
npm install --save express<br>
```javascript
var app = express();
```

### morgan, body-parser
npm install --save morgan body-parser<br>
```javascript
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY

app.use(morgan('dev'));
app.use(bodyParser.json());
```

### config
npm install --save config<br>
#### config module setting
##### create projectPath/config/{default.json,production.json}
```json
{
    "env": {
        "port": 80,
        "path": "/home/study02/blog"
    },      
    "db": {
        "mongo": "mongodb://localhost/blog"
    },      
    "session": {
        "secret": "s#eAc!Cr$e##t",
        "maxAge": 3600,
        "millisecond": 1000
    }   
}
```

### mongoose, express-session
npm install --save mongoose express-session<br>
```javascript
import mongoose from 'mongoose';
import session from 'express-session';

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/codelab');

/* use session */
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));
```

### react-router
npm install --save react-router@3.0.2<br>

### babel-plugin-root-import
npm install babel-plugin-root-import --save-dev<br>

#### babel plugin root import setting
```json
{
    "presets": ["es2015"],
    "plugins": [
        ["babel-plugin-root-import",[
            {
                "rootPathPrefix": "~",
                "rootPathSuffix": "server"
            }
        ]]
    ]
}
```

### get sequenceId - auto increment
```javascript
// create auto increment function
db.system.js.save({
    _id : "getNextSequence" ,
    value : function (name) {
       var ret = db.sequences.findAndModify(
              {
                query: { _id: name },
                update: { $inc: { seq: 1 } },
                new: true
              }
       );

       return ret.seq;
    }
});
```

### express session store use mongodb
npm install connect-mongo
```javascript
/* use session */
app.use(session({
    secret: config.get('session.secret'),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: config.get('session.maxAge') * config.get('session.millisecond')
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: config.get('session.maxAge')
    })
}));
```

### signup
```shell
curl -X POST \
-H "Content-Type: application/json" \
http://192.168.99.100:1001/api/account/signup \
-d '{"username": "hongry", "password": "1111", "nickname": "hongry", "email": "hongry18@gmail.com"}'
```

### signin
save Cookie
```shell
curl -X POST \
-c myCookie \
http://192.168.99.100:1001/api/account/signin \
-H "Content-Type: application/json" \
-d '{"username": "hongry", "password": "1111"}'
```
