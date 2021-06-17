
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";
import "./OneAnimalstyle.css";

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
        lastFed: new Date()
    }

    const oneAnimalLS = localStorage.getItem('info')
    const [animal, setAnimal] = useState(defaultValue); 
    const [isHungry, setisHungry] = useState(Boolean)

    useEffect(() => {  
        if (oneAnimalLS !== null) {
            const a = JSON.parse(oneAnimalLS)
            for (let i = 0; i < a.length; i++) {
                if (a[i].id == id) {
                    let newFeed = new Date().getTime() - new Date(a[i].lastFed).getTime()
                    let differenceHours = Math.floor(newFeed / (1000*60*60))
                    if (differenceHours >= 3) {
                        a[i].isFed = false
                        localStorage.setItem('info', JSON.stringify(a))
                    }
                    if (differenceHours >= 4) {
                        setisHungry(true)
                    }
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
                    setAnimal(ani[i])
                    setisHungry(false)
                }
            }
        }
    }

    const newTime = (new Date(animal.lastFed)).toLocaleString();

    return (
        <div className="animalcontainer">
            <div className="animal">
            <h3 className="animalname">Hej! Det är jag som är <span className="namecolor">{animal.name}</span></h3>
            <div className="imgcontainer"><img src={animal.imageUrl} className="soloimg" alt=""/></div>
            <p className="birthyear">Jag föddes <strong>{animal.yearOfBirth}</strong></p>
            <p className="longdescr"><strong>Lite om min ras:</strong> {animal.longDescription}</p>
            <p className="medicine">Får jag någon/några medicin(er)? <strong>{animal.medicine}</strong></p>
            <p className="feedingtime">Har jag fått mat inom de senaste 3 timmarna: <strong>{animal.isFed ? 'Ja' : 'Nej'}</strong></p>
            <div className="fedanimal">
            { isHungry ? <p className="hungry">Jag skulle gärna vilja få lite mat, tack.</p> : <p className="nothungry">Jag är inte så hungrig just nu.</p> }
            <button className="feedbtn" onClick={feedAnimal} disabled={animal.isFed}>Mata</button>
            </div>
            <p className="lastfed">Senast Matad: <strong>{newTime}</strong></p>
            <Link to={"/"} className="linktolist">&larr; Tillbaka till listan</Link>
            </div>
        </div>
    )
}

export default OneAnimal
