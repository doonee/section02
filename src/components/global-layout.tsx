/**
 * 이모지 넣는 방법:
 * - Mac: Control + Command + Space 키를 사용하여 이모지 선택 창을 열 수 있습니다
 */
import Link from "next/link";
import { ReactNode } from "react";
import style from "./global-layout.module.css"

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/">📚 Onebite Books</Link>
      </header>
      <main>{children}</main>
      <footer className={style.footer}>@Doonee</footer>
    </div>
  );
}
