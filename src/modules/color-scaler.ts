import { ColorScheme } from "@/types"

function filterScheme(_value: number, scheme: ColorScheme[]) {
  const higher = scheme
    .filter(({ value }) => _value >= value)
    .sort((a, b) => a.value - b.value)
    .pop()

  const lower = scheme
    .filter(({ value }) => _value <= value)
    .sort((a, b) => a.value - b.value)
    .shift()

  return [higher || lower, lower || higher]
}