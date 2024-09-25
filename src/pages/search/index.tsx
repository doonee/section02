/**
 * 기본 틀만 먼저 SSG로 렌더링하고, useEffect로 검색 결과를 렌더링하는 방식.
 * - build 타임에서 검색어를 미리 알 수 없기 때문에 getStaticProps를 사용할 수 없다.
 * - 그래서 처음에는 검색 결과가 없는 상태로 렌더링하고,
 *     useEffect를 사용하여 검색 결과를 렌더링한다.
 */
import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return {
//     props: { books },
//   };
// };

export default function Search() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    fetchSearchResult();
  }, [q]);

  return (
    <>
      <Head>
        <title>도서 검색 결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="도서 검색 결과" />
        <meta property="og:description" content="도서 목록 페이지입니다." />
      </Head>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
