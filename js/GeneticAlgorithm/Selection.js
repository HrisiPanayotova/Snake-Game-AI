export function selection(snakes, lastIndex) {
    let firstParentIndex = Math.floor(Math.random() * lastIndex);
    let secondParentIndex = Math.floor(Math.random() * lastIndex);
    while (firstParentIndex == secondParentIndex) {
        secondParentIndex = Math.floor(Math.random() * lastIndex);
    }
    return [snakes[firstParentIndex], snakes[secondParentIndex]];
}