import { signInWithEmailAndPassword } from 'firebase/auth';
import {useNavigate} from "react-router-dom"
import { useState } from 'react';
import {auth} from "../../firebase"
import React from 'react'
import {Link} from 'react-router-dom'

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData;
    const navigate = useNavigate();



    const handleChange = event => {
        const {name, value} = event.target

        setFormData(prev => {return {...prev, [name]: value}})
    }
    const signIn = async (e) => {
        e.preventDefault();
        try {

          const userCred = await signInWithEmailAndPassword(auth, email, password)
          alert('Welcome, lets keep your notes')
            console.log('signed in')
            localStorage.setItem(

                "user",
                JSON.stringify({
                    email:userCred.user.email,
                    uid:userCred.user.uid,
                })
            );
            


            navigate('/home')
        } catch(error) {
            alert('Please check email/password')
            console.log(error)

        }
    }
    


  return (
    <div>
        <div className='border-4 border-black'>
        <div className='text-center justify-center'>
            <div className='border-2 border-blue-400 bg-black text-blue-400 p-10 text-5xl '>
                <h1>Sign-In</h1>
            </div>
            <div className='grid place-items-center'>
                <img src="../src/images/icons8-notes-64.png" alt="" />
            </div>
            <div>
                <form action="#">
                    <div className='flex flex-col gap-4'>
                        <div className='tracking-wider'>
                            <label htmlFor="Email">E-mail:</label>
                            <input className='border-4 border-black rounded-3xl p-2'type="email" name="email"  placeholder='Email' value={email} onChange={handleChange} />
                        </div>
                        <div className='tracking-wider'>
                            <label htmlFor="Password">Password:</label>
                            <input className='border-4 border-black rounded-3xl p-2' type="password" name="password" placeholder='Key' value={password} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className='flex flex-col '>
                        <div className='pl-39 pt-10'>
                            <button onClick={signIn} type='button'  className='border-2 border-blue-400 bg-black text-blue-400  w-[20%] p-4 '>
                                {/* <Link to='/home'>Log In</Link> */} Log In
                            </button>
                        </div>
                        <div className='pl-39 pt-10'>
                            <button type='button' className='border-2 border-blue-400 bg-black text-blue-400  w-[20%] p-4 '>
                                <p className='text-white italic overline '>Don't have an account?</p>
                                <Link to='/signup' className='underline'>Register</Link>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Signin
