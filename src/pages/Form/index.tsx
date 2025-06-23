import { forwardRef, useActionState, useImperativeHandle, useRef, useState } from "react";
import { addToCart } from "./actions";
import './index.scss'
import { useParams } from "react-router";

function AddToCartForm({itemID, itemTitle}) {
  const [message, formAction, isPending] = useActionState(addToCart, null);
  console.log('isPending: ', isPending);
  return (
    <form className="form" action={formAction}>
      <h2>{itemTitle}</h2>
      <input type="hidden" name="itemID" value={itemID} />
      <button type="submit">加入购物车</button>
      {isPending ? "加载中……" : message}
    </form>
  );
}

function RefInput({ref, value, setInputValue}) {
  const inputRef = useRef(null)
  const inputFocus = () => {
    inputRef.current.focus()
  }
  useImperativeHandle(ref, () => {
    return {
      inputFocus
    }
  })
  return (
    <input type="text" value={value} ref={inputRef} onChange={(e) => setInputValue(e.target.value)}/>
  )
}
// const ForwardRefInput = forwardRef((props,ref) => {
//   return (
//     <input type="text" ref={ref}/>
//   )
// })

export default function App() {
  const params = useParams()
  let id = params.id
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const inputClicked = () => {
    console.log(inputRef.current)
    inputRef.current.inputFocus()
  }
  return (
    <>
      <AddToCartForm itemID="1" itemTitle="JavaScript：权威指南" />
      <AddToCartForm itemID="2" itemTitle="JavaScript：优点荟萃" />
      <RefInput value={inputValue} setInputValue={setInputValue} ref={inputRef}></RefInput>
      {inputValue}
      {/* <ForwardRefInput ref={inputRef}></ForwardRefInput> */}
      <button onClick={inputClicked}>click</button>
    </>
  )
}
