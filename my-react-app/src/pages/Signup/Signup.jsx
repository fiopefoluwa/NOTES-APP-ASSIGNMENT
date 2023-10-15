import React, { useState } from 'react'
import {auth} from "../../firebase"
import {useNavigate} from "react-router-dom"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

const Signup = () => {
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
    const signUp = async (e) => {
        e.preventDefault();
        try {

         const userCred = await createUserWithEmailAndPassword(auth, email, password)
            console.log('completed')
            alert('Account successfully created')
            localStorage.setItem(
                "user",
                JSON.stringify({
                    email:userCred.user.email,
                    uid: userCred.user.uid
                })
            )

            navigate('/')
        } catch(error) {
            console.log(error)
            alert('Fill all inputs correctly...')
            
        }
    }


  return (
    <div>
      <div className='border-4 border-black'>
        <div className='text-center justify-center'>
            <div className='border-2 border-blue-400 bg-black text-blue-400 p-10 text-5xl '>
                <h1>Sign Up</h1>
            </div>
            <div className='grid place-items-center'>
                <img src="../src/images/icons8-notes-64.png" alt="" />
            </div>
            <div>
                <form action="submit">
                    <div className='flex flex-col gap-4'>
                        <div className='tracking-wider'>
                            <label htmlFor="Email">Email:</label>
                            <input className='border-4 border-black rounded-3xl p-2'type="email" name='email' placeholder='Mail Address' value={email} onChange={handleChange} />
                        </div>
                        <div className='tracking-wider'>
                            <label htmlFor="Password">Create Password:</label>
                            <input className='border-4 border-black rounded-3xl p-2' type="password" name='password' placeholder='New Key' value={password} onChange={handleChange}/>
                        </div>
                        <div className='tracking-wider'>
                            <label htmlFor="Password">Confirm Password:</label>
                            <input className='border-4 border-black rounded-3xl p-2' type="password" name='password' placeholder=' Confirm Key'/>
                        </div>
                    </div>
                    <div className='flex flex-col '>
                        <div className='pl-39 pt-10'>
                        <button onClick={signUp} type='button' className='border-2 border-blue-400 bg-black text-blue-400  w-[20%] p-4 '>
                                Create Account
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

export default Signup
