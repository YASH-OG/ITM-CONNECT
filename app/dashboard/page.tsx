import { UserProfile } from "@/components/dashboard/user-profile";
import { NoticeBoard } from "@/components/dashboard/notice-board";

const demoUser = {
  name: "Yash Lal",
  roll: "150096724047",
  rewardPoints: 150
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <UserProfile 
        name={demoUser.name}
        roll={demoUser.roll}
        rewardPoints={demoUser.rewardPoints}
      />
      <NoticeBoard />
    </div>
  );
}