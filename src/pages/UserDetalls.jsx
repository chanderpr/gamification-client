const UserDetails = ({user}) => {
  console.log('uer details',user)
  return(
    <>      
      <div className="profile-container container">
        <div className="profile-card">
          <h2 className="profile-title">User Profile</h2>
          <div className="profile-details">
            <div className="profile-detail">
              <span className="detail-label">User ID:</span>
              <span className="detail-value">{user?.userId}</span>
            </div>
            <div className="profile-detail">
              <span className="detail-label">Likes:</span>
              <span className="detail-value">{user?.userActivities?.likes}</span>
            </div>
            <div className="profile-detail">
              <span className="detail-label">Comments:</span>
              <span className="detail-value">{user?.userActivities?.comments}</span>
            </div>
            <div className="profile-detail">
              <span className="detail-label">Posts:</span>
              <span className="detail-value">{user?.userActivities?.posts}</span>
            </div>
            <div className="profile-detail">
              <span className="detail-label">Rank Name:</span>
              <span className="detail-value">{user?.rankName}</span>
            </div>
            <div className="profile-detail">
              <span className="detail-label">Current Streak:</span>
              <span className="detail-value">{user?.userActivities?.currentStreak}</span>
            </div>
            <div className="profile-detail">
              <span className="detail-label">Longest Streak:</span>
              <span className="detail-value">{user?.userActivities?.longestStreak}</span>
            </div>
            <div className="profile-detail">
              <span className="detail-label">Total Login Days:</span>
              <span className="detail-value">{user?.userActivities?.totalLoginDays}</span>
            </div>
            <div className="profile-detail">
              <span className="detail-label">Activity Time:</span>
              <span className="detail-value">{user?.userActivities?.activityTime}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetails;