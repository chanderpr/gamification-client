import { Link } from "react-router-dom"

const Dashboard = () => {
  return(
    <>
      <h2>Welcome to the Community Gamification Hub!</h2>
      <div className="card-wrapper">
        <div className="custom-card">
          <h3 className="custom-card-item">You can create, edit and delete ranks.</h3>
          <p className="custom-card-item">Discover the various ranks, create new rank, set the criteria for the rank from the Ranks Page.</p>
          <Link className="button custom-card-item" to={'/ranks'} target="_blank">View Ranks page</Link>
        </div>
        <div className="custom-card">
          <h3 className="custom-card-item">You can view the user details.</h3>
          <p className="custom-card-item">Check the details of each user, such as there likes, comments and other activities from Users Page.</p>
          <Link className="button custom-card-item" to={'/users'} target="_blank">View Users page</Link>
        </div>
      </div>
    </>
  )
}

export default Dashboard;