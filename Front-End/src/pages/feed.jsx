import React from 'react'
import FeedIndex from '../components/Feed/feed'
import AuthService from '../components/services/AuthServices';

const authService = new AuthService();

export function Feed() {
  return (
    <>
      <div>
        <FeedIndex authService={authService}/>
      </div>
    </>
  )
}
