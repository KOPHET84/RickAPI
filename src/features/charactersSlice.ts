import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchCharacters } from "./charactersThunk";
interface Character {
  id: number;
  name: string;
  gender: string;
  image: string;
  species: string;
  status: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}

enum Status {
  PEDNING = "pending",
  FAILED = "failed",
  SUCCEEDED = "succeeded",
  IDLE = "idle",
}

interface TypesState {
  characters: Character[];
  error: null | string;
  status: Status;
  choice: number;
  pages: number;
}

const initialState: TypesState = {
  characters: [],
  status: Status.IDLE,
  error: null,
  choice: 0,
  pages: 0,
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    choiceCharacter: (state, action: PayloadAction<string>) => {
      if (action.payload === "next") {
        state.choice = state.characters[state.choice + 1]
          ? state.choice + 1
          : 0;
      } else if (action.payload === "prev") {
        state.choice =
          state.choice === 0 ? state.characters.length - 1 : state.choice - 1;
      }
    },
    choicePage: (state, action: PayloadAction<string>) => {
      state.pages = Number(action.payload);
      state.choice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = Status.PEDNING;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message || "failed";
      });
  },
});

export const { choiceCharacter, choicePage } = characterSlice.actions;
