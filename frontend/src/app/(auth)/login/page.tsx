'use client'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { AuthFormCard, MainContainer } from '@/components'
import { useProvideAuth } from '@/context/auth'
import { request } from '@/api/request'

export default () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const { signIn } = useProvideAuth()

  const validateInputs = () => {
    if (!email || !password) {
      throw new Error('Provide credentials')
    }
    // if (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email)) {
    //   throw new Error('Invalid email format')
    // }
  }

  const loginUsingGraphQL = async () => {
    try {
      validateInputs()
      await signIn({ email, password }, 'graphql')
      router.push('/user')
    } catch (error) {
      const e = error as Error
      setError(e.message)
    }
  }

  const loginUsingREST = async () => {
    try {
      validateInputs()
      // await signIn({ email, password }, 'basic')
      await request('http://localhost:4000/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      router.push('/user')
    } catch (error) {
      const e = error as Error
      setError(e.message)
    }
  }

  useEffect(() => {
    setError('')
  }, [email, password])

  return (
    <MainContainer>
      {error ? <h3 style={{ color: 'orange' }}>{error}</h3> : null}
      <AuthFormCard>
        <Form.Control
          tabIndex={1}
          type="email"
          placeholder="Email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          style={{ marginBottom: '1rem' }}
        />
        <Form.Control
          tabIndex={2}
          type="password"
          placeholder="Password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          style={{ marginBottom: '1rem' }}
        />
        <Button tabIndex={3} style={{ marginBottom: '1rem' }} onClick={loginUsingREST}>
          Login using REST
        </Button>
        <Button tabIndex={4} onClick={loginUsingGraphQL}>
          Login using GraphQL
        </Button>
      </AuthFormCard>
    </MainContainer>
  )
}
