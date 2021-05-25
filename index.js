require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())

morgan.token('body', function(req, res) {
	return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

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
	else
	{
		const person = new Person({
			name: body.name,
			number: body.number
		})
		person.save().then(newPerson => {
			response.json(newPerson)
		})
	}
})

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id).then(person => {
		response.json(person)
	}).catch(err => response.status(404).end())
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== Number(id))

	response.status(204).end()
})

app.get('/info', (request, response) => {
	const infoFor = '<p>Phonebook has info for ' + Person.length + ' people</p>'
	const date = '<p>' + new Date + '</p>'

	response.send(infoFor + date)
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.static('build'))
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
