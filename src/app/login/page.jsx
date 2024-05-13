"use client"
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter();
 
  async function handleSubmit(event) {
    event.preventDefault()
 try{
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
    const result = await response.json();
    console.log(result);
    if (response.ok) {
        localStorage.setItem('token', result.data.token)
        router.push('/imagelist')
    }
 }catch(err){
    console.log(err)
}

    // if (response.ok) {
    //   router.push('/profile')
    // } else {
    //   // Handle errors
    // }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email"  placeholder="Email" />
      <input type="password" name="password"  placeholder="Password" />
      <button type="submit">Login </button>
    </form>
  )
}