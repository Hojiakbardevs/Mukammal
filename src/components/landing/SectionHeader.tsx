type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto mb-12 max-w-3xl text-center"
          : "mb-10 max-w-3xl"
      }
    >
      <p className="mb-3 text-xs font-bold tracking-[0.24em] text-cyan-200 uppercase">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl leading-tight font-bold text-white md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-slate-400 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
