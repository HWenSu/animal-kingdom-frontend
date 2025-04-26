import { useState } from "react";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VideoEmbed = ({ data }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  // 主輪播設置
  const mainSliderSettings = {
    asNavFor: nav2,
    ref: (slider) => setNav1(slider),
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
  };

  // 縮圖輪播設置
  const thumbnailSliderSettings = {
    asNavFor: nav1,
    ref: (slider) => setNav2(slider),
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="video-carousel">
      <Slider {...mainSliderSettings}>
        {data.map((video, index) => (
          <div key={index} className="video-wrapper">
            <ReactPlayer
              url={video.url}
              width="100%"
              height="100%"
              controls
              className="react-player"
            />
          </div>
        ))}
      </Slider>
      {/* 縮圖輪播 */}
      <Slider {...thumbnailSliderSettings} className="thumbnail-slider">
        {data.map((video, index) => (
          <div key={index} className="thumbnail-item">
            <img src={video.thumbnail} alt={`Video thumbnail ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoEmbed;
