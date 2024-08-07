import { useEffect, useState } from "react";
import axios from 'axios';
import UserList from "../../pages/UsersList";
import { toast } from "react-toastify";


const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([])
  const getUsersData = async() => {
    try {
      const userData = await axios.get('https://test-grazitti.onrender.com/api/users');
      let newUsers = userData.data.message;
      console.log("new users",newUsers)
       if (JSON.stringify(newUsers) !== JSON.stringify(allUsers)) {
        setAllUsers(newUsers);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  }
  
  const handleDeleteUser = async(id) => {
    try {
      await axios.delete(`https://test-grazitti.onrender.com/api/user/${id}`);
      toast.success(`User with id - ${id} deleted successfully!`, {
        position: "top-right"
      });
      await getUsersData();
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Error deleting user", { position: "top-right" });
    }
  }

  useEffect(() => {
    getUsersData();
  }, [getUsersData])
  return(
    <>
      <UserList allUsers={allUsers} handleDeleteUser={handleDeleteUser}/>
    </>
  )
}

export default AllUsers;