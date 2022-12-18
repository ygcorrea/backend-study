const express = require("express");
const app = express();
app.use(express.json());

let contacts = [
  {
    id: 1,
    name: "First Contact",
    phone: "111-111-111",
    email: "first_contact@email.com",
  },
  {
    id: 2,
    name: "First Silva",
    phone: "111-111-111",
    email: "first_silva@email.com",
  },
  {
    id: 3,
    name: "Second Contact",
    phone: "222-222-222",
    email: "second_contact@email.com",
  },
];

app.get("/contacts", (req, res) => {
  return res.json(contacts);
});

app.post("/contacts", (req, res) => {
  const contact = req.body;
  contact.id = Date.now();
  contacts.push(contact);
  res.json(contact);
});

app.get("/contacts/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) {
    res.status(404).json({ message: "Contact not found" });
  }

  res.json(contact);
});

app.put("/contacts/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) res.status(404).json({ message: "Contact not found" });

  contact.name = req.body.name;
  contact.email = req.body.email;
  contact.phone = req.body.phone;
  res.json(contact);
});

app.delete("/contacts/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) res.status(404).json({ message: "Contact not found" });
  const { index } = req.params;
  contacts.splice(index, 1);
  res.status(200).json({ message: "Contact deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
