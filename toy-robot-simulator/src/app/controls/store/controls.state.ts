export interface ControlsState {
  lastMove: string;
  lastLog: string;
}

export const initialControlsState: ControlsState = {
  lastLog: 'Welcome To The Game\nUse arrow keys or place a move',
  lastMove: 'Make your move!'
}
