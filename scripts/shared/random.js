export default function generateRandomNumber(existingNumbers) {
    let n = Math.floor(Math.random() * 10000000);
    while (existingNumbers.find(x => x == n)) {
        n = Math.floor(Math.random() * 10000000);
    }
    return n;
}
//# sourceMappingURL=random.js.map