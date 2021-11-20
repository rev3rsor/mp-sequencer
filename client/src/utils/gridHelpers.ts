import { CANVAS_WIDTH, GRID_WIDTH, MAX_GRADIENT } from "./constants";

export const calculateGradient = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => (x2 - x1 === 0 ? MAX_GRADIENT : (y2 - y1) / (x2 - x1));

export const calculateDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

export const calculateSpeed = (distance: number, time: number): number =>
  time === 0 ? 0 : distance / time;

/**
 * Converts canvas coordinates, starting with (0, 0) at top-left,
 * to Cartesian coordinates with (0, 0) at the centre.
 * @param x
 * @param y
 * @returns Array of two numbers containing the normalised coordinates
 */
export const normaliseCoordinates = (
  x: number,
  y: number
): [number, number] => [x - CANVAS_WIDTH / 2, -y + CANVAS_WIDTH / 2];

// this works because we offset the grid from the edges by exactly half the grid width
// and the grid is the same on the x- and y-axes
/**
 * Gets the grid point nearest to the clicked point.
 * @param coordinate x- or y-coordinate
 * @returns Nearest grid point coordinate
 */
export const getNearestGridPoint = (coordinate: number): number =>
  Math.floor(coordinate / GRID_WIDTH) * GRID_WIDTH + GRID_WIDTH / 2;

/**
 * Gets the index of a grid point, starting with top/left-most grid point as 0.
 * @param gridPoint
 * @returns Index of grid point
 */
export const getIndexOfGridPoint = (gridPoint: number): number =>
  (gridPoint - GRID_WIDTH / 2) / GRID_WIDTH;

/**
 * Gets the "influence" one point has on another, weighted using the algorithm.
 * Takes two points and a sensitivity parameter.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param sensitivity
 * @returns Influence, ranging from 0 to ~250 depending on sensitivity
 */
export const getInfluence = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  sensitivity: number
): number => 100 / (calculateDistance(x1, y1, x2, y2) + 1) ** (1 / sensitivity);
