// services/database.js
const database = [
    { id: 1, name: 'Cricket' },
    { id: 2, name: 'Football' },
    { id: 3, name: 'Basketball' },
    // Add more data as needed
  ];
  
  export const searchDatabase = (query) => {
    // Simulate a database query here
    return database.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  };
  