import React, { useEffect, useState } from "react"
import { CellColor, CellShape, ICell } from "../types/cell.interface"
import "./Board.css"
import Cell from "./Cell"

const baseCell = {
  isOpen: false,
}

const defaultCells: Omit<ICell, "id">[] = [
  {
    ...baseCell,
    shape: CellShape.CIRCLE,
    color: CellColor.RED,
  },
  {
    ...baseCell,
    shape: CellShape.CIRCLE,
    color: CellColor.GREEN,
  },
  {
    ...baseCell,
    shape: CellShape.CIRCLE,
    color: CellColor.BLUE,
  },
  {
    ...baseCell,
    shape: CellShape.SQUARE,
    color: CellColor.RED,
  },
  {
    ...baseCell,
    shape: CellShape.SQUARE,
    color: CellColor.GREEN,
  },
  {
    ...baseCell,
    shape: CellShape.SQUARE,
    color: CellColor.BLUE,
  },
  {
    ...baseCell,
    shape: CellShape.TRIANGLE,
    color: CellColor.RED,
  },
  {
    ...baseCell,
    shape: CellShape.TRIANGLE,
    color: CellColor.GREEN,
  },
  {
    ...baseCell,
    shape: CellShape.TRIANGLE,
    color: CellColor.BLUE,
  },
]

const Board: React.FC = () => {
  const [point, setPoint] = useState(0)
  const [timerGame, setTimerGame] = useState(90)
  const [timerMatch, setTimerMatch] = useState(false)
  const [openedCells, setOpenedCells] = useState<number[]>([])
  const [cells, setCells] = useState<ICell[]>(
    (() => {
      const tempCells = defaultCells
        .sort(() => Math.random() - Math.random())
        .slice(0, 8)
      return [...tempCells, ...tempCells].map((cell, idx) => ({
        ...cell,
        id: idx,
      }))
    })()
  )

  // states...
  useEffect(() => {
    if (openedCells.length === 2) {
      const cell1 = cells.find((i) => i.id === openedCells[0]),
        cell2 = cells.find((i) => i.id === openedCells[1])
      if (cell1?.shape === cell2?.shape && cell1?.color === cell2?.color) {
        setOpenedCells([])
        setPoint((prev) => prev + 1)
        setTimerGame((prev) => prev + 10)
      } else setTimerMatch(true)
    }
  }, [openedCells, setTimerMatch])

  useEffect(() => {
    let timerId = ""
    if (timerMatch) {
      const timerId = setTimeout(() => {
        const tempCells = [...cells]
        tempCells[openedCells[0]].isOpen = false
        tempCells[openedCells[1]].isOpen = false
        setCells(tempCells)
        setOpenedCells([])
        setTimerMatch(false)
      }, 1000)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [timerMatch])

  useEffect(() => {
    let timerId = setInterval(() => {
      setTimerGame((prev) => {
        if (prev - 1 === 0) {
          clearInterval(timerId)
          alert("you lose")
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  const handleCellClick = (id: number) => {
    if (openedCells.length < 2) {
      const tempCells = [...cells]
      tempCells[id].isOpen = true
      setCells(tempCells)
      setOpenedCells((prev) => [...prev, id])
    }
  }
  useEffect(() => {
    let countOpened = 0
    for (const cell of cells) {
      if (cell.isOpen) countOpened++
    }
    if (countOpened === cells.length) alert("you win")
  }, [cells])

  return (
    <div>
      <div>Time: {timerGame}</div>
      <div>Point: {point}</div>
      <div className="board">
        {cells.map((cell, idx) => (
          <Cell cell={cell} key={cell.id} handleClick={handleCellClick} />
        ))}
      </div>
    </div>
  )
}

export default Board
