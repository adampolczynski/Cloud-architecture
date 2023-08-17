'use client'

import { useProvideAuth } from '@/context/auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ROUTES = {
  Main: '/',
  Login: '/login',
  Register: '/register',
  Profile: '/user',
}

export const NavbarClient = () => {
  const { authToken, signOut } = useProvideAuth()

  const actualPathname = usePathname()

  const signOutUsingREST = async () => {
    signOut('basic')
  }

  const signOutUsingGraphQL = () => {
    signOut('graphql')
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '30rem',
        }}
      >
        {(Object.keys(ROUTES) as (keyof typeof ROUTES)[]).map((k) => {
          if (actualPathname === ROUTES[k]) {
            return null
          }
          if (['/login', '/register'].includes(ROUTES[k]) && authToken) {
            return null
          }
          return (
            <Link key={k} href={ROUTES[k]}>
              {k}
            </Link>
          )
        })}
        {authToken && (
          <>
            <button onClick={signOutUsingREST} type="button" className="btn btn-primary">
              Logout (REST)
            </button>
            <button onClick={signOutUsingGraphQL} type="button" className="btn btn-primary">
              Logout (GraphQL)
            </button>
          </>
        )}
      </div>
    </div>
  )
}
