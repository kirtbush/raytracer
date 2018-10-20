"use strict";
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("./public")).listen(8080, function () {
    console.log('Server running on 8080...');
});
//# sourceMappingURL=server.js.map