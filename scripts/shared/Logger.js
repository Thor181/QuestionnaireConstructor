const log = (level, message) => {
    if (typeof message == typeof String) {
        logFunctionMap.get(level)(`[${new Date().toLocaleTimeString()}] ${message}`);
    }
    else {
        logFunctionMap.get(level)(message);
    }
};
const logFunctionMap = new Map();
logFunctionMap.set("log", console.log);
logFunctionMap.set("warn", console.warn);
logFunctionMap.set('error', console.error);
export { log };
//# sourceMappingURL=Logger.js.map