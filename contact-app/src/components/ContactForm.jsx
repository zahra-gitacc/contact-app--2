import React, { useState } from "react";
import { useContacts } from "../contexts/ContactsContext";

const ContactForm = () => {
  const { addContact } = useContacts();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // اعتبارسنجی شماره تلفن
    if (!/^\d{11}$/.test(phone)) {
      alert("شماره تلفن باید ۱۱ رقم و فقط عدد باشد.");
      return;
    }

    // افزودن مخاطب جدید
    addContact({
      id: Date.now(),
      name,
      email,
      phone,
    });

    // خالی کردن فیلدها پس از ارسال
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        placeholder="نام"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="ایمیل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="تلفن (۱۱ رقم)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">افزودن مخاطب</button>
    </form>
  );
};

export default ContactForm;
