import { useState, useEffect } from "react";
import { logoTrans } from "../../images/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Contact() {
    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem("contacts");
        return savedContacts ? JSON.parse(savedContacts) : [];
    });
    const [contactName, setContactName] = useState("");
    const [relation, setRelation] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newContact = { contactName, relation, phone, email };
        setContacts([...contacts, newContact]);
        setContactName("");
        setRelation("");
        setPhone("");
        setEmail("");
    };

    return (
        <div className="flex items-center w-screen h-screen">
            {/* Left side */}
            <div className="bg-gradient-to-b from-[#1B1A55] to-[#310331] w-80 h-screen p-4">
                <ul className="flex flex-col justify-center">
                    <li className="h-24 flex items-center justify-center mb-5">
                        <img src={logoTrans} className="h-10 rotate-90" alt="Logo" />
                        <span className="ml-2 font-bold text-white">Senior Care</span>
                    </li>
                    {contacts.map((contact, index) => (
                        <li key={index} className="px-4 py-2 bg-purple-700 text-white rounded mt-2">
                            <span className="font-bold">{contact.contactName}</span>
                            <div className="text-sm">{contact.relation} - {contact.phone}</div>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Right side */}
            <div className="flex-1 bg-purple-900 bg-opacity-20 h-screen flex justify-center items-center">
                <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-4 text-center text-black">Emergency Contact</h2>
                    
                    <label className="block mb-2 text-black">Full Name</label>
                    <input 
                        type="text" 
                        className="w-full p-2 mb-4 border rounded text-black" 
                        value={contactName} 
                        onChange={(e) => setContactName(e.target.value)} 
                        required
                    />
                    
                    <label className="block mb-2 text-black">Relation</label>
                    <input 
                        type="text" 
                        className="w-full p-2 mb-4 border rounded text-black" 
                        value={relation} 
                        onChange={(e) => setRelation(e.target.value)} 
                        required
                    />
                    
                    <label className="block mb-2 text-black">Phone</label>
                    <input 
                        type="tel" 
                        className="w-full p-2 mb-4 border rounded text-black" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required
                    />
                    
                    <label className="block mb-2 text-black">Email</label>
                    <input 
                        type="email" 
                        className="w-full p-2 mb-4 border rounded text-black" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition">
                        Save Contact
                    </button>
                </form>
            </div>
        </div>
    );
}