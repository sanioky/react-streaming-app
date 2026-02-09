import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 bg-black py-8 px-4 md:px-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-red-600 text-xl font-black tracking-tighter uppercase transition-transform hover:scale-105"
            aria-label="STREAMING Home"
          >
            S
          </Link>
          <span className="hidden md:block text-zinc-600 text-xs border-l border-zinc-800 pl-6">
            © {currentYear} STREAMING PLATFORM
          </span>
        </div>

        <nav>
          <ul className="flex flex-wrap justify-center gap-4 md:gap-8 text-zinc-500 text-xs md:text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-zinc-300 transition-colors whitespace-nowrap"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-zinc-300 transition-colors whitespace-nowrap"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-zinc-300 transition-colors whitespace-nowrap"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
