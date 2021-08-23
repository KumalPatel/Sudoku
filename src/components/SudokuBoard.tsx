import {Dispatch, FocusEvent, SetStateAction} from 'react'
import { isValid, updateGame } from '../utils/game'
import Game from '../utils/types'

const SudokuBoard = ({gameData, setSolved}: { gameData: Game[][], setSolved: Dispatch<SetStateAction<boolean>>}) => {
    const isGameCompleted = (gameData: Game[][]): boolean =>  gameData.every((row: Game[]) => row.every((element: Game) => element.value !== 0))

    const handleBlur = (event: FocusEvent<HTMLInputElement>, element: Game): void => {
        const key = updateVal(event.target.value)
        event.target.value = key || ''

        // conditions for game rules
        if(!isValid(gameData, element.row_index, element.col_index, parseInt(event.target.value) || 0)) {
            event.target.value = ''
            updateGame(gameData, element.row_index, element.col_index,  0)
        }
        updateGame(gameData, element.row_index, element.col_index, parseInt(event.target.value) || 0)

        if(isGameCompleted(gameData)) setSolved(true)

    }

    const updateVal = (val: string): string => {
        const key = /^[1-9\b]+$/
        if (val === '' || key.test(val)) return val
    }

    const gameBorder = (row: number, col: number): string => {
        let border = 'border-black'

        if (col !== 0 && col % 3 === 0) border = border.concat(' ', 'border-l')
        if (row !== 0 && row % 3 === 0) border = border.concat(' ', 'border-t')

        return border.concat(' ', 'bg-black')
    }

    const SudokuBox = ({ element }: { element: Game }): JSX.Element => {
        return (
            <div>
                <input
                    className={'w-16 h-16 text-center text-2xl bg-white disabled:bg-gray-200 cursor-pointer caret-transparent focus:outline-none focus:bg-blue-200'}
                    type='text'
                    maxLength={1}
                    defaultValue={element.value === 0 ? '' : element.value}
                    onBlur={event => handleBlur(event, element)}
                    onKeyDown={event => event.currentTarget.value = ''}
                    disabled={!element.editable}
                />
            </div>
        )
    }

    return (
        <div className='inline-block relative left-2/4 transform -translate-x-2/4 my-6'>
            <table className='border-4 border-black border-collapse'>
                <tbody>
                    {gameData &&
                        gameData.map((row: Game[], row_index: number) => (
                            <tr key={row_index}>
                                {row.map((val: Game, col_index: number) => (
                                    <td
                                        key={col_index}
                                        className={gameBorder(row_index, col_index)} >
                                        <SudokuBox element={val} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default SudokuBoard
