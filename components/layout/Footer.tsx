import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-auto">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              The Esther and Mays Group LLC
            </p>
            <p className="text-sm text-gray-500">Charlotte, North Carolina</p>
            {/* TODO(phase-b): add email, phone, and address once confirmed for public use */}
          </div>

          <nav aria-label="Footer">
            <ul className="flex gap-4 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
                >
                  Terms and conditions
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} The Esther and Mays Group LLC
        </p>
      </div>
    </footer>
  );
}
