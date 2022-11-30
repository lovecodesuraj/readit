import { eventWrapper } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import react, { useState } from "react"
import "./home.css"

const Home = () => {

    const [input, setInput] = useState("");
    const [text, setText] = useState([]);
    const [inputLanguage, setInputLanguage] = useState("");
    const [outputLanguage, setOutputLanguage] = useState("");
    const [meaning, setMeaning] = useState({
        word: "",
        meaning: ""
    })

    const handleChange = (event) => {
        event.preventDefault();
        setInput(event.target.value);
    }

    const ready = (event) => {
        event.preventDefault();
        const myArray = input.split(" ");
        setText(myArray);
        if (document.querySelectorAll(".ready")[0].style.display === "none") {
            document.querySelectorAll(".input")[0].style.display = "none";
            document.querySelectorAll(".ready")[0].style.display = "block";
            document.querySelectorAll(".btn")[0].innerHTML = "Edit";

        } else {
            document.querySelectorAll(".input")[0].style.display = "block";
            document.querySelectorAll(".ready")[0].style.display = "none";
            document.querySelectorAll(".btn")[0].innerHTML = "Read";
        }
    }

    const getMeaning = (word) => {
        const getDictMeaning = async () => {
            await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(response => {
                setMeaning({
                    "word": word,
                    "meaning": response.data[0].meanings[0].definitions[0].definition,
                })
            }).catch(err => {
                setMeaning({
                    "word": word,
                    "meaning": "Sorry pal, we couldn't find definitions for the word you were looking for.",
                })
            }
            )
        }

        getDictMeaning();
    }


    const handleInputLanguage=(lang,e)=>{
        setInputLanguage(lang);
        document.getElementById(e.target.id).style.backgroundColor="white"
        const arr=document.getElementsByClassName("inputLang");
        Array.from(arr).forEach(element => {
            if(element.id!=lang){
                element.style.backgroundColor="#ECD291";
            }
        });
        
    }
    const handleOutputLanguage=(lang,e)=>{
        setOutputLanguage(lang);
    }

    return (
        <>
            <div className="main center">
                <div className="textWrapper center">
                    <div className="language center">
                        <ul className="center ">
                            <li className="lang inputLang " id="english" onClick={(e) => { handleInputLanguage("english",e) }}>English</li>
                            <li className="lang inputLang " id="hindi" onClick={(e) => { handleInputLanguage("hindi",e) }}>Hindi</li>
                            <li className="lang inputLang " id="japanese" onClick={(e) => { handleInputLanguage("japanese",e) }}>Japanese</li>
                            <li className="lang inputLang " id="chinese" onClick={(e) => { handleInputLanguage("chinese",e) }}>Chinese</li>
                        </ul>
                    </div>
                    <div className="text center">
                        <textarea className="input" name="text" cols="120" rows="30" onChange={handleChange} value={input} />
                        <div className="ready">
                            {text.map(word => <div className="word" onClick={() => {
                                getMeaning(word)
                            }}>{word}</div>)}
                        </div>
                        <button onClick={ready} className="btn">Read</button>
                    </div>
                </div>
                <div className="dictWrapper center">
                    <div className="language center">
                        <ul className="center">
                            <li className="lang outputLang" id="english" onClick={(e) => { handleOutputLanguage("english",e) }}>English</li>
                            <li className="lang outputLang" id="hindi" onClick={(e) => { handleOutputLanguage("hindi",e) }}>Hindi</li>
                            <li className="lang outputLang" id="japanese" onClick={(e) => { handleOutputLanguage("japanese",e) }}>Japanese</li>
                            <li className="lang outputLang" id="chinese" onClick={(e) => { handleOutputLanguage("chinese",e) }}>Chinese</li>
                        </ul>

                    </div>
                    <div className="dict">
                        <p className="dictWord">Word : {meaning.word}</p>
                        <p className="dictMeaning">Meaning : {meaning.meaning}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home;


// const res = await fetch("https://libretranslate.com/translate", {
// 	method: "POST",
// 	body: JSON.stringify({
// 		q: "how are you dude",
// 		source: "en",
// 		target: "es",
// 		format: "text",
// 		api_key: ""
// 	}),
// 	headers: { "Content-Type": "application/json" }
// });

// console.log(await res.json());