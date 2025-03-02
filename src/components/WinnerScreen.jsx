import WinImage from "../assets/you-win.png";

export default function WinnerScreen({ handleRestart, points, pokemonAmount }) {
    return (
        <>
            {points === pokemonAmount && (
                <div className="winner-screen">
                    <img src={WinImage} alt="Winner Image" />
                    <button onClick={handleRestart}> Try Again</button>
                </div>
            )}
        </>
    );
}
