import React from 'react'
import Cover from '../Components/Registration/Cover/Cover'
import SignUp from '../Components/Registration/SignUp/SignUp'
import ShowAccount from '../Components/Registration/Show-Account/ShowAccount'

const AppSignUp = () => {
  return (
    <div>
      {<Cover />}
      {<SignUp />}
      {<ShowAccount />}
    </div>
  )
}

export default AppSignUp