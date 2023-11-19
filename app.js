import express, { json } from "express"
import {getNotes, getNote, createNote, deleteNote} from "./database.js"


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended :false}))




app.get('/notes', async function (req, res) {
  const notes = await getNotes()
  res.send(notes)
})

app.get('/notes/:id', async function (req, res) {
    const id = req.params.id  // Get from ulr paramerter.
    const notes = await getNote(id)
    res.send(notes)
  })

app.post('/notes', async function (req, res) {
    const {title, contents}= req.body  // Get from http body
    const note = await createNote(title, contents)
    res.status(201).send(note)
})

app.listen(8080, function(){
    console.log("Server has started on port 8080.");
})



