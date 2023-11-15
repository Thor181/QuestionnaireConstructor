type logLevel = 'log' | 'warn' | 'error'

const log = (level: logLevel, message: string | object) => {

    if (typeof message == typeof String) {
        logFunctionMap.get(level)(`[${new Date().toLocaleTimeString()}] ${message}`);
    }
    else {
        logFunctionMap.get(level)(message);
    }
}

const logFunctionMap = new Map<logLevel, (message: string | object) => void>();
logFunctionMap.set("log", console.log);
logFunctionMap.set("warn", console.warn);
logFunctionMap.set('error', console.error);

export { log };

