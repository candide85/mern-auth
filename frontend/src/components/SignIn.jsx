import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { startSignin, succesSignin, failureSignin } from "../redux/user/userSlice"
import { useSelector, useDispatch } from "react-redux"



axios.defaults.withCredentials = true

const SignIn = () => {
    
    const [formInputs, setFormInputs] = useState({
        email: '',
        password: ''
    })
    const [success, setSuccess] = useState('')
    const { error, loading } = useSelector((state) =>state.user)
    
    const url = "http://localhost:4000/api/v1/signin"
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
                navigate('/')   
            }, 5000)
        })
        .catch(err => {
            if(err.response) {
                dispatch(failureSignin(err.response.data.message))
                setTimeout(() => {
                    dispatch(failureSignin())
                }, 5000)
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 shadow-xl">
                <input onChange={handleChange} type="email" name="email" value={formInputs.email}  placeholder="email" className="bg-slate-100 p-4 rounded-lg text-lg" />
                <input onChange={handleChange} type="password" name="password" value={formInputs.password} placeholder="password" className="bg-slate-100 p-4 rounded-lg text-lg" />
                <button className="bg-slate-800 border opacity-50 text-white p-4 mt-4 rounded-lg text-2xl font-medium shadow-xl" type="submit">
                    {loading ? "loading..." : "Login"}
                </button>
            </form>
        </div>
    )
}



export default SignIn