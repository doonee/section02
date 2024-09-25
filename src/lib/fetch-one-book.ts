import { BookData } from "@/types";

export default async function fetchOneBook(
  id: number
): Promise<BookData | null> {
  const url = `http://localhost:12345/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // throw new Error("서버의 상태가 이상합니다!");
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    // return {} as BookData;
    return null;
  }
}
