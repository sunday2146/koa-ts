"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
let app = new Koa();
app.use(async (ctx) => {
    ctx.body = 'hello miaov@@@@';
});
app.listen(8888);
//# sourceMappingURL=index.js.map