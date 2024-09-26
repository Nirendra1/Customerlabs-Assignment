import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ]);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleAddSchema = (event) => {
    const schema = availableSchemas.find(s => s.value === event.target.value);
    if (schema && !selectedSchemas.includes(schema)) {
      setSelectedSchemas([...selectedSchemas, schema]);
      setAvailableSchemas(availableSchemas.filter(s => s !== schema));
    }
  };



  const handleSaveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map(s => ({ [s.value]: s.label }))
    };



    const url = 'https://jsonplaceholder.typicode.com/posts';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        closePopup();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <div className={`view-audience ${isPopupOpen ? 'blur-background' : ''}`}>
        <div className="header teal-bg">
          <span>View Audience</span>
        </div>
      </div>

      {/* Save Segment Button */}

      <button className={`save-segment-btn ${isPopupOpen ? 'active' : ''}`} onClick={openPopup}>
        Save segment
      </button>

      {/* Popup */}

      {isPopupOpen && (
        <div className="popup">
          <div className="header teal-bg">
            <span>Saving Segment</span>
          </div>
          <div className="popup-inner">
            <p>Enter the Name of the Segment</p>
            <input
              type="text"
              placeholder="Enter the Name of the Segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />

               <p>To save your segment,you need to add the schemas to build the quiry</p> 

            <div className="task-list">
              {/* <p>To save your segment,you need to add the schemas to build the quiry</p> */}
              <div className="task-item">
                <span className="green-dot"></span>
                <span>User Task</span>
              </div>
              <div className="task-item">
                <span className="red-dot"></span>
                <span>Group Task</span>
              </div>
            </div>

            <div className="schema-section">

              {selectedSchemas.map((schema, index) => (
                <div key={index}>
                  <select disabled>
                    <option>{schema.label}</option>
                  </select>
                </div>
              ))
              }

              <select onChange={handleAddSchema} defaultValue="">
              <span className="red-dot"></span>
                <option value="" disabled>First-name</option>


                {availableSchemas.map((schema, index) => (
                  <option key={index} value={schema.value}>{schema.label}</option>
                ))}
              </select>

              {/* <button>+Add new schema</button> */}

            </div>
            {/* <a href='' className='somedata'>Add new schema</a> */}
            <div className='forms'>
              <button className="save-btn" onClick={handleSaveSegment}>Save the segment</button>
              <button className="cancel-btn" onClick={closePopup}>Cancel</button>
            </div>

          </div>

          <a href='' className='addschema'>+Add new schema</a>
        </div>
      )}
    </div>
  );
};

export default App;


