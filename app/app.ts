import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './routes'

const PORT = process.env.PORT || 3001

const app = express()
app.use(cors())
app.use(express.json())

// versionado de api
app.use('/api/v1/', router)
// app.use('/api/v2/', routerv2)
// app.use('/api/v3/', routerv3)

app.listen(PORT, () => console.log(`current in port ${PORT}`))
