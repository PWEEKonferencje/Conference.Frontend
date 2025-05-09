import { APP_ROUTES } from "./routes.enum";

export default function NotFoundPage() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-8xl">404</h2>
        <h1 className="font-semibold text-3xl">Not Found</h1>
        <a
          href={APP_ROUTES.ROOT}
          className="mt-3 flex flex-row underline text-md font-light"
        >
          Back to Home page
        </a>
      </div>
    </div>
  );
}
