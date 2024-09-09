import {Link, NavLink} from 'react-router-dom'


const Header = () => {
    return(
        <div className="bg-slate-800 text-white py-8">
            <div className='flex justify-between items-center max-w-7xl mx-auto'>
                <Link to='/' >
                    <h3 className='font-bold'>APP AUTH</h3>
                </Link>
                <ul className='flex gap-6'>
                    <NavLink to='/' >Home</NavLink>
                    <NavLink to='/about' >About</NavLink>
                    <NavLink to='signin' >Sign in</NavLink>
                </ul>            
            </div>
        </div>
    )
}



export default Header