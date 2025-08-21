const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center space-y-6">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          <p className="text-white font-semibold text-lg">Q&A</p>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
          IVOverflow Lite
        </h1>
      </div>

      {/* Spinner */}
      <div className="w-12 h-12 relative animate-spin">
        <div className="absolute inset-0 rounded-full border-1 border-transparent border-t-blue-600"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mask-spinner" />
      </div>
      <p className="text-sm text-gray-500">Loading, please wait...</p>
    </div>
  );
};

export default FullPageLoader;
