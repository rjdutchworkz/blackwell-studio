interface StaggerLabelProps {
  text: string
}

export function StaggerLabel({ text }: StaggerLabelProps) {
  const chars = Array.from(text)
  return (
    <span className="stagger-wrap">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="stagger">
        {chars.map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="stagger-char"
            style={{ transitionDelay: `${Math.min(index, 12) * 18}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  )
}
