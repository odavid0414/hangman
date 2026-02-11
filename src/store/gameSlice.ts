import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export type GameStatus = "idle" | "in_progress";

export type StartedGame = {
  id: string;
  startedAt: number;
  difficulty?: string | null;
  word: string;
  guessedLetters: string[];
  remainingFailures: number;
  misses: number;
};

export type GameState = {
  status: GameStatus;
  activeGame: StartedGame | null;
};

const MAX_FAILURES = 6;

const initialState: GameState = {
  status: "idle",
  activeGame: null,
};

type StartGamePayload = {
  word: string;
  difficulty?: string | null;
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<StartGamePayload>) {
      state.status = "in_progress";
      state.activeGame = {
        id: nanoid(),
        startedAt: Date.now(),
        difficulty: action.payload?.difficulty ?? null,
        word: action.payload.word,
        guessedLetters: [],
        remainingFailures: MAX_FAILURES,
        misses: 0,
      };
    },
    guessLetter(state, action: PayloadAction<string>) {
      if (!state.activeGame) return;

      const letter = action.payload.toLowerCase();
      if (!letter || state.activeGame.guessedLetters.includes(letter)) return;

      state.activeGame.guessedLetters.push(letter);
      if (!state.activeGame.word.includes(letter)) {
        state.activeGame.misses += 1;
        state.activeGame.remainingFailures = Math.max(
          0,
          state.activeGame.remainingFailures - 1
        );
      }
    },
    endGame(state) {
      state.status = "idle";
      state.activeGame = null;
    },
  },
});

export const { startGame, guessLetter, endGame } = gameSlice.actions;
