import overview1 from "../../../assets/img/main-slider/purple-bud-autofloracion-xl.png";
import overview2 from "../../../assets/img/main-slider/super-skunk-feminizada-xl.png";
import {Link} from 'react-router-dom';
import "./Overview.css";

function Overview() {
  return (
    <section className="overview-area pt-5 pb-5">
      <div className="container">
        <div className="row d-flex justify-content-center mb-5">
          <h1 className="text-primary">Welcome to Northern Seeds</h1>
          <h3 className="text-secondary">The very first place to look for premmium quality seeds</h3>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="single-overview">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="overview-image">
                    <img src={overview1} alt="image" />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="overview-content">
                    <h3>Special Discount Offer</h3>
                    <p>for 12-12 Festival</p>
                    <span>$499.00</span>

                    <div className="overview-btn">
                    <Link to="/shop" className="default-btn">
                        <i className="flaticon-shopping-cart"></i>
                        Shop Now
                        <span></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="single-overview-item d-flex align-items-center">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <div className="overview-content">
                    <p>Featured</p>
                    <h3>Best Price & Great Quality</h3>
                    <span>50% Off</span>

                    <div className="overview-btn">
                      <a href="#" className="overview-btn-one">
                        View Product
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="overview-image">
                    <img className="ml-5" src={overview1} alt="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Overview;
