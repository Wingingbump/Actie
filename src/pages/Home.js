import { useNavigate } from "react-router-dom"

export function Home() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/host')
    console.log("starting game")
  }
  const joinGame = () => {
    navigate('/player')
    console.log('joining game')
  }
  return (
    <>
      <button onClick={startGame}>start game</button>
      <button onClick={joinGame}>join game</button>
    </>
  );
}