import { request } from '@/api/request'
import { cookies } from 'next/headers'
import moment from 'moment'
import { redirect } from 'next/navigation'

export default async () => {
  const authToken = cookies().get('token')?.value
  const user = await (await request('http://backend:4000/user', undefined, authToken)).json()
  // const user = await (await fetch('http://backend:4000/user')).json()

  //   const callRestrictedGraphQLQuery = async () => {
  //     setLoading(true)
  //     try {
  //       if (!apolloClient) {
  //         console.error('refactor apollo client')
  //         return
  //       }
  //       const { data } = await apolloClient.query({
  //         query: gql`
  //         query Profile {
  //           Profile {
  //             _id
  //             email
  //             createdAt
  //             updatedAt
  //           }
  //         }
  //       `,
  //       })
  //       setUser(data)
  //       setError(undefined)
  //     } catch (err) {
  //       setError(err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  if (!user) {
    redirect('/')
  }

  return (
    <div>
      <h2>Your profile info</h2>
      <hr />
      <p>ID: {user._id}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <p>Created: {moment(user.createdAt).format('DD-MM-YYYY HH:mm')}</p>
      <p>Updated: {moment(user.updatedAt).format('DD-MM-YYYY HH:mm')}</p>
    </div>
  )
}
