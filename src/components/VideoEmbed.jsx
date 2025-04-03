import ReactPlayer from "react-player"

const VideoEmbed = ({videoUrl}) => {
  return (
    <div className="video-wrapper">
      <ReactPlayer
      url={videoUrl}
      width="100%"
      height="100%"
      controls
      />
    </div>
  )
}

export default VideoEmbed