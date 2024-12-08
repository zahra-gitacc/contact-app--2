import React from "react";
import { ContactsProvider } from "./contexts/ContactsContext";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./styles/app.css";

function App() {
  return (
    <ContactsProvider>
      <div>
        <h3>Contact App</h3>
        <ContactForm />
        <ContactList />
      </div>
    </ContactsProvider>
  );
}

export default App;
