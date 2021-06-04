import React from 'react'
import { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const About: NextPage = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (loading) {
    return <></>
  }

  if (!session) {
    router.push('/')
  }

  if (session) {
    return (
      <>
        <div>This is Login Required Page</div>
        <a href="/">Link to top page</a>
      </>
    )
  }

  return <></>
}

export default About
