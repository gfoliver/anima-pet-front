import { useCallback, useState } from "react";
import api from "./services/api";
import { useNavigate } from 'react-router-dom';

function Create() {
    const [name, setName] = useState();
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        await api.post('/pet', {name});
        navigate('/');
    }, [navigate, name]);

    return (
        <div className="Create">
            <div class="container">
                <div class="card">
                    <form onSubmit={handleSubmit}>
                        <h2>Cadastrar um PET</h2>
                        <div class="form-group">
                            <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}></input>
                        </div>
                        <button className="btn" type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Create;