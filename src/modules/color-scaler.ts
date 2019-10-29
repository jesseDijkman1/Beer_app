import { ColorScheme } from "@/types"

function filterScheme(_value: number, scheme: ColorScheme[]): ColorScheme[] {
  const higher = scheme
    .filter(({ value }) => _value >= value)
    .sort((a, b) => a.value - b.value)
    .pop()!

  const lower = scheme
    .filter(({ value }) => _value <= value)
    .sort((a, b) => a.value - b.value)
    .shift()!

  return [higher || lower, lower || higher]
}

function colorTransitionArray(array: ColorScheme[]): number[] {
  const colors = array.map(({ color }): number[] => color).reverse()
  const values = array.map(({ value }): number => value)

  const valueSpan = values.reduceRight((acc: number, cur: number): number => acc - cur)

  if (valueSpan == 0) {
    return colors[0].map((): number => 0)
  }

  return colors[0].map((color: number, i: number): number => (color - colors[1][i]) / valueSpan)
}

export default function (schemes: ColorScheme[]): Function {
  return function (value: number) {
    const usableSchemes = filterScheme(value, schemes)
    const transitionArray = colorTransitionArray(usableSchemes)

    return usableSchemes[0].color.map((val, i) => val + (transitionArray[i] * (value - usableSchemes[0].value)))
  }
}