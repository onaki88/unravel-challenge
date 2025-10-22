export const AppHeader = () => {
  return (
    <header className="h-20 shadow-xs bg-white fixed top-0 left-0 w-full z-40">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-lg sm:text-xl font-medium text-primary">
          Unravel Web App Challenge
        </h1>
        <p className="tracking-wide font-light text-sm text-gray-500">
          Responsive list with lazy media & infinite scrolling
        </p>
      </div>
    </header>
  );
};
