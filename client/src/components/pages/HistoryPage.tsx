import { useState } from "react";
import { useGetSessionsQuery } from "../../api/sessionsApi";
import PageContainer from "../PageContainer";
import SessionSummaryRow from "../SessionSummaryRow";
import Spinner from "../Spinner";
import { FolderOpen } from "lucide-react";

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  const pages: (number | "...")[] = [];

  pages.push(0);

  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages - 2, currentPage + 1);

  if (start > 1) {
    pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages - 1);

  return pages;
}

function HistoryPage() {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, isError, error } = useGetSessionsQuery({ page: currentPage, size: 10 });

  if (isError) console.log(error);

  const items = data?.data?.items ?? [];
  const totalPages = data?.data?.paging?.totalPages ?? 0;
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <PageContainer className="flex flex-col gap-4">
      {/* Session rows */}
      <h2 className="text-2xl">Past Sessions</h2>
      <div className="flex min-h-180 w-full flex-col gap-3">
        {items.length === 0 && (
          <div className="flex flex-col items-center">
            <FolderOpen className="mt-6 h-24 w-24" />
            <h2 className="mt-6 text-xl">
              There's nothing here! Go to the Testing page to perform your trials and create a session.
            </h2>
          </div>
        )}
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          items.map((item) => <SessionSummaryRow key={item.id} summary={item} isLoading={false} />)
        )}
      </div>

      {/* Pagination */}
      {visiblePages.length > 0 && (
        <div className="align flex items-center gap-2 self-center">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="cursor-pointer rounded border px-3 py-1 disabled:opacity-40"
          >
            Prev
          </button>

          {visiblePages.map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-8 w-8 items-center justify-center rounded border transition ${
                  page === currentPage
                    ? "border-olive-600 bg-olive-600 text-white"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                {page + 1}
              </button>
            ),
          )}

          <button
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="rounded border px-3 py-1 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </PageContainer>
  );
}

export default HistoryPage;
