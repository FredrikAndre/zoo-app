import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";
import "./Animalstyle.css";

const Animals = () => {
    const [animals, setAnimals] = useState<Animal[]>([])

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
            console.log('hämtar från LS')
        }      
    }, [])

    let liTags = animals.map((animal) => {
        let timeToFeed = new Date().getTime() - new Date(animal.lastFed).getTime()
        let differenceHours = Math.floor(timeToFeed / (1000*60*60))
        let veryHungry = differenceHours >= 4
        return (<li className="list" key={animal.id}>
            <div>
            <h3 className="animaltitle">{animal.name}</h3>
            <div className="animalimg"><img src={animal.imageUrl} alt=""/></div>
            </div>
            <p className="description">{animal.shortDescription}</p>
            { veryHungry ? <p className="warning">Jag vill gärna bli matad nu!</p> : null}
            <Link to={"/animal/" + animal.id} className="linktodetail">Läs Mer om {animal.name} &rarr;</Link>
        </li>)
    })

    return (<div className="container">
        <h1 className="zooname">Lilla Zoo</h1>
        <ul className="animallist"> {liTags} </ul>
        </div>)
}

export default Animals
