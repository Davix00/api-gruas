import express from 'express'
import config from './config'

//rutas de apis
import usuariosRoutes from './routes/usuarios.routes'
import gruasRoutes from './routes/gruas.routes'

const app = express()

//settings
app.set('port', config.port)

//middlewarse
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(usuariosRoutes)
app.use(gruasRoutes)
export default app;