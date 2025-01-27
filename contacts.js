const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log(JSON.parse(data));
  });
}
function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === String(contactId));
    if (!contact) {
      console.log(`Contact with id ${contactId} not found.`);
      return;
    }
    console.log(contact);
  });
}
function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((c) => c.id !== String(contactId));

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log(`Contact with id ${contactId} removed.`);
      }
    );
  });
}
function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = {
      id: String(contacts.length + 1),
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("New contact added:", newContact);
    });
  });
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
