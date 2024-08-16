require('dotenv').config()
const express = require(('express'))
const cors = require('cors')
const app = express()
const Note = require('./models/note')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))




// ENDPOINTS 
app.get('/', (request, response)=>{
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response)=>{
    Note.find({}).then(notes =>{
        response.json(notes)
    })
})



app.get('/api/notes/:id', (request, response)=>{
    const id = request.params.id
    Note.findById(request.params.id).then(note =>{
        response.json(note)
    })
})



app.delete('/api/notes/:id', (request,response)=>{
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})



app.post('/api/notes', (request, response)=>{
    const body = request.body
    if(!body.content){
        return response.status(204).json()
    }
    const note = new Note({
        content: body.content,
        important: Boolean(body.important)|| false,
    })
    note.save().then(savedNote =>{
        response.json(savedNote)
    })
})



const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
})