import { ChangePasswordDialog } from "@/components/change-password-dialog";
import { Button } from "@/components/ui/button";
import { ProfileEmail } from "@/components/ui/profile";
import { ProfileName } from "@/components/ui/profile";
import { ProfileContent } from "@/components/ui/profile";
import { ProfileImage } from "@/components/ui/profile";
import { ProfileRoot } from "@/components/ui/profile";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session?.session) {
    router.navigate({ to: "/sign-in" });
  }

  const handleSetCookie = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BETTER_AUTH_API_URL}/api/set-cookie`,
      { method: "post", credentials: "include" }
    );

    await res.json();
  };

  return (
    <div className="px-4 py-6">
      <div className="max-w-4xl mx-auto p-6 border rounded-lg bg-accent/30">
        <p className="font-medium mb-6">User</p>

        <ProfileRoot className="mb-4">
          <ProfileImage
            src={session?.user?.image as string | undefined}
            alt={session?.user?.name}
            className="size-9"
          />
          <ProfileContent>
            <ProfileName className="break-all line-clamp-1">
              {session?.user?.name}
            </ProfileName>
            <ProfileEmail className="break-all line-clamp-1">
              {session?.user?.email}
            </ProfileEmail>
          </ProfileContent>
        </ProfileRoot>

        <div className="flex justify-end gap-2.5">
          <Button onClick={handleSetCookie} variant="outline">
            Set Cookie
          </Button>
          <ChangePasswordDialog />
          <Button
            variant="outline"
            onClick={() =>
              authClient.signOut(
                {},
                { onSuccess: () => router.navigate({ to: "/sign-in" }) }
              )
            }
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
