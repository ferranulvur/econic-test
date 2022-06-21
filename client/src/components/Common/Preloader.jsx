
import Logo from '../../assets/img/logo.png';
import "./Preloader.css";

const Preloader = () => {
  return (
    <>
      <div className="preloader">
        <div className="loader">
          <img src={Logo} alt="Northern Seeds" style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block'
          }}/>
        </div>
      </div>
    </>
  );
};

export default Preloader;
