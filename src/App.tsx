import { Counter } from "./features/counter/Counter"
import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignUp } from "@/routes/sign-up"
import { SignIn } from "@/routes/sign-in"
import { Learn } from "@/routes/learn"
import { ForgotPassword } from "@/routes/forgot-password"
import { SetNewPassword } from "@/routes/set-new-password"
import { Cards } from "@/routes/cards"
import { Packs } from "@/routes/packs"
import { Profile } from "@/routes/profile"
import { CheckEmail } from "@/routes/check-email"
import { Error } from "@/routes/error"
import { store } from "@/app/store"
import { Provider } from "react-redux"
import { createTheme, ThemeProvider } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useEffect } from "react"
import { appActions, appReducer } from "@/features/app/app.slice"
import { authThunks } from "@/features/app/auth/auth.slice"
import { AuthApi } from "@/features/app/auth/auth.api"

export const Test = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const error = useAppSelector((state) => state.app.error)
  const dispatch = useAppDispatch()

  const handleErrorButtonClicked = () => {
    dispatch(appActions.setError({ error: "new error" }))
  }
  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }))
    }, 3000)
  }, [dispatch])

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <button
        onClick={() =>
          dispatch(
            authThunks.login({
              email: "eccoPolo@gmail.com",
              password: "rotor2222",
              rememberMe: true,
            }),
          )
        }
      >
        login
      </button>
      <button onClick={handleErrorButtonClicked}>create error</button>
      {!!error && <h2>error</h2>}
      <Counter />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
    errorElement: <Error />,
  },
  {
    path: "/cards",
    element: <Cards />,
  },
  {
    path: "/check-email",
    element: <CheckEmail />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/learn",
    element: <Learn />,
  },
  {
    path: "/packs",
    element: <Packs />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/set-new-password",
    element: <SetNewPassword />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
])
const theme = createTheme()

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
