import React, { useEffect } from 'react';

function Logout() {
  useEffect(() => {
    // Clear the user session data from local storage
    localStorage.removeItem('authTokenNexa');
    localStorage.removeItem('authTokenAutozone');
    localStorage.removeItem('authToken');

    // Redirect to the specified URL after logout
    window.location.href = 'https://saboomaruti.in/';
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;
