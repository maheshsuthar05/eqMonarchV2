export const OPEN_BACKDROP = '[BACK DROP] OPEN';
export const CLOSE_BACKDROP = '[BACK DROP] CLOSE';

export function closeBackdrop() {
  return {
    type: CLOSE_BACKDROP
  };
}

export function openBackdrop() {
  return {
    type: OPEN_BACKDROP
  };
}
