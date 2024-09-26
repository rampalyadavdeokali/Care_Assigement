import React, { useState, useEffect } from 'react';

function App() {
  // State to hold the list of services
  const [services, setServices] = useState([]);
  
  // State to hold new service form inputs
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });
  
  // State to track if we're editing a service and which one
  const [editingService, setEditingService] = useState(null);

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  // Add new service
  const handleAddService = (e) => {
    e.preventDefault();
    if (newService.name && newService.description && newService.price) {
      setServices([...services, { ...newService, id: Date.now() }]);
      setNewService({ name: '', description: '', price: '' });
    }
  };

  // Update an existing service
  const handleUpdateService = (e) => {
    e.preventDefault();
    if (editingService && newService.name && newService.description && newService.price) {
      setServices(
        services.map(service =>
          service.id === editingService.id ? { ...newService, id: editingService.id } : service
        )
      );
      setNewService({ name: '', description: '', price: '' });
      setEditingService(null);
    }
  };

  // Delete a service
  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  // Load service details into form for editing
  const handleEditService = (service) => {
    setNewService({ name: service.name, description: service.description, price: service.price });
    setEditingService(service);
  };

  return (
    <div className="App" style={{ 
      height: '100vh',
      backgroundColor: 'gray',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin:'160px',
      borderRadius: '20px',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
      width: '800px',
      padding: '10px'
    }}>
      <h1 style={{
        color: '#fff',
        fontSize: '3em',
        textAlign: 'center',
        margin: '20px',
        backgroundColor: 'red',
        padding:'10px',
        borderRadius: '10px' 
      }}>Healthcare Service Manager</h1>

      <div  style={{
        backgroundColor: 'white', 
        borderRadius: '10px', 
        boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
        width: '800px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
      }}>
      
      {/* Form to add or edit services */}
      <form onSubmit={editingService ? handleUpdateService : handleAddService}>
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={newService.name}
          onChange={handleInputChange}
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            fontSize: '24px',
            padding: '30px',
            fontWeight: 'bold', 
          }}
        />
        <br/>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newService.description}
          onChange={handleInputChange}
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            fontSize: '24px',
            padding: '30px',
            fontWeight: 'bold', 
          }}
        />
        <br/>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newService.price}
          onChange={handleInputChange}

          style={{
            marginTop: '10px',
            marginBottom: '10px',
            fontSize: '24px',
            padding: '30px',
            fontWeight: 'bold', 
          }}
        />
        <br/>
        <button type="submit">{editingService ? 'Update Service' : 'Add Service'}</button>
      </form>
      </div>
      
      {/* Display list of services */}
      <ul style={{ 
        fontSize: '14px',
        fontWeight: 'bold',   
      }}>
        {services.map(service => (
          <li key={service.id}>
            <strong>{service.name}</strong> - {service.description} - Rs:{service.price}
            <button onClick={() => handleEditService(service)}>Edit</button>
            <button onClick={() => handleDeleteService(service.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default App;
