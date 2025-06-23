import './index.scss'

type Props = {
  onPlus: () => void
  onMinus: () => void
  count: any
}

const Count = ({ onPlus, onMinus, count }: Props) => {
  return (
    <div className="goods-count">
      <span className="minus" onClick={onMinus}>-</span>
      <span className="count">{count}</span>
      <span className="plus" onClick={onPlus}>+</span>
    </div>
  )
}

export default Count
