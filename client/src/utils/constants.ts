/* Constants */

export const MAX_SEGMENTS = 200;
export const SEGMENT_TIMEOUT = 500;
export const TRACK_INTERVAL = 20;

export const ERASE_SEGMENT_INTERVAL = 50;

export const CANVAS_WIDTH = 1000;
export const GRID_POINTS = 25;

// divide by GRID_POINTS, not GRID_POINTS - 1, to leave extra space on each side equal to half the grid width
export const GRID_WIDTH = CANVAS_WIDTH / GRID_POINTS;

export const POINT_RADIUS = 3;
export const ACTIVE_POINT_RADIUS = 5;

// create a max gradient value if segment is vertical
export const MAX_GRADIENT = CANVAS_WIDTH;

// export const MIN_SEQUENCE_INTERVAL = 60;
// export const MAX_SEQUENCE_INTERVAL = 2000;

// variable, depends on algorithm
export const MAX_INFLUENCE = 250;

// total dynamic range of volume control, in dB
export const DYNAMIC_RANGE = 60;
