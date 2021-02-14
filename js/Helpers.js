const concat = (x, y) =>
    x.concat(y)

export const flatMap = (f, xs) =>
    xs.map(f).reduce(concat, [])