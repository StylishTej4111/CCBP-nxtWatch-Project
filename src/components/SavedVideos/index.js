import {Component} from 'react'

import {Link} from 'react-router-dom'

import {formatDistanceToNowStrict} from 'date-fns'

import Header from '../Header'

import Sidebar from '../Sidebar'

import nxtWatchContext from '../../context/nxtWatchContext'

import {
  BannerContainer,
  HomeBgContainer,
  HomeContainer,
  ThumbnailsBgContainer,
  HomeVideosListContainer,
  FailureContainer,
  FailureImage,
  FailureHeading,
  FailurePara,
  VideoListItem,
  ThumbnailImage,
  VideoDetailsContainer,
  VideoTitleEtcContainer,
  TitlePara,
  CommonParaTag,
  ChannelNameEtcContainer,
  ViewsPublishedContainer,
  DotSymbol,
  PersistDot,
  VideoListItemInsideContainer,
  BannerHeading,
  TrendingIconContainer,
  TrendingIcon,
} from './savedVideosStyles'

class SavedVideos extends Component {
  renderNoSavedVideosView = theme => (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <FailureHeading dark={theme}>No saved videos found</FailureHeading>
      <FailurePara>You can save your videos while watching them</FailurePara>
    </FailureContainer>
  )

  renderSuccessView = (theme, videosList) => (
    <>
      <BannerContainer data-testid="banner" dark={theme}>
        <TrendingIconContainer dark={theme}>
          <TrendingIcon />
        </TrendingIconContainer>
        <BannerHeading dark={theme}>Saved Videos</BannerHeading>
      </BannerContainer>
      <HomeVideosListContainer>
        {videosList.map(eachVideo => (
          <VideoListItem key={eachVideo.id}>
            <Link
              to={`/videos/${eachVideo.id}`}
              style={{textDecoration: 'none'}}
            >
              <VideoListItemInsideContainer>
                <ThumbnailImage
                  src={eachVideo.thumbnailUrl}
                  alt="video thumbnail"
                />
                <VideoDetailsContainer>
                  <VideoTitleEtcContainer>
                    <TitlePara dark={theme}>{eachVideo.title}</TitlePara>

                    <ChannelNameEtcContainer>
                      <CommonParaTag>{eachVideo.channelName}</CommonParaTag>
                      <DotSymbol />
                      <ViewsPublishedContainer>
                        <CommonParaTag>{eachVideo.viewCount}</CommonParaTag>
                        <PersistDot />
                        <CommonParaTag>
                          {formatDistanceToNowStrict(
                            new Date(eachVideo.publishedAt),
                            {addSuffix: true},
                          )}
                        </CommonParaTag>
                      </ViewsPublishedContainer>
                    </ChannelNameEtcContainer>
                  </VideoTitleEtcContainer>
                </VideoDetailsContainer>
              </VideoListItemInsideContainer>
            </Link>
          </VideoListItem>
        ))}
      </HomeVideosListContainer>
    </>
  )

  renderFinalOutput = (themeType, videos) => {
    if (videos.length === 0) {
      return this.renderNoSavedVideosView(themeType)
    }
    return this.renderSuccessView(themeType, videos)
  }

  render() {
    return (
      <nxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme, savedVideos} = value
          return (
            <>
              <Header />
              <HomeBgContainer dark={isDarkTheme} data-testid="savedVideos">
                <Sidebar />
                <HomeContainer>
                  <ThumbnailsBgContainer>
                    {this.renderFinalOutput(isDarkTheme, savedVideos)}
                  </ThumbnailsBgContainer>
                </HomeContainer>
              </HomeBgContainer>
            </>
          )
        }}
      </nxtWatchContext.Consumer>
    )
  }
}

export default SavedVideos
