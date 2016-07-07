/* 
|--------------------------------------------------------------------------
| Browser-sync config file
|--------------------------------------------------------------------------
|
| For up-to-date information about the options:
| http://www.browsersync.io/docs/options/
|
| There are more options than you see here, these are just the ones that are
| set internally. See the website for more info.
|
|
*/

var proxyMiddleware = require('http-proxy-middleware');

/*代理接口一*/
var proxy1 = proxyMiddleware('/imiku', {
	target: 'http://www.imiku.com/'
});

	module.exports = {
		/*首页设置*/
		startPath: 'index.html',

		/*监控文件,注意路径，当前配置目录为根*/
		files: ['html/**/*.html', 'css/**/*.css', 'js/**/*.js', 'images/**/*.js'],

		/*自定义插入特定脚本*/
		snippetOptions: {
			/*排除首页不刷新*/
			ignorePaths: "debug/*.html",

			/*自定义插入snippet.*/
			rule: {
				match: /<\/body>/i,
				fn: function (snippet, match) {
					return snippet + match;
				}
			}
		},

		/*本地服务器端口*/
		port: 3000,

		server: {
			/*服务器根目录*/
			baseDir: './',
			/*代理中间件模式, 代理设置*/
			middleware: [proxy1]
		},

		/*自动打开浏览器主页*/
		open: true,
		/*别人说模拟事件，好像有坑*/
		ghostMode: false,
		notify: true,
		logLevel: 'debug',
		logConnections: true
	};

