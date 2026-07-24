import { useGetSessionsStatsQuery } from "@/api/sessionsApi";
import PageContainer from "./PageContainer";
import { useUser } from "@clerk/react";
import Spinner from "./Spinner";
import { Separator } from "./ui/separator";

function SessionsStats() {
  const { user } = useUser();
  const { data, isLoading, isError } = useGetSessionsStatsQuery();

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <p className="text-muted-foreground text-sm">We couldn't load your stats. Please try refreshing the page.</p>
    );
  }

  return (
    <PageContainer className="flex">
      <div className="flex w-full gap-4 rounded-lg border-2 border-gray-900 bg-black px-12 py-4">
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-4">
            <img
              src={user?.imageUrl}
              alt="Profile picture"
              className="pointer-events-none h-36 w-36 rounded-full select-none"
            />
            <p>{user?.fullName}</p>
          </div>
        </div>
        <Separator className="mx-4" orientation="vertical" />
        <div className="flex-1" />
        <div className="flex flex-col gap-2 text-center">
          <h2 className="border-b border-b-gray-400 text-sm text-gray-400">Sessions Completed</h2>
          <p className="font-medium">{data?.data?.totalSessionsCompleted ?? "-"}</p>
        </div>
        <div className="flex-1" />
        <section className="flex gap-4">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="border-b border-b-gray-400 text-sm text-gray-400">Most Used Mouse</h2>
            <p className="font-medium">{data?.data?.mostUsedMouseFullName ?? "-"}</p>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h2 className="border-b border-b-gray-400 text-sm text-gray-400">Most Used Mousepad</h2>
            <p className="font-medium">{data?.data?.mostUsedMousepadFullName ?? "-"}</p>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h2 className="border-b border-b-gray-400 text-sm text-gray-400">Most Used Skates</h2>
            <p className="font-medium">{data?.data?.mostUsedSkatesFullName ?? "-"}</p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

export default SessionsStats;
