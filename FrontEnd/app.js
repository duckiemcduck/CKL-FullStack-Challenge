const express = require('express')
const port = (process.env.PORT || 8080)
const path = require('path')
const webpack = require('webpack')
const app = express()
const publicPath = express.static(path.join(__dirname, './dist'));
const indexPath = path.join(__dirname, 'dist') + '/index.html';
if (process.env.DEV == '1') 
{
  console.log("[Development]")
  const config = require('./webpack.config.js');
  const compiler = webpack(config)
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  

  app.get('/', function (_, res) { res.sendFile(indexPath) });
  
  app.use('/dist', publicPath);
  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}
else 
{
	 console.log("[Production]")
   app.use(publicPath)
}

app.listen(port)
console.log(`Listening at http://localhost:${port}`)
