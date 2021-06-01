require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('build'))
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

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (body.name && body.number)
	{
		const person = new Person({
			name: body.name,
			number: body.number
		})

		person.save()
			.then(newPerson => {
				return response.json(newPerson)
			})
			.catch(error => next(error))
	}
})

app.put('/api/persons/:id', (request, response) => {
	const body = request.body
	const person = { number: body.number }

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then(updatedPerson => response.json(updatedPerson))
		.catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id)
		.then(person => response.json(person))
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => response.status(204).end())
		.catch(error => next(error))
})

app.get('/info', (request, response, next) => {
	Person.find()
		.then(person => {
			const infoFor = '<p>Phonebook has info for ' + person.length + ' people</p>'
			const date = '<p>' + new Date + '</p>'
		
			response.send(infoFor + date)
		})
		.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
	const body = request.body
	console.error(error.message)

	if (error.name === 'CastError')
		return response.status(400).send({ error: 'malformatted id' })
	else if (error.name === 'ValidationError')
		return response.status(400).json({ error: error.message })
	else if (error.name === 'ValidationError' && !body.name)
		return response.status(400).send({ error: "Person's name is missing" })
	else if (error.name === 'ValidationError' && !body.number)
		return response.status(400).send({ error: "Person's number is missing" })
	next(error)
}

app.use(errorHandler)

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
