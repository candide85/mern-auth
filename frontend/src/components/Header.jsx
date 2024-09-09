import {Link, NavLink} from 'react-router-dom'


const Header = () => {
    return(
        <div className="bg-slate-400  py-6">
            <div className='flex justify-between items-center max-w-7xl mx-auto'>
                <Link to='/' >
                    <h3 className='font-bold text-2xl'>APP AUTH</h3>
                </Link>
                <ul className='flex gap-6 font-medium text-xl'>
                    <NavLink to='/' >Home</NavLink>
                    <NavLink to='/about' >About</NavLink>
                    <NavLink to='signin' >Sign in</NavLink>
                </ul>            
            </div>
        </div>
    )
}



export default Header