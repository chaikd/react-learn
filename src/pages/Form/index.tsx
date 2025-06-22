import { useActionState } from "react";
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

export default function App() {
  const params = useParams()
  let id = params.id
  return (
    <>
      <AddToCartForm itemID="1" itemTitle="JavaScript：权威指南" />
      <AddToCartForm itemID="2" itemTitle="JavaScript：优点荟萃" />
    </>
  )
}
