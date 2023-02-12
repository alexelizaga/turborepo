import { FC } from 'react'


export const DarkBackground: FC = ({ children }) => {
  return (
    <div style={{
      backgroundColor: 'rgb(18,18,18)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      { children }
    </div>
  )
}
