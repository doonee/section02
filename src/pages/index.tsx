import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import { InferGetStaticPropsType } from "next";
import Head from "next/head"; // Head 컴포넌트를 사용하면 head 태그를 변경할 수 있다.
import { ReactNode } from "react";
import style from "./index.module.css";

/** 사전렌더링(SSR: Server Side Rendering)
 * - 컴포넌트 보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 미리 불러오는 함수.
 * - 함수명 대소문자 철자 주의!
 * - 이 함수에서 console.log를 찍으면 브라우저가 아닌 서버 콘솔에 찍힌다.
 * - 서버 전용 함수이기에 브라우저 객체인 window, document, localStorage 등을 사용할 수 없다.
 */
export const getStaticProps = async () => {
  // console.log(`인덱스 페이지 사전 렌더링 ${new Date().toLocaleString()}`);
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
    // revalidate: 10, // 10초마다 재생성
  };
};

/**
 * 본 함수는 서버에서 먼저 실행된 후 브라우저에서도 실행된다.
 * - console.log를 찍으면 서버에서 먼저 찍히고, 브라우저에서도 찍힌다.
 * - window, document, localStorage 등 브라우저 객체를 사용하면 서버측에서 오류가 발생한다.
 * - 브라우저(클라이언트) 에서만 사용 할 코드는 useEffect등으로 처리하면 된다.
 */
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>도서 목록</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="도서 목록2 " />
        <meta property="og:description" content="도서 목록 페이지입니다." />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
