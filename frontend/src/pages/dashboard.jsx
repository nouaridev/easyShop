
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'


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