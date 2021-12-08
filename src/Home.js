import { useCallback, useEffect, useState } from 'react';
import api from './services/api';
import {Link} from 'react-router-dom';

function Home() {
    const [pets, setPets] = useState([]);

    const fetchData = useCallback(async () => {
        const response = await api.get('/pet');
        if (response.data.status)
            setPets(response.data.data);
    }, []);
    
    const adopt = useCallback(async (id) => {
        await api.post('/pet/adopt', {id});
        fetchData();
    }, [fetchData]);
    
    const deletePet = useCallback(async (id) => {
        const canDelete = window.confirm('Tem certeza que deseja deletar este pet?');
        if (!canDelete)
            return;

        await api.delete('/pet/' + id);
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div className="Home">
        <div className="container">
          <h1>Anima PET</h1>
          <div className="table-wrap">
                <h2>Pets Cadastrados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    {pets.length ? (
                        <tbody data-testid="table-body">
                            {pets.map(pet => (
                                <tr key={pet.id} data-testid={'pet-row-' + pet.id}>
                                    <td>{pet.name}</td>
                                    <td>{pet.adopted ? 'Adotado' : 'Esperando Adoção'}</td>
                                    <td>
                                        {!pet.adopted && <button className="btn" onClick={() => adopt(pet.id)}>Adotar</button>}
                                        <button onClick={() => deletePet(pet.id)} title="Deletar" className="deleteBtn">X</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : null}
                </table>
          </div>
          <div className="row">
            <Link className="btn" to="/pet/save">Criar Novo Pet</Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;