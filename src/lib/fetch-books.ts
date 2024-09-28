import { BookData } from "@/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = `https://onebite-books-server-five.vercel.app/book`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("서버의 상태가 이상합니다!");
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
