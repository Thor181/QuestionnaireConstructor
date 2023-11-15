
export default function generateRandomNumber(existingNumbers: Array<number>): number {
    let n = Math.floor(Math.random() * 10000000);

    while (existingNumbers.find(x => x == n)) {
        n = Math.floor(Math.random() * 10000000);
    }

    return n;
}