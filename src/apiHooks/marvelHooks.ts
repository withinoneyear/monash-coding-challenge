import axios from "axios";
import { useAsync } from "react-use";
import config from "../config";
import { CharacterDataContainer } from "./marvelCharacter";

export interface PageInfo {
  offset: number;
  limit: number;
}

export async function composeApiUrl(
  pageInfo: PageInfo,
  filter?: string,
  ts: number = Date.now()
) {
  let url = `${config.characterApi}?apikey=${config.marvelPublickKey}&offset=${pageInfo.offset}&limit=${pageInfo.limit}`;
  if (filter) {
    url += `&nameStartsWith=${encodeURIComponent(filter)}`;
  }
  if (process.env.REACT_APP_MARVEL_PRIVATE_KEY) {
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
  filter?: string,
  deps?: React.DependencyList | undefined
) {
  return useAsync(async () => {
    const url = await composeApiUrl(pageInfo, filter);
    const resp = await axios.get(url);
    return {
      ...resp.data.data,
      results: resp.data.data.results.filter(
        (x: any) =>
          !x.thumbnail.path.endsWith("image_not_available") &&
          x.thumbnail.extension !== "gif"
      ),
    } as CharacterDataContainer;
  }, [pageInfo.offset, pageInfo.limit, filter, ...(deps || [])]);
}
