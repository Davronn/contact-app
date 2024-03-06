import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ContactApp() {
  const [contacts, setContacts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedContact, setEditedContact] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (contact) => {
    setEditedContact(contact);
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    setEditedContact({
      ...editedContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddContact = () => {
    setContacts([...contacts, editedContact]);
    handleCloseAddModal();
  };

  const handleEditContact = () => {
    const updatedContacts = contacts.map((contact) =>
      contact === editedContact ? editedContact : contact
    );
    setContacts(updatedContacts);
    handleCloseEditModal();
  };

  const handleDeleteContact = (contact) => {
    const updatedContacts = contacts.filter((c) => c !== contact);
    setContacts(updatedContacts);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.gender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [filter, setFilter] = useState("All");

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
    // Here you can perform any additional actions based on the selected filter
  };

  return (
    <>
      <div className="container   mt-4">
        <div className="mb-3 d-flex p-3 justify-content-between">
          <input
            type="text"
            className="form-control p-3 w-50"
            placeholder="Search"
            onChange={handleSearch}
          />
          <div>
            <label htmlFor="filter">Filter: </label>
            <select className="form-select m-2 p-2 bg-primary text-secondary-emphasis" aria-label="Disabled select example"  name="filter" value={filter} onChange={handleChangeFilter}>
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <Button variant="success p-2 w-20" onClick={handleShowAddModal}>
            Add Contact
          </Button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.phone}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.phone}</td>
                <td>{contact.gender}</td>
                <td>
                  <Button
                    variant="primary mr-2"
                    onClick={() => handleShowEditModal(contact)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteContact(contact)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={showAddModal} onHide={handleCloseAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" name="gender" onChange={handleChange}>
                  <option value="All">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddContact}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={editedContact.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={editedContact.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={editedContact.phone}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={editedContact.gender}
                  onChange={handleChange}
                >
                  <option value="All">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditContact}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ContactApp;
