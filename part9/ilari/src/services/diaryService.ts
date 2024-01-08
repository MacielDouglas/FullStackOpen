import axios, { AxiosResponse } from "axios";
import { Diary, NewDiary } from "../type";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = async (): Promise<Diary[]> => {
  try {
    const response: AxiosResponse<Diary[]> = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching diaries:", error);
    return [];
  }
}

export const createDiary = async (object: NewDiary): Promise<Diary | undefined> => {
  try {
    const response: AxiosResponse<Diary> = await axios.post(baseUrl, object);
    return response.data;
  } catch (error) {
    // Tratar erros aqui, por exemplo, lançar uma exceção ou retornar undefined
    console.error("Error creating diary:", error);
    return undefined;
  }
}
