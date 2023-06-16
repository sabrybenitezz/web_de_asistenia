const express = require('express')
const { alumnosRuta } = require('./routes/alumnos.route')
const { padresRuta} = require('./routes/padres.route')



const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(alumnosRuta)
app.use(padresRuta)

    

app.listen(PORT, ()=>{
    console.log(`App Lista, ${PORT} es el puerto de escucha.`);
})
