import AppNavigate from "@/components/router/AppNavigate";
import { APP_ROUTES } from "./routes.enum";
import { useAuthStore } from "@/lib/auth/auth.store";

export default function SignOutPage() {
  const clear = useAuthStore((state) => state.clear);

  clear();

  return <AppNavigate to={APP_ROUTES.SIGN_IN} />;
}
