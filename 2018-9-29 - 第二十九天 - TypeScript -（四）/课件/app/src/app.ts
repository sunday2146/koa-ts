import "reflect-metadata";
import Koa = require('koa');
import { useControllers } from 'koa-controllers';

// import MainController from "./controllers/MainController";

const app = new Koa();
useControllers(app, __dirname + '/controllers/*.ts', {
    multipart: {
        dest: './uploads'
    }
});

app.listen(8080);