import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              The Esther and Mays Group LLC
            </p>
            <p className="text-sm text-gray-600">Charlotte, North Carolina</p>
            <p className="text-sm text-gray-600 mt-1">
              <a
                href="tel:+19194958478"
                className="hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
              >
                (919) 495-8478
              </a>
              {' · '}
              <a
                href="mailto:issiahmclean1999@gmail.com"
                className="hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
              >
                issiahmclean1999@gmail.com
              </a>
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex gap-4 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
                >
                  Terms and conditions
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} The Esther and Mays Group LLC
        </p>
      </div>
    </footer>
  );
}
