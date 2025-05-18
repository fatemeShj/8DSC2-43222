import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link
        href="/charge"
        className="bg-primary hover:bg-amber-200 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition"
      >
        خرید شارژ
      </Link>
    </div>
  );
}
