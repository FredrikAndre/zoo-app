import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimalsArray } from '../models/AnimalsArray';

const Animals = () => {
    const [animals, setAnimals] = useState<AnimalsArray[]>([]);
    
    const getAnimalsfromStorage = () => {
        const animalLS = JSON.parse(localStorage.getItem('info') || '{}');
        setAnimals(animalLS)
    }
 
    useEffect(() => {
        if (localStorage.getItem('info') === null) {
            axios.get('https://animals.azurewebsites.net/api/animals')
            .then(response => {
                setAnimals(response.data)
                localStorage.setItem('info', JSON.stringify(response.data))
            })    
        } else {
            getAnimalsfromStorage()
            console.log('hämtar från API')
        }      
    }, [])

    let liTags = animals.map((animal) => {
        return (<li key={animal.id}>
            <h3>{animal.name}</h3>
            <img src={animal.imageUrl} alt=""/>
            <p>{animal.shortDescription}</p>
            <Link to={"/animal/" + animal.id}>Mer info</Link>
        </li>)
    })

    return (<ul> {liTags}</ul>)
}

export default Animals
