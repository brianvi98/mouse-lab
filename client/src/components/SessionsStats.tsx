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

  const stats = [
    {
      label: "Most Used Mouse",
      value: data?.data?.mostUsedMouseFullName ?? "-",
    },
    {
      label: "Most Used Mousepad",
      value: data?.data?.mostUsedMousepadFullName ?? "-",
    },
    {
      label: "Most Used Skates",
      value: data?.data?.mostUsedSkatesFullName ?? "-",
    },
  ];

  return (
    <PageContainer className="flex">
      <div className="flex w-full shrink-0 flex-col gap-6 rounded-lg border-2 border-gray-900 bg-black px-6 py-6 lg:flex-row lg:items-center lg:px-12">
        {/* Profile */}
        <div className="flex shrink-0 flex-col items-center gap-4 lg:flex-row">
          <img
            src={user?.imageUrl}
            alt="Profile picture"
            className="pointer-events-none size-36 shrink-0 rounded-full object-cover select-none"
          />

          <p className="font-medium">{user?.fullName}</p>
        </div>

        {/* Desktop separator */}
        <Separator className="hidden lg:block" orientation="vertical" />

        {/* Mobile separator */}
        <Separator className="block lg:hidden" />

        {/* Session count */}
        <div className="flex shrink-0 flex-col items-center gap-2 text-center">
          <h2 className="border-b border-gray-400 text-sm text-gray-400">Sessions Completed</h2>
          <p className="font-medium">{data?.data?.totalSessionsCompleted ?? "-"}</p>
        </div>

        {/* Stats separator */}
        <Separator className="block lg:hidden" />

        {/* Gear stats */}
        <section className="flex min-w-0 flex-1 flex-wrap justify-center gap-x-8 gap-y-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex min-w-0 flex-col items-center gap-2 text-center">
              <h2 className="border-b border-gray-400 text-xs text-gray-400 sm:text-sm">{stat.label}</h2>

              <p className="max-w-40 font-medium">{stat.value}</p>
            </div>
          ))}
        </section>
      </div>
    </PageContainer>
  );
}

export default SessionsStats;
