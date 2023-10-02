import React from 'react';
import PropTypes from 'prop-types';
import css from './contactList.module.css';

export const ContactList = ({ contacts, onHandleDelete }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(contact => (
        <li key={contact.id}>
          <div className={css.contactListItem}>
            <span className={css.fieldName}>{contact.name}:</span>
            <span className={css.fieldNumber}>{contact.number}</span>
            <button
              className={css.deleteBtn}
              onClick={() => {
                onHandleDelete(contact.id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func,
};
