import { auth } from "@/services/auth";
import { ProfileForm } from "./_components/profile-form";

const Page = async () => {
  const session = await auth();

  return <ProfileForm user={session!.user} />;
};
export default Page;
