
import { Outlet } from 'react-router-dom'
import SideBar from '../components/dashboard/SideBar'
import TopBar from '../components/dashboard/TopBar'


export default function Dashboard(){
    return <div className='dashboard'>
        <div>
            <TopBar></TopBar>
            <div className='d-flex'>
                <SideBar></SideBar>
                <div className="content p20">
                    <Outlet/>
                </div>
            </div>
        </div>
    </div>
}