import * as React from 'react'
import {useState} from 'react'
import { asyncAuthInfo } from '@/store/modules/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

function Login() {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })
  const navigateto = useNavigate()
  const inputChange = (e) => {
    let username, password
    if (e.target.id === 'username') {
      username = e.target.value
      password = loginForm.password
    } else {
      username = loginForm.username
      password = e.target.value
    }
    setLoginForm({
      username,
      password
    })
  }
  const dispatch = useDispatch()
  async function login() {
    console.log(loginForm)
    await dispatch<any>(asyncAuthInfo())
    navigateto('/comments')
  }
  return (
    <>
      <div className="box w-1/2 mx-auto mt-20 p-10 border border-gray-300 rounded">
        <div className="flex items-center mb-5">
          <label className='w-1/5 text-right'>用户名：</label>
          <input onChange={inputChange} placeholder='请输入用户名' className='border border-gray-300 ml-10 py-1 px-2 rounded' id="username" type="text" value={loginForm.username}/>
        </div>
        <div className="flex items-center mb-5">
          <label className='w-1/5 text-right'>密码：</label>
          <input onChange={inputChange} placeholder='请输入密码' className='border border-gray-300 ml-10 py-1 px-2 rounded' id="password" type="text" value={loginForm.password}/>
        </div>
        <div className="text-center">
          <button className='w-1/5 bg-gray-300' onClick={login}>登陆</button>
        </div>
      </div>
    </>
  )
}

export default Login