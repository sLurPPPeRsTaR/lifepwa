function Component({ isOpenMenu, setOpenMenu }) {
  return (
    <div className="w-full fixed z-20 lg:z-20 top-0 flex justify-between bg-transparent px-6 py-4">
      <div className="flex items-center">
        <button onClick={() => setOpenMenu(!isOpenMenu)}>
          <i className="fi fi-rr-list text-lg block md:hidden" />
        </button>
      </div>
      <div className="hidden md:block">
        <div className="flex gap-2 items-center border-2 border-neutral-20 rounded-lg px-4 py-1">
          <div className="w-8 h-8 rounded-full bg-black"></div>
          <div className="font-semibold">
            <div className="text-lg text-neutral-90">Gina Fauziah</div>
            <div className="text-xs text-neutral-20">Admin PIC</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
