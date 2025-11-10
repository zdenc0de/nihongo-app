export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="card p-4 h-32">
            <div className="h-12 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-600 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}