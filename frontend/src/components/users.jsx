import axios from "axios";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash ,faPen} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
import EditUser from "./EditUser";
export default function Users() {
  const [users, setUsers] = useState([]);
  const controller = new AbortController();

  useEffect(() => {
    getUsers();
    return () => {
      controller.abort();
    };
  }, []);

//   state methods : 
    const getUsers = async () => {
      try {
        let users = await axios.get("http://127.0.0.1:8000/api/user/show", {
          signal: controller.signal,
        });
        setUsers(users.data);
      } catch (e) {
        console.log(e);
      }
    };

    const delUser = async (user)=>{
        try {
            let res =await axios.delete(`http://127.0.0.1:8000/api/user/delete/${user}`)
            if (res.status == 200){
                setUsers(users.filter(e=>e.id != user)) ; 
            }
        } catch (error) {
            console.log(error)
        }
    }

     

    

    
  let usersjsx = useMemo(() => {
    let usrs = users.map((e , index) => {
      return (
        <motion.tr
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: index*  0.1 }}
          key={e.id}
        >
          <td>{e.id}</td>
          <td>{e.name}</td>
          <td>{e.email}</td>
          <td className="actions">
            <div className="action-btn"><Link to={`${e.id}`} ><FontAwesomeIcon className='edt' icon={faPen} /></Link></div>
            <div className="action-btn" onClick={()=>{delUser(e.id)}}><FontAwesomeIcon className="del" icon={faTrash} /></div>
            </td>
        </motion.tr>
      );
    });
    return usrs;
  }, [users]);

  return (
    <>
      <div>
        <Outlet context={{users , setUsers}}></Outlet>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{usersjsx}</tbody>
        </table>
      </div>
    </>
  );
}
