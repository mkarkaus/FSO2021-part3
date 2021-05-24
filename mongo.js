const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.z9g2e.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).catch(
	err => {
		console.log(err.message)
		mongoose.connection.close()
		process.exit(1)
	}
)

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3)
{
	console.log(`phonebook:`);
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person.name, person.number);
		})
		mongoose.connection.close()
	})
}

else
{
	const newPerson = new Person({
		name: process.argv[3],
		number: process.argv[4]
	})

	newPerson.save().then(() => {
		console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
		mongoose.connection.close()
	})
}
