import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Elder.sass";

const elderData = {
  "john-doe": { name: "John Doe", age: 78, sex: "Male" },
  "jane-smith": { name: "Jane Smith", age: 82, sex: "Female" },
};

const ElderProfile = () => {
  const { elderId } = useParams();
  const elder = elderData[elderId] || { name: "Unknown", age: "N/A", sex: "N/A" };

  const [pdfUrl, setPdfUrl] = useState(null);
  const [contacts, setContacts] = useState([
    { name: "Dr. Smith", phone: "+1 123-456-7890" },
    { name: "Caregiver Hotline", phone: "+1 987-654-3210" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, newContact]);
      setNewContact({ name: "", phone: "" });
      setShowForm(false);
    } else {
      alert("Please fill out both name and phone number.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  return (
    <div>
      <header>
        <div className="container">
          <h1>{elder.name}'s Profile</h1>
          <nav>
            <ul className="menu">
              <li><a href="/caregiver">Home</a></li>
              <li><a href="/">Logout</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/mywatch">My Watch</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>
        <section className="profile">
          <h2>Home</h2>
          <p><strong>Name:</strong> {elder.name}</p>
          <p><strong>Age:</strong> {elder.age}</p>
          <p><strong>Sex:</strong> {elder.sex}</p>

          <div className="health-records">
            <h3>Health Records</h3>
            <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
            {pdfUrl && <embed src={pdfUrl} width="100%" height="500px" />}
          </div>

          <div className="emergency-contacts">
            <h3>Emergency Contacts</h3>
            <ul>
              {contacts.map((contact, index) => (
                <li key={index}>{contact.name}: {contact.phone}</li>
              ))}
            </ul>
            <button onClick={() => setShowForm(true)}>Add Contact</button>
            {showForm && (
              <form onSubmit={handleContactSubmit}>
                <input type="text" name="name" placeholder="Name" value={newContact.name} onChange={handleInputChange} required />
                <input type="text" name="phone" placeholder="Phone" value={newContact.phone} onChange={handleInputChange} required />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </form>
            )}
          </div>
        </section>
      </main>
      
      <footer>
        <div className="container">
          <p>&copy; 2024 Elder Care Application. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ElderProfile;
