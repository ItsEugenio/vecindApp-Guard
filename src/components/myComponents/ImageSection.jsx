import React from 'react'
import img from '../../assets/logovecin.png'

function ImageSection() {
    const logo = img
  return (
    <div className="relative hidden md:block w-[400px] h-[400px] bg-muted rounded-lg overflow-hidden">
    <img
      src={logo}
      alt="img"
      className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
    />
  </div>
  )
}

export default ImageSection
