// features/user/profile/ui/UserProfileInfo.tsx
import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api/userProfileAPI';
import { UserProfileData } from '../types/userProfileTypes';

const UserProfileInfo: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const profileData = await fetchUserProfile();
      setUserProfile(profileData);
    };
    loadProfile();
  }, []);

  if (!userProfile) return <p>Загрузка...</p>;

  return (
    <div>
      <p>Имя: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <p>Телефон: {userProfile.phone}</p>
    </div>
  );
};

export default UserProfileInfo;
