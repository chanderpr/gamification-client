import React, { memo } from 'react';

const UsersList = memo(({ allUsers, handleDeleteUser }) => {
  console.log("allUsers", allUsers);
  return(
    <div className="container">
      <p className="header-description">Details of all the users that has login atleast one on the community.</p>
      {/* <div className='button-wrapper'>
        <button className="button" onClick={() => setShowModal(true)}>Add New Rank</button>
      </div> */}
      {allUsers.lenght === 0 ? (
        <p className="no-data">There are no users available.</p>
      ) : (<table className='custom-table'>
        <thead>
          <tr>
            <th rowSpan="2">User Id</th>
            <th rowSpan="2">User Rank</th>
            <th colSpan="6">User Activities</th>
            <th rowSpan="2">Action</th>
          </tr>
          <tr>
            <th>Likes</th>
            <th>Comments</th>
            <th>Posts</th>
            <th>Current Streak</th>
            <th>Longest Streak</th>
            <th>Total Visits (Days)</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map(user => (
            <tr key={user.id} className="card">
              <td>
                {user.id}
              </td>
              <td>{user.userRank}</td>           
              <td>{user.userActivities.likes}</td>
              <td>{user.userActivities.comments}</td>
              <td>{user.userActivities.posts}</td>
              <td>{user.userActivities.currentStreak}</td>
              <td>{user.userActivities.longestStreak}</td>
              <td>{user.userActivities.totalLoginDays}</td>
              <td>
                {/* <button className="button edit-button" onClick={() => handleEdit(user)}>Edit</button> */}
                <button className="button delete-button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  )
})

export default UsersList;