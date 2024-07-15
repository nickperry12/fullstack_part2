import { useState, useEffect } from 'react';
import Numbers from './components/Numbers';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearchName, setSearchName] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => {
        setPersons(res.data);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
    let number = event.target.value;
    console.log(number);
  }

  const handleSearchName = (event) => {
    event.preventDefault();
    setSearchName(event.target.value);
  }

  const namesToShow = newSearchName === ''
    ? persons
    : persons.filter(person => {
        return person.name.toLowerCase()
                      .startsWith(newSearchName.toLowerCase())
    });

  const handleSubmitName = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {

      let newPerson = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      };

      axios
        .post('http://localhost:3001/persons', newPerson)
        .then((res) => {
          console.log(res);
          setPersons(persons.concat(newPerson));
          setNewName('');
          setNewNumber('');
          document.getElementById('input_name').value = '';
          document.getElementById('input_number').value = '';
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchName={handleSearchName} />
      <h2>Add New Name</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmitName={handleSubmitName}
      />
      <h2>Numbers</h2>
      <table>
        <tbody>
          {namesToShow.map(person => {
            return <Numbers key={person.id} name={person.name} number={person.number} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App;