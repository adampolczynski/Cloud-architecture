import { Static, Type } from '@sinclair/typebox'

export const AuthCredentialsSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String(),
})

export type AuthCredentialsType = Static<typeof AuthCredentialsSchema>
