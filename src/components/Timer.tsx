import { useState, useLayoutEffect } from 'react'

const Timer = ({
    difficulty,
    interval,
    solved
}: {
    difficulty: string
    interval: { current: NodeJS.Timeout | null }
    solved: boolean
}) => {
    const [seconds, setSeconds] = useState(0)

    useLayoutEffect(() => {
        if(!solved) {
            setSeconds(0)
            interval.current = setInterval(() => setSeconds(sec => sec + 1), 1000)
        }
        return () => clearInterval(interval.current)
    }, [difficulty, solved])

    const padding = (ms: number): string => ms.toString().padStart(2, '0')

    return (
        <div className='grid items-center justify-center text-2xl py-8'>
            <label>
                {padding(Math.floor(seconds / 60))}:{padding(seconds % 60)}
            </label>
        </div>
    )
}

export default Timer
