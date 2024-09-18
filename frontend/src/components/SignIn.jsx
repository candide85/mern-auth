import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'
import { startSignin, succesSignin, failureSignin } from "../redux/user/userSlice"
import { useSelector, useDispatch } from "react-redux"
import Oath from "./Oath"



axios.defaults.withCredentials = true

const SignIn = () => {
    
    const [formInputs, setFormInputs] = useState({
        email: '',
        password: ''
    })
    const [success, setSuccess] = useState('')
    const { error, loading } = useSelector((state) =>state.user)
    
    // const url = "http://localhost:4000/api/v1/signin"
    const url = "https://mern-auth-ku4nt4dy8-candide85s-projects.vercel.app/api/v1/signin"
    // const url = "/api/v1/signin"
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInputs(prevState => ({...prevState, [name]: value}))
    }

    
    const signin = async () => {
        dispatch(startSignin())
        await axios.post(url,formInputs, {
            withCredentials: true
        })
        .then(response => {
            setSuccess(response.data.message)
            dispatch(succesSignin(response.data))          
            setTimeout(() => {
                setSuccess('')
            }, 4000)

            navigate('/')
        })
        .catch(err => {
            if(err.response) {
                dispatch(failureSignin(err.response.data.message))
                setTimeout(() => {
                    dispatch(failureSignin())
                }, 4000)
            }
        })
        setFormInputs({
            email: '',
            password: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        signin()
  
    }


    return(
        <div className=" max-w-xl mx-auto border-2 p-20 mt-24 bg-slate-600 rounded-lg">
            {success && <p className="text-center bg-green-600 p-4 text-xl text-white">{success}</p>}
            {error && <p className="text-center bg-red-600 p-4 text-xl text-white">{error}</p>}
            <h1 className="text-center py-7 mb-5 text-5xl font-semibold text-white">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 shadow-xl">
                <input onChange={handleChange} type="email" name="email" value={formInputs.email}  placeholder="email" className="bg-slate-100 p-4 rounded-lg text-lg" />
                <input onChange={handleChange} type="password" name="password" value={formInputs.password} placeholder="password" className="bg-slate-100 p-4 rounded-lg text-lg" />
                <button className="bg-slate-800 border  text-white p-4 mt-2 rounded-lg text-2xl font-medium shadow-xl" type="submit">
                    {loading ? "loading..." : "Login"}
                </button>
                <Oath  />
            </form>
            <div className="flex items-center gap-2 mt-3">
                <p className="text-white">Dont Have an Account ?</p>
                <Link to='/signup' >
                    <span className="text-sky-400 font-medium text-lg">sign up</span>
                </Link>
            </div>
        </div>
    )
}



export default SignIn