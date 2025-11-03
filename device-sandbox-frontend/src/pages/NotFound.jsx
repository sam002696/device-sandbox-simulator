import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <h1 className="text-4xl mb-2 text-gray-200">404</h1>
      <p className="mb-4">Page not found</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
      >
        Back Home
      </Link>
    </div>
  );
}
