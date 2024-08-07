import { Link } from "react-router-dom"
const Sidebar = () => {
  return(
    <>
    <div className="sidebar-wrapper">
      <div className="sidebar-top">
        <img src="/grz-logo.svg" alt="logo image" ></img>
      </div>
      <div className="sidebar-mainContent">
        <ul className="sidebar-list">
          <li className="sidebar-list-items">
            <Link className="sidebar-item-content" to={'/'}>
              <img src="/home_logo.svg" alt="dashboard icon"></img>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-list-items">
            <Link className="sidebar-item-content" to={'/ranks'}>
              <img src="/rank_logo.svg" alt="rank icon"></img>
              <span>All Ranks</span>
            </Link>
          </li>
          <li className="sidebar-list-items">
            <Link className="sidebar-item-content" to={'/users'}>
              <img src="/users_logo.svg" alt="user icon"></img>
              <span>All Users</span>
            </Link>
          </li>
          <li className="sidebar-list-items">
            <Link className="sidebar-item-content" to={'/user'}>
              <img src="/user_logo.svg" alt="user icon"></img>
              <span>My User</span>
            </Link>
          </li>
        </ul>
        
        
        
      </div>
      <div className="sidebar-bottom">

      </div>
    </div>
    </>
  )
}

export default Sidebar;