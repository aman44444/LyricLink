import React, { useState } from 'react';

const Profile: React.FC<{ user: any }> = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [bio, setBio] = useState(user.bio);

  const handleSave = () => {
    // Save updated profile information to the database
    setEditing(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      {editing ? (
        <div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded" />
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded" />
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded" />
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
        </div>
      ) : (
        <div>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Bio: {bio}</p>
          <button onClick={() => setEditing(true)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Edit</button>
        </div>
      )}
    </div>
  );
};

export default Profile;