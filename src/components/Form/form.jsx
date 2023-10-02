import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './form.module.css';
class Form extends Component {
  static propTypes = {
    addContact: PropTypes.func,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  state = {
    name: '',
    number: '',
  };
  // Перевірка валідності введених значень в поля вводу за допомогою RegExp
  isValidName = data => {
    const patternName =
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
    return patternName.test(data);
  };
  isValidNumber = data => {
    const patternNumber =
      /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
    return patternNumber.test(data);
  };
  // Функція обробки відправки форми
  handleSubmit = evt => {
    // Відміняємо дії браузера за замовчуванням
    evt.preventDefault();
    // Диструктуризуємо state
    const { name, number } = this.state;
    // Перевіряємо валідність введених значень
    if (!this.isValidName(name)) {
      alert('Field "name" must by filled corectly!!!');
      return;
    } else if (!this.isValidNumber(number)) {
      alert('Field "phone number" must by filled corectly!!!');
      return;
    }
    // Перевіряємо повторне введення імені контакту
    if (this.contactIsPresent(name)) {
      alert(`Contact with name "${name}" already exists.`);
      return;
    }
    // Виклик функції додавання контакта в state app
    this.props.onSubmit(name, number);
    // Очищаємо поля вводу
    this.reset();
  };
  // Функція перевірки повторного вводу імені контакту в записник
  contactIsPresent = name => {
    return this.props.contacts.some(contact => contact.name === name);
  };
  // Функція контролю введених значень в поля імені та номеру телефону
  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };
  // Функція очистки полів вводу
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={css.formData} onSubmit={this.handleSubmit}>
        <label>
          {'Name  '}
          <input
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            className={css.inputData}
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          {'Phone  '}
          <input
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            className={css.inputNumber}
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className={css.submitButton}>
          Add contact
        </button>
      </form>
    );
  }
}
export default Form;
