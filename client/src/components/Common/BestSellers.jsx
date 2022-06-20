import { useState } from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

function BestSellers({
  paddingClass = null,
  products,
  showQuickView,
  addToCart,
}) {
  const [filterBy, setFilterBy] = useState("cameras");

  const filterBestSellers = (filterBy) => {
    setFilterBy(filterBy);
  };

  return (
    <section className={"bestsellers-area " + paddingClass}>
      <div className="container">
        <div className="section-title">
          <h2>Bestsellers</h2>
        </div>

        <div className="tab bestsellers-list-tab">
          <ul className="tabs">
            <li
              onClick={() => filterBestSellers("semillas_cannabis")}
              className={`tab-item${
                filterBy === "semillas_cannabis" ? " tab-active" : ""
              }`}
            >
              <span>Semillas Cannabis</span>
            </li>
            <li
              onClick={() => filterBestSellers("semillas_feminizadas")}
              className={`tab-item${
                filterBy === "semillas_feminizadas" ? " tab-active" : ""
              }`}
            >
              <span>Semillas Feminizadas</span>
            </li>
            <li
              onClick={() => filterBestSellers("productos_cbd")}
              className={`tab-item${filterBy === "productos_cbd" ? " tab-active" : ""}`}
            >
              <span>Productos CBD</span>
            </li>
            <li
              onClick={() => filterBestSellers("merchandising")}
              className={`tab-item${
                filterBy === "merchandising" ? " tab-active" : ""
              }`}
            >
              <span>Merchandising</span>
            </li>
            <li
              onClick={() => filterBestSellers("hemp_foods")}
              className={`tab-item${
                filterBy === "hemp_foods" ? " tab-active" : ""
              }`}
            >
              <span>Hemp Foods</span>
            </li>
            <li
              onClick={() => filterBestSellers("vaporizadores")}
              className={`tab-item${
                filterBy === "vaporizadores" ? " tab-active" : ""
              }`}
            >
              <span>Vaporizadores</span>
            </li>

          </ul>
          <div className="tab_content">
            <div className="tabs_item">
              <div className="row">
                {products &&
                  products.map((product) => {
                    if (product.type === filterBy) {
                      return (
                        <div className="col-lg-3 col-sm-6" key={product._id}>
                          <div className="single-bestsellers-products at-time">
                            <div className="bestsellers-products-image">
                              <Link to={`/products-details/${product._id}`}>
                                <Image
                                  key={product._id}
                                  cloudName={
                                    process.env.REACT_APP_CLOUDINARY_NAME
                                  }
                                  publicId={product.image_public_id}
                                  width="300"
                                  crop="scale"
                                />
                              </Link>
                              <div className="tag">New</div>
                              <ul className="bestsellers-action">
                                <li>
                                  <span
                                    className="addtocart-icon-wrap"
                                    onClick={() => addToCart(product)}
                                  >
                                    <i className="flaticon-shopping-cart"></i>
                                  </span>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="flaticon-heart"></i>
                                  </a>
                                </li>
                                <li>
                                  <span
                                    className="quickview-icon-wrap"
                                    onClick={() => showQuickView(product)}
                                  >
                                    <i className="flaticon-view quick-icon"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>

                            <div className="bestsellers-products-content">
                              <h3>
                                <Link to={`/products-details/${product._id}`}>
                                  {product.name}
                                </Link>
                              </h3>
                              <ul className="rating">
                                <li>
                                  <i className="bx bxs-star"></i>
                                </li>
                                <li>
                                  <i className="bx bxs-star"></i>
                                </li>
                                <li>
                                  <i className="bx bxs-star"></i>
                                </li>
                                <li>
                                  <i className="bx bxs-star"></i>
                                </li>
                                <li>
                                  <i className="bx bxs-star"></i>
                                </li>
                              </ul>
                              <span>${product.price}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
