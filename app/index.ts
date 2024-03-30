import express from 'express'

const app = express()
app.use(express.json())

const PORT = 3000

// app.get('/api/users', (_req, res) => {
//   console.log("hola!")
//   res.send('pong')
// })

app.listen(PORT, () => {
  console.log("El servidor prendido")
})