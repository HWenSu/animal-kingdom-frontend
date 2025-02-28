import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const Navbar = () => {
    //  導航欄清單
    const navList = [
      {name:"領養資訊", link:"/adoption"},
      {name:"送養申請", link:"/post"},
      {name:"遺失協尋", link:"/lost"},

    ]

  return (
    <div>
      {/* 背景SVG */}
      <div className="hero-section">
        <svg className="hero-wave" viewBox="0 0 1440 217" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M336.419 106.714C190.533 106.714 51.3537 151.818 0 174.37V-466H1440V174.37C888 299.5 712 106.714 336.419 106.714Z" fill="#CFD671"/>
        </svg>
      </div>
      {/* 導航列 */}
      <nav className='navbar-container'>
        {/* 首頁Logo */}
        <Link to='/'>
          <img src={logo} alt="animal-land" />
        </Link>
        {/* 選單列表 */}
        <ul className="nav-list-container">
          {navList.map((navItem, index)=>(
            <li key={index} className="nav-list">
            <Link to={navItem.link}>
              {navItem.name}
            </Link>
          </li>
          ))}
          <li className="user-avatar">
            <Link to='/user'>
            <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40.6929 42V38C40.6929 35.8783 39.85 33.8434 38.3497 32.3431C36.8494 30.8429 34.8146 30 32.6929 30H16.6929C14.5711 30 12.5363 30.8429 11.036 32.3431C9.53573 33.8434 8.69287 35.8783 8.69287 38V42M32.6929 14C32.6929 18.4183 29.1111 22 24.6929 22C20.2746 22 16.6929 18.4183 16.6929 14C16.6929 9.58172 20.2746 6 24.6929 6C29.1111 6 32.6929 9.58172 32.6929 14Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar