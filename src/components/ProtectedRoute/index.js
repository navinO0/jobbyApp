import Cookie from 'js-cookie'

import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const Token = Cookie.get('jwt_token')
  if (Token === undefined) {
    return <Redirect to="./login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
