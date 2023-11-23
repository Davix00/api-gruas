import express from 'express'
import config from './config'

//rutas de apis
import usuariosRoutes from './routes/usuarios.routes'
import gruasRoutes from './routes/gruas.routes'
import corralonRoutes from './routes/corralon.routes'
import gruasRespondientesRoutes from './routes/gruasRespondientes.routes'
import maniobraRoutes from './routes/maniobra.routes'
import maniobrasUtilizadasRoutes from './routes/maniobrasUtilizadas.routes'


const app = express()

//settings
app.set('port', config.port)

//middlewarse
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(usuariosRoutes)
app.use(gruasRoutes)
app.use(corralonRoutes)
app.use(gruasRespondientesRoutes)
app.use(maniobraRoutes)
app.use(maniobrasUtilizadasRoutes)

export default app;