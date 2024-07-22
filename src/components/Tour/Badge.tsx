import { components } from "@reactour/tour";

export default function Badge({ children }: any) {
  return (
    <components.Badge
      styles={{ badge: (base) => ({ ...base, backgroundColor: 'red' }) }}
    >
      👉 {children} 👈
    </components.Badge>
  )
}
