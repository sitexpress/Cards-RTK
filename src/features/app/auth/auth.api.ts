import { AuthInstance } from "@/features/app/auth/auth.instance"

export const AuthApi = {
  register: (params: RegisterArgsType) => {
    return AuthInstance.post<RegistrationResponseType>("register", params)
  },
  login: (params: any) => {
    return AuthInstance.post<UserType>("login", params)
  },
}

export type RegistrationResponseType = {
  addedUser: UserType
}

type PasswordToPick = {
  password: string
}
export type AddedUserType = Omit<UserType, "token" | "tokenDeathTime">
export type RegisterArgsType = Pick<UserType, "email"> & PasswordToPick
export type LoginArgsType = Pick<UserType, "email" | "rememberMe"> &
  PasswordToPick
export type PartialUserType = Partial<UserType>

export type UserType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  token: string
  tokenDeathTime: number
  __v: number
}
