import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
// import UserList from './UsersList';
import UserDetails from '../../pages/UserDetalls';

const Users = ({ id }) => {
  const [activityTime, setActivityTime] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const [allUsers, setAllUsers] = useState({});
  const [isActive, setIsActive] = useState(true);
  const inactivityLimit = 10000; 
  const lastActivityTimeRef = useRef(Date.now());
  const timerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivityTime = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      const user = response.data.message.find(user => user.id === id);
      console.log('user',response.data.message)
      if (user) {
        setActivityTime(user.userActivities.activityTime || 0);
        setUserDetails(user);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  }, []);

  // const updateActivityTime = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/users/${id}`);
  //     const currentUserActivities = response.data.message.userActivities;
  //     console.log("current activity", currentUserActivities);
  //     await axios.put(`http://localhost:5000/api/users/update/${id}`, {
  //       userActivities: {
  //         ...currentUserActivities,
  //         activityTime: activityTime
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error updating activity time: ", error);
  //   }
  // }, [id, activityTime]);

  // const resetActivityTimer = useCallback(() => {
  //   lastActivityTimeRef.current = Date.now();
  //   setIsActive(true);
  // }, []);

  useEffect(() => {
    fetchActivityTime();
  }, [fetchActivityTime]);

  // useEffect(() => {
  //   const checkActivity = () => {
  //     const now = Date.now();
  //     if (now - lastActivityTimeRef.current >= inactivityLimit) {
  //       setIsActive(false);
  //       updateActivityTime();
  //     }
  //   };

  //   const startActivityTracking = () => {
  //     timerRef.current = setInterval(() => {
  //       if (isActive) {
  //         setActivityTime(prevTime => prevTime + 1);
  //         checkActivity();
  //       }
  //     }, 1000);
  //   };

  //   startActivityTracking();

  //   // Event listeners for user activity
  //   document.addEventListener('mousemove', resetActivityTimer);
  //   document.addEventListener('keydown', resetActivityTimer);
  //   document.addEventListener('mousedown', resetActivityTimer);
  //   document.addEventListener('touchstart', resetActivityTimer);

  //   return () => {
  //     if (timerRef.current) {
  //       clearInterval(timerRef.current);
  //     }
  //     document.removeEventListener('mousemove', resetActivityTimer);
  //     document.removeEventListener('keydown', resetActivityTimer);
  //     document.removeEventListener('mousedown', resetActivityTimer);
  //     document.removeEventListener('touchstart', resetActivityTimer);
  //   };
  // }, [isActive, resetActivityTimer, updateActivityTime]);

  if (loading) return <p className="loading">Loading...</p>;
  return (
    <>
      <div>
        {/* <p id="activity-time">Activity Time: {activityTime}</p>
        userId : {userDetails.userId} */}
        <UserDetails user={userDetails} />

      </div>
    </>
  );
};

export default Users;