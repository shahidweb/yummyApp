function DialogModel({ children, isOpen }: { children: any; isOpen: boolean }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export default DialogModel;
