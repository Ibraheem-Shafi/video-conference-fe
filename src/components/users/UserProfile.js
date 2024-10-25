import React, { useEffect, useState } from 'react';
import { getUserByEmail } from '../../services/api-users';

const UserProfile = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    // You may also have states to keep track of subscribers and subscribed users
  
    useEffect(() => {
      // Load the logged-in user's data when the component mounts
      const fetchLoggedInUser = async () => {
        try {
          // Assuming the logged-in user's email is stored in localStorage
          const userEmail = localStorage.getItem('email');
          const response = await getUserByEmail(userEmail);
          setLoggedInUser(response.data);
        } catch (error) {
          console.log('Error while fetching logged-in user:', error);
        }
      };
  
      fetchLoggedInUser();
    }, []);
  
    if (!loggedInUser) {
      return <div>Loading...</div>;
    }
  
    // Extract relevant information from the loggedInUser object
    const { username, email, subscribedTo, subscribedBy } = loggedInUser;

    return (
      <div>
        <h2>{username}</h2>
        <p>Email: {email}</p>

        {/*   {likedVideos ? (
          likedVideos.map((video) => (
            <ol>
            <li key={video._id}>{video.title}</li>
            </ol>
          ))
        ) : (

          <li>No liked videos found.</li>
        )}   */}
        
      </div>
    );
  };
  
  export default UserProfile;