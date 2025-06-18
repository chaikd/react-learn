import * as React from 'react'
import {useState} from 'react'

function Age(age) {
    if(age >= 18) {
      return <span style={{color:'red'}}>{age}</span>
    } else if(age >= 28) {
      return <span style={{color: 'blue'}}>{age}</span>
    }
}
export default function List() {
  const datas = [
    {
      name: 1,
      age: 18
    },
    {
      name: 2,
      age: 28
    },
    {
      name: 3,
      age: 38
    }
  ]
  const [userInfo, setUserInfo] = useState(datas)
  function clickChange(v) {
    console.log('v: ', v);
    let users = userInfo.map(user => {
      console.log('user: ', user);
      if(user.name === v.name) {
        return {
          ...user,
          age: ++user.age
        }
      }
      return user
    })
    console.log(users)
    setUserInfo(users)
  }
  return (
    <ul>
      {userInfo.map(v => (
        <li key={v.name}>
          {v.name}
          {Age(v.age)}
          {v.age > 28 && <span>{v.age}</span>}
          <button onClick={() => clickChange(v)}>click change</button>
        </li>
      ))}
    </ul>
  )
}