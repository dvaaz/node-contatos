import app from "./src/index.js"
// require('dotenv').config()

// const PORT = process.env.PORT || 3000
const port = 3000

app.listen(port, () => {
    console.log(`Servidor rodando http://localhost:${port}`)
})