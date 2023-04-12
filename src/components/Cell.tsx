import clsx from "clsx"
import React from "react"
import { ICell } from "../types/cell.interface"
import "./Cell.css"

interface CellProps {
  cell: ICell
  handleClick: (id: number) => void
}

const Cell: React.FC<CellProps> = ({ cell, handleClick }: CellProps) => {
  // Render cell with shape and color, use CSS to style based on shape and color.
  return (
    <div className="cell" onClick={handleClick.bind(null, cell.id)}>
      <div className={clsx("shape", cell.shape, cell.color)}></div>
      <div className={clsx("overlay", { open: cell.isOpen })}></div>
    </div>
  )
}

export default Cell
