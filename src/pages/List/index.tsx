import {memo, useCallback, useMemo, useReducer, useState} from 'react'

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
  // const [userInfo, setUserInfo] = useState(datas)
  // function clickChange(v) {
  //   let users = userInfo.map(user => {
  //     if(user.name === v.name) {
  //       return {
  //         ...user,
  //         age: ++user.age
  //       }
  //     }
  //     return user
  //   })
  //   setUserInfo(users)
  // }
  const reducer = (state, action) => {
    switch(action.type) {
      case 'inc':
        return state.map(user => {
          if(user.name === action.payload) {
            return {
              ...user,
              age: ++user.age
            }
          }
          return user
        })
      case 'dec':
        return state.map(user => {
          if(user.name === action.payload) {
            return {
              ...user,
              age: --user.age
            }
          }
          return user
        })
      default:
        return state
    }
  }
  const [userInfo, dispatch] = useReducer(reducer, datas)
  const clickChange = useCallback((name) => {
    dispatch({
      type: 'inc',
      payload: name
    })
  }, [])
  // const clickChange = (name) => {
  //   dispatch({
  //     type: 'inc',
  //     payload: name
  //   })
  // }
  const fib = (n) => {
    if(n < 3) return n
    return fib(n-2) + fib(n-1)
  }
  const [state, setState] = useState(2)
  const memoTest = useMemo(() => {
    return fib(state)
  }, [state])
  return (
    <>
      <button onClick={() => setState(state + 1)}>click {state}</button>
      <ul>
        {userInfo.map(v => (
          // <li key={v.name}>
          //   {v.name}
          //   {Age(v.age)}
          //   {v.age > 28 && <span>{v.age}</span>}
          //   <button onClick={() => clickChange(v.name)}>click change</button>
          // </li>
          <>
            <MemoComponent {...v} clickChange={clickChange}></MemoComponent>
            {/* <NormalComponent {...v}></NormalComponent> */}
            {/* <button onClick={() => clickChange(v.name)}>click change</button> */}
          </>
        ))}
        <li>memo: {memoTest}</li>
      </ul>
    </>
  )
}

function NormalComponent({name, age, clickChange}) {
  console.log('refrashed')
  return (<li key={name}>
    {name}
    {Age(age)}
    {age > 28 && <span>{age}</span>}
    <button onClick={() => clickChange(name)}>click change</button>
  </li>)
}

const MemoComponent = memo(NormalComponent)