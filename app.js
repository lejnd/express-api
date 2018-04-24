const express = require('express')
const proxy = require('http-proxy-middleware')
const morgan = require('morgan')
const appConfig = require('./app.json')
const routes = require('./routes/routes')
const app = express();

app.use(morgan('dev'));

app.use(express.static('public'))
app.use(express.static('backend'))

var proxyConfigArr;
if (app.get('env') === 'development') {
    proxyConfigArr = require('./proxy.dev.config.js');
}else{
    proxyConfigArr = require('./proxy.prod.config.js');
}
for(var i=0;i<proxyConfigArr.length;i++){
    var proxyConfig = proxyConfigArr[i];
    var proxyInstance = proxy(proxyConfig.config);
    app.use(proxyConfig.url, proxyInstance);
}

routes(app)

app.listen(appConfig.port,function(){
    console.log('http://localhost:' + appConfig.port);
});
