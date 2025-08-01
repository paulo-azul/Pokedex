import './Pokecard.css'
import { useEffect, useState } from "react";

const cores_tipos = {
        grass : '#7AC74C1A',
        fire : '#eb17172f',
        water : '#30a2ee34',
        normal : '#96959f2a',
        electric : '#eee4301a',
        fairy : '#f7106931',
        ground : '#ee6f301a',
        psychic : '#8930ee3b',
        bug : '#8cee301a',
        poison : '#a830ee1a',
        fighting : '#f4721c40',
        rock : '#55000066',
        ghost : '#0f031637', 
        ice : '#30a2ee55',
        dragon : '#30eede4c',
    }

const cores_tipos_letra = {
        grass : '#7AC74C',
        fire : '#EE8130',
        water : '#30a2eeae',
        normal : '#96959fb7',
        electric : '#eee43088',
        fairy : '#ee3079ae',
        ground : '#ee7f30a7',
        psychic : '#8930eeb7',
        bug : '#8cee3098',
        poison : '#a33ea1db',
        fighting : '#9d591eb1',
        rock : '#5500008e',
        ghost : '#0f0316a8', 
        ice : '#30a2eecb',
        dragon : '#09c1b2bb',
        flying : '#A98FF3',
        steel : '#c5c996ff',
    }


export default function Pokecard(props){

    useEffect(() => {
        async function buscarpoke() {
            const pokemon = await fetch(props.url);
            const dados = await pokemon.json();      
            setPoke(dados);
        }
        buscarpoke();
    }, [props.url])

    const [poke, setPoke] = useState(null);

    if(!poke){
        return (<p>carregando...</p>)
    }else{

        const nome = poke.name.toLowerCase();
        const tipos = poke.types.map(t => t.type.name.toLowerCase());
        const termo_buscado = props.termoFind;

        const corresponde = nome.includes(termo_buscado) || tipos.some(tipo => tipo.includes(termo_buscado));

        if (!corresponde && termo_buscado !== ""){
        return null; 
        }

        return(
            <div className='poke_dex' style={{ backgroundColor: cores_tipos[poke.types[0].type.name] }}>
                <h1 className='poke_nome'>{poke.name}</h1>
                <header className='carta'>
                    <img src={poke.sprites.front_default} className='poke_img' alt="imagem pokemon"></img>
                    <header className='header_tipos'>
                        {poke.types.map(t => (<p className='tipo' style={{ backgroundColor: cores_tipos_letra[t.type.name] }} > {t.type.name}   </p>))}
                    </header>
                </header>
            </div>
        )
    }
}