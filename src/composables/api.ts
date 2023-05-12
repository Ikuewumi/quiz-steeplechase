import { showToast } from "../store/toast";

const apiUrl = "http://localhost:1337/api";

/**
 * Fetches data from the API.
 *
 * @param {string} [endpoint="featured"] - The API endpoint to fetch data from. Defaults to "featured".
 * @param {string} [loadingMessage="Loading your data"] - The message to display while loading data. Defaults to "Loading your data".
 * @param {AbortSignal} [signal] - The abort signal to allow cancellation of the request.
 * @returns {Promise<any>} - A Promise that resolves to the fetched data.
 */
export const apiFetch = async (
  endpoint = "featured",
  loadingMessage = "Loading your data",
  signal?: AbortSignal
): Promise<any> => {
  try {
    showToast({ text: loadingMessage, type: "loading" });

    const res = await fetch(`${apiUrl}/${endpoint}`, { signal });
    if (!res.ok) throw Error("The data could not be fetched from our servers. Please try again later.");

    const json = await res.json();
    showToast({ text: "Done", type: "success" }, 2000);

    return json;
  } catch (e) {
    if (e.name === "AbortError") {
      showToast({ text: "The request was aborted.", type: "error" });
    } else {
      showToast({ text: e!.message as string, type: "error" });
    }

  }
};



export const sleep= (ms = 2000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
