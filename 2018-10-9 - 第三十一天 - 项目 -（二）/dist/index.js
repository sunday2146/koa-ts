"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const koa_controllers_1 = require("koa-controllers");
const models_1 = require("./models");
let app = new Koa();
app.use(async (ctx, next) => {
    ctx.state.db = models_1.default;
    await next();
});
koa_controllers_1.useControllers(app, __dirname + '/controllers/**/*.controller.js', {
    multipart: {
        dest: './uploads'
    }
});
app.listen(8888);
//# sourceMappingURL=index.js.map