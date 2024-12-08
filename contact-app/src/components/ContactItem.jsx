import React from "react";
import { useContacts } from "../contexts/ContactsContext";

const ContactList = () => {
  const { contacts } = useContacts();

  return (
    <div className="contact-list">
      {contacts.length > 0 ? (
        <div className="contact-items">
          {contacts.map((contact) => (
            <div className="contact-item" key={contact.id}>
              <label>نام:</label>
              <span>{contact.name}</span>
              <label>ایمیل:</label>
              <span>{contact.email}</span>
              <label>تلفن:</label>
              <span>{contact.phone}</span>
            </div>
          ))}
        </div>
      ) : (
        <p style={(textalign = "center")}>هیچ مخاطبی یافت نشد</p>
      )}
    </div>
  );
};

export default ContactList;
