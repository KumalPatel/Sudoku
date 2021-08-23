import Game from '../utils/types'

export const updateGame = (gameData: Game[][], row: number, col: number, val: number): Game[][] => {
    const newData = [...gameData]
    newData[row][col].value = val
    return newData
}

export const isValid = (
    gameData: Game[][],
    row: number,
    col: number,
    value: number
): boolean => {
    const row_arr = gameData[row].map((element: Game) => element.value)
    const col_arr = gameData.map((rows: Game[]) => rows[col]).map((element: Game) => element.value)

    // box array
    const start_row = Math.floor(row / 3) * 3
    const start_col = Math.floor(col  / 3) * 3
    const box_arr = gameData.slice(start_row, start_row + 3).map((rows:Game[]) => rows.slice(start_col, start_col + 3)).map((box: Game[]) => box.map((element: Game) => element.value))

    return !(row_arr.includes(value) || col_arr.includes(value) || box_arr.some((box: number[]) => box.includes(value)))
}


