import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { isValid, updateGame } from '../utils/game'
import Game from '../utils/types'

const SolveGame = ({
    gameData,
    setGameData,
    solved,
    setSolved,
    isSolving,
    setIsSolving,
    interval
}: {
    gameData: Game[][]
    setGameData: Dispatch<SetStateAction<Game[][]>>
    solved: boolean
    setSolved: Dispatch<SetStateAction<boolean>>
    isSolving: boolean
    setIsSolving: Dispatch<SetStateAction<boolean>>
    interval: { current: NodeJS.Timeout | null }
}) => {
    const [button, setButton] = useState('Solve Game!')

    useEffect(() => {
        if (solved) {
            setButton('New Game!')
            clearInterval(interval.current)
        } else setButton('Solve Game!')
    }, [solved])

    const sleep = (ms: number): Promise<NodeJS.Timeout> => new Promise(resolve => setTimeout(resolve, ms))

    const findEmpty = (gameData: Game[][]): { row: number, col: number } => {
        for(let row in gameData) {
            let empty = gameData[row].find((element: Game) => element.value === 0)
            if(empty) return {
                row: empty.row_index,
                col: empty.col_index
            }
        }
    }

    const clearBoard = (gameData: Game[][]): void => {
        const data = gameData.map((row: Game[]) => row.map((element: Game) => {
            if (element.editable) element.value = 0
            return element
        }))
        setGameData(data)
    }

    const backTrackSolve = async () => {
        let box = findEmpty(gameData)

        if (!box) return true

        let { row, col } = box
        await sleep(0)

        for (let i = 1; i < 10; i++) {
            if (isValid(gameData, row, col, i)) {
                setGameData(updateGame(gameData, row, col, i))

                if (await backTrackSolve()) return true

                setGameData(updateGame(gameData, row, col, 0))
            }
        }
        return false
    }

    return (
        <div className='flex items-center justify-center text-lg py-6 pb-4'>
            <button
                className='w-80 py-2 px-4 bg-black text-white text-center rounded-lg transform transition hover:scale-110 hover:bg-opacity-80 focus:outline-none active:translate-y-0.5 active:bg-opacity-80'
                onClick={async () => {
                    if(!isSolving && !solved) {
                        clearBoard(gameData)
                        setIsSolving(true)
                        await backTrackSolve()
                    }
                    if(!isSolving){
                        setSolved(!solved)
                        setIsSolving(false)
                    }
                }}>
                {button}
            </button>
        </div>
    )
}

export default SolveGame
