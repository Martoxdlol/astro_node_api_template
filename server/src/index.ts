import { env } from "./env.js"
import express from 'express'
import cors from 'cors'
import { z } from "zod"
import path from 'path'

const app = express()
const server = app.listen(env.PORT)

server.on('listening', () => {
    console.log(`Listening on port ${env.PORT}`)
    console.log(`Environment: ${env.NODE_ENV}`)
})

app.use(cors())

app.use(express.json())

if (env.NODE_ENV === "production") {
    app.use(express.static(path.resolve('../app/dist')))
}

app.get('/', (req, res) => {
    res.json("Hello World!")
})

const personSchema = z.object({
    name: z.string(),
    age: z.number(),
})

type Person = z.infer<typeof personSchema>

app.post('/api/newperson', (req, res) => {
    const person = personSchema.parse(req.body)

    console.log("New person:", person.name)

    res.json(person)
})

app.get('/api/person/:id', (req, res) => {
    const id = z.string().regex(/[0-9]+/).transform(s => parseInt(s)).parse(req.params.id)

    if (id === 10) {
        const person: Person = {
            age: 10,
            name: "John",
        }

        return res.json(person)
    }

    res.status(404).json("Not found")
})

