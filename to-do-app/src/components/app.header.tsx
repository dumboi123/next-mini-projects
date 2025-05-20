import ThemeSwitch from "./theme.switch";

const AppHeader = () => {
  return (
    <div className="h-20 w-full bg-[#9395D3] text-white dark:bg-[hsl(var(--background-layout))] flex items-center justify-between px-5 sticky top-0 z-10 shadow-md border-b border-[#9395D3] dark:border-[hsl(var(--border))]">
      <div className="flex items-center gap-3">
        <p className="text-3xl uppercase font-bold">todo app</p>
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default AppHeader;
