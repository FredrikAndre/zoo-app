import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Animal } from '../models/Animal';

interface IAnimalParam {
    id: string;
}

const OneAnimal = () => {

    let { id } = useParams<IAnimalParam>();
    
    let defaultValue: Animal = {
        id: 0,
        name: '',
        latinName: '',
        imageUrl: '',
        yearOfBirth: 0,
        shortDescription: '',
        longDescription: '',
        medicine: '',
        isFed: false,
        lastFed: new Date()
    }
    const [animal, setAnimal] = useState(defaultValue);

    useEffect(() => {
        const fetchOneAnimal = async () => {
            try {
                const {data} = await axios.get('https://animals.azurewebsites.net/api/animals/' + id)
                setAnimal(data)
                localStorage.setItem('animal', JSON.stringify(data))
            } catch (err) {
                console.log(err)
            }
        }
       fetchOneAnimal()
        
    }, [id])


    return (
        <div>
            <h3>Djurets namn: {animal.name}</h3>
            <p>Beskrivning: {animal.longDescription}</p>
            <p>Födelseår: {animal.yearOfBirth}</p>
            <p>Är den matad: {animal.isFed ? 'Ja' : 'Nej'}</p>
        </div>
    )
}

export default OneAnimal
