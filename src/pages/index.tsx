import { useState, useEffect, useRef } from 'react'
import Game from '../utils/types'
import { motion } from 'framer-motion'

import Difficulty from '../components/Difficulty'
import Timer from '../components/Timer'
import SudokuBoard from '../components/SudokuBoard'
import SolveGame from '../components/SolveGame'

export default function Home() {
    const [difficulty, setDifficulty] = useState('medium')
    const [gameData, setGameData] = useState(null)
    const [solved, setSolved] = useState(false)
    const [isSolving, setIsSolving] = useState(false)
    const interval: { current: NodeJS.Timeout | null } = useRef(null)
    const API_URL = `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`

    const formatGameData = (data: number[][]): Game[][] => {
        return data.map((row: [number], row_index: number) => {
            return row.map((val: number, col_index: number) => {
                return {
                    value: val,
                    editable: val === 0,
                    row_index: row_index,
                    col_index: col_index
                }
            })
        })
    }

    useEffect(() => {
        (async () => {
            if(!solved)
            {
                const result = await fetch(API_URL)
                const data = await result.json()
                const formattedData = formatGameData(data.board)
                setGameData(formattedData)
                setIsSolving(false)
            }
        })()
    }, [difficulty, solved])

    const HeaderVariants = {
        initial: {
            y: -100
        },
        animate: {
            y: 0,
            transition: {
                type: 'spring',
                duration: 1.5
            }
        }
    }

    const ContainerVariants = {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 2
            }
        }
    }

    return (
        <div className='font-mono m-0 p-0 overflow-hidden'>
            <main>
                <div className='bg-gradient-to-b from-black  to-gray-500  min-h-screen pt-20'>
                    <motion.h1
                        className='flex flex-col items-center justify-center p-12 text-5xl text-white'
                        variants={HeaderVariants}
                        initial='initial'
                        animate='animate'>
                        Sudoku Board
                    </motion.h1>
                    <motion.div
                        className='bg-white mx-auto cursor-pointer rounded-lg max-w-3xl pb-8'
                        variants={ContainerVariants}
                        initial='initial'
                        animate='animate'>
                        <div className='grid justify-center'>
                            <Timer
                                difficulty={difficulty}
                                interval={interval}
                                solved={solved}
                            />
                            <Difficulty
                                difficulty={difficulty}
                                setDifficulty={setDifficulty}
                                setSolved={setSolved}
                                isSolving={isSolving}
                            />
                        </div>
                        <SudokuBoard
                            gameData={gameData}
                            setSolved={setSolved}
                        />
                        <SolveGame
                            gameData={gameData}
                            setGameData={setGameData}
                            solved={solved}
                            setSolved={setSolved}
                            isSolving={isSolving}
                            setIsSolving={setIsSolving}
                            interval={interval}
                        />
                    </motion.div>
                </div>
            </main>
        </div>
    )
}
