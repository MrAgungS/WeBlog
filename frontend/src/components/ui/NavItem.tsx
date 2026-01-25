import Link from "next/link";

export function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-base font-medium text-black transition hover:text-lime-600 dark:text-white dark:hover:text-lime-500"
    >
      {label}
    </Link>
  );
}

export function AuthLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative text-base font-semibold text-lime-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-lime-600 after:transition-all hover:after:w-full dark:text-lime-400 dark:after:bg-lime-400"
    >
      {label}
    </Link>
  );
}

export function AuthPrimaryLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-bold text-white hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600"
    >
      {label}
    </Link>
  );
}
