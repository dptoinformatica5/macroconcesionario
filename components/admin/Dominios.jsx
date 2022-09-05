import axios from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import Button from "../Button";
import Icon from '../Icon';

export default function Dominios() {
    const [dominios, setDominios] = useState([]);    
    const [showCrearDominio, setShowCrearDominio] = useState(false);
    const [state, setState] = useState('');    

    useEffect(() => fetchDominios(), []);

    const fetchDominios = async () => {
        try {
            const {data} = await axios.get('dominios');
            setDominios(data.dominios);
        } catch (error) {
            console.log(error.response);
        }
    }

    const crearDominio = async e => {
        e.preventDefault();
        try {
            await axios.post('dominio', {domain: state});
            fetchDominios();
            setShowCrearDominio(false);
            setState('');
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const handleDelete = async d => {
        if(confirm(`¿Seguro de borrar el dominio ${d.domain}?`)) {
            try {
                await axios.delete(`dominio/${d._id}`);
                fetchDominios();
            } catch (error) {
                console.log(error.response.data);
            }
        }
    }

    const renderCrearDominio = () => (
        <div className="mt-4" style={{maxWidth: '500px', margin: '0 auto'}}>
            <form className="form d-flex align-items-center justify-content-center" style={{gap: '10px'}} onSubmit={crearDominio}>
                <div className="form-floating flex-grow-1">
                    <input
                        type="text"
                        className="form-control"
                        name="domain"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Dominio"
                        required
                    />
                    <label htmlFor="domain">Dominio</label>
                </div>

                <button type="submit" className="btn-contact">Crear</button>
            </form>
        </div>
    )

    return (
        <>
            <div className="d-flex justify-content-end">
                <Button  
                    icon={showCrearDominio ? "eye" : "plus-circle"}
                    iconColor="white" 
                    text={showCrearDominio ? "Ver dominios" : "Añadir dominio"}
                    color="white" 
                    bg="#333" 
                    onClick={() => setShowCrearDominio(prev => !prev)} 
                />                
            </div>
            
            {showCrearDominio  
                ? renderCrearDominio()
                : (
                    <table className="table mt-4">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">dominio</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dominios.map((d, i) => (
                                <tr key={i}>
                                    <td scope="row">{d._id}</td>
                                    <th>{d.domain}</th>    
                                    <td style={{cursor: 'pointer'}} onClick={() => handleDelete(d)}><Icon icon="trash"/></td>                    
                                </tr>	
                            ))}				
                        </tbody>
                    </table>
                )
            }            
        </>
    )
}
