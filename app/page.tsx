import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { Communities } from "@/components/dashboard/communities"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[280px] flex flex-1 flex-col">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Welcome Card */}
            <WelcomeCard firstName="Jean" />

            {/* Stats Cards */}
            <StatsCards />

            {/* Recent Activities Table */}
            <RecentActivities />

            {/* Two Column Layout for Events & Communities */}
            <div className="grid gap-6 xl:grid-cols-2">
              <UpcomingEvents />
              <Communities />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
