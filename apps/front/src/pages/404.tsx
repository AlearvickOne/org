import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="text-white font-medium text-[26px] p-5 bg-red-500 rounded-[15px]  drop-shadow-xl shadow-color-red flex flex-col justify-center items-center">
        <p>Ошибка загрузки!</p>
        <p>Данная страница отсутствует на нашем сайте!</p>

        <Link href="/" className="cursor-pointer p-2 hover:text-blue-500">
          👉 Вернуться на главную 👈
          <div className="border-b border-current" />
        </Link>
      </div>
    </div>
  );
}
