import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import authContext from "../../contexts/auth-context";

import ImageGallery from "react-image-gallery";
import "./image-gallery-custom.css";

function CustomImageGallery() {
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.individualProductReducer);

  const renderImages = (product) => {
    let formData = new FormData();
    formData.append("images", product.images);

    axios.get(`/cloudinary/?images=${product.images}`).then((res) => {
      const images = res.data.resources.map((image) => {
        return {
          original: image.url,
          thumbnail: image.url,
        };
      });
      setImages(images);
    });
  };

  useEffect(() => {
    //renderImages(product);
    let aaa = [
      {
        original:
          "https://res.cloudinary.com/safelifedev-com/image/upload/v1656943007/u5k5gfkeumbm1bjxtqeo.png",
        thumbnail:
          "https://res.cloudinary.com/safelifedev-com/image/upload/v1656943007/u5k5gfkeumbm1bjxtqeo.png",
      },
      {
        original:
          "https://res.cloudinary.com/safelifedev-com/image/upload/v1656943002/odxs6t6n5cqivbqsbuul.png",
        thumbnail:
          "https://res.cloudinary.com/safelifedev-com/image/upload/v1656943002/odxs6t6n5cqivbqsbuul.png",
      },
      {
        original:
          "https://res.cloudinary.com/safelifedev-com/image/upload/v1656942997/ntr0m8gmf7s3ae1lgblw.png",
        thumbnail:
          "https://res.cloudinary.com/safelifedev-com/image/upload/v1656942997/ntr0m8gmf7s3ae1lgblw.png",
      },
      {
        original:
          "https://res.cloudinary.com/safelifedev-com/image/upload/v1656943007/u5k5gfkeumbm1bjxtqeo.png",
        thumbnail:
          "https://res.cloudinary.com/safelifedev-com/image/upload/v1656943007/u5k5gfkeumbm1bjxtqeo.png",
      },
      {
        original:
          "https://res.cloudinary.com/safelifedev-com/image/upload/v1656943002/odxs6t6n5cqivbqsbuul.png",
        thumbnail:
          "https://res.cloudinary.com/safelifedev-com/image/upload/v1656943002/odxs6t6n5cqivbqsbuul.png",
      },
      {
        original:
          "https://res.cloudinary.com/safelifedev-com/image/upload/v1656942997/ntr0m8gmf7s3ae1lgblw.png",
        thumbnail:
          "https://res.cloudinary.com/safelifedev-com/image/upload/v1656942997/ntr0m8gmf7s3ae1lgblw.png",
      },
    ];
    setImages(aaa);
  }, [product]);

  return (
    <div className="rounded shadow">
      <ImageGallery
        items={images}
        showFullscreenButton={true}
        showPlayButton={true}
        showThumbnails={true}
        showIndex={true}
        showNav={true}
        showBullets={true}
        thumbnailPosition="left"
        thumbnailWidth={120}
        thumbnailHeight={120}
      />
    </div>
  );
}

export default CustomImageGallery;
