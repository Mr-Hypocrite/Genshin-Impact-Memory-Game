import React from 'react';
import './App.css';
import Grid from './Components/Grid';
import Card from './Components/Card';

// Miko Ganyu Fischel MOST wanted Chars
let characters:any[]

characters = [{name: 'ayaka', matched: false}, {name: 'barbara', matched: false}, 
{name: 'eula', matched: false}, {name: 'itto', matched:false}, {name: 'jean', matched:false}, {name: 'kazuha', matched:false},
{name: 'keqing', matched:false}, {name: 'kokomi', matched:false}];

function App() {

    let [gameStatus, setGameStatus] = React.useState('Start')
    let [chars, setChars] = React.useState(['']);  //Array of All Character
    let [turns, setTurns] = React.useState(0);    //Var to Keep Track of turns
    let [matches, setMatches] = React.useState(0);    //Var to count Correct Matches
    let [misMatches, setMisMatches] = React.useState(0);   //Var to count Incorrect Matches
    let [choice1, setChoice1] = React.useState(['',-1]);   //Var to Keep Track of first choice
    let [choice2, setChoice2] = React.useState(['',-1]);   //Var to Keep Track of second choice


    // Function to Shuffle Cards & Reset everything
    const shuffleCards = () => {
        let shuffledCards = [...characters,...characters]
            .sort(() => Math.random() - 0.5)
        
        setChars(shuffledCards)
        setTurns(0);
        setMatches(0);
        setMisMatches(0);
        setChoice1(['',-1]);
        setChoice2(['',-1]);
    }

    const resetChoices = () => {
      setChoice1(['',-1]);
      setChoice2(['',-1]);
    }

    // Function to FlipCard and manage choices
    const handleClick = (char:string, key:number) => {
      // if(choice2[0] !== '') {
      //   if(choice1[0] === choice2[0] && choice1[1] !== choice2[1])
      //   {
      //     console.log(`Match`);
      //   } else {
      //     console.log(`Not a Match`);
      //   }
      //   resetChoices();
      // } else {
      //   choice1[0] === '' ? setChoice1([char, key]) : setChoice2([char, key]);
      // }

        choice1[0] === '' ? setChoice1([char, key]) : setChoice2([char, key]);
        setTurns(turns + 1);

    }

    React.useEffect(() => {
      const Compare = () => {

        if (choice1[0] !== '' && choice2[0] !== '')
        {
          console.log(`\nChoice1: ` + choice1, `\nChoice2: ` + choice2);
          if(choice1[0] === choice2[0] && choice1[1] !== choice2[1])
          {
            setMatches(prevValue => prevValue + 1);
            setChars(prevValue => {
              return prevValue.map((char:any) => {
                if (char.name === choice1[0]) {
                  return {...char, matched: true}
                } else {
                  return char
                }
              })
            })
          } else {
            setMisMatches(prevValue => prevValue + 1);
          }
          setTimeout(() => resetChoices(), 1000);
        }

      }

      Compare();
    }, [choice1, choice2])

  return (
    <div className="App bg1">
      <h1 className='title'>Genshin Impact Memory Game</h1>
      <button onClick={() => {shuffleCards() 
        setGameStatus('Restart')}} className='btn-std'>{gameStatus} Game</button>
      <h2>Score</h2>
      <div className='score-box'>
        <h3>Correct Matches: {matches}</h3> <h3>Incorrect Matches: {misMatches}</h3> <h3>Turn: {Math.floor(turns/2)}</h3>
      </div>

      <Grid>
        {chars.length!==1 && chars.map((char:any, index) => (
            <Card 
              key={index}
              index={index}
              char={char.name}
              handleClick={handleClick}
              flipped={ index === choice1[1] || index === choice2[1] || char.matched === true}
            />
        ))}
      </Grid>

      <br />
    </div>
  );
}

export default App;
