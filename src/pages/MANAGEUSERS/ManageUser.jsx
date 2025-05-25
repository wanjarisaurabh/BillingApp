import { useEffect, useState } from 'react'
import UserForm from '../../component/userForm/UserForm'
import UserList from '../../component/userList/UserList'
import './ManageUser.css'
import { fetchUser } from '../../service/UserService'
import { toast } from 'react-hot-toast';
const Manageuser = () => {
  const [users, setUser] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    async function loaduser() {
      try {
        setLoading(true);
        const response = await fetchUser();
        console.log(response.data)
        setUser(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Unable to fetch the user's");
      } finally {
        setLoading(false);
      }
      
    }

    loaduser();
  }, [])
  


  return (
    <div className="user-container text-light">
      <div className="left-column">
        <UserForm setUser={setUser} />
      </div>
      <div className="right-column">
        <UserList user={users} setUser = {setUser} />
      </div>
    </div>
  )
}

export default Manageuser;