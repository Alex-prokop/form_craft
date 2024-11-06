import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api/userProfileAPI';
import { UserProfileData } from '../types/userProfileTypes';

interface UserProfileInfoProps {
  userId: number;
  onJoinSalesforce: (profileData: UserProfileData) => void;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({
  userId,
  onJoinSalesforce,
}) => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const profileData = await fetchUserProfile(userId);
      setUserProfile(profileData);
    };
    loadProfile();
  }, [userId]);

  if (!userProfile) return <p>Loading...</p>;

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-dark text-center">
          <tr>
            <th>Field</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td>Username</td>
            <td>{userProfile.username}</td>
          </tr>
          <tr className="text-center">
            <td>Email</td>
            <td>{userProfile.email}</td>
          </tr>
          <tr className="text-center">
            <td>Salesforce</td>
            <td>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => onJoinSalesforce(userProfile)}>
                Join Salesforce
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserProfileInfo;
