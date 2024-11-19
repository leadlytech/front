import Link from "next/link"
import React from "react"


interface MenuItem {
  path: string;
  icon: React.ReactNode;
  title: string;
}

// Usando a interface no parâmetro
export const MenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link href={item.path}
    className="flex items-center p-2 gap-4 hover:bg-gray-500 rounded-lg m-2"
    >
        {item.icon}
        {item.title}
    </Link>
  );
};