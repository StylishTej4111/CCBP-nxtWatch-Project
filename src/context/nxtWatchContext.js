import React from 'react'

const nxtWatchContext = React.createContext({
  isDarkTheme: false,
  changeTheme: () => {},
  activeTab: 'INITIAL',
  changeActiveTab: () => {},
  likedVideos: [],
  changeLikeStatus: () => {},
  dislikedVideos: [],
  changeDislikeStatus: () => {},
  savedVideos: [],
  addToSavedVideos: () => {},
})

export default nxtWatchContext
