export default function SearchField({ value, onChange, inputRef }) {
  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onChange('')
            e.currentTarget.blur()
          }
        }}
        placeholder="Cari teks atau nomor"
        aria-label="Cari teks RP atau nomor shortcut"
        className="w-full rounded-sm border border-line bg-ink px-3 py-2 pr-9 text-xs text-bone placeholder:text-muted"
      />
      <kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[10px] text-muted">
        /
      </kbd>
    </div>
  )
}
