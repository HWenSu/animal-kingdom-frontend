import cat from '../assets/cat.jpg'
import CategoryCard from '../components/CategoryCard'
import AnimalDataFetcher from '../components/AnimalDataFetcher';


const HomePage = () => {
  const baseUrl = "http://localhost:8080";

  return (
    <div className="home-page-container">
      {/* Hero section */}
      <section className="hero-section home-page-top">
        {/* Hero section: 背景圖片和主標 */}
        <div className="hero-action">
          <h1>浪浪別哭，領養代替購買</h1>
          <button className="green-btn">開始領養</button>
        </div>
        {/* 不規則背景圖片區塊 */}
        <svg
          className="hero-wave "
          viewBox="0 0 1440 439"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="wave-clip">
              <path d="M336.419 341.926C190.533 341.926 51.3537 381.771 0 401.693V0H1440V401.693C888 512.231 712 341.926 336.419 341.926Z" />
            </clipPath>
          </defs>
          <image
            className="hero-image"
            href={cat}
            x="0"
            y="-50%"
            width="100%"
            clipPath="url(#wave-clip)"
            preserveAspectRatio="xMidYMid slice"
          />
          <path
            d="M336.419 341.926C190.533 341.926 51.3537 381.771 0 401.693V0H1440V401.693C888 512.231 712 341.926 336.419 341.926Z"
            fill="#0000001a"
          />
        </svg>
        {/* Hero section: 功能選單 */}
        {/* 種類卡片 */}
          <CategoryCard/>
      </section>
    </div>
  );
}

export default HomePage