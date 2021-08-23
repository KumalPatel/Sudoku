import { Dispatch, SetStateAction } from 'react'

const Difficulty = ({
    difficulty,
    setDifficulty,
    setSolved
}: {
    difficulty: string
    setDifficulty: Dispatch<SetStateAction<string>>
    setSolved: Dispatch<SetStateAction<boolean>>
}) => {
    const difficulties = ['easy', 'medium', 'hard']

    const difficultyBorder = ( difficultyHook: string, difficulty: string): string => {
        let border = 'border-black'

        if (difficultyHook === difficulty) border = border.concat(' ', 'border-b-2')
        return border
    }

    const handleClick = (difficulties: string) => {
        setDifficulty(difficulties)
        setSolved(false)
    }

    return (
        <div>
            {difficulties.map((difficulties: string, index: number) => (
                <input
                    className={`transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mx-4 bg-transparent cursor-pointer capitalize text-xl ${difficultyBorder(difficulty, difficulties)}`}
                    type='button'
                    key={index}
                    value={difficulties}
                    onClick={() => handleClick(difficulties)}
                />
            ))}
        </div>
    )
}

export default Difficulty
