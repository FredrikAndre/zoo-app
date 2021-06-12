
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Animal } from "../models/Animal";

const OneAnimal = () => {
    interface IAnimalParam { id: string; }
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
        lastFed: new Date(),
    }

    const oneAnimalLS = localStorage.getItem('info')
    const [animal, setAnimal] = useState(defaultValue);
    
    useEffect(() => {  
        if (oneAnimalLS !== null) {
            const a = JSON.parse(oneAnimalLS)
            for (let i = 0; i < a.length; i++) {
                if (a[i].id == id) {
                        setAnimal(a[i])
                }  
            }
        }        
    }, [id, oneAnimalLS])

    const feedAnimal = () => {
        if (oneAnimalLS !== null) {
            const ani = JSON.parse(oneAnimalLS)
            for (let i = 0; i < ani.length; i++ ) {
                if (ani[i].id == id) {
                    ani[i].isFed = true
                    ani[i].lastFed = new Date()
                    localStorage.setItem('info', JSON.stringify(ani))
                    setAnimal(ani)
                }
            }
        }
    }

    let newTime = (new Date(animal.lastFed)).toLocaleString();

    return (
        <div>
            <h3>Djurets namn: {animal.name}</h3>
            <p>Beskrivning: {animal.longDescription}</p>
            <p>Födelseår: {animal.yearOfBirth}</p>
            <p>Är den matad: {animal.isFed ? 'Ja' : 'Nej'}</p>
            <button onClick={feedAnimal} disabled={animal.isFed}>Mata</button>
            <p>Matad: {newTime}</p>
        </div>
    )
}

export default OneAnimal


    // useEffect(() => {
    //     for(let i = 0; i < oneAnimalLS.length; i++) {
    //         if(oneAnimalLS[i].id == id) return setAnimal(oneAnimalLS[i])
    //     }
    // }, [id])

    // for(let i = 0; i < oneAnimalLS.length; i++) {
        //     if(oneAnimalLS[i].id == id && oneAnimalLS[i].isFed === false) {
        //         oneAnimalLS[i].isFed = true
        //         setAnimal(oneAnimalLS[i])
        //     }
        // }