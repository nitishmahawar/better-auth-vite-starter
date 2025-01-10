import { authClient } from "@/lib/auth-client";
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (session?.session) {
    router.navigate({ to: "/" });
  }

  return (
    <div className="h-svh flex items-center justify-center">
      <Outlet />
    </div>
  );
}
