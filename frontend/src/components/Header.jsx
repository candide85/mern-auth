import {Link, NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux'


const Header = () => {

    const { currentUser } = useSelector(state => state.user)

    return(
        <div className="bg-slate-400  py-6">
            <div className='flex justify-between items-center max-w-7xl mx-auto'>
                <Link to='/' >
                    <h3 className='font-bold text-2xl'>APP AUTH</h3>
                </Link>
                <ul className='flex gap-6 font-medium text-xl items-center '>
                    {currentUser ?  
                        <>
                            <NavLink to='/' >Home</NavLink>
                            <NavLink to='/about' >About</NavLink>
                            <Link to='/profile'>
                                <img className='text-sm rounded-full object-cover w-12 h-12' src={currentUser.profilePicture} alt="no profile picture"  />                        
                            </Link>
                        </>
                    :
                        (
                            // <NavLink className=' text-lg p-2' to='/signin' >Sign in</NavLink> 
                            ""                       
                        )}
                </ul>        
            </div>
        </div>
    )
}



export default Header