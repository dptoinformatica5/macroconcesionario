import { Alert } from 'react-bootstrap';
import Link from 'next/link';

export default function cuentaActivada() {
    return (
        <div className="container">
            <section className="login-section p-5 mx-auto" style={{maxWidth: '800px'}}>
                <Alert className="mt-4" variant='success'>
                    <h3>Cuenta activada</h3>¡Bienvenido a CochesElectricosOnline!
                </Alert>
                <hr className="my-4" />
                <div className="d-flex justify-content-center">
                    <Link href="/login">
                        <a><button className="btn-contact m-auto">Iniciar sesión</button></a>
                    </Link>
                </div>
            </section>
        </div>
    )
}
