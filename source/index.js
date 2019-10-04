const express = require('express');
const morgan = require('morgan');
const expHbs = require('express-handlebars');
const path = require('path');

//init
const app = express();

//config
app.set('port',process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));//indico donde esta el directorio views
app.engine('.hbs',expHbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views')),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))//acepto datos de formulario
app.use(express.json());

//variables globales
app.use((req, res, next) => {
    next();
});

//rutas
app.use(require('./routes'));
app.use(require('./routes/login'));
app.use('/links',require('./routes/link'));


//public
app.use(express.static(path.join(__dirname,'public')));

//iniciar servidor
app.listen(app.get('port'),() =>{
    console.log('serever up on port ', app.get('port'))
});