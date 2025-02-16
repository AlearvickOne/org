import { clsx } from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface PaginatorBaseProps {
  page: number;
  quantityPages: number;
  setPage: (page: number) => void;
}

export const PaginatorBase = ({
  page,
  quantityPages,
  setPage,
}: PaginatorBaseProps) => {
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const arrayQuantityPages = Array.from(
    { length: quantityPages },
    (_, i) => i + 1
  );

  const getPaginationItems = () => {
    if (quantityPages <= 10) return arrayQuantityPages;

    const pages = new Set<number>();

    pages.add(1);
    pages.add(2);

    if (page > 1) {
      pages.add(page - 1);
    }

    pages.add(page);

    if (page < quantityPages - 1) {
      pages.add(page + 1);
    }

    pages.add(quantityPages - 1);
    pages.add(quantityPages);

    return [...pages].sort((a, b) => a - b);
  };

  const paginationItems = getPaginationItems();

  return (
    <div>
      {paginationItems.length > 1 ? (
        <div className="flex gap-x-2 items-center">
          {paginationItems.map((q, i, arr) => (
            <div key={q} className="flex items-center">
              {i > 0 && q - arr[i - 1] > 1 && <span className="mx-1">..</span>}
              <Link
                href={`?page=${q}`}
                className={clsx(
                  page === q
                    ? 'text-blue-500 cursor-default'
                    : 'text-black cursor-pointer'
                )}
                onClick={() => (page !== q ? setPage(q) : null)}
              >
                {q}
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
