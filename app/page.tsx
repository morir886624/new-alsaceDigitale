import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { Communities } from "@/components/dashboard/communities"

export default function DashboardPage() {
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  )
}
