import React from 'react'
import Cover from '../Components/Registration/Cover/Cover'
import SignIn from '../Components/Registration/SignIn/SignIn'
import ShowAccount from '../Components/Registration/Show-Account/ShowAccount'

const AppSignIn = () => {
  return (
    <div>
      {<Cover />}
      {<SignIn />}
      {<ShowAccount />}
    </div>
  )
}

export default AppSignIn