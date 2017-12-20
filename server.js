var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');
/* 代表路由表 */
var proxyTable = {
    // 'integration.localhost:3000' : 'http://localhost:8001',  // host only
    // 'staging.localhost:3000'     : 'http://localhost:8002',  // host only
    // 'localhost:3000/api'         : 'http://localhost:8003',  // host + path
    // '/rest'                      : 'http://localhost:8004'   // path only
    // '/rest'                      : 'http://localhost:8004'   // path only
    // '/plugins/syntaxhighlighter3/sxh3/styles/': 'http://127.0.0.1:3700'
};

// 设置代理
var middleware = proxy('/imiku', {
    target: 'http://www.imiku.com',
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: { },
    router: {
        'www.imiku.com' : 'http://127.0.0.1:3000'
    },
    cookieDomainRewrite: {
        "www.imiku.com": "127.0.0.1" 
    }
});


// https://browsersync.io/docs/options
// https://www.browsersync.io/docs/api#api-reload
function Server() {
    var bs = browserSync.init({
        port: 3000,
        server: {
            directory: true,
            baseDir: ['./'],
        },
        // files: ["*.html", "css/*.css", "js/*.js"],
        /* 自动打开浏览器主页 */
        open: false,
        // Wait 2 seconds after a reload event before allowing more.
        reloadDebounce: 2000,
        reloadThrottle: 1,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
        },
        middleware: [middleware]
    });

    /* 仅支持js,css单个文件刷新，html是全刷新 */
    browserSync.watch(["*.html", "*.css", "*.js"], function (event, file) {
        if (event === "change") {
            browserSync.reload(file);
        }
    });
}
Server();
