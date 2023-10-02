import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/form';
import { ContactList } from './ContactList/contactList';
import { Filter } from './Filter/filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  // Функція додавання контактів в state
  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };
  // Збереження даних в state з поля фільтр
  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };
  // Отримаємо масив даних з урахуванням даних в полі фільтр
  visibleList = () => {
    const normalizedfilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedfilter)
    );
  };
  // Видалення збереженого контакта
  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  render() {
    const onVisibleList = this.visibleList();
    return (
      <>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} contacts={this.state.contacts} />

        <h2>Contact list</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          contacts={onVisibleList}
          onHandleDelete={this.handleDelete}
        />
      </>
    );
  }
}
export default App;
