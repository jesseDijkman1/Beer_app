export default function (url: string) {
  return new Promise(async resolve => {
    try {
      const response = await fetch(url);
      const results = await response.json()

      resolve(results)
    } catch (error) {
      throw new Error("API call failed!");
    }
  })
}