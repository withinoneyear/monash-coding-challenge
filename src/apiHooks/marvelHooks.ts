import axios from "axios";
import { useAsyncFn } from "react-use";
import config from "../config";
import { CharacterDataContainer } from "./marvelCharacter";

export interface PageInfo {
  offset: number;
  limit: number;
}

export async function composeApiUrl(
  pageInfo: PageInfo,
  ts: number = Date.now()
) {
  let url = `${config.characterApi}?apiKey=${config.marvelPublickKey}&offset=${pageInfo.offset}&limit=${pageInfo.limit}`;
  if (process.env.MARVEL_PRIVATE_KEY) {
    const md5 = (await import("blueimp-md5")).default;
    const hash = md5(
      `${ts}${config.marvelPrivateKey}${config.marvelPublickKey}`
    );
    url += `&ts=${ts}&hash=${hash}`;
  }
  return url;
}

export function useCharactersApi(
  pageInfo: PageInfo,
  deps?: React.DependencyList | undefined
) {
  return useAsyncFn(async () => {
    const url = await composeApiUrl(pageInfo);
    const { data } = await axios.get(url);
    return data as CharacterDataContainer;
  }, deps);
}
