import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const ImageCarousel = ({images}) => {
  //確定images是陣列
  if(!images || !Array.isArray(images) ) {
    console.error('images無效', images)
    return <div>無可用圖片</div>
  }

  const settings = {
    centerMode: true,
    slidesToShow: 1,
    dots: true,
    speed:500,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
  }
  
  return (
    <div className="carousel-container">      
      <Slider {...settings}>
        {images&&
          images.map((img, index)=> (
            img? ( // 確定img不是null或空字串
            <div key={index} className="slide">
              <img src={img} alt={`${img}-${index}`}/>
            </div>) : null
          ))
        }
      </Slider>
    </div>
  )
}

export default ImageCarousel