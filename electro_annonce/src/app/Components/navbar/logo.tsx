import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <>
      <Image src="/Logo.png" alt="logo" width={100} height={100} />
    </>
  )
}
