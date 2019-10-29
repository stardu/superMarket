/* const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
} */

module.exports = {
    // baseUrl  type:{string} default:'/'
    // 将部署应用程序的基本URL
    // 将部署应用程序的基本URL。
    // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
    // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.

    //baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : './',
    /* publicPath: './', */
    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'

    outputDir: "dist",
    assetsDir: "assets",

    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
    // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
    configureWebpack: {
        resolve: {
            alias: {
                //'@': resolve('src'),
                //'styles': resolve('src/styles'),
                //'styles': resolve('src/styles'),
                scss_vars: "@/styles/vars.scss"
            }
        }
    },
    /* chainWebpack: (config)=>{
              config.resolve.alias
                  .set('@$', resolve('src'))
                  .set('styles',resolve('src/styles'))
                  .set('components',resolve('src/components'))
                  .set('layout',resolve('src/layout'))
                  .set('base',resolve('src/base'))
                  .set('static',resolve('src/static'))
            } */

    // pages:{ type:Object,Default:undfind }
    /*
              构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
              个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
              的字符串，
              注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
            */
    // pages: {
    // index: {
    // entry for the page
    // entry: 'src/index/main.js',
    // the source template
    // template: 'public/index.html',
    // output as dist/index.html
    // filename: 'index.html'
    // },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
    // },
    pwa: {
        name: "My App",
        themeColor: "#4DBA87",
        msTileColor: "#000000",
        appleMobileWebAppCapable: "yes",
        appleMobileWebAppStatusBarStyle: "black",

        // configure the workbox plugin
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            //swSrc: 'dev/sw.js',
            swSrc: "src/registerServiceWorker.js"
                // ...other Workbox options...
        }
    },

    //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    /* overlay: {
              warnings: false,
              errors: false
            }, */
    lintOnSave: true,
    // productionSourceMap：{ type:Bollean,default:true } 生产源映射
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,
    // devServer:{type:Object} 3个属性host,port,https
    // 它支持webPack-dev-server的所有选项

    devServer: {
        port: parseInt(process.env.PORT, 10) || 8083, // 端口号
        host: process.env.HOST || "0.0.0.0",
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器 // 配置跨域处理,只有一个代理
        /* proxy: 'http://39.106.93.134'  */
        proxy: {
            "/xx": {
                target: "http://localhost:3100",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/xx": ""
                }
            }
        }
    }
};