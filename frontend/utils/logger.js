const logger = {
    log: (...args) => {
        if (__DEV__) {
            console.log("[LOG]", ...args);
        }
    },
    warn: (...args) => {
        if (__DEV__) {
            console.warn("[WARN]", ...args);
        }
    },
    error: (...args) => {
        // Always show errors, even in production
        console.error("[ERROR]", ...args);
    },
    info: (...args) => {
        if (__DEV__) {
            console.info("[INFO]", ...args);
        }
    },
    debug: (...args) => {
        if (__DEV__) {
            console.debug("[DEBUG]", ...args);
        }
    },
};

export default logger;
