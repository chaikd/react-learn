import { selectCount, double, increment, decrement, withPayload } from '@/store/modules/countSlice';
import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux';

export default function Redux() {
  let count = useSelector(selectCount)
  let dispatch = useDispatch()
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
  return (
    <>
      <button onClick={dec}>-</button>
      {count}
      <button onClick={add}>+</button>
      <button onClick={payload}>+20</button>
    </>
  )
}