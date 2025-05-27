const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#d1d280] pt-[75px]">
      <div className="w-full max-w-[1280px] flex flex-col border-x border-[#424242] h-[calc(100vh-75px)]">
        <div className="flex-grow overflow-y-auto px-4 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
