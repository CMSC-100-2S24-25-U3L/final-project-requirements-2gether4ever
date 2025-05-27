const Layout = ({ children }) => {
  return (
    <div className="bg-[#d1d280] min-h-screen flex w-full flex-col items-center px-4 pt-24">
      <div className="flex w-full max-w-[1280px] flex-col">{children}</div>
    </div>
  );
};

export default Layout;
