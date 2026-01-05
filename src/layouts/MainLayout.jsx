import { Outlet } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import FloatingContactWidget from '../components/FloatingContactWidget/FloatingContactWidget'

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className='min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />


      
      <FloatingContactWidget />
    </div>
  )
}

export default MainLayout