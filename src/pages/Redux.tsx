import { selectCount, double, increment, decrement, withPayload } from '@/store/modules/countSlice';
import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';

export default function Redux() {
  let count = useSelector(selectCount)
  let dispatch = useDispatch()
  const navigate = useNavigate()
  function add() {
    dispatch(increment())
  }
  function dec() {
    dispatch(decrement())
  }
  function payload() {
    dispatch(withPayload({
      type: 'increment',
      payload: 20
    }))
  }
  const toForm = () => {
    // navigate('/form?id=' + 123)
    navigate('/form/' + 123)
  }
  return (
    <>
    <button onClick={toForm}>to form</button>
      <Link to={`/form/${123}`}>toForm</Link>
      <button onClick={dec}>-</button>
      {count}
      <button onClick={add}>+</button>
      <button onClick={payload}>+20</button>
    </>
  )
}