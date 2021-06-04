import React, { useState } from 'react'
import { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/client'

const Index: NextPage = () => {
  const [session, loading] = useSession()
  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignOut = () => {
    signOut()
  }

  const handleSignIn = () => {
    signIn('credentials', { userId, password })
  }

  if (loading) {
    return <></>
  }

  return (
    <div>
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={handleSignOut}>Sign out</button>
        </>
      )}
      {!session && (
        <>
          Not signed in
          <label style={{ display: 'block' }}>
            UserID
            <br />
            <input
              type="text"
              onChange={(event) => setUserId(event.target.value)}
            />
          </label>
          <label style={{ display: 'block' }}>
            Password
            <br />
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button onClick={handleSignIn}>Sign in</button>
        </>
      )}
      <br />
      <br />
      <a href="login_required_page">Link to Login required page</a>
    </div>
  )
}

export default Index
