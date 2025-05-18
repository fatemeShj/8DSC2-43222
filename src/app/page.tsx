import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link
        href="/charge"
        className="bg-primary hover:bg-amber-200 text-black font-bold py-5 px-10 rounded-lg shadow-lg transition"
      >
        خرید شارژ
      </Link>
    </div>
  );
}
