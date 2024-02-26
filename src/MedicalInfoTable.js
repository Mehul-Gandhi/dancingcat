import React from 'react';
import './MedicalInfoTable.css'; 

const MedicalInfoTable = () => {
  
  const pageStyle = {
    flex: 1,
    padding: '20px',
    backgroundColor: '#FEF9EF', 
    color: '#3E3E3E', 
  };
  const medicalData = [
    {
      id: 52,
      issueType: 'Injury',
      submittedDate: '1/18/2024',
      applicantName: 'Sally Weller-Luiz',
      catName: 'Mango',
      gender: 'F',
      catFixed: 'Yes',
      catBreed: 'DSH',
      issue: 'Hi, my name is Sally and I...',
      totalCost: '$2,500',
      ownerContribution: '',
      otherFinancialAid: ''
    },
    
  ];

  return (
    <div style={pageStyle}>
      <div className="table-container">
        <h1>Medical Information</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Issue Type</th>
              <th>Submitted Date</th>
              <th>Applicant Name</th>
              <th>Cat Name</th>
              <th>Gender</th>
              <th>Fixed</th>
              <th>Breed</th>
              <th>Issue</th>
              <th>Total Cost</th>
              <th>Owner Contribution</th>
              <th>Other Financial Aid</th>
            </tr>
          </thead>
          <tbody>
            {medicalData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.issueType}</td>
                <td>{item.submittedDate}</td>
                <td>{item.applicantName}</td>
                <td>{item.catName}</td>
                <td>{item.gender}</td>
                <td>{item.catFixed}</td>
                <td>{item.catBreed}</td>
                <td>{item.issue}</td>
                <td>{item.totalCost}</td>
                <td>{item.ownerContribution}</td>
                <td>{item.otherFinancialAid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalInfoTable;
