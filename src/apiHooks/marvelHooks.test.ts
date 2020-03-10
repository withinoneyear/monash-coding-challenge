import md5 from "blueimp-md5";
import axios from "axios";
import { useAsync } from "react-use";
import { composeApiUrl, useCharactersApi } from "./marvelHooks";
import config from "../config";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: jest
      .fn()
      .mockResolvedValue({ data: { data: { results: [1, 2, 3] } } }),
  },
}));

jest.mock("react-use", () => ({
  useAsync: jest.fn(async (cb: any) => await cb()),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test("blueimp-md5 should work properly", () => {
  const val = md5("1abcd1234");
  expect(val).toBe("ffd275c5130566a2916217b101f26150");
});

test("useCharactersApi should call axios and return data", async () => {
  await useCharactersApi({ offset: 0, limit: 100 }, "", []);
  expect(useAsync).toHaveBeenCalled();
  expect(axios.get).toHaveBeenCalled();

  const value = await (useAsync as any).mock.results[0].value;
  expect(value).toEqual({ results: [1, 2, 3] });
});

describe("composeApiUrl", () => {
  test("should not include ts and hash as paramters in url when MARVEL_PRIVATE_KEY is not provided", async () => {
    process.env.REACT_APP_MARVEL_PRIVATE_KEY = "";
    const url = await composeApiUrl({ offset: 0, limit: 100 }, "filter", 1);
    expect(url).toBe(
      `${config.characterApi}?apikey=${config.marvelPublickKey}&offset=0&limit=100&nameStartsWith=filter`
    );
  });

  test("should include ts and hash as paramters in url when MARVEL_PRIVATE_KEY is provided", async () => {
    process.env.REACT_APP_MARVEL_PRIVATE_KEY = "123";
    const hash = md5(`1${config.marvelPrivateKey}${config.marvelPublickKey}`);
    const url = await composeApiUrl({ offset: 0, limit: 100 }, "", 1);
    expect(url).toBe(
      `${config.characterApi}?apikey=${config.marvelPublickKey}&offset=0&limit=100&ts=1&hash=${hash}`
    );
  });
});
