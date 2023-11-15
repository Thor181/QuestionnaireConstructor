function generateShortUniq() {
    return 'xxxxxxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
export default generateShortUniq;
//# sourceMappingURL=guid.js.map