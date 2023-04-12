export enum CellShape {
  CIRCLE = "circle",
  TRIANGLE = "triangle",
  SQUARE = "square",
}

export enum CellColor {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

export interface ICell {
  id: number
  isOpen: boolean
  shape: CellShape
  color: CellColor
}
