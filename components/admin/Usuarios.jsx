import axios from "../../utils/axiosInstance";
import { useState, useEffect } from "react";

export default function Usuarios({ role }) {
    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {        
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const {data} = await axios('users');
            setUsers(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleChange = async e => {
        if(e.target.name === 'role') {
            const newRole = e.target.value;
            const {data} = await axios.get('dominios');
            const {dominios} = data;
            const {email} = activeUser;
            const userDomain = email.substring(email.indexOf('@')+1);
            const verifyDomain = dominios.filter(d => d.domain === userDomain);
            if(verifyDomain.length > 0 || newRole === 'user') {
                setActiveUser({...activeUser, role: newRole});
            } else {
                alert('Dominio del email no válido')
            }
        } else {
            setActiveUser({...activeUser, [e.target.name]: e.target.value});
        }
    }

    const handleClick = user => {
        if(role === 'superadmin') {
            setActiveUser(user);
        } else {
            alert('Solo el superadmin puede realizar esta acción')
        }
    }

    const editUser = async e => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const {data} = await axios.put(`user/${activeUser._id}`, activeUser);
            const newUser = data.user;
            setActiveUser(newUser);
            await fetchUsers();                
        } catch (error) {
            console.log(error.response.data);
        }
        setIsLoading(false);
    }

    const statusColor = status => {
        if(status === 'active') return 'darkgreen';
        if(status === 'pending') return 'darkorange';
        if(status === 'blocked') return '#aaa';
        return '#bf0000';
    }

    const statusText = status => {
        if(status === 'active') return 'activo';
        if(status === 'pending') return 'pendiente';
        if(status === 'blocked') return 'bloqueado';
        return 'eliminado';
    }

    return (
        <>
            <table className="admin-table table mt-4">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">nombre</th>
                        <th scope="col">email</th>
                        <th scope="col">status</th>
                        <th scope="col">rol</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id} onClick={() => handleClick(u)}>
                            <td>{u._id}</td>
                            <td>{u.name}</td>
                            <th>{u.email}</th>
                            <th style={{color: statusColor(u.status)}}>
                                {statusText(u.status)}                          
                            </th>
                            <td style={{textTransform: 'uppercase'}}>{u.role}</td>                        
                        </tr>	
                    ))}				
                </tbody>
            </table>

            {activeUser &&
                <div className="container mt-5 mw800">
                    <h2 className="text-center mb-4">Editar usuario</h2>
                    <form className="w-100">
                        <div className="form-group row mb-3">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Nombre:</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={activeUser.name}
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                            <div className="col-sm-10">
                                <input 
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={activeUser.email}
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label htmlFor="status" className="col-sm-2 col-form-label">Status:</label>
                            <div className="col-sm-10">
                                <select
                                    className="form-select"
                                    name="status"
                                    value={activeUser.status}
                                    onChange={e => handleChange(e)}
                                    required
                                >
                                    <option value="active">Activado</option>
                                    <option value="pending">Pendiente</option>
                                    <option value="blocked">Bloqueado</option>                                    
                                    <option value="deleted">Eliminado</option>   
                                </select>
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label htmlFor="status" className="col-sm-2 col-form-label">Rol:</label>
                            <div className="col-sm-10">
                                <select
                                    className="form-select mb-3"
                                    name="role"
                                    value={activeUser.role}
                                    onChange={e => handleChange(e)}
                                    required
                                >
                                    <option value="user">USER</option>
                                    <option value="supervisor">SUPERVISOR</option>
                                    <option value="superadmin">SUPERADMIN</option>
                                </select>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn-contact" onClick={editUser}>
                                {!isLoading ? (
                                    <span>EDITAR</span>
                                ) : (
                                    <div className="spinner-border text-light" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}
