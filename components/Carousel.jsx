import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import placeholderImage from "../assets/placeholderImage";
import { Button } from "./Button";
import { Dropdown } from "react-bootstrap";

export default function Carousel() {
  const images = [
    "Banner-Principal.webp",
    "comprar-maquinaria.webp",
    "Banner-Principal-tractor-2.webp",
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => next(), 6000);
    return () => clearInterval(interval);
  }, [current]);

  const next = () =>
    current === images.length - 1
      ? setCurrent(0)
      : setCurrent((prev) => prev + 1);
  const previous = () =>
    current === 0
      ? setCurrent(images.length - 1)
      : setCurrent((prev) => prev - 1);

  return (
    <section className="section_banner">
      <div className="position-relative w-100 h-100">
        {images.map((image, key) => (
          <Image
            key={key}
            className={`banner-img ${
              key === current ? "carousel-active" : ""
            } ${key !== 0 ? "banner-img-object-position-center" : ""}`}
            alt={`Macroconcesionario- banner ${key}`}
            src={`/img/${image}`}
            layout="fill"
            // objectFit="fit"
            placeholder="blur"
            blurDataURL={placeholderImage}
            priority
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className="carousel-buttons">
          <button onClick={previous} aria-label="previous slider">
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ fontSize: "1.3rem", opacity: "0.8" }}
            />
          </button>
          <button onClick={next} aria-label="next slider">
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "1.3rem", opacity: "0.8" }}
            />
          </button>
        </div>
      )}
    </section>
  );
}
