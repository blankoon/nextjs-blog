import React, { ReactNode } from 'react'

import cn from 'classnames'
import styles from './alert.module.scss'

interface Props {
  children: ReactNode
  type: 'success' | 'error'
}

export default function Alert({ children, type }: Props) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error'
      })}
    >
      {children}
    </div>
  )
}
