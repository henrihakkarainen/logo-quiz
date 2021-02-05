import { useTranslation } from 'react-i18next';

import '../styles/Home.css';

const Home = (props) => {
  const [ t, i18n ] = useTranslation();

  return (
    <div className="home-page">
      <h1>Welcome to Logo Quiz!</h1>
      <div className="category" style={{ backgroundImage: "url(http://localhost:8080/categories/cars.png)"}}>
        <h2>Autot</h2>
      </div>
    </div>
  )
}

export default Home;