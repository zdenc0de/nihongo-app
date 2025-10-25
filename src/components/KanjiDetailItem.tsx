interface KanjiCardDetailItemProps {
  label: string;
  value: string | number | string[] | null | undefined;
  className?: string;
}

export default function KanjiCardDetailItem({
  label,
  value,
  className = "",
}: KanjiCardDetailItemProps) {
  let displayValue: string;

  if (Array.isArray(value)) {
    displayValue = value.length ? value.join(", ") : "—";
  } else if (value === null || value === undefined || value === "") {
    displayValue = "—";
  } else {
    displayValue = String(value);
  }
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
        {label}
      </h3>
      <p className="meta mt-1">{displayValue}</p>
    </div>
  );
}
