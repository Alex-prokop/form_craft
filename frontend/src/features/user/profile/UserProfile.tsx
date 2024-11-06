import React, { useState, useEffect } from 'react';
import UserProfileInfo from './ui/UserProfileInfo';
import AccountContactForm from './ui/AccountContactForm';
import { UserProfileData } from './types/userProfileTypes';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
}

const UserProfile: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserId(decoded.id);
    }
  }, []);

  const handleJoinSalesforce = (profileData: UserProfileData) => {
    setUserProfile(profileData);
    setShowForm(true);
  };

  if (!userId) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Profile</h2>
      {showForm && userProfile ? (
        <AccountContactForm
          username={userProfile.username}
          email={userProfile.email}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <UserProfileInfo
          userId={userId}
          onJoinSalesforce={handleJoinSalesforce}
        />
      )}
    </div>
  );
};

export default UserProfile;
