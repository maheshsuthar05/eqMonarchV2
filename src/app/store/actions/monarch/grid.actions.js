export const FETCH_GRID_LAYOUT = '[GRID] FETCH_GRID_LAYOUT';
export const SAVE_GRID_LAYOUT = '[GRID] SAVE_GRID_LAYOUT';
export const CLEAR_GRID_LAYOUT = '[GRID] CLEAR_GRID_LAYOUT';

export function fetchGridLayout() {
  return {
    type: FETCH_GRID_LAYOUT
  };
}

export function saveGridLayout(breakpoint, currentLayout, allLayouts) {
  return {
    type: SAVE_GRID_LAYOUT,
    payload: { breakpoint, currentLayout, allLayouts }
  };
}

export function clearGridLayout() {
  return {
    type: CLEAR_GRID_LAYOUT
  };
}
