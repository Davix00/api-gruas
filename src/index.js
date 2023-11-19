import app from './app'
app.listen(app.get('port')) //utilizara la configuracion del puerto que hay en app.js


console.log('server on port',app.get('port'))