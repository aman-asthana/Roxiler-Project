import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../api/admin';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserDetails(id).then((res) => {
      setUser(res.data);
    });
  }, [id]);

  if (!user)
    return (
      <div className="p-8 text-center text-gray-600">
        Loading user details...
      </div>
    );

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">User Details</h2>

      <div className="bg-white shadow-md rounded p-6 space-y-4">

        <div>
          <p className="text-gray-500">Name:</p>
          <p className="font-semibold">{user.name}</p>
        </div>

        <div>
          <p className="text-gray-500">Email:</p>
          <p className="font-semibold">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-500">Address:</p>
          <p className="font-semibold">{user.address}</p>
        </div>

        <div>
          <p className="text-gray-500">Role:</p>
          <p className="font-semibold">{user.role}</p>
        </div>


        {user.role === "OWNER" && (
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-gray-500 mb-1">Store Rating:</p>
            <p className="font-semibold text-blue-700">
              {user.store_rating ?? "No ratings yet"}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default UserDetail