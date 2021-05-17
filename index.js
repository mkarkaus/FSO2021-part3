const express = require('express')
const app = express()

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456"
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523"
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345"
	},
	{
		id: 4,
		name: "Mary Poppendick",
		number: "39-23-6423122"
	}
]

app.use(express.json())

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

const generateId = () => Math.floor(Math.random() * 100000) + 1

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name)
		return response.status(400).json({
			error: "Person's name is missing"
		})
	else if (!body.number)
		return response.status(400).json({
			error: "Person's number is missing"
		})
	else if (persons.find(person => person.name === body.name))
		return response.status(400).json({
			error: "Person's name must be unique"
		})
	else
	{
		const newPerson = {
			id: generateId(),
			name: body.name,
			number: body.number
		}
		persons = persons.concat(newPerson)
		response.json(newPerson)
	}
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === Number(id))

	if (person)
		response.json(person)
	else
		response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== Number(id))

	response.status(204).end()
})

app.get('/info', (request, response) => {
	const infoFor = '<p>Phonebook has info for ' + persons.length + ' people</p>'
	const date = '<p>' + new Date + '</p>'

	response.send(infoFor + date)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
