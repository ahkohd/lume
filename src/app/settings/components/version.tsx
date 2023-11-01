export function VersionSetting() {
  return (
    <div className="inline-flex items-center justify-between px-5 py-4">
      <div className="flex flex-col gap-1">
        <span className="font-medium leading-none text-neutral-200">Version</span>
        <span className="text-sm leading-none text-neutral-600 dark:text-neutral-400">
          You&apos;re using latest version
        </span>
      </div>
      <div className="inline-flex items-center gap-2">
        <span className="font-medium text-neutral-300">2</span>
      </div>
    </div>
  );
}
