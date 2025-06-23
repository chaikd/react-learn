import {create} from 'zustand'
const useCount = create<{
  count: number,
  inc: () => void,
  asyncInc: () => void,
}>((set) => {
  return {
    count: 0,
    inc: () => {
      set((state) => ({count: state.count + 1}))
    },
    asyncInc: async () => {
      const result: number = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(23)
        }, 1000)
      })
      set({count: result})
    }
  }
})

type C = {
  count: any
  setCount: (val: any) => void
}
// 切片
const useC = (set): C => {
  return {
    count: 0,
    setCount: (val) => {
      set({count: val})
    }
  }
}
type Theme = {
  theme: 'light' | 'dark',
  targetTheme: () => void
}
const useTheme = (set): Theme=> {
  return {
    theme: 'light',
    targetTheme: () => [
      set(state => {
        return {
          theme: state.theme === 'light' ? 'dark' : 'light'
        }
      })
    ]
  }
}

type TotalStore = C & Theme
const useStore: any = create<TotalStore>((set) => {
  return {
    ...useC(set),
    ...useTheme(set)
  }
})

export default function Zustand() {
  let {count, inc, asyncInc} = useCount()
  return (
    <>
      {count}
      <button onClick={inc}>click change count</button>
      <button onClick={asyncInc}>change count async</button>
      <div>
        RootZustand<br/>
        <RootZustand></RootZustand>
      </div>
    </>
  )
}

function RootZustand() {
  const {count, setCount, theme, targetTheme} = useStore()
  return (
    <>
      <button onClick={targetTheme}>targetTheme {theme}</button>
      <input className="border" type="text" value={count} onChange={(e) => setCount(e.target.value)}/>
      {count}
    </>
  )
}