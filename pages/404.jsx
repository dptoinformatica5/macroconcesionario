import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="container d-flex justify-content-center">
            <div className="text-center" style={{marginTop: '5rem'}}>
                <h2>Error 404</h2>
                <p>Lo siento, no se ha encontrado la página solicitada.</p>
                <Link href="/">
                    <a><button className="btn-contact">Volver a página principal</button></a>
                </Link>
            </div>
        </div>
    )
}