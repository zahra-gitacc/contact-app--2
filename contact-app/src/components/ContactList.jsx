import React, { useState, useEffect } from "react";
import { useContacts } from "../contexts/ContactsContext";
import Modal from "./Modal";

const ContactList = () => {
  const { contacts, deleteContact, bulkDeleteContacts, searchContacts } =
    useContacts();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredContacts(contacts);
    } else {
      const result = searchContacts(searchQuery);
      setFilteredContacts(result);
    }
  }, [contacts, searchQuery, searchContacts]);

  const toggleSelectContact = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const openModal = (action, contact = null) => {
    setModalAction({ action, contact });
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (modalAction.action === "deleteSingle" && modalAction.contact) {
      deleteContact(modalAction.contact.id);
    } else if (modalAction.action === "deleteGroup") {
      bulkDeleteContacts(selectedContacts);
      setSelectedContacts([]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="contact-list">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <input
          type="text"
          placeholder="جستجو بر اساس نام یا ایمیل"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {selectedContacts.length > 0 && (
        <button onClick={() => openModal("deleteGroup")}>حذف گروهی</button>
      )}

      <div className="contact-items">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div className="contact-item" key={contact.id}>
              <input
                type="checkbox"
                checked={selectedContacts.includes(contact.id)}
                onChange={() => toggleSelectContact(contact.id)}
              />
              <label>نام:</label>
              <span>{contact.name}</span>
              <label>ایمیل:</label>
              <span>{contact.email}</span>
              <label>تلفن:</label>
              <span>{contact.phone}</span>
              <button onClick={() => openModal("deleteSingle", contact)}>
                حذف
              </button>
            </div>
          ))
        ) : (
          <p>هیچ مخاطبی یافت نشد.</p>
        )}
      </div>

      {/* مدال تأیید */}
      {isModalOpen && (
        <Modal
          message="آیا مطمئن هستید که می‌خواهید مخاطب(ها) را حذف کنید؟"
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ContactList;
