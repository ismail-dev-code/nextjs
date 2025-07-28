"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavBar() {
  const pathname = usePathname();

  if (!pathname.includes("dashboard")) {
    return (
      <div className="sticky top-0 z-50">
        <nav className="bg-gray-500 flex justify-center items-center shadow-md">
          <h1 className="text-green-200 ml-3 font-bold cursor-pointer">
            NextJS
          </h1>
          <ul className="flex w-1/2 gap-3.5 mx-auto py-3 bg-gray-400 justify-center">
            <Link href={"/"}>
              <li className="cursor-pointer">Home</li>
            </Link>
            <Link href={"/posts"}>
              <li className="cursor-pointer">Posts</li>
            </Link>
            <Link href={"/meals"}>
              <li className="cursor-pointer">Meals</li>
            </Link>
          </ul>
          <h2 className="text-green-400 mr-3 cursor-pointer">Log In</h2>
        </nav>
      </div>
    );
  } else {
    return null;
  }
}
