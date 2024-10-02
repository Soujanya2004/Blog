import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-4 shadow-md">
      <Link className="text-white text-2xl font-bold transition-colors hover:text-gray-300" href={"/"}>
        Quora
      </Link>
      <Link className="bg-white text-slate-800 p-2 rounded hover:bg-gray-100 transition-colors" href={"/addTopic"}>
        Add Your Blogs
      </Link>
    </nav>
  );
}
