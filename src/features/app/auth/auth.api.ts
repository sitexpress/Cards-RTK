import { AuthInstance } from "@/features/app/auth/auth.instance"

export const AuthApi = () => ({
  register: (params: any) => {
    return AuthInstance.post(params)
  },
})
