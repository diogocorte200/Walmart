require('./config/server')
require('./config/database')
//defina a url de rotas(route), usando o server como parametro
require('./config/routes')(server)