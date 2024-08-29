import React from 'react'
import '../styles/landing.css'
import { useNavigate } from 'react-router-dom'
const Landing = () => {


  const [datar, setDatar] = React.useState(['loading...'])
  
  const getData = async (url) => {
    const newData = await fetch(url,{
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(res => res.json());
    console.log(newData);
    setDatar(newData.res);
  }

  const navigate = useNavigate()
  return (
    <div className='landing'>
        <h1 className='main_heading'>Welcome to suggesto</h1>
        <p className='para'>Here you can suggest your ideas and vote for the best ones!</p>
        <div className='buttons_landing'>
            <button className='login_button' onClick={() => navigate('login')}>Login</button>
            <button className='signup_button' onClick={() => navigate('signup')}>Sign Up</button>

        </div>
    </div>
  )
}

export default Landing