import Image from "next/image";
import Link from "next/link";

export default function SorteoAlert() {
  return (
    <div className="position-relative w-100 shake">
      <Link href="">
        <a>
          <Image
            alt="La mejor plataforma online de venta de coches eléctricos"
            src={`/img/banner-record-ventas.png`}
            layout="responsive"
            width={100}
            height={30}
            objectFit="cover"
            priority
          />
        </a>
      </Link>
    </div>
  );
}
