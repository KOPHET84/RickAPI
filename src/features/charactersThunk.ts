import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = `https://rickandmortyapi.com/api/character?page=`;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (id: string) => {
    const response = await axios.get(apiURL + id);
    await delay(1500);
    return response.data.results;
  }
);
