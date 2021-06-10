import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimalsArray } from '../models/AnimalsArray';

const Animals = () => {

    let defaultValue: AnimalsArray[] = [];
    const [animals, setAnimals] = useState(defaultValue);

    const getAnimalsFromStorage = () => {
        try {
             const arrayOfAnimal = localStorage.getItem('info')
             const a = arrayOfAnimal !== null ? JSON.parse(arrayOfAnimal) : [];
             setAnimals(a)
         } catch (err) {
             console.log(err)
         }
    }

    useEffect(() => {   
        const fetchAnimals = async () => {
            try {
                if(!localStorage.getItem('info')) {
                    const {data} = await axios.get('https://animals.azurewebsites.net/api/animals')
                    setAnimals(data)
                    localStorage.setItem('info', JSON.stringify(data))
                } else {
                    getAnimalsFromStorage()
                    console.log('getting animals from LS')
                }    
            } catch (err) {
                console.log(err)
            }
        }
        fetchAnimals()

    }, [])

    let liTags = animals.map((animal) => {
        return (<li key={animal.id}>
            <h3>{animal.name}</h3>
            <img src={animal.imageUrl} alt=""/>
            <p>{animal.shortDescription}</p>
            <Link to={"/animal/" + animal.id}>Mer info</Link>
        </li>)
    })

    return (
        <ul>
            {liTags}
        </ul>
    )
}

export default Animals
