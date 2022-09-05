import Icon from "./Icon";

export default function ZoomImage({ image, setZoomImage }) {
  return (
    <div className="zoom_image">
      <div className="zoom_image_wrapper">
        <div className="align-self-end px-5 mb-4">
          <Icon
            icon="times"
            size="2x"
            color="white"
            customClass="pointer"
            onClick={() => setZoomImage(null)}
          />
        </div>
        <img
          src={`${process.env.NEXT_PUBLIC_Macroconcesionario_API_STATIC_URI}img/comentarios/${image.src}`}
          alt={image.alt}
        />
      </div>
    </div>
  );
}
