import React, { useEffect, useState } from 'react';
// import { fetchMatchedUsers } from '@/app/utils/matchingAPI';

interface MatchedUser {
  id: string;
  name: string;
  // Add more attributes as needed, such as profile picture, age, etc.
}

const MatchedUsers: React.FC = () => {
  const [matchedUsers, setMatchedUsers] = useState<MatchedUser[]>([]);

  useEffect(() => {
    const getMatchedUsers = async () => {
      try {
        const users = await fetchMatchedUsers();
        setMatchedUsers(users);
      } catch (error) {
        console.error('Error fetching matched users:', error);
      }
    };

    getMatchedUsers();
  }, []);

  return (
    <div>
      <h2>Potential Matches</h2>
      <div className="matched-users-container">
        {matchedUsers.map(user => (
          <div key={user.id} className="matched-user">
            <h3>{user.name}</h3>
            {/* Display additional user information here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchedUsers;