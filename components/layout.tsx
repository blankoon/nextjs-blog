import { ReactNode } from 'react'
import styles from './layout.module.scss'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return <div className={styles.container}>{children}</div>
}
