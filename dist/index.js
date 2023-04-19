import './sourcemap-register.cjs';import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ({

/***/ 9483:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(2994);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 7733:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(9483);
const file_command_1 = __nccwpck_require__(8541);
const utils_1 = __nccwpck_require__(2994);
const os = __importStar(__nccwpck_require__(2037));
const path = __importStar(__nccwpck_require__(1017));
const oidc_utils_1 = __nccwpck_require__(2422);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('ENV', file_command_1.prepareKeyValueMessage(name, val));
    }
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueFileCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    if (options && options.trimWhitespace === false) {
        return inputs;
    }
    return inputs.map(input => input.trim());
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    const filePath = process.env['GITHUB_OUTPUT'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('OUTPUT', file_command_1.prepareKeyValueMessage(name, value));
    }
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, utils_1.toCommandValue(value));
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    const filePath = process.env['GITHUB_STATE'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('STATE', file_command_1.prepareKeyValueMessage(name, value));
    }
    command_1.issueCommand('save-state', { name }, utils_1.toCommandValue(value));
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(513);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(513);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
/**
 * Path exports
 */
var path_utils_1 = __nccwpck_require__(3084);
Object.defineProperty(exports, "toPosixPath", ({ enumerable: true, get: function () { return path_utils_1.toPosixPath; } }));
Object.defineProperty(exports, "toWin32Path", ({ enumerable: true, get: function () { return path_utils_1.toWin32Path; } }));
Object.defineProperty(exports, "toPlatformPath", ({ enumerable: true, get: function () { return path_utils_1.toPlatformPath; } }));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 8541:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(7147));
const os = __importStar(__nccwpck_require__(2037));
const uuid_1 = __nccwpck_require__(2033);
const utils_1 = __nccwpck_require__(2994);
function issueFileCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
    const delimiter = `ghadelimiter_${uuid_1.v4()}`;
    const convertedValue = utils_1.toCommandValue(value);
    // These should realistically never happen, but just in case someone finds a
    // way to exploit uuid generation let's not allow keys or values that contain
    // the delimiter.
    if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
    }
    if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
    }
    return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
exports.prepareKeyValueMessage = prepareKeyValueMessage;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 2422:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(7794);
const auth_1 = __nccwpck_require__(4610);
const core_1 = __nccwpck_require__(7733);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 3084:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__nccwpck_require__(1017));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
    return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
    return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;
//# sourceMappingURL=path-utils.js.map

/***/ }),

/***/ 513:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(2037);
const fs_1 = __nccwpck_require__(7147);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
    filePath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
                return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            }
            try {
                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 2994:
/***/ ((__unused_webpack_module, exports) => {


// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 4610:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 7794:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__nccwpck_require__(3685));
const https = __importStar(__nccwpck_require__(5687));
const pm = __importStar(__nccwpck_require__(1116));
const tunnel = __importStar(__nccwpck_require__(4249));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                    output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                    resolve(output.toString());
                });
            }));
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response &&
                    response.message &&
                    response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers) {
                        if (handler.canHandleAuthentication(response)) {
                            authenticationHandler = handler;
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (response.message.statusCode &&
                    HttpRedirectCodes.includes(response.message.statusCode) &&
                    this._allowRedirects &&
                    redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers['location'];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === 'https:' &&
                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                        !this._allowRedirectDowngrade) {
                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for (const header in headers) {
                            // header names are case insensitive
                            if (header.toLowerCase() === 'authorization') {
                                delete headers[header];
                            }
                        }
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode ||
                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            } while (numTries < maxTries);
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                function callbackForResult(err, res) {
                    if (err) {
                        reject(err);
                    }
                    else if (!res) {
                        // If `err` is not passed, then `res` must be passed.
                        reject(new Error('Unknown error'));
                    }
                    else {
                        resolve(res);
                    }
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        if (typeof data === 'string') {
            if (!info.options.headers) {
                info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        function handleResult(err, res) {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        }
        const req = info.httpModule.request(info.options, (msg) => {
            const res = new HttpClientResponse(msg);
            handleResult(undefined, res);
        });
        let socket;
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            for (const handler of this.handlers) {
                handler.prepareRequest(info.options);
            }
        }
        return info;
    }
    _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                })), { host: proxyUrl.hostname, port: proxyUrl.port })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
            const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise(resolve => setTimeout(() => resolve(), ms));
        });
    }
    _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const statusCode = res.message.statusCode || 0;
                const response = {
                    statusCode,
                    result: null,
                    headers: {}
                };
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                    resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                    if (typeof value === 'string') {
                        const a = new Date(value);
                        if (!isNaN(a.valueOf())) {
                            return a;
                        }
                    }
                    return value;
                }
                let obj;
                let contents;
                try {
                    contents = yield res.readBody();
                    if (contents && contents.length > 0) {
                        if (options && options.deserializeDates) {
                            obj = JSON.parse(contents, dateTimeDeserializer);
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        response.result = obj;
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = `Failed request: (${statusCode})`;
                    }
                    const err = new HttpClientError(msg, statusCode);
                    err.result = response.result;
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1116:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        return new URL(proxyVar);
    }
    else {
        return undefined;
    }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const reqHost = reqUrl.hostname;
    if (isLoopbackAddress(reqHost)) {
        return true;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperNoProxyItem === '*' ||
            upperReqHosts.some(x => x === upperNoProxyItem ||
                x.endsWith(`.${upperNoProxyItem}`) ||
                (upperNoProxyItem.startsWith('.') &&
                    x.endsWith(`${upperNoProxyItem}`)))) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;
function isLoopbackAddress(host) {
    const hostLower = host.toLowerCase();
    return (hostLower === 'localhost' ||
        hostLower.startsWith('127.') ||
        hostLower.startsWith('[::1]') ||
        hostLower.startsWith('[0:0:0:0:0:0:0:1]'));
}
//# sourceMappingURL=proxy.js.map

/***/ }),

/***/ 9788:
/***/ ((module) => {


var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from3, except, desc) => {
  if (from3 && typeof from3 === "object" || typeof from3 === "function") {
    for (let key of __getOwnPropNames(from3))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from3[key], enumerable: !(desc = __getOwnPropDesc(from3, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// ../../node_modules/iso-datestring-validator/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/iso-datestring-validator/dist/index.js"(exports) {
    (() => {
      "use strict";
      var e = { d: (t2, r2) => {
        for (var n2 in r2)
          e.o(r2, n2) && !e.o(t2, n2) && Object.defineProperty(t2, n2, { enumerable: true, get: r2[n2] });
      }, o: (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), r: (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      } }, t = {};
      function r(e2, t2) {
        return void 0 === t2 && (t2 = "-"), new RegExp("^(?!0{4}" + t2 + "0{2}" + t2 + "0{2})((?=[0-9]{4}" + t2 + "(((0[^2])|1[0-2])|02(?=" + t2 + "(([0-1][0-9])|2[0-8])))" + t2 + "[0-9]{2})|(?=((([13579][26])|([2468][048])|(0[48]))0{2})|([0-9]{2}((((0|[2468])[48])|[2468][048])|([13579][26])))" + t2 + "02" + t2 + "29))([0-9]{4})" + t2 + "(?!((0[469])|11)" + t2 + "31)((0[1,3-9]|1[0-2])|(02(?!" + t2 + "3)))" + t2 + "(0[1-9]|[1-2][0-9]|3[0-1])$").test(e2);
      }
      function n(e2) {
        var t2 = /\D/.exec(e2);
        return t2 ? t2[0] : "";
      }
      function i(e2, t2, r2) {
        void 0 === t2 && (t2 = ":"), void 0 === r2 && (r2 = false);
        var i2 = new RegExp("^([0-1]|2(?=([0-3])|4" + t2 + "00))[0-9]" + t2 + "[0-5][0-9](" + t2 + "([0-5]|6(?=0))[0-9])?(.[0-9]{1,9})?$");
        if (!r2 || !/[Z+\-]/.test(e2))
          return i2.test(e2);
        if (/Z$/.test(e2))
          return i2.test(e2.replace("Z", ""));
        var o2 = e2.includes("+"), a2 = e2.split(/[+-]/), u2 = a2[0], d2 = a2[1];
        return i2.test(u2) && function(e3, t3, r3) {
          return void 0 === r3 && (r3 = ":"), new RegExp(t3 ? "^(0(?!(2" + r3 + "4)|0" + r3 + "3)|1(?=([0-1]|2(?=" + r3 + "[04])|[34](?=" + r3 + "0))))([03469](?=" + r3 + "[03])|[17](?=" + r3 + "0)|2(?=" + r3 + "[04])|5(?=" + r3 + "[034])|8(?=" + r3 + "[04]))" + r3 + "([03](?=0)|4(?=5))[05]$" : "^(0(?=[^0])|1(?=[0-2]))([39](?=" + r3 + "[03])|[0-24-8](?=" + r3 + "00))" + r3 + "[03]0$").test(e3);
        }(d2, o2, n(d2));
      }
      function o(e2) {
        var t2 = e2.split("T"), o2 = t2[0], a2 = t2[1], u2 = r(o2, n(o2));
        if (!a2)
          return false;
        var d2, s = (d2 = a2.match(/([^Z+\-\d])(?=\d+\1)/), Array.isArray(d2) ? d2[0] : "");
        return u2 && i(a2, s, true);
      }
      function a(e2, t2) {
        return void 0 === t2 && (t2 = "-"), new RegExp("^[0-9]{4}" + t2 + "(0(?=[^0])|1(?=[0-2]))[0-9]$").test(e2);
      }
      e.r(t), e.d(t, { isValidDate: () => r, isValidISODateString: () => o, isValidTime: () => i, isValidYearMonth: () => a });
      var u = exports;
      for (var d in t)
        u[d] = t[d];
      t.__esModule && Object.defineProperty(u, "__esModule", { value: true });
    })();
  }
});

// src/index.ts
var src_exports4 = {};
__export(src_exports4, {
  ActorNS: () => ActorNS,
  AdminNS: () => AdminNS,
  AppBskyActorDefs: () => defs_exports5,
  AppBskyActorGetProfile: () => getProfile_exports,
  AppBskyActorGetProfiles: () => getProfiles_exports,
  AppBskyActorGetSuggestions: () => getSuggestions_exports,
  AppBskyActorProfile: () => profile_exports,
  AppBskyActorSearchActors: () => searchActors_exports,
  AppBskyActorSearchActorsTypeahead: () => searchActorsTypeahead_exports,
  AppBskyEmbedExternal: () => external_exports,
  AppBskyEmbedImages: () => images_exports,
  AppBskyEmbedRecord: () => record_exports,
  AppBskyEmbedRecordWithMedia: () => recordWithMedia_exports,
  AppBskyFeedDefs: () => defs_exports6,
  AppBskyFeedGetAuthorFeed: () => getAuthorFeed_exports,
  AppBskyFeedGetLikes: () => getLikes_exports,
  AppBskyFeedGetPostThread: () => getPostThread_exports,
  AppBskyFeedGetRepostedBy: () => getRepostedBy_exports,
  AppBskyFeedGetTimeline: () => getTimeline_exports,
  AppBskyFeedLike: () => like_exports,
  AppBskyFeedPost: () => post_exports,
  AppBskyFeedRepost: () => repost_exports,
  AppBskyGraphFollow: () => follow_exports,
  AppBskyGraphGetFollowers: () => getFollowers_exports,
  AppBskyGraphGetFollows: () => getFollows_exports,
  AppBskyGraphGetMutes: () => getMutes_exports,
  AppBskyGraphMuteActor: () => muteActor_exports,
  AppBskyGraphUnmuteActor: () => unmuteActor_exports,
  AppBskyNotificationGetUnreadCount: () => getUnreadCount_exports,
  AppBskyNotificationListNotifications: () => listNotifications_exports,
  AppBskyNotificationUpdateSeen: () => updateSeen_exports,
  AppBskyRichtextFacet: () => facet_exports,
  AppBskyUnspeccedGetPopular: () => getPopular_exports,
  AppNS: () => AppNS,
  AtUri: () => AtUri,
  AtpAgent: () => AtpAgent,
  AtpBaseClient: () => AtpBaseClient,
  AtpServiceClient: () => AtpServiceClient,
  AtprotoNS: () => AtprotoNS,
  BlobRef: () => BlobRef,
  BskyAgent: () => BskyAgent,
  BskyNS: () => BskyNS,
  COM_ATPROTO_ADMIN: () => COM_ATPROTO_ADMIN,
  COM_ATPROTO_MODERATION: () => COM_ATPROTO_MODERATION,
  ComAtprotoAdminDefs: () => defs_exports,
  ComAtprotoAdminDisableInviteCodes: () => disableInviteCodes_exports,
  ComAtprotoAdminGetInviteCodes: () => getInviteCodes_exports,
  ComAtprotoAdminGetModerationAction: () => getModerationAction_exports,
  ComAtprotoAdminGetModerationActions: () => getModerationActions_exports,
  ComAtprotoAdminGetModerationReport: () => getModerationReport_exports,
  ComAtprotoAdminGetModerationReports: () => getModerationReports_exports,
  ComAtprotoAdminGetRecord: () => getRecord_exports,
  ComAtprotoAdminGetRepo: () => getRepo_exports,
  ComAtprotoAdminResolveModerationReports: () => resolveModerationReports_exports,
  ComAtprotoAdminReverseModerationAction: () => reverseModerationAction_exports,
  ComAtprotoAdminSearchRepos: () => searchRepos_exports,
  ComAtprotoAdminTakeModerationAction: () => takeModerationAction_exports,
  ComAtprotoAdminUpdateAccountHandle: () => updateAccountHandle_exports,
  ComAtprotoIdentityResolveHandle: () => resolveHandle_exports,
  ComAtprotoIdentityUpdateHandle: () => updateHandle_exports,
  ComAtprotoLabelDefs: () => defs_exports2,
  ComAtprotoLabelQueryLabels: () => queryLabels_exports,
  ComAtprotoLabelSubscribeLabels: () => subscribeLabels_exports,
  ComAtprotoModerationCreateReport: () => createReport_exports,
  ComAtprotoModerationDefs: () => defs_exports3,
  ComAtprotoRepoApplyWrites: () => applyWrites_exports,
  ComAtprotoRepoCreateRecord: () => createRecord_exports,
  ComAtprotoRepoDeleteRecord: () => deleteRecord_exports,
  ComAtprotoRepoDescribeRepo: () => describeRepo_exports,
  ComAtprotoRepoGetRecord: () => getRecord_exports2,
  ComAtprotoRepoListRecords: () => listRecords_exports,
  ComAtprotoRepoPutRecord: () => putRecord_exports,
  ComAtprotoRepoStrongRef: () => strongRef_exports,
  ComAtprotoRepoUploadBlob: () => uploadBlob_exports,
  ComAtprotoServerCreateAccount: () => createAccount_exports,
  ComAtprotoServerCreateInviteCode: () => createInviteCode_exports,
  ComAtprotoServerCreateInviteCodes: () => createInviteCodes_exports,
  ComAtprotoServerCreateSession: () => createSession_exports,
  ComAtprotoServerDefs: () => defs_exports4,
  ComAtprotoServerDeleteAccount: () => deleteAccount_exports,
  ComAtprotoServerDeleteSession: () => deleteSession_exports,
  ComAtprotoServerDescribeServer: () => describeServer_exports,
  ComAtprotoServerGetAccountInviteCodes: () => getAccountInviteCodes_exports,
  ComAtprotoServerGetSession: () => getSession_exports,
  ComAtprotoServerRefreshSession: () => refreshSession_exports,
  ComAtprotoServerRequestAccountDelete: () => requestAccountDelete_exports,
  ComAtprotoServerRequestPasswordReset: () => requestPasswordReset_exports,
  ComAtprotoServerResetPassword: () => resetPassword_exports,
  ComAtprotoSyncGetBlob: () => getBlob_exports,
  ComAtprotoSyncGetBlocks: () => getBlocks_exports,
  ComAtprotoSyncGetCheckout: () => getCheckout_exports,
  ComAtprotoSyncGetCommitPath: () => getCommitPath_exports,
  ComAtprotoSyncGetHead: () => getHead_exports,
  ComAtprotoSyncGetRecord: () => getRecord_exports3,
  ComAtprotoSyncGetRepo: () => getRepo_exports2,
  ComAtprotoSyncListBlobs: () => listBlobs_exports,
  ComAtprotoSyncListRepos: () => listRepos_exports,
  ComAtprotoSyncNotifyOfUpdate: () => notifyOfUpdate_exports,
  ComAtprotoSyncRequestCrawl: () => requestCrawl_exports,
  ComAtprotoSyncSubscribeRepos: () => subscribeRepos_exports,
  ComNS: () => ComNS,
  EmbedNS: () => EmbedNS,
  FeedNS: () => FeedNS,
  FollowRecord: () => FollowRecord,
  GraphNS: () => GraphNS,
  IdentityNS: () => IdentityNS,
  LabelNS: () => LabelNS,
  LikeRecord: () => LikeRecord,
  ModerationNS: () => ModerationNS,
  NotificationNS: () => NotificationNS,
  PostRecord: () => PostRecord,
  ProfileRecord: () => ProfileRecord,
  RepoNS: () => RepoNS,
  RepostRecord: () => RepostRecord,
  RichText: () => RichText,
  RichTextSegment: () => RichTextSegment,
  RichtextNS: () => RichtextNS,
  ServerNS: () => ServerNS,
  SyncNS: () => SyncNS,
  UnicodeString: () => UnicodeString,
  UnspeccedNS: () => UnspeccedNS,
  default: () => AtpAgent,
  jsonStringToLex: () => jsonStringToLex,
  jsonToLex: () => jsonToLex,
  lexToJson: () => lexToJson,
  sanitizeRichText: () => sanitizeRichText,
  stringifyLex: () => stringifyLex
});
module.exports = __toCommonJS(src_exports4);

// ../common-web/src/check.ts
var check_exports = {};
__export(check_exports, {
  assure: () => assure,
  is: () => is,
  isObject: () => isObject
});
var is = (obj, def2) => {
  return def2.safeParse(obj).success;
};
var assure = (def2, obj) => {
  return def2.parse(obj);
};
var isObject = (obj) => {
  return typeof obj === "object" && obj !== null;
};

// ../../node_modules/multiformats/esm/vendor/varint.js
var encode_1 = encode;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode.bytes = offset - oldOffset + 1;
  return out;
}
var decode = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// ../../node_modules/multiformats/esm/src/varint.js
var decode2 = (data, offset = 0) => {
  const code2 = varint_default.decode(data, offset);
  return [
    code2,
    varint_default.decode.bytes
  ];
};
var encodeTo = (int, target, offset = 0) => {
  varint_default.encode(int, target, offset);
  return target;
};
var encodingLength = (int) => {
  return varint_default.encodingLength(int);
};

// ../../node_modules/multiformats/esm/src/bytes.js
var empty = new Uint8Array(0);
var equals = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
var coerce = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString = (str) => new TextEncoder().encode(str);
var toString = (b) => new TextDecoder().decode(b);

// ../../node_modules/multiformats/esm/src/hashes/digest.js
var create = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes2 = new Uint8Array(digestOffset + size);
  encodeTo(code2, bytes2, 0);
  encodeTo(size, bytes2, sizeOffset);
  bytes2.set(digest2, digestOffset);
  return new Digest(code2, size, digest2, bytes2);
};
var decode3 = (multihash) => {
  const bytes2 = coerce(multihash);
  const [code2, sizeOffset] = decode2(bytes2);
  const [size, digestOffset] = decode2(bytes2.subarray(sizeOffset));
  const digest2 = bytes2.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size, digest2, bytes2);
};
var equals2 = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return a.code === b.code && a.size === b.size && equals(a.bytes, b.bytes);
  }
};
var Digest = class {
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
};

// ../../node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});

// ../../node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode5(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode6(string3) {
    var buffer = decodeUnsafe(string3);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode5,
    decodeUnsafe,
    decode: decode6
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// ../../node_modules/multiformats/esm/src/bases/base.js
var Encoder = class {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder2) {
    return or(this, decoder2);
  }
};
var ComposedDecoder = class {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder2) {
    return or(this, decoder2);
  }
  decode(input) {
    const prefix = input[0];
    const decoder2 = this.decoders[prefix];
    if (decoder2) {
      return decoder2.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
var Codec = class {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from = ({ name: name2, prefix, encode: encode5, decode: decode6 }) => new Codec(name2, prefix, encode5, decode6);
var baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode5, decode: decode6 } = base_x_default(alphabet2, name2);
  return from({
    prefix,
    name: name2,
    encode: encode5,
    decode: (text) => coerce(decode6(text))
  });
};
var decode4 = (string3, alphabet2, bitsPerChar, name2) => {
  const codes = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes[alphabet2[i]] = i;
  }
  let end = string3.length;
  while (string3[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes[string3[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode2 = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from({
    prefix,
    name: name2,
    encode(input) {
      return encode2(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode4(input, alphabet2, bitsPerChar, name2);
    }
  });
};

// ../../node_modules/multiformats/esm/src/bases/base58.js
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// ../../node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// ../../node_modules/multiformats/esm/src/cid.js
var CID = class {
  constructor(version2, code2, multihash, bytes2) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes2;
    this.byteOffset = bytes2.byteOffset;
    this.byteLength = bytes2.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly,
      version: readonly,
      multihash: readonly,
      bytes: readonly,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create(code2, digest2);
        return CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes: bytes2, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0(bytes2, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes2, _baseCache, base3 || base32.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes: bytes2 } = value;
      return new CID(version2, code2, multihash, bytes2 || encodeCID(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode3(multihash);
      return CID.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new CID(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes2 = encodeCID(version2, code2, digest2.bytes);
        return new CID(version2, code2, digest2, bytes2);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code2, digest2) {
    return CID.create(1, code2, digest2);
  }
  static decode(bytes2) {
    const [cid2, remainder] = CID.decodeFirst(bytes2);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid2;
  }
  static decodeFirst(bytes2) {
    const specs = CID.inspectBytes(bytes2);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid2 = specs.version === 0 ? CID.createV0(digest2) : CID.createV1(specs.codec, digest2);
    return [
      cid2,
      bytes2.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode2(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes2] = parseCIDtoBytes(source, base3);
    const cid2 = CID.decode(bytes2);
    cid2._baseCache.set(prefix, source);
    return cid2;
  }
};
var parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder2 = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder2.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder2 = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder2.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder2 = base3 || base32;
      return [
        base32.prefix,
        decoder2.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
var toStringV0 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid2 = cache.get(prefix);
  if (cid2 == null) {
    const cid3 = base3.encode(bytes2).slice(1);
    cache.set(prefix, cid3);
    return cid3;
  } else {
    return cid2;
  }
};
var toStringV1 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  const cid2 = cache.get(prefix);
  if (cid2 == null) {
    const cid3 = base3.encode(bytes2);
    cache.set(prefix, cid3);
    return cid3;
  } else {
    return cid2;
  }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version2, code2, multihash) => {
  const codeOffset = encodingLength(version2);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes2 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version2, bytes2, 0);
  encodeTo(code2, bytes2, codeOffset);
  bytes2.set(multihash, hashOffset);
  return bytes2;
};
var cidSymbol = Symbol.for("@ipld/js-cid/CID");
var readonly = {
  writable: false,
  configurable: false,
  enumerable: true
};
var hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
var version = "0.0.0-dev";
var deprecate = (range, message) => {
  if (range.test(version)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

// ../../node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
var identity = from({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString(buf),
  decode: (str) => fromString(str)
});

// ../../node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// ../../node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// ../../node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// ../../node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// ../../node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// ../../node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// ../../node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars = alphabet.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode3(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode5(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode3,
  decode: decode5
});

// ../../node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});

// ../../node_modules/multiformats/esm/src/hashes/hasher.js
var from2 = ({ name: name2, code: code2, encode: encode5 }) => new Hasher(name2, code2, encode5);
var Hasher = class {
  constructor(name2, code2, encode5) {
    this.name = name2;
    this.code = code2;
    this.encode = encode5;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// ../../node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
var sha256 = from2({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from2({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// ../../node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code = 0;
var name = "identity";
var encode4 = coerce;
var digest = (input) => create(code, encode4(input));
var identity2 = {
  code,
  name,
  encode: encode4,
  digest
};

// ../../node_modules/multiformats/esm/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// ../../node_modules/multiformats/esm/src/basics.js
var bases = {
  ...identity_exports,
  ...base2_exports,
  ...base8_exports,
  ...base10_exports,
  ...base16_exports,
  ...base32_exports,
  ...base36_exports,
  ...base58_exports,
  ...base64_exports,
  ...base256emoji_exports
};
var hashes = {
  ...sha2_browser_exports,
  ...identity_exports2
};

// ../../node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode5, decode6) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode5
    },
    decoder: { decode: decode6 }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder2 = new TextDecoder("utf8");
  return "u" + decoder2.decode(buf);
}, (str) => {
  const encoder2 = new TextEncoder();
  return encoder2.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string3 = "a";
  for (let i = 0; i < buf.length; i++) {
    string3 += String.fromCharCode(buf[i]);
  }
  return string3;
}, (str) => {
  str = str.substring(1);
  const buf = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// ../../node_modules/uint8arrays/esm/src/from-string.js
function fromString2(string3, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base3.decoder.decode(`${base3.prefix}${string3}`);
}

// ../../node_modules/uint8arrays/esm/src/to-string.js
function toString2(array2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base3.encoder.encode(array2).substring(1);
}

// ../common-web/src/ipld.ts
var jsonToIpld = (val) => {
  if (Array.isArray(val)) {
    return val.map((item) => jsonToIpld(item));
  }
  if (val && typeof val === "object") {
    if (typeof val["$link"] === "string" && Object.keys(val).length === 1) {
      return CID.parse(val["$link"]);
    }
    if (typeof val["$bytes"] === "string" && Object.keys(val).length === 1) {
      return fromString2(val["$bytes"], "base64");
    }
    const toReturn = {};
    for (const key of Object.keys(val)) {
      toReturn[key] = jsonToIpld(val[key]);
    }
    return toReturn;
  }
  return val;
};
var ipldToJson = (val) => {
  if (Array.isArray(val)) {
    return val.map((item) => ipldToJson(item));
  }
  if (val && typeof val === "object") {
    if (val instanceof Uint8Array) {
      return {
        $bytes: toString2(val, "base64")
      };
    }
    if (CID.asCID(val)) {
      return {
        $link: val.toString()
      };
    }
    const toReturn = {};
    for (const key of Object.keys(val)) {
      toReturn[key] = ipldToJson(val[key]);
    }
    return toReturn;
  }
  return val;
};

// ../../node_modules/zod/lib/index.mjs
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object2) => {
    const keys = [];
    for (const key in object2) {
      if (Object.prototype.hasOwnProperty.call(object2, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array2, separator = " | ") {
    return array2.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class extends Error {
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  get errors() {
    return this.issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be greater than ${issue.inclusive ? `or equal to ` : ``}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be greater than ${issue.inclusive ? `or equal to ` : ``}${new Date(issue.minimum)}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be less than ${issue.inclusive ? `or equal to ` : ``}${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be smaller than ${issue.inclusive ? `or equal to ` : ``}${new Date(issue.maximum)}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params2) => {
  const { data, path, errorMaps, issueData } = params2;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: issueData.message || errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      syncPairs.push({
        key: await pair.key,
        value: await pair.value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (typeof value.value !== "undefined" || pair.alwaysSet) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== void 0 && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    return this._path.concat(this._key);
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    const error = new ZodError(ctx.common.issues);
    return { success: false, error };
  }
};
function processCreateParams(params2) {
  if (!params2)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params2;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  constructor(def2) {
    this.spa = this.safeParseAsync;
    this.superRefine = this._refinement;
    this._def = def2;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.default = this.default.bind(this);
    this.describe = this.describe.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params2) {
    const result = this.safeParse(data, params2);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params2) {
    var _a;
    const ctx = {
      common: {
        issues: [],
        async: (_a = params2 === null || params2 === void 0 ? void 0 : params2.async) !== null && _a !== void 0 ? _a : false,
        contextualErrorMap: params2 === null || params2 === void 0 ? void 0 : params2.errorMap
      },
      path: (params2 === null || params2 === void 0 ? void 0 : params2.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  async parseAsync(data, params2) {
    const result = await this.safeParseAsync(data, params2);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params2) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params2 === null || params2 === void 0 ? void 0 : params2.errorMap,
        async: true
      },
      path: (params2 === null || params2 === void 0 ? void 0 : params2.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: [], parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  optional() {
    return ZodOptional.create(this);
  }
  nullable() {
    return ZodNullable.create(this);
  }
  nullish() {
    return this.optional().nullable();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this);
  }
  or(option) {
    return ZodUnion.create([this, option]);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming);
  }
  transform(transform) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def2) {
    const defaultValueFunc = typeof def2 === "function" ? def2 : () => def2;
    return new ZodDefault({
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(void 0)
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var ZodString = class extends ZodType {
  constructor() {
    super(...arguments);
    this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
    this.nonempty = (message) => this.min(1, errorUtil.errToObj(message));
    this.trim = () => new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(
        ctx2,
        {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        }
      );
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this.min(len, message).max(len, message);
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params2) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    ...processCreateParams(params2)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
var ZodNumber = class extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int");
  }
};
ZodNumber.create = (params2) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    ...processCreateParams(params2)
  });
};
var ZodBigInt = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBigInt.create = (params2) => {
  return new ZodBigInt({
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    ...processCreateParams(params2)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params2) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    ...processCreateParams(params2)
  });
};
var ZodDate = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params2) => {
  return new ZodDate({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params2)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params2) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params2)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params2) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params2)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params2) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params2)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params2) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params2)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params2) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params2)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params2) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params2)
  });
};
var ZodArray = class extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def2 = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def2.minLength !== null) {
      if (ctx.data.length < def2.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def2.minLength.value,
          type: "array",
          inclusive: true,
          message: def2.minLength.message
        });
        status.dirty();
      }
    }
    if (def2.maxLength !== null) {
      if (ctx.data.length > def2.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def2.maxLength.value,
          type: "array",
          inclusive: true,
          message: def2.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all(ctx.data.map((item, i) => {
        return def2.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = ctx.data.map((item, i) => {
      return def2.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return this.min(len, message).max(len, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema2, params2) => {
  return new ZodArray({
    type: schema2,
    minLength: null,
    maxLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params2)
  });
};
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
    };
  };
})(objectUtil || (objectUtil = {}));
var AugmentFactory = (def2) => (augmentation) => {
  return new ZodObject({
    ...def2,
    shape: () => ({
      ...def2.shape(),
      ...augmentation
    })
  });
};
function deepPartialify(schema2) {
  if (schema2 instanceof ZodObject) {
    const newShape = {};
    for (const key in schema2.shape) {
      const fieldSchema = schema2.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema2._def,
      shape: () => newShape
    });
  } else if (schema2 instanceof ZodArray) {
    return ZodArray.create(deepPartialify(schema2.element));
  } else if (schema2 instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema2.unwrap()));
  } else if (schema2 instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema2.unwrap()));
  } else if (schema2 instanceof ZodTuple) {
    return ZodTuple.create(schema2.items.map((item) => deepPartialify(item)));
  } else {
    return schema2;
  }
}
var ZodObject = class extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = AugmentFactory(this._def);
    this.extend = AugmentFactory(this._def);
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    return this._cached = { shape, keys };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip")
        ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          syncPairs.push({
            key,
            value: await pair.value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a, _b, _c, _d;
          const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  setKey(key, schema2) {
    return this.augment({ [key]: schema2 });
  }
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).map((key) => {
      if (this.shape[key])
        shape[key] = this.shape[key];
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).map((key) => {
      if (util.objectKeys(mask).indexOf(key) === -1) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    if (mask) {
      util.objectKeys(this.shape).map((key) => {
        if (util.objectKeys(mask).indexOf(key) === -1) {
          newShape[key] = this.shape[key];
        } else {
          newShape[key] = this.shape[key].optional();
        }
      });
      return new ZodObject({
        ...this._def,
        shape: () => newShape
      });
    } else {
      for (const key in this.shape) {
        const fieldSchema = this.shape[key];
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required() {
    const newShape = {};
    for (const key in this.shape) {
      const fieldSchema = this.shape[key];
      let newField = fieldSchema;
      while (newField instanceof ZodOptional) {
        newField = newField._def.innerType;
      }
      newShape[key] = newField;
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params2) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params2)
  });
};
ZodObject.strictCreate = (shape, params2) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params2)
  });
};
ZodObject.lazycreate = (shape, params2) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params2)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params2) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params2)
  });
};
var ZodDiscriminatedUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.options.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: this.validDiscriminatorValues,
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get validDiscriminatorValues() {
    return Array.from(this.options.keys());
  }
  get options() {
    return this._def.options;
  }
  static create(discriminator, types, params2) {
    const options = /* @__PURE__ */ new Map();
    try {
      types.forEach((type) => {
        const discriminatorValue = type.shape[discriminator].value;
        options.set(discriminatorValue, type);
      });
    } catch (e) {
      throw new Error("The discriminator value could not be extracted from all the provided schemas");
    }
    if (options.size !== types.length) {
      throw new Error("Some of the discriminator values are not unique");
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      ...processCreateParams(params2)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params2) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params2)
  });
};
var ZodTuple = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        type: "array"
      });
      status.dirty();
    }
    const items = ctx.data.map((item, itemIndex) => {
      const schema2 = this._def.items[itemIndex] || this._def.rest;
      if (!schema2)
        return null;
      return schema2._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas2, params2) => {
  if (!Array.isArray(schemas2)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas2,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params2)
  });
};
var ZodRecord = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params2) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params2)
  });
};
var ZodSet = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def2 = this._def;
    if (def2.minSize !== null) {
      if (ctx.data.size < def2.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def2.minSize.value,
          type: "set",
          inclusive: true,
          message: def2.minSize.message
        });
        status.dirty();
      }
    }
    if (def2.maxSize !== null) {
      if (ctx.data.size > def2.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def2.maxSize.value,
          type: "set",
          inclusive: true,
          message: def2.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params2) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params2)
  });
};
var ZodFunction = class extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params2 = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      return OK(async (...args) => {
        const error = new ZodError([]);
        const parsedArgs = await this._def.args.parseAsync(args, params2).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await fn(...parsedArgs);
        const parsedReturns = await this._def.returns._def.type.parseAsync(result, params2).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      return OK((...args) => {
        const parsedArgs = this._def.args.safeParse(args, params2);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = fn(...parsedArgs.data);
        const parsedReturns = this._def.returns.safeParse(result, params2);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params2) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params2)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params2) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params2)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params2) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params2)
  });
};
function createZodEnum(values, params2) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params2)
  });
}
var ZodEnum = class extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (this._def.values.indexOf(input.data) === -1) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (nativeEnumValues.indexOf(input.data) === -1) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params2) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params2)
  });
};
var ZodPromise = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema2, params2) => {
  return new ZodPromise({
    type: schema2,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params2)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data);
      if (ctx.common.async) {
        return Promise.resolve(processed).then((processed2) => {
          return this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
        });
      } else {
        return this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base3 = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base3))
          return base3;
        const result = effect.transform(base3.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base3) => {
          if (!isValid(base3))
            return base3;
          return Promise.resolve(effect.transform(base3.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema2, effect, params2) => {
  return new ZodEffects({
    schema: schema2,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params2)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema2, params2) => {
  return new ZodEffects({
    schema: schema2,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params2)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params2) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params2)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params2) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params2)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params2) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params2)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params2) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params2)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var custom = (check, params2 = {}, fatal) => {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      if (!check(data)) {
        const p = typeof params2 === "function" ? params2(data) : params2;
        const p2 = typeof p === "string" ? { message: p } : p;
        ctx.addIssue({ code: "custom", ...p2, fatal });
      }
    });
  return ZodAny.create();
};
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params2 = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params2, true);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var NEVER = INVALID;
var mod = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getParsedType,
  ZodParsedType,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  ZodType,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  get objectUtil() {
    return objectUtil;
  },
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodNaN,
  BRAND,
  ZodBranded,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// ../common-web/src/types.ts
var cidSchema = mod.any().refine((obj) => CID.asCID(obj) !== null, {
  message: "Not a CID"
}).transform((obj) => CID.asCID(obj));
var schema = {
  cid: cidSchema,
  bytes: mod.instanceof(Uint8Array),
  string: mod.string(),
  array: mod.array(mod.unknown()),
  map: mod.record(mod.string(), mod.unknown()),
  unknown: mod.unknown()
};
var def = {
  cid: {
    name: "cid",
    schema: schema.cid
  },
  bytes: {
    name: "bytes",
    schema: schema.bytes
  },
  string: {
    name: "string",
    schema: schema.string
  },
  map: {
    name: "map",
    schema: schema.map
  },
  unknown: {
    name: "unknown",
    schema: schema.unknown
  }
};

// ../common-web/src/times.ts
var SECOND = 1e3;
var MINUTE = SECOND * 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;

// ../common-web/src/strings.ts
var utf8Len = (str) => {
  return new TextEncoder().encode(str).byteLength;
};
var graphemeLen = (str) => {
  return [...new Intl.Segmenter().segment(str)].length;
};

// ../identifier/src/reserved.ts
var atpSpecific = [
  "at",
  "atp",
  "plc",
  "pds",
  "did",
  "repo",
  "tid",
  "nsid",
  "xrpc",
  "lex",
  "lexicon",
  "bsky",
  "bluesky",
  "handle"
];
var commonlyReserved = [
  "about",
  "abuse",
  "access",
  "account",
  "accounts",
  "acme",
  "activate",
  "activities",
  "activity",
  "ad",
  "add",
  "address",
  "adm",
  "admanager",
  "admin",
  "administration",
  "administrator",
  "administrators",
  "admins",
  "ads",
  "adsense",
  "adult",
  "advertising",
  "adwords",
  "affiliate",
  "affiliatepage",
  "affiliates",
  "afp",
  "ajax",
  "all",
  "alpha",
  "analysis",
  "analytics",
  "android",
  "anon",
  "anonymous",
  "answer",
  "answers",
  "ap",
  "api",
  "apis",
  "app",
  "appengine",
  "appnews",
  "apps",
  "archive",
  "archives",
  "article",
  "asdf",
  "asset",
  "assets",
  "auth",
  "authentication",
  "avatar",
  "backup",
  "bank",
  "banner",
  "banners",
  "base",
  "beginners",
  "beta",
  "billing",
  "bin",
  "binaries",
  "binary",
  "blackberry",
  "blog",
  "blogs",
  "blogsearch",
  "board",
  "book",
  "bookmark",
  "bookmarks",
  "books",
  "bot",
  "bots",
  "bug",
  "bugs",
  "business",
  "buy",
  "buzz",
  "cache",
  "calendar",
  "call",
  "campaign",
  "cancel",
  "captcha",
  "career",
  "careers",
  "cart",
  "catalog",
  "catalogs",
  "categories",
  "category",
  "cdn",
  "cgi",
  "cgi-bin",
  "changelog",
  "chart",
  "charts",
  "chat",
  "check",
  "checked",
  "checking",
  "checkout",
  "client",
  "cliente",
  "clients",
  "clients1",
  "cnarne",
  "code",
  "comercial",
  "comment",
  "comments",
  "communities",
  "community",
  "company",
  "compare",
  "compras",
  "config",
  "configuration",
  "confirm",
  "confirmation",
  "connect",
  "contact",
  "contacts",
  "contactus",
  "contact-us",
  "contact_us",
  "content",
  "contest",
  "contribute",
  "contributor",
  "contributors",
  "coppa",
  "copyright",
  "copyrights",
  "core",
  "corp",
  "countries",
  "country",
  "cpanel",
  "create",
  "css",
  "cssproxy",
  "customise",
  "customize",
  "dashboard",
  "data",
  "db",
  "default",
  "delete",
  "demo",
  "design",
  "designer",
  "desktop",
  "destroy",
  "dev",
  "devel",
  "developer",
  "developers",
  "devs",
  "diagram",
  "diary",
  "dict",
  "dictionary",
  "die",
  "dir",
  "directory",
  "direct_messages",
  "direct-messages",
  "dist",
  "diversity",
  "dl",
  "dmca",
  "doc",
  "docs",
  "documentation",
  "documentations",
  "documents",
  "domain",
  "domains",
  "donate",
  "download",
  "downloads",
  "e",
  "e-mail",
  "earth",
  "ecommerce",
  "edit",
  "edits",
  "editor",
  "edu",
  "education",
  "email",
  "embed",
  "embedded",
  "employment",
  "employments",
  "empty",
  "enable",
  "encrypted",
  "end",
  "engine",
  "enterprise",
  "enterprises",
  "entries",
  "entry",
  "error",
  "errorlog",
  "errors",
  "eval",
  "event",
  "example",
  "examplecommunity",
  "exampleopenid",
  "examplesyn",
  "examplesyndicated",
  "exampleusername",
  "exchange",
  "exit",
  "explore",
  "faq",
  "faqs",
  "favorite",
  "favorites",
  "favourite",
  "favourites",
  "feature",
  "features",
  "feed",
  "feedback",
  "feedburner",
  "feedproxy",
  "feeds",
  "file",
  "files",
  "finance",
  "folder",
  "folders",
  "first",
  "following",
  "forgot",
  "form",
  "forms",
  "forum",
  "forums",
  "founder",
  "free",
  "friend",
  "friends",
  "ftp",
  "fuck",
  "fun",
  "fusion",
  "gadget",
  "gadgets",
  "game",
  "games",
  "gears",
  "general",
  "geographic",
  "get",
  "gettingstarted",
  "gift",
  "gifts",
  "gist",
  "git",
  "github",
  "gmail",
  "go",
  "golang",
  "goto",
  "gov",
  "graph",
  "graphs",
  "group",
  "groups",
  "guest",
  "guests",
  "guide",
  "guides",
  "hack",
  "hacks",
  "head",
  "help",
  "home",
  "homepage",
  "host",
  "hosting",
  "hostmaster",
  "hostname",
  "howto",
  "how-to",
  "how_to",
  "html",
  "htrnl",
  "http",
  "httpd",
  "https",
  "i",
  "iamges",
  "icon",
  "icons",
  "id",
  "idea",
  "ideas",
  "im",
  "image",
  "images",
  "img",
  "imap",
  "inbox",
  "inboxes",
  "index",
  "indexes",
  "info",
  "information",
  "inquiry",
  "intranet",
  "investor",
  "investors",
  "invitation",
  "invitations",
  "invite",
  "invoice",
  "invoices",
  "imac",
  "ios",
  "ipad",
  "iphone",
  "irc",
  "irnages",
  "irng",
  "is",
  "issue",
  "issues",
  "it",
  "item",
  "items",
  "java",
  "javascript",
  "job",
  "jobs",
  "join",
  "js",
  "json",
  "jump",
  "kb",
  "knowledge-base",
  "knowledgebase",
  "lab",
  "labs",
  "language",
  "languages",
  "last",
  "ldap_status",
  "ldap-status",
  "ldapstatus",
  "legal",
  "license",
  "licenses",
  "link",
  "links",
  "linux",
  "list",
  "lists",
  "livejournal",
  "lj",
  "local",
  "locale",
  "location",
  "log",
  "log-in",
  "log-out",
  "login",
  "logout",
  "logs",
  "log_in",
  "log_out",
  "m",
  "mac",
  "macos",
  "macosx",
  "mac-os",
  "mac-os-x",
  "mac_os_x",
  "mail",
  "mailer",
  "mailing",
  "main",
  "maintenance",
  "manage",
  "manager",
  "manual",
  "map",
  "maps",
  "marketing",
  "master",
  "me",
  "media",
  "member",
  "members",
  "memories",
  "memory",
  "merchandise",
  "message",
  "messages",
  "messenger",
  "mg",
  "microblog",
  "microblogs",
  "mine",
  "mis",
  "misc",
  "mms",
  "mob",
  "mobile",
  "model",
  "models",
  "money",
  "movie",
  "movies",
  "mp3",
  "mp4",
  "msg",
  "msn",
  "music",
  "mx",
  "my",
  "mymme",
  "mysql",
  "name",
  "named",
  "nan",
  "navi",
  "navigation",
  "net",
  "network",
  "networks",
  "new",
  "news",
  "newsletter",
  "nick",
  "nickname",
  "nil",
  "none",
  "notes",
  "noticias",
  "notification",
  "notifications",
  "notify",
  "ns",
  "ns1",
  "ns2",
  "ns3",
  "ns4",
  "ns5",
  "null",
  "oauth",
  "oauth-clients",
  "oauth_clients",
  "ocsp",
  "offer",
  "offers",
  "official",
  "old",
  "online",
  "openid",
  "operator",
  "option",
  "options",
  "order",
  "orders",
  "org",
  "organization",
  "organizations",
  "other",
  "overview",
  "owner",
  "owners",
  "p0rn",
  "pack",
  "page",
  "pager",
  "pages",
  "paid",
  "panel",
  "partner",
  "partnerpage",
  "partners",
  "password",
  "patch",
  "pay",
  "payment",
  "people",
  "perl",
  "person",
  "phone",
  "photo",
  "photoalbum",
  "photos",
  "php",
  "phpmyadmin",
  "phppgadmin",
  "phpredisadmin",
  "pic",
  "pics",
  "picture",
  "pictures",
  "ping",
  "pixel",
  "places",
  "plan",
  "plans",
  "plugin",
  "plugins",
  "podcasts",
  "policies",
  "policy",
  "pop",
  "pop3",
  "popular",
  "porn",
  "portal",
  "portals",
  "post",
  "postfix",
  "postmaster",
  "posts",
  "pr",
  "pr0n",
  "premium",
  "press",
  "price",
  "pricing",
  "principles",
  "print",
  "privacy",
  "privacy-policy",
  "privacypolicy",
  "privacy_policy",
  "private",
  "prod",
  "product",
  "production",
  "products",
  "profile",
  "profiles",
  "project",
  "projects",
  "promo",
  "promotions",
  "proxies",
  "proxy",
  "pub",
  "public",
  "purchase",
  "purpose",
  "put",
  "python",
  "queries",
  "query",
  "radio",
  "random",
  "ranking",
  "read",
  "reader",
  "readme",
  "recent",
  "recruit",
  "recruitment",
  "redirect",
  "register",
  "registration",
  "release",
  "remove",
  "replies",
  "report",
  "reports",
  "repositories",
  "repository",
  "req",
  "request",
  "requests",
  "research",
  "reset",
  "resolve",
  "resolver",
  "review",
  "rnail",
  "rnicrosoft",
  "roc",
  "root",
  "rss",
  "ruby",
  "rule",
  "sag",
  "sale",
  "sales",
  "sample",
  "samples",
  "sandbox",
  "save",
  "scholar",
  "school",
  "schools",
  "script",
  "scripts",
  "search",
  "secure",
  "security",
  "self",
  "seminars",
  "send",
  "server",
  "server-info",
  "server_info",
  "server-status",
  "server_status",
  "servers",
  "service",
  "services",
  "session",
  "sessions",
  "setting",
  "settings",
  "setup",
  "share",
  "shop",
  "shopping",
  "shortcut",
  "shortcuts",
  "show",
  "sign-in",
  "sign-up",
  "signin",
  "signout",
  "signup",
  "sign_in",
  "sign_up",
  "site",
  "sitemap",
  "sitemaps",
  "sitenews",
  "sites",
  "sketchup",
  "sky",
  "slash",
  "slashinvoice",
  "slut",
  "smartphone",
  "sms",
  "smtp",
  "soap",
  "software",
  "sorry",
  "source",
  "spec",
  "special",
  "spreadsheet",
  "spreadsheets",
  "sql",
  "src",
  "srntp",
  "ssh",
  "ssl",
  "ssladmin",
  "ssladministrator",
  "sslwebmaster",
  "ssytem",
  "staff",
  "stage",
  "staging",
  "start",
  "stat",
  "state",
  "static",
  "statistics",
  "stats",
  "status",
  "store",
  "stores",
  "stories",
  "style",
  "styleguide",
  "styles",
  "stylesheet",
  "stylesheets",
  "subdomain",
  "subscribe",
  "subscription",
  "subscriptions",
  "suggest",
  "suggestqueries",
  "support",
  "survey",
  "surveys",
  "surveytool",
  "svn",
  "swf",
  "syn",
  "sync",
  "syndicated",
  "sys",
  "sysadmin",
  "sysadministrator",
  "sysadmins",
  "system",
  "tablet",
  "tablets",
  "tag",
  "tags",
  "talk",
  "talkgadget",
  "task",
  "tasks",
  "team",
  "teams",
  "tech",
  "telnet",
  "term",
  "terms",
  "terms-of-service",
  "termsofservice",
  "terms_of_service",
  "test",
  "testing",
  "tests",
  "text",
  "theme",
  "themes",
  "thread",
  "threads",
  "ticket",
  "tickets",
  "tmp",
  "todo",
  "to-do",
  "to_do",
  "toml",
  "tool",
  "toolbar",
  "toolbars",
  "tools",
  "top",
  "topic",
  "topics",
  "tos",
  "tour",
  "trac",
  "translate",
  "trace",
  "translation",
  "translations",
  "translator",
  "trends",
  "tutorial",
  "tux",
  "tv",
  "twitter",
  "txt",
  "ul",
  "undef",
  "unfollow",
  "unsubscribe",
  "update",
  "updates",
  "upgrade",
  "upgrades",
  "upi",
  "upload",
  "uploads",
  "url",
  "usage",
  "user",
  "username",
  "usernames",
  "users",
  "uuid",
  "validation",
  "validations",
  "ver",
  "version",
  "video",
  "videos",
  "video-stats",
  "visitor",
  "visitors",
  "voice",
  "volunteer",
  "volunteers",
  "w",
  "watch",
  "wave",
  "weather",
  "web",
  "webdisk",
  "webhook",
  "webhooks",
  "webmail",
  "webmaster",
  "webmasters",
  "webrnail",
  "website",
  "websites",
  "welcome",
  "whm",
  "whois",
  "widget",
  "widgets",
  "wifi",
  "wiki",
  "wikis",
  "win",
  "windows",
  "word",
  "work",
  "works",
  "workshop",
  "wpad",
  "ww",
  "wws",
  "www",
  "wwws",
  "wwww",
  "xfn",
  "xhtml",
  "xhtrnl",
  "xml",
  "xmpp",
  "xpg",
  "xxx",
  "yaml",
  "year",
  "yml",
  "you",
  "yourdomain",
  "yourname",
  "yoursite",
  "yourusername"
];
var famousAccounts = [
  "10ronaldinho",
  "3gerardpique",
  "adele",
  "akshaykumar",
  "aliaa08",
  "aliciakeys",
  "amitshah",
  "andresiniesta8",
  "anushkasharma",
  "arianagrande",
  "arrahman",
  "arvindkejriwal",
  "avrillavigne",
  "barackobama",
  "bbcbreaking",
  "bbcworld",
  "beingsalmankhan",
  "billgates",
  "britneyspears",
  "brunomars",
  "bts_bighit",
  "bts_twt",
  "championsleague",
  "chrisbrown",
  "cnnbrk",
  "coldplay",
  "conanobrien",
  "cristiano",
  "danieltosh",
  "davidguetta",
  "ddlovato",
  "deepikapadukone",
  "drake",
  "elisapie",
  "ellendegeneres",
  "elonmusk",
  "eminem",
  "emmawatson",
  "fcbarcelona",
  "foxnews",
  "harry_styles",
  "hillaryclinton",
  "iamsrk",
  "ihrithik",
  "imvkohli",
  "instagram",
  "jimmyfallon",
  "jlo",
  "joebiden",
  "jtimberlake",
  "justinbieber",
  "kaka",
  "kanyewest",
  "katyperry",
  "kendalljenner",
  "kevinhart4real",
  "khloekardashian",
  "kimkardashian",
  "kingjames",
  "kourtneykardash",
  "kyliejenner",
  "ladygaga",
  "liampayne",
  "liltunechi",
  "manutd",
  "mariahcarey",
  "mileycyrus",
  "mohamadalarefe",
  "narendramodi",
  "nasa",
  "nba",
  "neymarjr",
  "nfl",
  "niallofficial",
  "nickiminaj",
  "npr",
  "nytimes",
  "onedirection",
  "oprah",
  "pink",
  "pitbull",
  "playstation",
  "pmoindia",
  "premierleague",
  "priyankachopra",
  "realdonaldtrump",
  "ricky_martin",
  "rihanna",
  "sachin_rt",
  "selenagomez",
  "shakira",
  "shawnmendes",
  "sportscenter",
  "srbachchan",
  "subhisharma100",
  "taylorswift13",
  "theeconomist",
  "twitter",
  "virendersehwag",
  "whitehouse45",
  "wizkhalifa",
  "youtube",
  "zaynmalik",
  "beyonce",
  "billieeilish",
  "leomessi",
  "natgeo",
  "nike",
  "snoopdogg",
  "taylorswift",
  "therock",
  "10downingstreet",
  "aoc",
  "carterjwm",
  "dril",
  "gretathunberg",
  "kamalaharris",
  "kremlinrussia_e",
  "potus",
  "rondesantisfl",
  "ukraine",
  "washingtonpost",
  "yousuck2020",
  "zelenskyyua"
];
var reservedSubdomains = [
  ...atpSpecific,
  ...commonlyReserved,
  ...famousAccounts
].reduce((acc, cur) => {
  return {
    ...acc,
    [cur]: true
  };
}, {});

// ../identifier/src/handle.ts
var ensureValidHandle = (handle2) => {
  if (!/^[a-zA-Z0-9.-]*$/.test(handle2)) {
    throw new InvalidHandleError(
      "Disallowed characters in handle (ASCII letters, digits, dashes, periods only)"
    );
  }
  if (handle2.length > 253) {
    throw new InvalidHandleError("Handle is too long (253 chars max)");
  }
  const labels = handle2.split(".");
  if (labels.length < 2) {
    throw new InvalidHandleError("Handle domain needs at least two parts");
  }
  for (let i = 0; i < labels.length; i++) {
    const l = labels[i];
    if (l.length < 1) {
      throw new InvalidHandleError("Handle parts can not be empty");
    }
    if (l.length > 63) {
      throw new InvalidHandleError("Handle part too long (max 63 chars)");
    }
    if (l.endsWith("-") || l.startsWith("-")) {
      throw new InvalidHandleError(
        "Handle parts can not start or end with hyphens"
      );
    }
    if (i + 1 == labels.length && !/^[a-zA-Z]/.test(l)) {
      throw new InvalidHandleError(
        "Handle final component (TLD) must start with ASCII letter"
      );
    }
  }
};
var InvalidHandleError = class extends Error {
};

// ../identifier/src/did.ts
var ensureValidDid = (did2) => {
  if (!/^[a-zA-Z0-9._:%-]*$/.test(did2)) {
    throw new InvalidDidError(
      "Disallowed characters in DID (ASCII letters, digits, and a couple other characters only)"
    );
  }
  const parts = did2.split(":");
  if (parts.length < 3) {
    throw new InvalidDidError(
      "DID requires prefix, method, and method-specific content"
    );
  }
  if (parts[0] != "did") {
    throw new InvalidDidError('DID requires "did:" prefix');
  }
  if (!/^[a-z]+$/.test(parts[1])) {
    throw new InvalidDidError("DID method must be lower-case letters");
  }
  if (did2.endsWith(":") || did2.endsWith("%")) {
    throw new InvalidDidError('DID can not end with ":" or "%"');
  }
  if (did2.length > 8 * 1024) {
    throw new InvalidDidError("DID is far too long");
  }
};
var InvalidDidError = class extends Error {
};

// ../nsid/src/index.ts
var NSID = class {
  constructor(nsid2) {
    this.segments = [];
    ensureValidNsid(nsid2);
    this.segments = nsid2.split(".");
  }
  static parse(nsid2) {
    return new NSID(nsid2);
  }
  static create(authority, name2) {
    const segments = [...authority.split(".").reverse(), name2].join(".");
    return new NSID(segments);
  }
  static isValid(nsid2) {
    try {
      NSID.parse(nsid2);
      return true;
    } catch (e) {
      return false;
    }
  }
  get authority() {
    return this.segments.slice(0, this.segments.length - 1).reverse().join(".");
  }
  get name() {
    return this.segments.at(this.segments.length - 1);
  }
  toString() {
    return this.segments.join(".");
  }
};
var ensureValidNsid = (nsid2) => {
  const split = nsid2.split(".");
  const toCheck = split.at(-1) === "*" ? split.slice(0, -1).join(".") : split.join(".");
  if (!/^[a-zA-Z0-9.-]*$/.test(toCheck)) {
    throw new InvalidNsidError(
      "Disallowed characters in NSID (ASCII letters, digits, dashes, periods only)"
    );
  }
  if (toCheck.length > 253 + 1 + 128) {
    throw new InvalidNsidError("NSID is too long (382 chars max)");
  }
  const labels = toCheck.split(".");
  if (split.length < 3) {
    throw new InvalidNsidError("NSID needs at least three parts");
  }
  for (let i = 0; i < labels.length; i++) {
    const l = labels[i];
    if (l.length < 1) {
      throw new InvalidNsidError("NSID parts can not be empty");
    }
    if (l.length > 63 && i + 1 < labels.length) {
      throw new InvalidNsidError("NSID domain part too long (max 63 chars)");
    }
    if (l.length > 128 && i + 1 == labels.length) {
      throw new InvalidNsidError("NSID name part too long (max 127 chars)");
    }
    if (l.endsWith("-")) {
      throw new InvalidNsidError("NSID parts can not end with hyphen");
    }
    if (!/^[a-zA-Z]/.test(l)) {
      throw new InvalidNsidError("NSID parts must start with ASCII letter");
    }
  }
};
var InvalidNsidError = class extends Error {
};

// ../uri/src/validation.ts
var ensureValidAtUri = (uri2) => {
  const uriParts = uri2.split("#");
  if (uriParts.length > 2) {
    throw new Error('ATURI can have at most one "#", separating fragment out');
  }
  const fragmentPart = uriParts[1] || null;
  uri2 = uriParts[0];
  if (!/^[a-zA-Z0-9._~:@!$&')(*+,;=%/-]*$/.test(uri2)) {
    throw new Error("Disallowed characters in ATURI (ASCII)");
  }
  const parts = uri2.split("/");
  if (parts.length >= 3 && (parts[0] != "at:" || parts[1].length != 0)) {
    throw new Error('ATURI must start with "at://"');
  }
  if (parts.length < 3) {
    throw new Error("ATURI requires at least method and authority sections");
  }
  try {
    ensureValidHandle(parts[2]);
  } catch {
    try {
      ensureValidDid(parts[2]);
    } catch {
      throw new Error("ATURI authority must be a valid handle or DID");
    }
  }
  if (parts.length >= 4) {
    if (parts[3].length == 0) {
      throw new Error(
        "ATURI can not have a slash after authority without a path segment"
      );
    }
    try {
      ensureValidNsid(parts[3]);
    } catch {
      throw new Error(
        "ATURI requires first path segment (if supplied) to be valid NSID"
      );
    }
  }
  if (parts.length >= 5) {
    if (parts[4].length == 0) {
      throw new Error(
        "ATURI can not have a slash after collection, unless record key is provided"
      );
    }
  }
  if (parts.length >= 6) {
    throw new Error(
      "ATURI path can have at most two parts, and no trailing slash"
    );
  }
  if (uriParts.length >= 2 && fragmentPart == null) {
    throw new Error("ATURI fragment must be non-empty and start with slash");
  }
  if (fragmentPart != null) {
    if (fragmentPart.length == 0 || fragmentPart[0] != "/") {
      throw new Error("ATURI fragment must be non-empty and start with slash");
    }
    if (!/^\/[a-zA-Z0-9._~:@!$&')(*+,;=%[\]/-]*$/.test(fragmentPart)) {
      throw new Error("Disallowed characters in ATURI fragment (ASCII)");
    }
  }
  if (uri2.length > 8 * 1024) {
    throw new Error("ATURI is far too long");
  }
};

// ../uri/src/index.ts
var ATP_URI_REGEX = /^(at:\/\/)?((?:did:[a-z0-9:%-]+)|(?:[a-z0-9][a-z0-9.:-]*))(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i;
var RELATIVE_REGEX = /^(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i;
var AtUri = class {
  constructor(uri2, base3) {
    let parsed;
    if (base3) {
      parsed = parse(base3);
      if (!parsed) {
        throw new Error(`Invalid at uri: ${base3}`);
      }
      const relativep = parseRelative(uri2);
      if (!relativep) {
        throw new Error(`Invalid path: ${uri2}`);
      }
      Object.assign(parsed, relativep);
    } else {
      parsed = parse(uri2);
      if (!parsed) {
        throw new Error(`Invalid at uri: ${uri2}`);
      }
    }
    this.hash = parsed.hash;
    this.host = parsed.host;
    this.pathname = parsed.pathname;
    this.searchParams = parsed.searchParams;
  }
  static make(handleOrDid, collection, rkey) {
    let str = handleOrDid;
    if (collection)
      str += "/" + collection;
    if (rkey)
      str += "/" + rkey;
    return new AtUri(str);
  }
  get protocol() {
    return "at:";
  }
  get origin() {
    return `at://${this.host}`;
  }
  get hostname() {
    return this.host;
  }
  set hostname(v) {
    this.host = v;
  }
  get search() {
    return this.searchParams.toString();
  }
  set search(v) {
    this.searchParams = new URLSearchParams(v);
  }
  get collection() {
    return this.pathname.split("/").filter(Boolean)[0] || "";
  }
  set collection(v) {
    const parts = this.pathname.split("/").filter(Boolean);
    parts[0] = v;
    this.pathname = parts.join("/");
  }
  get rkey() {
    return this.pathname.split("/").filter(Boolean)[1] || "";
  }
  set rkey(v) {
    const parts = this.pathname.split("/").filter(Boolean);
    if (!parts[0])
      parts[0] = "undefined";
    parts[1] = v;
    this.pathname = parts.join("/");
  }
  get href() {
    return this.toString();
  }
  toString() {
    let path = this.pathname || "/";
    if (!path.startsWith("/")) {
      path = `/${path}`;
    }
    let qs = this.searchParams.toString();
    if (qs && !qs.startsWith("?")) {
      qs = `?${qs}`;
    }
    let hash = this.hash;
    if (hash && !hash.startsWith("#")) {
      hash = `#${hash}`;
    }
    return `at://${this.host}${path}${qs}${hash}`;
  }
};
function parse(str) {
  const match = ATP_URI_REGEX.exec(str);
  if (match) {
    return {
      hash: match[5] || "",
      host: match[2] || "",
      pathname: match[3] || "",
      searchParams: new URLSearchParams(match[4] || "")
    };
  }
  return void 0;
}
function parseRelative(str) {
  const match = RELATIVE_REGEX.exec(str);
  if (match) {
    return {
      hash: match[3] || "",
      pathname: match[1] || "",
      searchParams: new URLSearchParams(match[2] || "")
    };
  }
  return void 0;
}

// ../lexicon/src/types.ts
var lexBoolean = mod.object({
  type: mod.literal("boolean"),
  description: mod.string().optional(),
  default: mod.boolean().optional(),
  const: mod.boolean().optional()
});
var lexInteger = mod.object({
  type: mod.literal("integer"),
  description: mod.string().optional(),
  default: mod.number().int().optional(),
  minimum: mod.number().int().optional(),
  maximum: mod.number().int().optional(),
  enum: mod.number().int().array().optional(),
  const: mod.number().int().optional()
});
var lexStringFormat = mod.enum([
  "datetime",
  "uri",
  "at-uri",
  "did",
  "handle",
  "at-identifier",
  "nsid",
  "cid"
]);
var lexString = mod.object({
  type: mod.literal("string"),
  format: lexStringFormat.optional(),
  description: mod.string().optional(),
  default: mod.string().optional(),
  minLength: mod.number().int().optional(),
  maxLength: mod.number().int().optional(),
  minGraphemes: mod.number().int().optional(),
  maxGraphemes: mod.number().int().optional(),
  enum: mod.string().array().optional(),
  const: mod.string().optional(),
  knownValues: mod.string().array().optional()
});
var lexUnknown = mod.object({
  type: mod.literal("unknown"),
  description: mod.string().optional()
});
var lexPrimitive = mod.union([
  lexBoolean,
  lexInteger,
  lexString,
  lexUnknown
]);
var lexBytes = mod.object({
  type: mod.literal("bytes"),
  description: mod.string().optional(),
  maxLength: mod.number().optional(),
  minLength: mod.number().optional()
});
var lexCidLink = mod.object({
  type: mod.literal("cid-link"),
  description: mod.string().optional()
});
var lexIpldType = mod.union([lexBytes, lexCidLink]);
var lexRef = mod.object({
  type: mod.literal("ref"),
  description: mod.string().optional(),
  ref: mod.string()
});
var lexRefUnion = mod.object({
  type: mod.literal("union"),
  description: mod.string().optional(),
  refs: mod.string().array(),
  closed: mod.boolean().optional()
});
var lexRefVariant = mod.union([lexRef, lexRefUnion]);
var lexBlob = mod.object({
  type: mod.literal("blob"),
  description: mod.string().optional(),
  accept: mod.string().array().optional(),
  maxSize: mod.number().optional()
});
var lexArray = mod.object({
  type: mod.literal("array"),
  description: mod.string().optional(),
  items: mod.union([lexPrimitive, lexIpldType, lexBlob, lexRefVariant]),
  minLength: mod.number().int().optional(),
  maxLength: mod.number().int().optional()
});
var lexPrimitiveArray = lexArray.merge(
  mod.object({
    items: lexPrimitive
  })
);
var lexToken = mod.object({
  type: mod.literal("token"),
  description: mod.string().optional()
});
var lexObject = mod.object({
  type: mod.literal("object"),
  description: mod.string().optional(),
  required: mod.string().array().optional(),
  nullable: mod.string().array().optional(),
  properties: mod.record(
    mod.union([lexRefVariant, lexIpldType, lexArray, lexBlob, lexPrimitive])
  ).optional()
});
var lexXrpcParameters = mod.object({
  type: mod.literal("params"),
  description: mod.string().optional(),
  required: mod.string().array().optional(),
  properties: mod.record(mod.union([lexPrimitive, lexPrimitiveArray]))
});
var lexXrpcBody = mod.object({
  description: mod.string().optional(),
  encoding: mod.string(),
  schema: mod.union([lexRefVariant, lexObject]).optional()
});
var lexXrpcSubscriptionMessage = mod.object({
  description: mod.string().optional(),
  schema: mod.union([lexRefVariant, lexObject]).optional()
});
var lexXrpcError = mod.object({
  name: mod.string(),
  description: mod.string().optional()
});
var lexXrpcQuery = mod.object({
  type: mod.literal("query"),
  description: mod.string().optional(),
  parameters: lexXrpcParameters.optional(),
  output: lexXrpcBody.optional(),
  errors: lexXrpcError.array().optional()
});
var lexXrpcProcedure = mod.object({
  type: mod.literal("procedure"),
  description: mod.string().optional(),
  parameters: lexXrpcParameters.optional(),
  input: lexXrpcBody.optional(),
  output: lexXrpcBody.optional(),
  errors: lexXrpcError.array().optional()
});
var lexXrpcSubscription = mod.object({
  type: mod.literal("subscription"),
  description: mod.string().optional(),
  parameters: lexXrpcParameters.optional(),
  message: lexXrpcSubscriptionMessage.optional(),
  infos: lexXrpcError.array().optional(),
  errors: lexXrpcError.array().optional()
});
var lexRecord = mod.object({
  type: mod.literal("record"),
  description: mod.string().optional(),
  key: mod.string().optional(),
  record: lexObject
});
var lexUserType = mod.union([
  lexRecord,
  lexXrpcQuery,
  lexXrpcProcedure,
  lexXrpcSubscription,
  lexBlob,
  lexArray,
  lexToken,
  lexObject,
  lexBoolean,
  lexInteger,
  lexString,
  lexBytes,
  lexCidLink,
  lexUnknown
]);
var lexiconDoc = mod.object({
  lexicon: mod.literal(1),
  id: mod.string().refine((v) => NSID.isValid(v), {
    message: "Must be a valid NSID"
  }),
  revision: mod.number().optional(),
  description: mod.string().optional(),
  defs: mod.record(lexUserType)
}).superRefine((doc, ctx) => {
  for (const defId in doc.defs) {
    const def2 = doc.defs[defId];
    if (defId !== "main" && (def2.type === "record" || def2.type === "procedure" || def2.type === "query" || def2.type === "subscription")) {
      ctx.addIssue({
        code: mod.ZodIssueCode.custom,
        message: `Records, procedures, queries, and subscriptions must be the main definition.`
      });
    }
  }
});
function isObj(obj) {
  return obj !== null && typeof obj === "object";
}
function hasProp(data, prop) {
  return prop in data;
}
var discriminatedObject = mod.object({ $type: mod.string() });
function isDiscriminatedObject(value) {
  return discriminatedObject.safeParse(value).success;
}
var LexiconDocMalformedError = class extends Error {
  constructor(message, schemaDef, issues) {
    super(message);
    this.schemaDef = schemaDef;
    this.issues = issues;
    this.schemaDef = schemaDef;
    this.issues = issues;
  }
};
var ValidationError = class extends Error {
};
var InvalidLexiconError = class extends Error {
};
var LexiconDefNotFoundError = class extends Error {
};

// ../lexicon/src/validators/formats.ts
var import_iso_datestring_validator = __toESM(require_dist());
function datetime(path, value) {
  try {
    if (!(0, import_iso_datestring_validator.isValidISODateString)(value)) {
      throw new Error();
    }
  } catch {
    return {
      success: false,
      error: new ValidationError(
        `${path} must be an iso8601 formatted datetime`
      )
    };
  }
  return { success: true, value };
}
function uri(path, value) {
  const isUri = value.match(/^\w+:(?:\/\/)?[^\s/][^\s]*$/) !== null;
  if (!isUri) {
    return {
      success: false,
      error: new ValidationError(`${path} must be a uri`)
    };
  }
  return { success: true, value };
}
function atUri(path, value) {
  try {
    ensureValidAtUri(value);
  } catch {
    return {
      success: false,
      error: new ValidationError(`${path} must be a valid at-uri`)
    };
  }
  return { success: true, value };
}
function did(path, value) {
  try {
    ensureValidDid(value);
  } catch {
    return {
      success: false,
      error: new ValidationError(`${path} must be a valid did`)
    };
  }
  return { success: true, value };
}
function handle(path, value) {
  try {
    ensureValidHandle(value);
  } catch {
    return {
      success: false,
      error: new ValidationError(`${path} must be a valid handle`)
    };
  }
  return { success: true, value };
}
function atIdentifier(path, value) {
  const isDid = did(path, value);
  if (!isDid.success) {
    const isHandle2 = handle(path, value);
    if (!isHandle2.success) {
      return {
        success: false,
        error: new ValidationError(`${path} must be a valid did or a handle`)
      };
    }
  }
  return { success: true, value };
}
function nsid(path, value) {
  try {
    ensureValidNsid(value);
  } catch {
    return {
      success: false,
      error: new ValidationError(`${path} must be a valid nsid`)
    };
  }
  return { success: true, value };
}
function cid(path, value) {
  try {
    CID.parse(value);
  } catch {
    return {
      success: false,
      error: new ValidationError(`${path} must be a cid string`)
    };
  }
  return { success: true, value };
}

// ../lexicon/src/validators/primitives.ts
function validate(lexicons2, path, def2, value) {
  switch (def2.type) {
    case "boolean":
      return boolean(lexicons2, path, def2, value);
    case "integer":
      return integer(lexicons2, path, def2, value);
    case "string":
      return string2(lexicons2, path, def2, value);
    case "bytes":
      return bytes(lexicons2, path, def2, value);
    case "cid-link":
      return cidLink(lexicons2, path, def2, value);
    case "unknown":
      return unknown(lexicons2, path, def2, value);
    default:
      return {
        success: false,
        error: new ValidationError(`Unexpected lexicon type: ${def2.type}`)
      };
  }
}
function boolean(lexicons2, path, def2, value) {
  def2 = def2;
  const type = typeof value;
  if (type === "undefined") {
    if (typeof def2.default === "boolean") {
      return { success: true, value: def2.default };
    }
    return {
      success: false,
      error: new ValidationError(`${path} must be a boolean`)
    };
  } else if (type !== "boolean") {
    return {
      success: false,
      error: new ValidationError(`${path} must be a boolean`)
    };
  }
  if (typeof def2.const === "boolean") {
    if (value !== def2.const) {
      return {
        success: false,
        error: new ValidationError(`${path} must be ${def2.const}`)
      };
    }
  }
  return { success: true, value };
}
function integer(lexicons2, path, def2, value) {
  def2 = def2;
  const type = typeof value;
  if (type === "undefined") {
    if (typeof def2.default === "number") {
      return { success: true, value: def2.default };
    }
    return {
      success: false,
      error: new ValidationError(`${path} must be an integer`)
    };
  } else if (!Number.isInteger(value)) {
    return {
      success: false,
      error: new ValidationError(`${path} must be an integer`)
    };
  }
  if (typeof def2.const === "number") {
    if (value !== def2.const) {
      return {
        success: false,
        error: new ValidationError(`${path} must be ${def2.const}`)
      };
    }
  }
  if (Array.isArray(def2.enum)) {
    if (!def2.enum.includes(value)) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must be one of (${def2.enum.join("|")})`
        )
      };
    }
  }
  if (typeof def2.maximum === "number") {
    if (value > def2.maximum) {
      return {
        success: false,
        error: new ValidationError(
          `${path} can not be greater than ${def2.maximum}`
        )
      };
    }
  }
  if (typeof def2.minimum === "number") {
    if (value < def2.minimum) {
      return {
        success: false,
        error: new ValidationError(
          `${path} can not be less than ${def2.minimum}`
        )
      };
    }
  }
  return { success: true, value };
}
function string2(lexicons2, path, def2, value) {
  def2 = def2;
  if (typeof value === "undefined") {
    if (typeof def2.default === "string") {
      return { success: true, value: def2.default };
    }
    return {
      success: false,
      error: new ValidationError(`${path} must be a string`)
    };
  } else if (typeof value !== "string") {
    return {
      success: false,
      error: new ValidationError(`${path} must be a string`)
    };
  }
  if (typeof def2.const === "string") {
    if (value !== def2.const) {
      return {
        success: false,
        error: new ValidationError(`${path} must be ${def2.const}`)
      };
    }
  }
  if (Array.isArray(def2.enum)) {
    if (!def2.enum.includes(value)) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must be one of (${def2.enum.join("|")})`
        )
      };
    }
  }
  if (typeof def2.maxLength === "number") {
    if (utf8Len(value) > def2.maxLength) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not be longer than ${def2.maxLength} characters`
        )
      };
    }
  }
  if (typeof def2.minLength === "number") {
    if (utf8Len(value) < def2.minLength) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not be shorter than ${def2.minLength} characters`
        )
      };
    }
  }
  if (typeof def2.maxGraphemes === "number") {
    if (graphemeLen(value) > def2.maxGraphemes) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not be longer than ${def2.maxGraphemes} graphemes`
        )
      };
    }
  }
  if (typeof def2.minGraphemes === "number") {
    if (graphemeLen(value) < def2.minGraphemes) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not be shorter than ${def2.minGraphemes} graphemes`
        )
      };
    }
  }
  if (typeof def2.format === "string") {
    switch (def2.format) {
      case "datetime":
        return datetime(path, value);
      case "uri":
        return uri(path, value);
      case "at-uri":
        return atUri(path, value);
      case "did":
        return did(path, value);
      case "handle":
        return handle(path, value);
      case "at-identifier":
        return atIdentifier(path, value);
      case "nsid":
        return nsid(path, value);
      case "cid":
        return cid(path, value);
    }
  }
  return { success: true, value };
}
function bytes(lexicons2, path, def2, value) {
  def2 = def2;
  if (!value || !(value instanceof Uint8Array)) {
    return {
      success: false,
      error: new ValidationError(`${path} must be a byte array`)
    };
  }
  if (typeof def2.maxLength === "number") {
    if (value.byteLength > def2.maxLength) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not be larger than ${def2.maxLength} bytes`
        )
      };
    }
  }
  if (typeof def2.minLength === "number") {
    if (value.byteLength < def2.minLength) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not be smaller than ${def2.minLength} bytes`
        )
      };
    }
  }
  return { success: true, value };
}
function cidLink(lexicons2, path, def2, value) {
  if (CID.asCID(value) === null) {
    return {
      success: false,
      error: new ValidationError(`${path} must be a CID`)
    };
  }
  return { success: true, value };
}
function unknown(lexicons2, path, def2, value) {
  if (!value || typeof value !== "object") {
    return {
      success: false,
      error: new ValidationError(`${path} must be an object`)
    };
  }
  return { success: true, value };
}

// ../lexicon/src/blob-refs.ts
var typedJsonBlobRef = mod.object({
  $type: mod.literal("blob"),
  ref: schema.cid,
  mimeType: mod.string(),
  size: mod.number()
}).strict();
var untypedJsonBlobRef = mod.object({
  cid: mod.string(),
  mimeType: mod.string()
}).strict();
var jsonBlobRef = mod.union([typedJsonBlobRef, untypedJsonBlobRef]);
var BlobRef = class {
  constructor(ref, mimeType, size, original) {
    this.ref = ref;
    this.mimeType = mimeType;
    this.size = size;
    this.original = original ?? {
      $type: "blob",
      ref,
      mimeType,
      size
    };
  }
  static asBlobRef(obj) {
    if (check_exports.is(obj, jsonBlobRef)) {
      return BlobRef.fromJsonRef(obj);
    }
    return null;
  }
  static fromJsonRef(json) {
    if (check_exports.is(json, typedJsonBlobRef)) {
      return new BlobRef(json.ref, json.mimeType, json.size);
    } else {
      return new BlobRef(CID.parse(json.cid), json.mimeType, -1, json);
    }
  }
  ipld() {
    return {
      $type: "blob",
      ref: this.ref,
      mimeType: this.mimeType,
      size: this.size
    };
  }
  toJSON() {
    return ipldToJson(this.ipld());
  }
};

// ../lexicon/src/validators/blob.ts
function blob(lexicons2, path, def2, value) {
  if (!value || !(value instanceof BlobRef)) {
    return {
      success: false,
      error: new ValidationError(`${path} should be a blob ref`)
    };
  }
  return { success: true, value };
}

// ../lexicon/src/validators/complex.ts
function validate2(lexicons2, path, def2, value) {
  switch (def2.type) {
    case "boolean":
      return boolean(lexicons2, path, def2, value);
    case "integer":
      return integer(lexicons2, path, def2, value);
    case "string":
      return string2(lexicons2, path, def2, value);
    case "bytes":
      return bytes(lexicons2, path, def2, value);
    case "cid-link":
      return cidLink(lexicons2, path, def2, value);
    case "unknown":
      return unknown(lexicons2, path, def2, value);
    case "object":
      return object(lexicons2, path, def2, value);
    case "array":
      return array(lexicons2, path, def2, value);
    case "blob":
      return blob(lexicons2, path, def2, value);
    default:
      return {
        success: false,
        error: new ValidationError(`Unexpected lexicon type: ${def2.type}`)
      };
  }
}
function array(lexicons2, path, def2, value) {
  if (!Array.isArray(value)) {
    return {
      success: false,
      error: new ValidationError(`${path} must be an array`)
    };
  }
  if (typeof def2.maxLength === "number") {
    if (value.length > def2.maxLength) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not have more than ${def2.maxLength} elements`
        )
      };
    }
  }
  if (typeof def2.minLength === "number") {
    if (value.length < def2.minLength) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not have fewer than ${def2.minLength} elements`
        )
      };
    }
  }
  const itemsDef = def2.items;
  for (let i = 0; i < value.length; i++) {
    const itemValue = value[i];
    const itemPath = `${path}/${i}`;
    const res = validateOneOf(lexicons2, itemPath, itemsDef, itemValue);
    if (!res.success) {
      return res;
    }
  }
  return { success: true, value };
}
function object(lexicons2, path, def2, value) {
  def2 = def2;
  if (!value || typeof value !== "object") {
    return {
      success: false,
      error: new ValidationError(`${path} must be an object`)
    };
  }
  const requiredProps = new Set(def2.required);
  const nullableProps = new Set(def2.nullable);
  let resultValue = value;
  if (typeof def2.properties === "object") {
    for (const key in def2.properties) {
      if (value[key] === null && nullableProps.has(key)) {
        continue;
      }
      const propDef = def2.properties[key];
      const propPath = `${path}/${key}`;
      const validated = validateOneOf(lexicons2, propPath, propDef, value[key]);
      const propValue = validated.success ? validated.value : value[key];
      const propIsUndefined = typeof propValue === "undefined";
      if (propIsUndefined && requiredProps.has(key)) {
        return {
          success: false,
          error: new ValidationError(`${path} must have the property "${key}"`)
        };
      } else if (!propIsUndefined && !validated.success) {
        return validated;
      }
      if (propValue !== value[key]) {
        if (resultValue === value) {
          resultValue = { ...value };
        }
        resultValue[key] = propValue;
      }
    }
  }
  return { success: true, value: resultValue };
}

// ../lexicon/src/util.ts
function toLexUri(str, baseUri) {
  if (str.startsWith("lex:")) {
    return str;
  }
  if (str.startsWith("#")) {
    if (!baseUri) {
      throw new Error(`Unable to resolve uri without anchor: ${str}`);
    }
    return `${baseUri}${str}`;
  }
  return `lex:${str}`;
}
function validateOneOf(lexicons2, path, def2, value, mustBeObj = false) {
  let error;
  let concreteDefs;
  if (def2.type === "union") {
    if (!isDiscriminatedObject(value)) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must be an object which includes the "$type" property`
        )
      };
    }
    if (!def2.refs.includes(toLexUri(value.$type))) {
      if (def2.closed) {
        return {
          success: false,
          error: new ValidationError(
            `${path} $type must be one of ${def2.refs.join(", ")}`
          )
        };
      }
      return { success: true, value };
    } else {
      concreteDefs = toConcreteTypes(lexicons2, {
        type: "ref",
        ref: value.$type
      });
    }
  } else {
    concreteDefs = toConcreteTypes(lexicons2, def2);
  }
  for (const concreteDef of concreteDefs) {
    const result = mustBeObj ? object(lexicons2, path, concreteDef, value) : validate2(lexicons2, path, concreteDef, value);
    if (result.success) {
      return result;
    }
    error ?? (error = result.error);
  }
  if (concreteDefs.length > 1) {
    return {
      success: false,
      error: new ValidationError(
        `${path} did not match any of the expected definitions`
      )
    };
  }
  return { success: false, error };
}
function assertValidOneOf(lexicons2, path, def2, value, mustBeObj = false) {
  const res = validateOneOf(lexicons2, path, def2, value, mustBeObj);
  if (!res.success)
    throw res.error;
  return res.value;
}
function toConcreteTypes(lexicons2, def2) {
  if (def2.type === "ref") {
    return [lexicons2.getDefOrThrow(def2.ref)];
  } else if (def2.type === "union") {
    return def2.refs.map((ref) => lexicons2.getDefOrThrow(ref)).flat();
  } else {
    return [def2];
  }
}

// ../lexicon/src/validators/xrpc.ts
function params(lexicons2, path, def2, val) {
  const value = val && typeof val === "object" ? val : {};
  const requiredProps = new Set(def2.required ?? []);
  let resultValue = value;
  if (typeof def2.properties === "object") {
    for (const key in def2.properties) {
      const propDef = def2.properties[key];
      const validated = propDef.type === "array" ? array(lexicons2, key, propDef, value[key]) : validate(lexicons2, key, propDef, value[key]);
      const propValue = validated.success ? validated.value : value[key];
      const propIsUndefined = typeof propValue === "undefined";
      if (propIsUndefined && requiredProps.has(key)) {
        return {
          success: false,
          error: new ValidationError(`${path} must have the property "${key}"`)
        };
      } else if (!propIsUndefined && !validated.success) {
        return validated;
      }
      if (propValue !== value[key]) {
        if (resultValue === value) {
          resultValue = { ...value };
        }
        resultValue[key] = propValue;
      }
    }
  }
  return { success: true, value: resultValue };
}

// ../lexicon/src/validation.ts
function assertValidRecord(lexicons2, def2, value) {
  const res = object(lexicons2, "Record", def2.record, value);
  if (!res.success)
    throw res.error;
  return res.value;
}
function assertValidXrpcParams(lexicons2, def2, value) {
  if (def2.parameters) {
    const res = params(lexicons2, "Params", def2.parameters, value);
    if (!res.success)
      throw res.error;
    return res.value;
  }
}
function assertValidXrpcInput(lexicons2, def2, value) {
  if (def2.input?.schema) {
    return assertValidOneOf(lexicons2, "Input", def2.input.schema, value, true);
  }
}
function assertValidXrpcOutput(lexicons2, def2, value) {
  if (def2.output?.schema) {
    return assertValidOneOf(lexicons2, "Output", def2.output.schema, value, true);
  }
}
function assertValidXrpcMessage(lexicons2, def2, value) {
  if (def2.message?.schema) {
    return assertValidOneOf(
      lexicons2,
      "Message",
      def2.message.schema,
      value,
      true
    );
  }
}

// ../lexicon/src/lexicons.ts
var Lexicons = class {
  constructor(docs) {
    this.docs = /* @__PURE__ */ new Map();
    this.defs = /* @__PURE__ */ new Map();
    if (docs?.length) {
      for (const doc of docs) {
        this.add(doc);
      }
    }
  }
  add(doc) {
    try {
      lexiconDoc.parse(doc);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new LexiconDocMalformedError(
          `Failed to parse schema definition ${doc.id}`,
          doc,
          e.issues
        );
      } else {
        throw e;
      }
    }
    const validatedDoc = doc;
    const uri2 = toLexUri(validatedDoc.id);
    if (this.docs.has(uri2)) {
      throw new Error(`${uri2} has already been registered`);
    }
    resolveRefUris(validatedDoc, uri2);
    this.docs.set(uri2, validatedDoc);
    for (const [defUri, def2] of iterDefs(validatedDoc)) {
      this.defs.set(defUri, def2);
    }
  }
  remove(uri2) {
    uri2 = toLexUri(uri2);
    const doc = this.docs.get(uri2);
    if (!doc) {
      throw new Error(`Unable to remove "${uri2}": does not exist`);
    }
    for (const [defUri, _def] of iterDefs(doc)) {
      this.defs.delete(defUri);
    }
    this.docs.delete(uri2);
  }
  get(uri2) {
    uri2 = toLexUri(uri2);
    return this.docs.get(uri2);
  }
  getDef(uri2) {
    uri2 = toLexUri(uri2);
    return this.defs.get(uri2);
  }
  getDefOrThrow(uri2, types) {
    const def2 = this.getDef(uri2);
    if (!def2) {
      throw new LexiconDefNotFoundError(`Lexicon not found: ${uri2}`);
    }
    if (types && !types.includes(def2.type)) {
      throw new InvalidLexiconError(
        `Not a ${types.join(" or ")} lexicon: ${uri2}`
      );
    }
    return def2;
  }
  validate(lexUri, value) {
    lexUri = toLexUri(lexUri);
    const def2 = this.getDefOrThrow(lexUri, ["record", "object"]);
    if (!isObj(value)) {
      throw new ValidationError(`Value must be an object`);
    }
    if (def2.type === "record") {
      return object(this, "Record", def2.record, value);
    } else if (def2.type === "object") {
      return object(this, "Object", def2, value);
    } else {
      throw new InvalidLexiconError("Definition must be a record or object");
    }
  }
  assertValidRecord(lexUri, value) {
    lexUri = toLexUri(lexUri);
    const def2 = this.getDefOrThrow(lexUri, ["record"]);
    if (!isObj(value)) {
      throw new ValidationError(`Record must be an object`);
    }
    if (!hasProp(value, "$type") || typeof value.$type !== "string") {
      throw new ValidationError(`Record/$type must be a string`);
    }
    const $type = value.$type || "";
    if (toLexUri($type) !== lexUri) {
      throw new ValidationError(
        `Invalid $type: must be ${lexUri}, got ${$type}`
      );
    }
    return assertValidRecord(this, def2, value);
  }
  assertValidXrpcParams(lexUri, value) {
    lexUri = toLexUri(lexUri);
    const def2 = this.getDefOrThrow(lexUri, [
      "query",
      "procedure",
      "subscription"
    ]);
    return assertValidXrpcParams(
      this,
      def2,
      value
    );
  }
  assertValidXrpcInput(lexUri, value) {
    lexUri = toLexUri(lexUri);
    const def2 = this.getDefOrThrow(lexUri, ["procedure"]);
    return assertValidXrpcInput(this, def2, value);
  }
  assertValidXrpcOutput(lexUri, value) {
    lexUri = toLexUri(lexUri);
    const def2 = this.getDefOrThrow(lexUri, ["query", "procedure"]);
    return assertValidXrpcOutput(
      this,
      def2,
      value
    );
  }
  assertValidXrpcMessage(lexUri, value) {
    lexUri = toLexUri(lexUri);
    const def2 = this.getDefOrThrow(lexUri, ["subscription"]);
    return assertValidXrpcMessage(this, def2, value);
  }
  resolveLexUri(lexUri, ref) {
    lexUri = toLexUri(lexUri);
    return toLexUri(ref, lexUri);
  }
};
function* iterDefs(doc) {
  for (const defId in doc.defs) {
    yield [`lex:${doc.id}#${defId}`, doc.defs[defId]];
    if (defId === "main") {
      yield [`lex:${doc.id}`, doc.defs[defId]];
    }
  }
}
function resolveRefUris(obj, baseUri) {
  for (const k in obj) {
    if (obj.type === "ref") {
      obj.ref = toLexUri(obj.ref, baseUri);
    } else if (obj.type === "union") {
      obj.refs = obj.refs.map((ref) => toLexUri(ref, baseUri));
    } else if (Array.isArray(obj[k])) {
      obj[k] = obj[k].map((item) => {
        if (typeof item === "string") {
          return item.startsWith("#") ? toLexUri(item, baseUri) : item;
        } else if (item && typeof item === "object") {
          return resolveRefUris(item, baseUri);
        }
        return item;
      });
    } else if (obj[k] && typeof obj[k] === "object") {
      obj[k] = resolveRefUris(obj[k], baseUri);
    }
  }
  return obj;
}

// ../lexicon/src/serialize.ts
var lexToIpld = (val) => {
  if (Array.isArray(val)) {
    return val.map((item) => lexToIpld(item));
  }
  if (val && typeof val === "object") {
    if (val instanceof BlobRef) {
      return val.original;
    }
    if (CID.asCID(val) || val instanceof Uint8Array) {
      return val;
    }
    const toReturn = {};
    for (const key of Object.keys(val)) {
      toReturn[key] = lexToIpld(val[key]);
    }
    return toReturn;
  }
  return val;
};
var ipldToLex = (val) => {
  if (Array.isArray(val)) {
    return val.map((item) => ipldToLex(item));
  }
  if (val && typeof val === "object") {
    if ((val["$type"] === "blob" || typeof val["cid"] === "string" && typeof val["mimeType"] === "string") && check_exports.is(val, jsonBlobRef)) {
      return BlobRef.fromJsonRef(val);
    }
    if (CID.asCID(val) || val instanceof Uint8Array) {
      return val;
    }
    const toReturn = {};
    for (const key of Object.keys(val)) {
      toReturn[key] = ipldToLex(val[key]);
    }
    return toReturn;
  }
  return val;
};
var lexToJson = (val) => {
  return ipldToJson(lexToIpld(val));
};
var stringifyLex = (val) => {
  return JSON.stringify(lexToJson(val));
};
var jsonToLex = (val) => {
  return ipldToLex(jsonToIpld(val));
};
var jsonStringToLex = (val) => {
  return jsonToLex(JSON.parse(val));
};

// ../xrpc/src/types.ts
var errorResponseBody = mod.object({
  error: mod.string().optional(),
  message: mod.string().optional()
});
var ResponseType = /* @__PURE__ */ ((ResponseType2) => {
  ResponseType2[ResponseType2["Unknown"] = 1] = "Unknown";
  ResponseType2[ResponseType2["InvalidResponse"] = 2] = "InvalidResponse";
  ResponseType2[ResponseType2["Success"] = 200] = "Success";
  ResponseType2[ResponseType2["InvalidRequest"] = 400] = "InvalidRequest";
  ResponseType2[ResponseType2["AuthRequired"] = 401] = "AuthRequired";
  ResponseType2[ResponseType2["Forbidden"] = 403] = "Forbidden";
  ResponseType2[ResponseType2["XRPCNotSupported"] = 404] = "XRPCNotSupported";
  ResponseType2[ResponseType2["PayloadTooLarge"] = 413] = "PayloadTooLarge";
  ResponseType2[ResponseType2["RateLimitExceeded"] = 429] = "RateLimitExceeded";
  ResponseType2[ResponseType2["InternalServerError"] = 500] = "InternalServerError";
  ResponseType2[ResponseType2["MethodNotImplemented"] = 501] = "MethodNotImplemented";
  ResponseType2[ResponseType2["UpstreamFailure"] = 502] = "UpstreamFailure";
  ResponseType2[ResponseType2["NotEnoughResouces"] = 503] = "NotEnoughResouces";
  ResponseType2[ResponseType2["UpstreamTimeout"] = 504] = "UpstreamTimeout";
  return ResponseType2;
})(ResponseType || {});
var ResponseTypeNames = {
  [2 /* InvalidResponse */]: "InvalidResponse",
  [200 /* Success */]: "Success",
  [400 /* InvalidRequest */]: "InvalidRequest",
  [401 /* AuthRequired */]: "AuthenticationRequired",
  [403 /* Forbidden */]: "Forbidden",
  [404 /* XRPCNotSupported */]: "XRPCNotSupported",
  [413 /* PayloadTooLarge */]: "PayloadTooLarge",
  [429 /* RateLimitExceeded */]: "RateLimitExceeded",
  [500 /* InternalServerError */]: "InternalServerError",
  [501 /* MethodNotImplemented */]: "MethodNotImplemented",
  [502 /* UpstreamFailure */]: "UpstreamFailure",
  [503 /* NotEnoughResouces */]: "NotEnoughResouces",
  [504 /* UpstreamTimeout */]: "UpstreamTimeout"
};
var ResponseTypeStrings = {
  [2 /* InvalidResponse */]: "Invalid Response",
  [200 /* Success */]: "Success",
  [400 /* InvalidRequest */]: "Invalid Request",
  [401 /* AuthRequired */]: "Authentication Required",
  [403 /* Forbidden */]: "Forbidden",
  [404 /* XRPCNotSupported */]: "XRPC Not Supported",
  [413 /* PayloadTooLarge */]: "Payload Too Large",
  [429 /* RateLimitExceeded */]: "Rate Limit Exceeded",
  [500 /* InternalServerError */]: "Internal Server Error",
  [501 /* MethodNotImplemented */]: "Method Not Implemented",
  [502 /* UpstreamFailure */]: "Upstream Failure",
  [503 /* NotEnoughResouces */]: "Not Enough Resouces",
  [504 /* UpstreamTimeout */]: "Upstream Timeout"
};
var XRPCResponse = class {
  constructor(data, headers) {
    this.data = data;
    this.headers = headers;
    this.success = true;
  }
};
var XRPCError = class extends Error {
  constructor(status, error, message) {
    super(message || error || ResponseTypeStrings[status]);
    this.status = status;
    this.error = error;
    this.success = false;
    if (!this.error) {
      this.error = ResponseTypeNames[status];
    }
  }
};
var XRPCInvalidResponseError = class extends XRPCError {
  constructor(lexiconNsid, validationError, responseBody) {
    super(
      2 /* InvalidResponse */,
      ResponseTypeStrings[2 /* InvalidResponse */],
      `The server gave an invalid response and may be out of date.`
    );
    this.lexiconNsid = lexiconNsid;
    this.validationError = validationError;
    this.responseBody = responseBody;
  }
};

// ../xrpc/src/util.ts
function getMethodSchemaHTTPMethod(schema2) {
  if (schema2.type === "procedure") {
    return "post";
  }
  return "get";
}
function constructMethodCallUri(nsid2, schema2, serviceUri, params2) {
  const uri2 = new URL(serviceUri);
  uri2.pathname = `/xrpc/${nsid2}`;
  if (params2) {
    for (const [key, value] of Object.entries(params2)) {
      const paramSchema = schema2.parameters?.properties?.[key];
      if (!paramSchema) {
        throw new Error(`Invalid query parameter: ${key}`);
      }
      if (value !== void 0) {
        if (paramSchema.type === "array") {
          const vals = [];
          vals.concat(value).forEach((val) => {
            uri2.searchParams.append(
              key,
              encodeQueryParam(paramSchema.items.type, val)
            );
          });
        } else {
          uri2.searchParams.set(key, encodeQueryParam(paramSchema.type, value));
        }
      }
    }
  }
  return uri2.toString();
}
function encodeQueryParam(type, value) {
  if (type === "string" || type === "unknown") {
    return String(value);
  }
  if (type === "float") {
    return String(Number(value));
  } else if (type === "integer") {
    return String(Number(value) | 0);
  } else if (type === "boolean") {
    return value ? "true" : "false";
  } else if (type === "datetime") {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return String(value);
  }
  throw new Error(`Unsupported query param type: ${type}`);
}
function constructMethodCallHeaders(schema2, data, opts) {
  const headers = opts?.headers || {};
  if (schema2.type === "procedure") {
    if (opts?.encoding) {
      headers["Content-Type"] = opts.encoding;
    }
    if (data && typeof data === "object") {
      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
      }
    }
  }
  return headers;
}
function encodeMethodCallBody(headers, data) {
  if (!headers["Content-Type"] || typeof data === "undefined") {
    return void 0;
  }
  if (data instanceof ArrayBuffer) {
    return data;
  }
  if (headers["Content-Type"].startsWith("text/")) {
    return new TextEncoder().encode(data.toString());
  }
  if (headers["Content-Type"].startsWith("application/json")) {
    return new TextEncoder().encode(stringifyLex(data));
  }
  return data;
}
function httpResponseCodeToEnum(status) {
  let resCode;
  if (status in ResponseType) {
    resCode = status;
  } else if (status >= 100 && status < 200) {
    resCode = 404 /* XRPCNotSupported */;
  } else if (status >= 200 && status < 300) {
    resCode = 200 /* Success */;
  } else if (status >= 300 && status < 400) {
    resCode = 404 /* XRPCNotSupported */;
  } else if (status >= 400 && status < 500) {
    resCode = 400 /* InvalidRequest */;
  } else {
    resCode = 500 /* InternalServerError */;
  }
  return resCode;
}
function httpResponseBodyParse(mimeType, data) {
  if (mimeType) {
    if (mimeType.includes("application/json") && data?.byteLength) {
      try {
        const str = new TextDecoder().decode(data);
        return jsonStringToLex(str);
      } catch (e) {
        throw new XRPCError(
          2 /* InvalidResponse */,
          `Failed to parse response body: ${String(e)}`
        );
      }
    }
    if (mimeType.startsWith("text/") && data?.byteLength) {
      try {
        return new TextDecoder().decode(data);
      } catch (e) {
        throw new XRPCError(
          2 /* InvalidResponse */,
          `Failed to parse response body: ${String(e)}`
        );
      }
    }
  }
  if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  }
  return data;
}

// ../xrpc/src/client.ts
var Client = class {
  constructor() {
    this.fetch = defaultFetchHandler;
    this.lex = new Lexicons();
  }
  async call(serviceUri, methodNsid, params2, data, opts) {
    return this.service(serviceUri).call(methodNsid, params2, data, opts);
  }
  service(serviceUri) {
    return new ServiceClient(this, serviceUri);
  }
  addLexicon(doc) {
    this.lex.add(doc);
  }
  addLexicons(docs) {
    for (const doc of docs) {
      this.addLexicon(doc);
    }
  }
  removeLexicon(uri2) {
    this.lex.remove(uri2);
  }
};
var ServiceClient = class {
  constructor(baseClient, serviceUri) {
    this.headers = {};
    this.baseClient = baseClient;
    this.uri = typeof serviceUri === "string" ? new URL(serviceUri) : serviceUri;
  }
  setHeader(key, value) {
    this.headers[key] = value;
  }
  unsetHeader(key) {
    delete this.headers[key];
  }
  async call(methodNsid, params2, data, opts) {
    const def2 = this.baseClient.lex.getDefOrThrow(methodNsid);
    if (!def2 || def2.type !== "query" && def2.type !== "procedure") {
      throw new Error(
        `Invalid lexicon: ${methodNsid}. Must be a query or procedure.`
      );
    }
    const httpMethod = getMethodSchemaHTTPMethod(def2);
    const httpUri = constructMethodCallUri(methodNsid, def2, this.uri, params2);
    const httpHeaders = constructMethodCallHeaders(def2, data, {
      headers: {
        ...this.headers,
        ...opts?.headers
      },
      encoding: opts?.encoding
    });
    const res = await this.baseClient.fetch(
      httpUri,
      httpMethod,
      httpHeaders,
      data
    );
    const resCode = httpResponseCodeToEnum(res.status);
    if (resCode === 200 /* Success */) {
      try {
        this.baseClient.lex.assertValidXrpcOutput(methodNsid, res.body);
      } catch (e) {
        if (e instanceof ValidationError) {
          throw new XRPCInvalidResponseError(methodNsid, e, res.body);
        } else {
          throw e;
        }
      }
      return new XRPCResponse(res.body, res.headers);
    } else {
      if (res.body && isErrorResponseBody(res.body)) {
        throw new XRPCError(resCode, res.body.error, res.body.message);
      } else {
        throw new XRPCError(resCode);
      }
    }
  }
};
async function defaultFetchHandler(httpUri, httpMethod, httpHeaders, httpReqBody) {
  try {
    const reqInit = {
      method: httpMethod,
      headers: httpHeaders,
      body: encodeMethodCallBody(httpHeaders, httpReqBody),
      duplex: "half"
    };
    const res = await fetch(httpUri, reqInit);
    const resBody = await res.arrayBuffer();
    return {
      status: res.status,
      headers: Object.fromEntries(res.headers.entries()),
      body: httpResponseBodyParse(res.headers.get("content-type"), resBody)
    };
  } catch (e) {
    throw new XRPCError(1 /* Unknown */, String(e));
  }
}
function isErrorResponseBody(v) {
  return errorResponseBody.safeParse(v).success;
}

// ../xrpc/src/index.ts
var defaultInst = new Client();

// src/client/lexicons.ts
var schemaDict = {
  ComAtprotoAdminDefs: {
    lexicon: 1,
    id: "com.atproto.admin.defs",
    defs: {
      actionView: {
        type: "object",
        required: [
          "id",
          "action",
          "subject",
          "subjectBlobCids",
          "reason",
          "createdBy",
          "createdAt",
          "resolvedReportIds"
        ],
        properties: {
          id: {
            type: "integer"
          },
          action: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionType"
          },
          subject: {
            type: "union",
            refs: [
              "lex:com.atproto.admin.defs#repoRef",
              "lex:com.atproto.repo.strongRef"
            ]
          },
          subjectBlobCids: {
            type: "array",
            items: {
              type: "string"
            }
          },
          createLabelVals: {
            type: "array",
            items: {
              type: "string"
            }
          },
          negateLabelVals: {
            type: "array",
            items: {
              type: "string"
            }
          },
          reason: {
            type: "string"
          },
          createdBy: {
            type: "string",
            format: "did"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          reversal: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionReversal"
          },
          resolvedReportIds: {
            type: "array",
            items: {
              type: "integer"
            }
          }
        }
      },
      actionViewDetail: {
        type: "object",
        required: [
          "id",
          "action",
          "subject",
          "subjectBlobs",
          "reason",
          "createdBy",
          "createdAt",
          "resolvedReports"
        ],
        properties: {
          id: {
            type: "integer"
          },
          action: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionType"
          },
          subject: {
            type: "union",
            refs: [
              "lex:com.atproto.admin.defs#repoView",
              "lex:com.atproto.admin.defs#recordView"
            ]
          },
          subjectBlobs: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#blobView"
            }
          },
          createLabelVals: {
            type: "array",
            items: {
              type: "string"
            }
          },
          negateLabelVals: {
            type: "array",
            items: {
              type: "string"
            }
          },
          reason: {
            type: "string"
          },
          createdBy: {
            type: "string",
            format: "did"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          reversal: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionReversal"
          },
          resolvedReports: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#reportView"
            }
          }
        }
      },
      actionViewCurrent: {
        type: "object",
        required: ["id", "action"],
        properties: {
          id: {
            type: "integer"
          },
          action: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionType"
          }
        }
      },
      actionReversal: {
        type: "object",
        required: ["reason", "createdBy", "createdAt"],
        properties: {
          reason: {
            type: "string"
          },
          createdBy: {
            type: "string",
            format: "did"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          }
        }
      },
      actionType: {
        type: "string",
        knownValues: [
          "lex:com.atproto.admin.defs#takedown",
          "lex:com.atproto.admin.defs#flag",
          "lex:com.atproto.admin.defs#acknowledge"
        ]
      },
      takedown: {
        type: "token",
        description: "Moderation action type: Takedown. Indicates that content should not be served by the PDS."
      },
      flag: {
        type: "token",
        description: "Moderation action type: Flag. Indicates that the content was reviewed and considered to violate PDS rules, but may still be served."
      },
      acknowledge: {
        type: "token",
        description: "Moderation action type: Acknowledge. Indicates that the content was reviewed and not considered to violate PDS rules."
      },
      reportView: {
        type: "object",
        required: [
          "id",
          "reasonType",
          "subject",
          "reportedBy",
          "createdAt",
          "resolvedByActionIds"
        ],
        properties: {
          id: {
            type: "integer"
          },
          reasonType: {
            type: "ref",
            ref: "lex:com.atproto.moderation.defs#reasonType"
          },
          reason: {
            type: "string"
          },
          subject: {
            type: "union",
            refs: [
              "lex:com.atproto.admin.defs#repoRef",
              "lex:com.atproto.repo.strongRef"
            ]
          },
          reportedBy: {
            type: "string",
            format: "did"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          resolvedByActionIds: {
            type: "array",
            items: {
              type: "integer"
            }
          }
        }
      },
      reportViewDetail: {
        type: "object",
        required: [
          "id",
          "reasonType",
          "subject",
          "reportedBy",
          "createdAt",
          "resolvedByActions"
        ],
        properties: {
          id: {
            type: "integer"
          },
          reasonType: {
            type: "ref",
            ref: "lex:com.atproto.moderation.defs#reasonType"
          },
          reason: {
            type: "string"
          },
          subject: {
            type: "union",
            refs: [
              "lex:com.atproto.admin.defs#repoView",
              "lex:com.atproto.admin.defs#recordView"
            ]
          },
          reportedBy: {
            type: "string",
            format: "did"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          resolvedByActions: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#actionView"
            }
          }
        }
      },
      repoView: {
        type: "object",
        required: [
          "did",
          "handle",
          "relatedRecords",
          "indexedAt",
          "moderation"
        ],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          handle: {
            type: "string",
            format: "handle"
          },
          email: {
            type: "string"
          },
          relatedRecords: {
            type: "array",
            items: {
              type: "unknown"
            }
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          moderation: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#moderation"
          },
          invitedBy: {
            type: "ref",
            ref: "lex:com.atproto.server.defs#inviteCode"
          }
        }
      },
      repoViewDetail: {
        type: "object",
        required: [
          "did",
          "handle",
          "relatedRecords",
          "indexedAt",
          "moderation"
        ],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          handle: {
            type: "string",
            format: "handle"
          },
          email: {
            type: "string"
          },
          relatedRecords: {
            type: "array",
            items: {
              type: "unknown"
            }
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          moderation: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#moderationDetail"
          },
          invitedBy: {
            type: "ref",
            ref: "lex:com.atproto.server.defs#inviteCode"
          },
          invites: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCode"
            }
          }
        }
      },
      repoRef: {
        type: "object",
        required: ["did"],
        properties: {
          did: {
            type: "string",
            format: "did"
          }
        }
      },
      recordView: {
        type: "object",
        required: [
          "uri",
          "cid",
          "value",
          "blobCids",
          "indexedAt",
          "moderation",
          "repo"
        ],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          value: {
            type: "unknown"
          },
          blobCids: {
            type: "array",
            items: {
              type: "string",
              format: "cid"
            }
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          moderation: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#moderation"
          },
          repo: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#repoView"
          }
        }
      },
      recordViewDetail: {
        type: "object",
        required: [
          "uri",
          "cid",
          "value",
          "blobs",
          "indexedAt",
          "moderation",
          "repo"
        ],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          value: {
            type: "unknown"
          },
          blobs: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#blobView"
            }
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          moderation: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#moderationDetail"
          },
          repo: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#repoView"
          }
        }
      },
      moderation: {
        type: "object",
        required: [],
        properties: {
          currentAction: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionViewCurrent"
          }
        }
      },
      moderationDetail: {
        type: "object",
        required: ["actions", "reports"],
        properties: {
          currentAction: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionViewCurrent"
          },
          actions: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#actionView"
            }
          },
          reports: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#reportView"
            }
          }
        }
      },
      blobView: {
        type: "object",
        required: ["cid", "mimeType", "size", "createdAt"],
        properties: {
          cid: {
            type: "string",
            format: "cid"
          },
          mimeType: {
            type: "string"
          },
          size: {
            type: "integer"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          details: {
            type: "union",
            refs: [
              "lex:com.atproto.admin.defs#imageDetails",
              "lex:com.atproto.admin.defs#videoDetails"
            ]
          },
          moderation: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#moderation"
          }
        }
      },
      imageDetails: {
        type: "object",
        required: ["width", "height"],
        properties: {
          width: {
            type: "integer"
          },
          height: {
            type: "integer"
          }
        }
      },
      videoDetails: {
        type: "object",
        required: ["width", "height", "length"],
        properties: {
          width: {
            type: "integer"
          },
          height: {
            type: "integer"
          },
          length: {
            type: "integer"
          }
        }
      }
    }
  },
  ComAtprotoAdminDisableInviteCodes: {
    lexicon: 1,
    id: "com.atproto.admin.disableInviteCodes",
    defs: {
      main: {
        type: "procedure",
        description: "Disable some set of codes and/or all codes associated with a set of users",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            properties: {
              codes: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              accounts: {
                type: "array",
                items: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminGetInviteCodes: {
    lexicon: 1,
    id: "com.atproto.admin.getInviteCodes",
    defs: {
      main: {
        type: "query",
        description: "Admin view of invite codes",
        parameters: {
          type: "params",
          properties: {
            sort: {
              type: "string",
              knownValues: ["recent", "usage"],
              default: "recent"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 500,
              default: 100
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["codes"],
            properties: {
              cursor: {
                type: "string"
              },
              codes: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.server.defs#inviteCode"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminGetModerationAction: {
    lexicon: 1,
    id: "com.atproto.admin.getModerationAction",
    defs: {
      main: {
        type: "query",
        description: "View details about a moderation action.",
        parameters: {
          type: "params",
          required: ["id"],
          properties: {
            id: {
              type: "integer"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionViewDetail"
          }
        }
      }
    }
  },
  ComAtprotoAdminGetModerationActions: {
    lexicon: 1,
    id: "com.atproto.admin.getModerationActions",
    defs: {
      main: {
        type: "query",
        description: "List moderation actions related to a subject.",
        parameters: {
          type: "params",
          properties: {
            subject: {
              type: "string"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actions"],
            properties: {
              cursor: {
                type: "string"
              },
              actions: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#actionView"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminGetModerationReport: {
    lexicon: 1,
    id: "com.atproto.admin.getModerationReport",
    defs: {
      main: {
        type: "query",
        description: "View details about a moderation report.",
        parameters: {
          type: "params",
          required: ["id"],
          properties: {
            id: {
              type: "integer"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#reportViewDetail"
          }
        }
      }
    }
  },
  ComAtprotoAdminGetModerationReports: {
    lexicon: 1,
    id: "com.atproto.admin.getModerationReports",
    defs: {
      main: {
        type: "query",
        description: "List moderation reports related to a subject.",
        parameters: {
          type: "params",
          properties: {
            subject: {
              type: "string"
            },
            resolved: {
              type: "boolean"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["reports"],
            properties: {
              cursor: {
                type: "string"
              },
              reports: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#reportView"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminGetRecord: {
    lexicon: 1,
    id: "com.atproto.admin.getRecord",
    defs: {
      main: {
        type: "query",
        description: "View details about a record.",
        parameters: {
          type: "params",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#recordViewDetail"
          }
        }
      }
    }
  },
  ComAtprotoAdminGetRepo: {
    lexicon: 1,
    id: "com.atproto.admin.getRepo",
    defs: {
      main: {
        type: "query",
        description: "View details about a repository.",
        parameters: {
          type: "params",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#repoViewDetail"
          }
        }
      }
    }
  },
  ComAtprotoAdminResolveModerationReports: {
    lexicon: 1,
    id: "com.atproto.admin.resolveModerationReports",
    defs: {
      main: {
        type: "procedure",
        description: "Resolve moderation reports by an action.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actionId", "reportIds", "createdBy"],
            properties: {
              actionId: {
                type: "integer"
              },
              reportIds: {
                type: "array",
                items: {
                  type: "integer"
                }
              },
              createdBy: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionView"
          }
        }
      }
    }
  },
  ComAtprotoAdminReverseModerationAction: {
    lexicon: 1,
    id: "com.atproto.admin.reverseModerationAction",
    defs: {
      main: {
        type: "procedure",
        description: "Reverse a moderation action.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["id", "reason", "createdBy"],
            properties: {
              id: {
                type: "integer"
              },
              reason: {
                type: "string"
              },
              createdBy: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionView"
          }
        }
      }
    }
  },
  ComAtprotoAdminSearchRepos: {
    lexicon: 1,
    id: "com.atproto.admin.searchRepos",
    defs: {
      main: {
        type: "query",
        description: "Find repositories based on a search term.",
        parameters: {
          type: "params",
          properties: {
            term: {
              type: "string"
            },
            invitedBy: {
              type: "string"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repos"],
            properties: {
              cursor: {
                type: "string"
              },
              repos: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#repoView"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminTakeModerationAction: {
    lexicon: 1,
    id: "com.atproto.admin.takeModerationAction",
    defs: {
      main: {
        type: "procedure",
        description: "Take a moderation action on a repo.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["action", "subject", "reason", "createdBy"],
            properties: {
              action: {
                type: "string",
                knownValues: [
                  "com.atproto.admin.defs#takedown",
                  "com.atproto.admin.defs#flag",
                  "com.atproto.admin.defs#acknowledge"
                ]
              },
              subject: {
                type: "union",
                refs: [
                  "lex:com.atproto.admin.defs#repoRef",
                  "lex:com.atproto.repo.strongRef"
                ]
              },
              subjectBlobCids: {
                type: "array",
                items: {
                  type: "string",
                  format: "cid"
                }
              },
              createLabelVals: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              negateLabelVals: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              reason: {
                type: "string"
              },
              createdBy: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionView"
          }
        },
        errors: [
          {
            name: "SubjectHasAction"
          }
        ]
      }
    }
  },
  ComAtprotoAdminUpdateAccountHandle: {
    lexicon: 1,
    id: "com.atproto.admin.updateAccountHandle",
    defs: {
      main: {
        type: "procedure",
        description: "Administrative action to update an accounts handle",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["did", "handle"],
            properties: {
              did: {
                type: "string",
                format: "did"
              },
              handle: {
                type: "string",
                format: "handle"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoIdentityResolveHandle: {
    lexicon: 1,
    id: "com.atproto.identity.resolveHandle",
    defs: {
      main: {
        type: "query",
        description: "Provides the DID of a repo.",
        parameters: {
          type: "params",
          properties: {
            handle: {
              type: "string",
              format: "handle",
              description: "The handle to resolve. If not supplied, will resolve the host's own handle."
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoIdentityUpdateHandle: {
    lexicon: 1,
    id: "com.atproto.identity.updateHandle",
    defs: {
      main: {
        type: "procedure",
        description: "Updates the handle of the account",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["handle"],
            properties: {
              handle: {
                type: "string",
                format: "handle"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoLabelDefs: {
    lexicon: 1,
    id: "com.atproto.label.defs",
    defs: {
      label: {
        type: "object",
        description: "Metadata tag on an atproto resource (eg, repo or record)",
        required: ["src", "uri", "val", "cts"],
        properties: {
          src: {
            type: "string",
            format: "did",
            description: "DID of the actor who created this label"
          },
          uri: {
            type: "string",
            format: "uri",
            description: "AT URI of the record, repository (account), or other resource which this label applies to"
          },
          cid: {
            type: "string",
            format: "cid",
            description: "optionally, CID specifying the specific version of 'uri' resource this label applies to"
          },
          val: {
            type: "string",
            maxLength: 128,
            description: "the short string name of the value or type of this label"
          },
          neg: {
            type: "boolean",
            description: "if true, this is a negation label, overwriting a previous label"
          },
          cts: {
            type: "string",
            format: "datetime",
            description: "timestamp when this label was created"
          }
        }
      }
    }
  },
  ComAtprotoLabelQueryLabels: {
    lexicon: 1,
    id: "com.atproto.label.queryLabels",
    defs: {
      main: {
        type: "query",
        description: "Find labels relevant to the provided URI patterns.",
        parameters: {
          type: "params",
          required: ["uriPatterns"],
          properties: {
            uriPatterns: {
              type: "array",
              items: {
                type: "string"
              },
              description: "List of AT URI patterns to match (boolean 'OR'). Each may be a prefix (ending with '*'; will match inclusive of the string leading to '*'), or a full URI"
            },
            sources: {
              type: "array",
              items: {
                type: "string",
                format: "did"
              },
              description: "Optional list of label sources (DIDs) to filter on"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 250,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["labels"],
            properties: {
              cursor: {
                type: "string"
              },
              labels: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.label.defs#label"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoLabelSubscribeLabels: {
    lexicon: 1,
    id: "com.atproto.label.subscribeLabels",
    defs: {
      main: {
        type: "subscription",
        description: "Subscribe to label updates",
        parameters: {
          type: "params",
          properties: {
            cursor: {
              type: "integer",
              description: "The last known event to backfill from."
            }
          }
        },
        message: {
          schema: {
            type: "union",
            refs: [
              "lex:com.atproto.label.subscribeLabels#labels",
              "lex:com.atproto.label.subscribeLabels#info"
            ]
          }
        },
        errors: [
          {
            name: "FutureCursor"
          }
        ]
      },
      labels: {
        type: "object",
        required: ["seq", "labels"],
        properties: {
          seq: {
            type: "integer"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          }
        }
      },
      info: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            knownValues: ["OutdatedCursor"]
          },
          message: {
            type: "string"
          }
        }
      }
    }
  },
  ComAtprotoModerationCreateReport: {
    lexicon: 1,
    id: "com.atproto.moderation.createReport",
    defs: {
      main: {
        type: "procedure",
        description: "Report a repo or a record.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["reasonType", "subject"],
            properties: {
              reasonType: {
                type: "ref",
                ref: "lex:com.atproto.moderation.defs#reasonType"
              },
              reason: {
                type: "string"
              },
              subject: {
                type: "union",
                refs: [
                  "lex:com.atproto.admin.defs#repoRef",
                  "lex:com.atproto.repo.strongRef"
                ]
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: [
              "id",
              "reasonType",
              "subject",
              "reportedBy",
              "createdAt"
            ],
            properties: {
              id: {
                type: "integer"
              },
              reasonType: {
                type: "ref",
                ref: "lex:com.atproto.moderation.defs#reasonType"
              },
              reason: {
                type: "string"
              },
              subject: {
                type: "union",
                refs: [
                  "lex:com.atproto.admin.defs#repoRef",
                  "lex:com.atproto.repo.strongRef"
                ]
              },
              reportedBy: {
                type: "string",
                format: "did"
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoModerationDefs: {
    lexicon: 1,
    id: "com.atproto.moderation.defs",
    defs: {
      reasonType: {
        type: "string",
        knownValues: [
          "com.atproto.moderation.defs#reasonSpam",
          "com.atproto.moderation.defs#reasonOther"
        ]
      },
      reasonSpam: {
        type: "token",
        description: "Moderation report reason: Spam."
      },
      reasonOther: {
        type: "token",
        description: "Moderation report reason: Other."
      }
    }
  },
  ComAtprotoRepoApplyWrites: {
    lexicon: 1,
    id: "com.atproto.repo.applyWrites",
    defs: {
      main: {
        type: "procedure",
        description: "Apply a batch transaction of creates, updates, and deletes.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repo", "writes"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              validate: {
                type: "boolean",
                default: true,
                description: "Validate the records?"
              },
              writes: {
                type: "array",
                items: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.repo.applyWrites#create",
                    "lex:com.atproto.repo.applyWrites#update",
                    "lex:com.atproto.repo.applyWrites#delete"
                  ],
                  closed: true
                }
              },
              swapCommit: {
                type: "string",
                format: "cid"
              }
            }
          }
        },
        errors: [
          {
            name: "InvalidSwap"
          }
        ]
      },
      create: {
        type: "object",
        description: "Create a new record.",
        required: ["action", "collection", "value"],
        properties: {
          collection: {
            type: "string",
            format: "nsid"
          },
          rkey: {
            type: "string"
          },
          value: {
            type: "unknown"
          }
        }
      },
      update: {
        type: "object",
        description: "Update an existing record.",
        required: ["action", "collection", "rkey", "value"],
        properties: {
          collection: {
            type: "string",
            format: "nsid"
          },
          rkey: {
            type: "string"
          },
          value: {
            type: "unknown"
          }
        }
      },
      delete: {
        type: "object",
        description: "Delete an existing record.",
        required: ["action", "collection", "rkey"],
        properties: {
          collection: {
            type: "string",
            format: "nsid"
          },
          rkey: {
            type: "string"
          }
        }
      }
    }
  },
  ComAtprotoRepoCreateRecord: {
    lexicon: 1,
    id: "com.atproto.repo.createRecord",
    defs: {
      main: {
        type: "procedure",
        description: "Create a new record.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repo", "collection", "record"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid",
                description: "The NSID of the record collection."
              },
              rkey: {
                type: "string",
                description: "The key of the record."
              },
              validate: {
                type: "boolean",
                default: true,
                description: "Validate the record?"
              },
              record: {
                type: "unknown",
                description: "The record to create."
              },
              swapCommit: {
                type: "string",
                format: "cid",
                description: "Compare and swap with the previous commit by cid."
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["uri", "cid"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              }
            }
          }
        },
        errors: [
          {
            name: "InvalidSwap"
          }
        ]
      }
    }
  },
  ComAtprotoRepoDeleteRecord: {
    lexicon: 1,
    id: "com.atproto.repo.deleteRecord",
    defs: {
      main: {
        type: "procedure",
        description: "Delete a record, or ensure it doesn't exist.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repo", "collection", "rkey"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid",
                description: "The NSID of the record collection."
              },
              rkey: {
                type: "string",
                description: "The key of the record."
              },
              swapRecord: {
                type: "string",
                format: "cid",
                description: "Compare and swap with the previous record by cid."
              },
              swapCommit: {
                type: "string",
                format: "cid",
                description: "Compare and swap with the previous commit by cid."
              }
            }
          }
        },
        errors: [
          {
            name: "InvalidSwap"
          }
        ]
      }
    }
  },
  ComAtprotoRepoDescribeRepo: {
    lexicon: 1,
    id: "com.atproto.repo.describeRepo",
    defs: {
      main: {
        type: "query",
        description: "Get information about the repo, including the list of collections.",
        parameters: {
          type: "params",
          required: ["repo"],
          properties: {
            repo: {
              type: "string",
              format: "at-identifier",
              description: "The handle or DID of the repo."
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: [
              "handle",
              "did",
              "didDoc",
              "collections",
              "handleIsCorrect"
            ],
            properties: {
              handle: {
                type: "string",
                format: "handle"
              },
              did: {
                type: "string",
                format: "did"
              },
              didDoc: {
                type: "unknown"
              },
              collections: {
                type: "array",
                items: {
                  type: "string",
                  format: "nsid"
                }
              },
              handleIsCorrect: {
                type: "boolean"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoRepoGetRecord: {
    lexicon: 1,
    id: "com.atproto.repo.getRecord",
    defs: {
      main: {
        type: "query",
        description: "Get a record.",
        parameters: {
          type: "params",
          required: ["repo", "collection", "rkey"],
          properties: {
            repo: {
              type: "string",
              format: "at-identifier",
              description: "The handle or DID of the repo."
            },
            collection: {
              type: "string",
              format: "nsid",
              description: "The NSID of the record collection."
            },
            rkey: {
              type: "string",
              description: "The key of the record."
            },
            cid: {
              type: "string",
              format: "cid",
              description: "The CID of the version of the record. If not specified, then return the most recent version."
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["uri", "value"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              },
              value: {
                type: "unknown"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoRepoListRecords: {
    lexicon: 1,
    id: "com.atproto.repo.listRecords",
    defs: {
      main: {
        type: "query",
        description: "List a range of records in a collection.",
        parameters: {
          type: "params",
          required: ["repo", "collection"],
          properties: {
            repo: {
              type: "string",
              format: "at-identifier",
              description: "The handle or DID of the repo."
            },
            collection: {
              type: "string",
              format: "nsid",
              description: "The NSID of the record type."
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50,
              description: "The number of records to return."
            },
            cursor: {
              type: "string"
            },
            rkeyStart: {
              type: "string",
              description: "DEPRECATED: The lowest sort-ordered rkey to start from (exclusive)"
            },
            rkeyEnd: {
              type: "string",
              description: "DEPRECATED: The highest sort-ordered rkey to stop at (exclusive)"
            },
            reverse: {
              type: "boolean",
              description: "Reverse the order of the returned records?"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["records"],
            properties: {
              cursor: {
                type: "string"
              },
              records: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.repo.listRecords#record"
                }
              }
            }
          }
        }
      },
      record: {
        type: "object",
        required: ["uri", "cid", "value"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          value: {
            type: "unknown"
          }
        }
      }
    }
  },
  ComAtprotoRepoPutRecord: {
    lexicon: 1,
    id: "com.atproto.repo.putRecord",
    defs: {
      main: {
        type: "procedure",
        description: "Write a record, creating or updating it as needed.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repo", "collection", "rkey", "record"],
            nullable: ["swapRecord"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid",
                description: "The NSID of the record collection."
              },
              rkey: {
                type: "string",
                description: "The key of the record."
              },
              validate: {
                type: "boolean",
                default: true,
                description: "Validate the record?"
              },
              record: {
                type: "unknown",
                description: "The record to write."
              },
              swapRecord: {
                type: "string",
                format: "cid",
                description: "Compare and swap with the previous record by cid."
              },
              swapCommit: {
                type: "string",
                format: "cid",
                description: "Compare and swap with the previous commit by cid."
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["uri", "cid"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              }
            }
          }
        },
        errors: [
          {
            name: "InvalidSwap"
          }
        ]
      }
    }
  },
  ComAtprotoRepoStrongRef: {
    lexicon: 1,
    id: "com.atproto.repo.strongRef",
    description: "A URI with a content-hash fingerprint.",
    defs: {
      main: {
        type: "object",
        required: ["uri", "cid"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          }
        }
      }
    }
  },
  ComAtprotoRepoUploadBlob: {
    lexicon: 1,
    id: "com.atproto.repo.uploadBlob",
    defs: {
      main: {
        type: "procedure",
        description: "Upload a new blob to be added to repo in a later request.",
        input: {
          encoding: "*/*"
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["blob"],
            properties: {
              blob: {
                type: "blob"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoServerCreateAccount: {
    lexicon: 1,
    id: "com.atproto.server.createAccount",
    defs: {
      main: {
        type: "procedure",
        description: "Create an account.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["handle", "email", "password"],
            properties: {
              email: {
                type: "string"
              },
              handle: {
                type: "string",
                format: "handle"
              },
              inviteCode: {
                type: "string"
              },
              password: {
                type: "string"
              },
              recoveryKey: {
                type: "string"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["accessJwt", "refreshJwt", "handle", "did"],
            properties: {
              accessJwt: {
                type: "string"
              },
              refreshJwt: {
                type: "string"
              },
              handle: {
                type: "string",
                format: "handle"
              },
              did: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        errors: [
          {
            name: "InvalidHandle"
          },
          {
            name: "InvalidPassword"
          },
          {
            name: "InvalidInviteCode"
          },
          {
            name: "HandleNotAvailable"
          },
          {
            name: "UnsupportedDomain"
          }
        ]
      }
    }
  },
  ComAtprotoServerCreateInviteCode: {
    lexicon: 1,
    id: "com.atproto.server.createInviteCode",
    defs: {
      main: {
        type: "procedure",
        description: "Create an invite code.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["useCount"],
            properties: {
              useCount: {
                type: "integer"
              },
              forAccount: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["code"],
            properties: {
              code: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoServerCreateInviteCodes: {
    lexicon: 1,
    id: "com.atproto.server.createInviteCodes",
    defs: {
      main: {
        type: "procedure",
        description: "Create an invite code.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["codeCount", "useCount"],
            properties: {
              codeCount: {
                type: "integer",
                default: 1
              },
              useCount: {
                type: "integer"
              },
              forAccount: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["codes"],
            properties: {
              codes: {
                type: "array",
                items: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoServerCreateSession: {
    lexicon: 1,
    id: "com.atproto.server.createSession",
    defs: {
      main: {
        type: "procedure",
        description: "Create an authentication session.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["identifier", "password"],
            properties: {
              identifier: {
                type: "string",
                description: "Handle or other identifier supported by the server for the authenticating user."
              },
              password: {
                type: "string"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["accessJwt", "refreshJwt", "handle", "did"],
            properties: {
              accessJwt: {
                type: "string"
              },
              refreshJwt: {
                type: "string"
              },
              handle: {
                type: "string",
                format: "handle"
              },
              did: {
                type: "string",
                format: "did"
              },
              email: {
                type: "string"
              }
            }
          }
        },
        errors: [
          {
            name: "AccountTakedown"
          }
        ]
      }
    }
  },
  ComAtprotoServerDefs: {
    lexicon: 1,
    id: "com.atproto.server.defs",
    defs: {
      inviteCode: {
        type: "object",
        required: [
          "code",
          "available",
          "disabled",
          "forAccount",
          "createdBy",
          "createdAt",
          "uses"
        ],
        properties: {
          code: {
            type: "string"
          },
          available: {
            type: "integer"
          },
          disabled: {
            type: "boolean"
          },
          forAccount: {
            type: "string"
          },
          createdBy: {
            type: "string"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          uses: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCodeUse"
            }
          }
        }
      },
      inviteCodeUse: {
        type: "object",
        required: ["usedBy", "usedAt"],
        properties: {
          usedBy: {
            type: "string",
            format: "did"
          },
          usedAt: {
            type: "string",
            format: "datetime"
          }
        }
      }
    }
  },
  ComAtprotoServerDeleteAccount: {
    lexicon: 1,
    id: "com.atproto.server.deleteAccount",
    defs: {
      main: {
        type: "procedure",
        description: "Delete a user account with a token and password.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["did", "password", "token"],
            properties: {
              did: {
                type: "string",
                format: "did"
              },
              password: {
                type: "string"
              },
              token: {
                type: "string"
              }
            }
          }
        },
        errors: [
          {
            name: "ExpiredToken"
          },
          {
            name: "InvalidToken"
          }
        ]
      }
    }
  },
  ComAtprotoServerDeleteSession: {
    lexicon: 1,
    id: "com.atproto.server.deleteSession",
    defs: {
      main: {
        type: "procedure",
        description: "Delete the current session."
      }
    }
  },
  ComAtprotoServerDescribeServer: {
    lexicon: 1,
    id: "com.atproto.server.describeServer",
    defs: {
      main: {
        type: "query",
        description: "Get a document describing the service's accounts configuration.",
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["availableUserDomains"],
            properties: {
              inviteCodeRequired: {
                type: "boolean"
              },
              availableUserDomains: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              links: {
                type: "ref",
                ref: "lex:com.atproto.server.describeServer#links"
              }
            }
          }
        }
      },
      links: {
        type: "object",
        properties: {
          privacyPolicy: {
            type: "string"
          },
          termsOfService: {
            type: "string"
          }
        }
      }
    }
  },
  ComAtprotoServerGetAccountInviteCodes: {
    lexicon: 1,
    id: "com.atproto.server.getAccountInviteCodes",
    defs: {
      main: {
        type: "query",
        description: "Get all invite codes for a given account",
        parameters: {
          type: "params",
          properties: {
            includeUsed: {
              type: "boolean",
              default: true
            },
            createAvailable: {
              type: "boolean",
              default: true
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["codes"],
            properties: {
              codes: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.server.defs#inviteCode"
                }
              }
            }
          }
        },
        errors: [
          {
            name: "DuplicateCreate"
          }
        ]
      }
    }
  },
  ComAtprotoServerGetSession: {
    lexicon: 1,
    id: "com.atproto.server.getSession",
    defs: {
      main: {
        type: "query",
        description: "Get information about the current session.",
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["handle", "did"],
            properties: {
              handle: {
                type: "string",
                format: "handle"
              },
              did: {
                type: "string",
                format: "did"
              },
              email: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoServerRefreshSession: {
    lexicon: 1,
    id: "com.atproto.server.refreshSession",
    defs: {
      main: {
        type: "procedure",
        description: "Refresh an authentication session.",
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["accessJwt", "refreshJwt", "handle", "did"],
            properties: {
              accessJwt: {
                type: "string"
              },
              refreshJwt: {
                type: "string"
              },
              handle: {
                type: "string",
                format: "handle"
              },
              did: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        errors: [
          {
            name: "AccountTakedown"
          }
        ]
      }
    }
  },
  ComAtprotoServerRequestAccountDelete: {
    lexicon: 1,
    id: "com.atproto.server.requestAccountDelete",
    defs: {
      main: {
        type: "procedure",
        description: "Initiate a user account deletion via email."
      }
    }
  },
  ComAtprotoServerRequestPasswordReset: {
    lexicon: 1,
    id: "com.atproto.server.requestPasswordReset",
    defs: {
      main: {
        type: "procedure",
        description: "Initiate a user account password reset via email.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["email"],
            properties: {
              email: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoServerResetPassword: {
    lexicon: 1,
    id: "com.atproto.server.resetPassword",
    defs: {
      main: {
        type: "procedure",
        description: "Reset a user account password using a token.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["token", "password"],
            properties: {
              token: {
                type: "string"
              },
              password: {
                type: "string"
              }
            }
          }
        },
        errors: [
          {
            name: "ExpiredToken"
          },
          {
            name: "InvalidToken"
          }
        ]
      }
    }
  },
  ComAtprotoSyncGetBlob: {
    lexicon: 1,
    id: "com.atproto.sync.getBlob",
    defs: {
      main: {
        type: "query",
        description: "Get a blob associated with a given repo.",
        parameters: {
          type: "params",
          required: ["did", "cid"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            cid: {
              type: "string",
              format: "cid",
              description: "The CID of the blob to fetch"
            }
          }
        },
        output: {
          encoding: "*/*"
        }
      }
    }
  },
  ComAtprotoSyncGetBlocks: {
    lexicon: 1,
    id: "com.atproto.sync.getBlocks",
    defs: {
      main: {
        type: "query",
        description: "Gets blocks from a given repo.",
        parameters: {
          type: "params",
          required: ["did", "cids"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            cids: {
              type: "array",
              items: {
                type: "string",
                format: "cid"
              }
            }
          }
        },
        output: {
          encoding: "application/vnd.ipld.car"
        }
      }
    }
  },
  ComAtprotoSyncGetCheckout: {
    lexicon: 1,
    id: "com.atproto.sync.getCheckout",
    defs: {
      main: {
        type: "query",
        description: "Gets the repo state.",
        parameters: {
          type: "params",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            commit: {
              type: "string",
              format: "cid",
              description: "The commit to get the checkout from. Defaults to current HEAD."
            }
          }
        },
        output: {
          encoding: "application/vnd.ipld.car"
        }
      }
    }
  },
  ComAtprotoSyncGetCommitPath: {
    lexicon: 1,
    id: "com.atproto.sync.getCommitPath",
    defs: {
      main: {
        type: "query",
        description: "Gets the path of repo commits",
        parameters: {
          type: "params",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            latest: {
              type: "string",
              format: "cid",
              description: "The most recent commit"
            },
            earliest: {
              type: "string",
              format: "cid",
              description: "The earliest commit to start from"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["commits"],
            properties: {
              commits: {
                type: "array",
                items: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoSyncGetHead: {
    lexicon: 1,
    id: "com.atproto.sync.getHead",
    defs: {
      main: {
        type: "query",
        description: "Gets the current HEAD CID of a repo.",
        parameters: {
          type: "params",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["root"],
            properties: {
              root: {
                type: "string",
                format: "cid"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoSyncGetRecord: {
    lexicon: 1,
    id: "com.atproto.sync.getRecord",
    defs: {
      main: {
        type: "query",
        description: "Gets blocks needed for existence or non-existence of record.",
        parameters: {
          type: "params",
          required: ["did", "collection", "rkey"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            collection: {
              type: "string",
              format: "nsid"
            },
            rkey: {
              type: "string"
            },
            commit: {
              type: "string",
              format: "cid",
              description: "An optional past commit CID."
            }
          }
        },
        output: {
          encoding: "application/vnd.ipld.car"
        }
      }
    }
  },
  ComAtprotoSyncGetRepo: {
    lexicon: 1,
    id: "com.atproto.sync.getRepo",
    defs: {
      main: {
        type: "query",
        description: "Gets the repo state.",
        parameters: {
          type: "params",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            earliest: {
              type: "string",
              format: "cid",
              description: "The earliest commit in the commit range (not inclusive)"
            },
            latest: {
              type: "string",
              format: "cid",
              description: "The latest commit you in the commit range (inclusive"
            }
          }
        },
        output: {
          encoding: "application/vnd.ipld.car"
        }
      }
    }
  },
  ComAtprotoSyncListBlobs: {
    lexicon: 1,
    id: "com.atproto.sync.listBlobs",
    defs: {
      main: {
        type: "query",
        description: "List blob cids for some range of commits",
        parameters: {
          type: "params",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            latest: {
              type: "string",
              format: "cid",
              description: "The most recent commit"
            },
            earliest: {
              type: "string",
              format: "cid",
              description: "The earliest commit to start from"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["cids"],
            properties: {
              cids: {
                type: "array",
                items: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoSyncListRepos: {
    lexicon: 1,
    id: "com.atproto.sync.listRepos",
    defs: {
      main: {
        type: "query",
        description: "List dids and root cids of hosted repos",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 1e3,
              default: 500
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repos"],
            properties: {
              cursor: {
                type: "string"
              },
              repos: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.sync.listRepos#repo"
                }
              }
            }
          }
        }
      },
      repo: {
        type: "object",
        required: ["did", "head"],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          head: {
            type: "string",
            format: "cid"
          }
        }
      }
    }
  },
  ComAtprotoSyncNotifyOfUpdate: {
    lexicon: 1,
    id: "com.atproto.sync.notifyOfUpdate",
    defs: {
      main: {
        type: "query",
        description: "Notify a crawling service of a recent update. Often when a long break between updates causes the connection with the crawling service to break.",
        parameters: {
          type: "params",
          required: ["hostname"],
          properties: {
            hostname: {
              type: "string",
              description: "Hostname of the service that is notifying of update."
            }
          }
        }
      }
    }
  },
  ComAtprotoSyncRequestCrawl: {
    lexicon: 1,
    id: "com.atproto.sync.requestCrawl",
    defs: {
      main: {
        type: "query",
        description: "Request a service to persistently crawl hosted repos.",
        parameters: {
          type: "params",
          required: ["hostname"],
          properties: {
            hostname: {
              type: "string",
              description: "Hostname of the service that is requesting to be crawled."
            }
          }
        }
      }
    }
  },
  ComAtprotoSyncSubscribeRepos: {
    lexicon: 1,
    id: "com.atproto.sync.subscribeRepos",
    defs: {
      main: {
        type: "subscription",
        description: "Subscribe to repo updates",
        parameters: {
          type: "params",
          properties: {
            cursor: {
              type: "integer",
              description: "The last known event to backfill from."
            }
          }
        },
        message: {
          schema: {
            type: "union",
            refs: [
              "lex:com.atproto.sync.subscribeRepos#commit",
              "lex:com.atproto.sync.subscribeRepos#handle",
              "lex:com.atproto.sync.subscribeRepos#migrate",
              "lex:com.atproto.sync.subscribeRepos#tombstone",
              "lex:com.atproto.sync.subscribeRepos#info"
            ]
          }
        },
        errors: [
          {
            name: "FutureCursor"
          }
        ]
      },
      commit: {
        type: "object",
        required: [
          "seq",
          "rebase",
          "tooBig",
          "repo",
          "commit",
          "prev",
          "blocks",
          "ops",
          "blobs",
          "time"
        ],
        nullable: ["prev"],
        properties: {
          seq: {
            type: "integer"
          },
          rebase: {
            type: "boolean"
          },
          tooBig: {
            type: "boolean"
          },
          repo: {
            type: "string",
            format: "did"
          },
          commit: {
            type: "cid-link"
          },
          prev: {
            type: "cid-link"
          },
          blocks: {
            type: "bytes",
            description: "CAR file containing relevant blocks",
            maxLength: 1e6
          },
          ops: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.sync.subscribeRepos#repoOp"
            },
            maxLength: 200
          },
          blobs: {
            type: "array",
            items: {
              type: "cid-link"
            }
          },
          time: {
            type: "string",
            format: "datetime"
          }
        }
      },
      handle: {
        type: "object",
        required: ["seq", "did", "handle", "time"],
        properties: {
          seq: {
            type: "integer"
          },
          did: {
            type: "string",
            format: "did"
          },
          handle: {
            type: "string",
            format: "handle"
          },
          time: {
            type: "string",
            format: "datetime"
          }
        }
      },
      migrate: {
        type: "object",
        required: ["seq", "did", "migrateTo", "time"],
        nullable: ["migrateTo"],
        properties: {
          seq: {
            type: "integer"
          },
          did: {
            type: "string",
            format: "did"
          },
          migrateTo: {
            type: "string"
          },
          time: {
            type: "string",
            format: "datetime"
          }
        }
      },
      tombstone: {
        type: "object",
        required: ["seq", "did", "time"],
        properties: {
          seq: {
            type: "integer"
          },
          did: {
            type: "string",
            format: "did"
          },
          time: {
            type: "string",
            format: "datetime"
          }
        }
      },
      info: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            knownValues: ["OutdatedCursor"]
          },
          message: {
            type: "string"
          }
        }
      },
      repoOp: {
        type: "object",
        required: ["action", "path", "cid"],
        nullable: ["cid"],
        properties: {
          action: {
            type: "string",
            knownValues: ["create", "update", "delete"]
          },
          path: {
            type: "string"
          },
          cid: {
            type: "cid-link"
          }
        }
      }
    }
  },
  AppBskyActorDefs: {
    lexicon: 1,
    id: "app.bsky.actor.defs",
    description: "A reference to an actor in the network.",
    defs: {
      profileViewBasic: {
        type: "object",
        required: ["did", "handle"],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          handle: {
            type: "string",
            format: "handle"
          },
          displayName: {
            type: "string",
            maxGraphemes: 64,
            maxLength: 640
          },
          avatar: {
            type: "string"
          },
          viewer: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#viewerState"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          }
        }
      },
      profileView: {
        type: "object",
        required: ["did", "handle"],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          handle: {
            type: "string",
            format: "handle"
          },
          displayName: {
            type: "string",
            maxGraphemes: 64,
            maxLength: 640
          },
          description: {
            type: "string",
            maxGraphemes: 256,
            maxLength: 2560
          },
          avatar: {
            type: "string"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          viewer: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#viewerState"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          }
        }
      },
      profileViewDetailed: {
        type: "object",
        required: ["did", "handle"],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          handle: {
            type: "string",
            format: "handle"
          },
          displayName: {
            type: "string",
            maxGraphemes: 64,
            maxLength: 640
          },
          description: {
            type: "string",
            maxGraphemes: 256,
            maxLength: 2560
          },
          avatar: {
            type: "string"
          },
          banner: {
            type: "string"
          },
          followersCount: {
            type: "integer"
          },
          followsCount: {
            type: "integer"
          },
          postsCount: {
            type: "integer"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          viewer: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#viewerState"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          }
        }
      },
      viewerState: {
        type: "object",
        properties: {
          muted: {
            type: "boolean"
          },
          following: {
            type: "string",
            format: "at-uri"
          },
          followedBy: {
            type: "string",
            format: "at-uri"
          }
        }
      }
    }
  },
  AppBskyActorGetProfile: {
    lexicon: 1,
    id: "app.bsky.actor.getProfile",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          required: ["actor"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileViewDetailed"
          }
        }
      }
    }
  },
  AppBskyActorGetProfiles: {
    lexicon: 1,
    id: "app.bsky.actor.getProfiles",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          required: ["actors"],
          properties: {
            actors: {
              type: "array",
              items: {
                type: "string",
                format: "at-identifier"
              },
              maxLength: 25
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["profiles"],
            properties: {
              profiles: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileViewDetailed"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyActorGetSuggestions: {
    lexicon: 1,
    id: "app.bsky.actor.getSuggestions",
    defs: {
      main: {
        type: "query",
        description: "Get a list of actors suggested for following. Used in discovery UIs.",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actors"],
            properties: {
              cursor: {
                type: "string"
              },
              actors: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyActorProfile: {
    lexicon: 1,
    id: "app.bsky.actor.profile",
    defs: {
      main: {
        type: "record",
        key: "literal:self",
        record: {
          type: "object",
          properties: {
            displayName: {
              type: "string",
              maxGraphemes: 64,
              maxLength: 640
            },
            description: {
              type: "string",
              maxGraphemes: 256,
              maxLength: 2560
            },
            avatar: {
              type: "blob",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            banner: {
              type: "blob",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            }
          }
        }
      }
    }
  },
  AppBskyActorSearchActors: {
    lexicon: 1,
    id: "app.bsky.actor.searchActors",
    defs: {
      main: {
        type: "query",
        description: "Find actors matching search criteria.",
        parameters: {
          type: "params",
          properties: {
            term: {
              type: "string"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actors"],
            properties: {
              cursor: {
                type: "string"
              },
              actors: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyActorSearchActorsTypeahead: {
    lexicon: 1,
    id: "app.bsky.actor.searchActorsTypeahead",
    defs: {
      main: {
        type: "query",
        description: "Find actor suggestions for a search term.",
        parameters: {
          type: "params",
          properties: {
            term: {
              type: "string"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actors"],
            properties: {
              actors: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileViewBasic"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyEmbedExternal: {
    lexicon: 1,
    id: "app.bsky.embed.external",
    description: "A representation of some externally linked content, embedded in another form of content",
    defs: {
      main: {
        type: "object",
        required: ["external"],
        properties: {
          external: {
            type: "ref",
            ref: "lex:app.bsky.embed.external#external"
          }
        }
      },
      external: {
        type: "object",
        required: ["uri", "title", "description"],
        properties: {
          uri: {
            type: "string",
            format: "uri"
          },
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          thumb: {
            type: "blob",
            accept: ["image/*"],
            maxSize: 1e6
          }
        }
      },
      view: {
        type: "object",
        required: ["external"],
        properties: {
          external: {
            type: "ref",
            ref: "lex:app.bsky.embed.external#viewExternal"
          }
        }
      },
      viewExternal: {
        type: "object",
        required: ["uri", "title", "description"],
        properties: {
          uri: {
            type: "string",
            format: "uri"
          },
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          thumb: {
            type: "string"
          }
        }
      }
    }
  },
  AppBskyEmbedImages: {
    lexicon: 1,
    id: "app.bsky.embed.images",
    description: "A set of images embedded in some other form of content",
    defs: {
      main: {
        type: "object",
        required: ["images"],
        properties: {
          images: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:app.bsky.embed.images#image"
            },
            maxLength: 4
          }
        }
      },
      image: {
        type: "object",
        required: ["image", "alt"],
        properties: {
          image: {
            type: "blob",
            accept: ["image/*"],
            maxSize: 1e6
          },
          alt: {
            type: "string"
          }
        }
      },
      view: {
        type: "object",
        required: ["images"],
        properties: {
          images: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:app.bsky.embed.images#viewImage"
            },
            maxLength: 4
          }
        }
      },
      viewImage: {
        type: "object",
        required: ["thumb", "fullsize", "alt"],
        properties: {
          thumb: {
            type: "string"
          },
          fullsize: {
            type: "string"
          },
          alt: {
            type: "string"
          }
        }
      }
    }
  },
  AppBskyEmbedRecord: {
    lexicon: 1,
    id: "app.bsky.embed.record",
    description: "A representation of a record embedded in another form of content",
    defs: {
      main: {
        type: "object",
        required: ["record"],
        properties: {
          record: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef"
          }
        }
      },
      view: {
        type: "object",
        required: ["record"],
        properties: {
          record: {
            type: "union",
            refs: [
              "lex:app.bsky.embed.record#viewRecord",
              "lex:app.bsky.embed.record#viewNotFound"
            ]
          }
        }
      },
      viewRecord: {
        type: "object",
        required: ["uri", "cid", "author", "value", "indexedAt"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          author: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileViewBasic"
          },
          value: {
            type: "unknown"
          },
          embeds: {
            type: "array",
            items: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.images#view",
                "lex:app.bsky.embed.external#view",
                "lex:app.bsky.embed.record#view",
                "lex:app.bsky.embed.recordWithMedia#view"
              ]
            }
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          }
        }
      },
      viewNotFound: {
        type: "object",
        required: ["uri"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          }
        }
      }
    }
  },
  AppBskyEmbedRecordWithMedia: {
    lexicon: 1,
    id: "app.bsky.embed.recordWithMedia",
    description: "A representation of a record embedded in another form of content, alongside other compatible embeds",
    defs: {
      main: {
        type: "object",
        required: ["record", "media"],
        properties: {
          record: {
            type: "ref",
            ref: "lex:app.bsky.embed.record"
          },
          media: {
            type: "union",
            refs: ["lex:app.bsky.embed.images", "lex:app.bsky.embed.external"]
          }
        }
      },
      view: {
        type: "object",
        required: ["record", "media"],
        properties: {
          record: {
            type: "ref",
            ref: "lex:app.bsky.embed.record#view"
          },
          media: {
            type: "union",
            refs: [
              "lex:app.bsky.embed.images#view",
              "lex:app.bsky.embed.external#view"
            ]
          }
        }
      }
    }
  },
  AppBskyFeedDefs: {
    lexicon: 1,
    id: "app.bsky.feed.defs",
    defs: {
      postView: {
        type: "object",
        required: ["uri", "cid", "author", "record", "indexedAt"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          author: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileViewBasic"
          },
          record: {
            type: "unknown"
          },
          embed: {
            type: "union",
            refs: [
              "lex:app.bsky.embed.images#view",
              "lex:app.bsky.embed.external#view",
              "lex:app.bsky.embed.record#view",
              "lex:app.bsky.embed.recordWithMedia#view"
            ]
          },
          replyCount: {
            type: "integer"
          },
          repostCount: {
            type: "integer"
          },
          likeCount: {
            type: "integer"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          viewer: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#viewerState"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          }
        }
      },
      viewerState: {
        type: "object",
        properties: {
          repost: {
            type: "string",
            format: "at-uri"
          },
          like: {
            type: "string",
            format: "at-uri"
          }
        }
      },
      feedViewPost: {
        type: "object",
        required: ["post"],
        properties: {
          post: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#postView"
          },
          reply: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#replyRef"
          },
          reason: {
            type: "union",
            refs: ["lex:app.bsky.feed.defs#reasonRepost"]
          }
        }
      },
      replyRef: {
        type: "object",
        required: ["root", "parent"],
        properties: {
          root: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#postView"
          },
          parent: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#postView"
          }
        }
      },
      reasonRepost: {
        type: "object",
        required: ["by", "indexedAt"],
        properties: {
          by: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileViewBasic"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          }
        }
      },
      threadViewPost: {
        type: "object",
        required: ["post"],
        properties: {
          post: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#postView"
          },
          parent: {
            type: "union",
            refs: [
              "lex:app.bsky.feed.defs#threadViewPost",
              "lex:app.bsky.feed.defs#notFoundPost"
            ]
          },
          replies: {
            type: "array",
            items: {
              type: "union",
              refs: [
                "lex:app.bsky.feed.defs#threadViewPost",
                "lex:app.bsky.feed.defs#notFoundPost"
              ]
            }
          }
        }
      },
      notFoundPost: {
        type: "object",
        required: ["uri", "notFound"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          notFound: {
            type: "boolean",
            const: true
          }
        }
      }
    }
  },
  AppBskyFeedGetAuthorFeed: {
    lexicon: 1,
    id: "app.bsky.feed.getAuthorFeed",
    defs: {
      main: {
        type: "query",
        description: "A view of an actor's feed.",
        parameters: {
          type: "params",
          required: ["actor"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feed"],
            properties: {
              cursor: {
                type: "string"
              },
              feed: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#feedViewPost"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyFeedGetLikes: {
    lexicon: 1,
    id: "app.bsky.feed.getLikes",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["uri", "likes"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              },
              cursor: {
                type: "string"
              },
              likes: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.getLikes#like"
                }
              }
            }
          }
        }
      },
      like: {
        type: "object",
        required: ["indexedAt", "createdAt", "actor"],
        properties: {
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          actor: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileView"
          }
        }
      }
    }
  },
  AppBskyFeedGetPostThread: {
    lexicon: 1,
    id: "app.bsky.feed.getPostThread",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            depth: {
              type: "integer"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["thread"],
            properties: {
              thread: {
                type: "union",
                refs: [
                  "lex:app.bsky.feed.defs#threadViewPost",
                  "lex:app.bsky.feed.defs#notFoundPost"
                ]
              }
            }
          }
        },
        errors: [
          {
            name: "NotFound"
          }
        ]
      }
    }
  },
  AppBskyFeedGetRepostedBy: {
    lexicon: 1,
    id: "app.bsky.feed.getRepostedBy",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["uri", "repostedBy"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              },
              cursor: {
                type: "string"
              },
              repostedBy: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyFeedGetTimeline: {
    lexicon: 1,
    id: "app.bsky.feed.getTimeline",
    defs: {
      main: {
        type: "query",
        description: "A view of the user's home timeline.",
        parameters: {
          type: "params",
          properties: {
            algorithm: {
              type: "string"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feed"],
            properties: {
              cursor: {
                type: "string"
              },
              feed: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#feedViewPost"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyFeedLike: {
    lexicon: 1,
    id: "app.bsky.feed.like",
    defs: {
      main: {
        type: "record",
        key: "tid",
        record: {
          type: "object",
          required: ["subject", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppBskyFeedPost: {
    lexicon: 1,
    id: "app.bsky.feed.post",
    defs: {
      main: {
        type: "record",
        key: "tid",
        record: {
          type: "object",
          required: ["text", "createdAt"],
          properties: {
            text: {
              type: "string",
              maxLength: 3e3,
              maxGraphemes: 300
            },
            entities: {
              type: "array",
              description: "Deprecated: replaced by app.bsky.richtext.facet.",
              items: {
                type: "ref",
                ref: "lex:app.bsky.feed.post#entity"
              }
            },
            facets: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            reply: {
              type: "ref",
              ref: "lex:app.bsky.feed.post#replyRef"
            },
            embed: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.images",
                "lex:app.bsky.embed.external",
                "lex:app.bsky.embed.record",
                "lex:app.bsky.embed.recordWithMedia"
              ]
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      },
      replyRef: {
        type: "object",
        required: ["root", "parent"],
        properties: {
          root: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef"
          },
          parent: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef"
          }
        }
      },
      entity: {
        type: "object",
        description: "Deprecated: use facets instead.",
        required: ["index", "type", "value"],
        properties: {
          index: {
            type: "ref",
            ref: "lex:app.bsky.feed.post#textSlice"
          },
          type: {
            type: "string",
            description: "Expected values are 'mention' and 'link'."
          },
          value: {
            type: "string"
          }
        }
      },
      textSlice: {
        type: "object",
        description: "Deprecated. Use app.bsky.richtext instead -- A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings.",
        required: ["start", "end"],
        properties: {
          start: {
            type: "integer",
            minimum: 0
          },
          end: {
            type: "integer",
            minimum: 0
          }
        }
      }
    }
  },
  AppBskyFeedRepost: {
    lexicon: 1,
    id: "app.bsky.feed.repost",
    defs: {
      main: {
        type: "record",
        key: "tid",
        record: {
          type: "object",
          required: ["subject", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppBskyGraphFollow: {
    lexicon: 1,
    id: "app.bsky.graph.follow",
    defs: {
      main: {
        type: "record",
        description: "A social follow.",
        key: "tid",
        record: {
          type: "object",
          required: ["subject", "createdAt"],
          properties: {
            subject: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppBskyGraphGetFollowers: {
    lexicon: 1,
    id: "app.bsky.graph.getFollowers",
    defs: {
      main: {
        type: "query",
        description: "Who is following an actor?",
        parameters: {
          type: "params",
          required: ["actor"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["subject", "followers"],
            properties: {
              subject: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#profileView"
              },
              cursor: {
                type: "string"
              },
              followers: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphGetFollows: {
    lexicon: 1,
    id: "app.bsky.graph.getFollows",
    defs: {
      main: {
        type: "query",
        description: "Who is an actor following?",
        parameters: {
          type: "params",
          required: ["actor"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["subject", "follows"],
            properties: {
              subject: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#profileView"
              },
              cursor: {
                type: "string"
              },
              follows: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphGetMutes: {
    lexicon: 1,
    id: "app.bsky.graph.getMutes",
    defs: {
      main: {
        type: "query",
        description: "Who does the viewer mute?",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["mutes"],
            properties: {
              cursor: {
                type: "string"
              },
              mutes: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphMuteActor: {
    lexicon: 1,
    id: "app.bsky.graph.muteActor",
    defs: {
      main: {
        type: "procedure",
        description: "Mute an actor by did or handle.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphUnmuteActor: {
    lexicon: 1,
    id: "app.bsky.graph.unmuteActor",
    defs: {
      main: {
        type: "procedure",
        description: "Unmute an actor by did or handle.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              }
            }
          }
        }
      }
    }
  },
  AppBskyNotificationGetUnreadCount: {
    lexicon: 1,
    id: "app.bsky.notification.getUnreadCount",
    defs: {
      main: {
        type: "query",
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["count"],
            properties: {
              count: {
                type: "integer"
              }
            }
          }
        }
      }
    }
  },
  AppBskyNotificationListNotifications: {
    lexicon: 1,
    id: "app.bsky.notification.listNotifications",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["notifications"],
            properties: {
              cursor: {
                type: "string"
              },
              notifications: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.notification.listNotifications#notification"
                }
              }
            }
          }
        }
      },
      notification: {
        type: "object",
        required: [
          "uri",
          "cid",
          "author",
          "reason",
          "record",
          "isRead",
          "indexedAt"
        ],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          author: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileView"
          },
          reason: {
            type: "string",
            description: "Expected values are 'like', 'repost', 'follow', 'mention', 'reply', and 'quote'.",
            knownValues: [
              "like",
              "repost",
              "follow",
              "mention",
              "reply",
              "quote"
            ]
          },
          reasonSubject: {
            type: "string",
            format: "at-uri"
          },
          record: {
            type: "unknown"
          },
          isRead: {
            type: "boolean"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          }
        }
      }
    }
  },
  AppBskyNotificationUpdateSeen: {
    lexicon: 1,
    id: "app.bsky.notification.updateSeen",
    defs: {
      main: {
        type: "procedure",
        description: "Notify server that the user has seen notifications.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["seenAt"],
            properties: {
              seenAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    }
  },
  AppBskyRichtextFacet: {
    lexicon: 1,
    id: "app.bsky.richtext.facet",
    defs: {
      main: {
        type: "object",
        required: ["index", "features"],
        properties: {
          index: {
            type: "ref",
            ref: "lex:app.bsky.richtext.facet#byteSlice"
          },
          features: {
            type: "array",
            items: {
              type: "union",
              refs: [
                "lex:app.bsky.richtext.facet#mention",
                "lex:app.bsky.richtext.facet#link"
              ]
            }
          }
        }
      },
      mention: {
        type: "object",
        description: "A facet feature for actor mentions.",
        required: ["did"],
        properties: {
          did: {
            type: "string",
            format: "did"
          }
        }
      },
      link: {
        type: "object",
        description: "A facet feature for links.",
        required: ["uri"],
        properties: {
          uri: {
            type: "string",
            format: "uri"
          }
        }
      },
      byteSlice: {
        type: "object",
        description: "A text segment. Start is inclusive, end is exclusive. Indices are for utf8-encoded strings.",
        required: ["byteStart", "byteEnd"],
        properties: {
          byteStart: {
            type: "integer",
            minimum: 0
          },
          byteEnd: {
            type: "integer",
            minimum: 0
          }
        }
      }
    }
  },
  AppBskyUnspeccedGetPopular: {
    lexicon: 1,
    id: "app.bsky.unspecced.getPopular",
    defs: {
      main: {
        type: "query",
        description: "An unspecced view of globally popular items",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feed"],
            properties: {
              cursor: {
                type: "string"
              },
              feed: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#feedViewPost"
                }
              }
            }
          }
        }
      }
    }
  }
};
var schemas = Object.values(schemaDict);
var lexicons = new Lexicons(schemas);

// src/client/types/com/atproto/admin/disableInviteCodes.ts
var disableInviteCodes_exports = {};
__export(disableInviteCodes_exports, {
  toKnownErr: () => toKnownErr
});
function toKnownErr(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getInviteCodes.ts
var getInviteCodes_exports = {};
__export(getInviteCodes_exports, {
  toKnownErr: () => toKnownErr2
});
function toKnownErr2(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getModerationAction.ts
var getModerationAction_exports = {};
__export(getModerationAction_exports, {
  toKnownErr: () => toKnownErr3
});
function toKnownErr3(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getModerationActions.ts
var getModerationActions_exports = {};
__export(getModerationActions_exports, {
  toKnownErr: () => toKnownErr4
});
function toKnownErr4(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getModerationReport.ts
var getModerationReport_exports = {};
__export(getModerationReport_exports, {
  toKnownErr: () => toKnownErr5
});
function toKnownErr5(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getModerationReports.ts
var getModerationReports_exports = {};
__export(getModerationReports_exports, {
  toKnownErr: () => toKnownErr6
});
function toKnownErr6(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getRecord.ts
var getRecord_exports = {};
__export(getRecord_exports, {
  toKnownErr: () => toKnownErr7
});
function toKnownErr7(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getRepo.ts
var getRepo_exports = {};
__export(getRepo_exports, {
  toKnownErr: () => toKnownErr8
});
function toKnownErr8(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/resolveModerationReports.ts
var resolveModerationReports_exports = {};
__export(resolveModerationReports_exports, {
  toKnownErr: () => toKnownErr9
});
function toKnownErr9(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/reverseModerationAction.ts
var reverseModerationAction_exports = {};
__export(reverseModerationAction_exports, {
  toKnownErr: () => toKnownErr10
});
function toKnownErr10(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/searchRepos.ts
var searchRepos_exports = {};
__export(searchRepos_exports, {
  toKnownErr: () => toKnownErr11
});
function toKnownErr11(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/takeModerationAction.ts
var takeModerationAction_exports = {};
__export(takeModerationAction_exports, {
  SubjectHasActionError: () => SubjectHasActionError,
  toKnownErr: () => toKnownErr12
});
var SubjectHasActionError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
function toKnownErr12(e) {
  if (e instanceof XRPCError) {
    if (e.error === "SubjectHasAction")
      return new SubjectHasActionError(e);
  }
  return e;
}

// src/client/types/com/atproto/admin/updateAccountHandle.ts
var updateAccountHandle_exports = {};
__export(updateAccountHandle_exports, {
  toKnownErr: () => toKnownErr13
});
function toKnownErr13(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/identity/resolveHandle.ts
var resolveHandle_exports = {};
__export(resolveHandle_exports, {
  toKnownErr: () => toKnownErr14
});
function toKnownErr14(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/identity/updateHandle.ts
var updateHandle_exports = {};
__export(updateHandle_exports, {
  toKnownErr: () => toKnownErr15
});
function toKnownErr15(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/label/queryLabels.ts
var queryLabels_exports = {};
__export(queryLabels_exports, {
  toKnownErr: () => toKnownErr16
});
function toKnownErr16(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/moderation/createReport.ts
var createReport_exports = {};
__export(createReport_exports, {
  toKnownErr: () => toKnownErr17
});
function toKnownErr17(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/repo/applyWrites.ts
var applyWrites_exports = {};
__export(applyWrites_exports, {
  InvalidSwapError: () => InvalidSwapError,
  isCreate: () => isCreate,
  isDelete: () => isDelete,
  isUpdate: () => isUpdate,
  toKnownErr: () => toKnownErr18,
  validateCreate: () => validateCreate,
  validateDelete: () => validateDelete,
  validateUpdate: () => validateUpdate
});

// src/client/util.ts
function isObj2(v) {
  return typeof v === "object" && v !== null;
}
function hasProp2(data, prop) {
  return prop in data;
}

// src/client/types/com/atproto/repo/applyWrites.ts
var InvalidSwapError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
function toKnownErr18(e) {
  if (e instanceof XRPCError) {
    if (e.error === "InvalidSwap")
      return new InvalidSwapError(e);
  }
  return e;
}
function isCreate(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.repo.applyWrites#create";
}
function validateCreate(v) {
  return lexicons.validate("com.atproto.repo.applyWrites#create", v);
}
function isUpdate(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.repo.applyWrites#update";
}
function validateUpdate(v) {
  return lexicons.validate("com.atproto.repo.applyWrites#update", v);
}
function isDelete(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.repo.applyWrites#delete";
}
function validateDelete(v) {
  return lexicons.validate("com.atproto.repo.applyWrites#delete", v);
}

// src/client/types/com/atproto/repo/createRecord.ts
var createRecord_exports = {};
__export(createRecord_exports, {
  InvalidSwapError: () => InvalidSwapError2,
  toKnownErr: () => toKnownErr19
});
var InvalidSwapError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
function toKnownErr19(e) {
  if (e instanceof XRPCError) {
    if (e.error === "InvalidSwap")
      return new InvalidSwapError2(e);
  }
  return e;
}

// src/client/types/com/atproto/repo/deleteRecord.ts
var deleteRecord_exports = {};
__export(deleteRecord_exports, {
  InvalidSwapError: () => InvalidSwapError3,
  toKnownErr: () => toKnownErr20
});
var InvalidSwapError3 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
function toKnownErr20(e) {
  if (e instanceof XRPCError) {
    if (e.error === "InvalidSwap")
      return new InvalidSwapError3(e);
  }
  return e;
}

// src/client/types/com/atproto/repo/describeRepo.ts
var describeRepo_exports = {};
__export(describeRepo_exports, {
  toKnownErr: () => toKnownErr21
});
function toKnownErr21(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/repo/getRecord.ts
var getRecord_exports2 = {};
__export(getRecord_exports2, {
  toKnownErr: () => toKnownErr22
});
function toKnownErr22(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/repo/listRecords.ts
var listRecords_exports = {};
__export(listRecords_exports, {
  isRecord: () => isRecord,
  toKnownErr: () => toKnownErr23,
  validateRecord: () => validateRecord
});
function toKnownErr23(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}
function isRecord(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.repo.listRecords#record";
}
function validateRecord(v) {
  return lexicons.validate("com.atproto.repo.listRecords#record", v);
}

// src/client/types/com/atproto/repo/putRecord.ts
var putRecord_exports = {};
__export(putRecord_exports, {
  InvalidSwapError: () => InvalidSwapError4,
  toKnownErr: () => toKnownErr24
});
var InvalidSwapError4 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
function toKnownErr24(e) {
  if (e instanceof XRPCError) {
    if (e.error === "InvalidSwap")
      return new InvalidSwapError4(e);
  }
  return e;
}

// src/client/types/com/atproto/repo/uploadBlob.ts
var uploadBlob_exports = {};
__export(uploadBlob_exports, {
  toKnownErr: () => toKnownErr25
});
function toKnownErr25(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/createAccount.ts
var createAccount_exports = {};
__export(createAccount_exports, {
  HandleNotAvailableError: () => HandleNotAvailableError,
  InvalidHandleError: () => InvalidHandleError2,
  InvalidInviteCodeError: () => InvalidInviteCodeError,
  InvalidPasswordError: () => InvalidPasswordError,
  UnsupportedDomainError: () => UnsupportedDomainError,
  toKnownErr: () => toKnownErr26
});
var InvalidHandleError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
var InvalidPasswordError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
var InvalidInviteCodeError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
var HandleNotAvailableError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
var UnsupportedDomainError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
function toKnownErr26(e) {
  if (e instanceof XRPCError) {
    if (e.error === "InvalidHandle")
      return new InvalidHandleError2(e);
    if (e.error === "InvalidPassword")
      return new InvalidPasswordError(e);
    if (e.error === "InvalidInviteCode")
      return new InvalidInviteCodeError(e);
    if (e.error === "HandleNotAvailable")
      return new HandleNotAvailableError(e);
    if (e.error === "UnsupportedDomain")
      return new UnsupportedDomainError(e);
  }
  return e;
}

// src/client/types/com/atproto/server/createInviteCode.ts
var createInviteCode_exports = {};
__export(createInviteCode_exports, {
  toKnownErr: () => toKnownErr27
});
function toKnownErr27(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/createInviteCodes.ts
var createInviteCodes_exports = {};
__export(createInviteCodes_exports, {
  toKnownErr: () => toKnownErr28
});
function toKnownErr28(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/createSession.ts
var createSession_exports = {};
__export(createSession_exports, {
  AccountTakedownError: () => AccountTakedownError,
  toKnownErr: () => toKnownErr29
});
var AccountTakedownError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
function toKnownErr29(e) {
  if (e instanceof XRPCError) {
    if (e.error === "AccountTakedown")
      return new AccountTakedownError(e);
  }
  return e;
}

// src/client/types/com/atproto/server/deleteAccount.ts
var deleteAccount_exports = {};
__export(deleteAccount_exports, {
  ExpiredTokenError: () => ExpiredTokenError,
  InvalidTokenError: () => InvalidTokenError,
  toKnownErr: () => toKnownErr30
});
var ExpiredTokenError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
var InvalidTokenError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
function toKnownErr30(e) {
  if (e instanceof XRPCError) {
    if (e.error === "ExpiredToken")
      return new ExpiredTokenError(e);
    if (e.error === "InvalidToken")
      return new InvalidTokenError(e);
  }
  return e;
}

// src/client/types/com/atproto/server/deleteSession.ts
var deleteSession_exports = {};
__export(deleteSession_exports, {
  toKnownErr: () => toKnownErr31
});
function toKnownErr31(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/describeServer.ts
var describeServer_exports = {};
__export(describeServer_exports, {
  isLinks: () => isLinks,
  toKnownErr: () => toKnownErr32,
  validateLinks: () => validateLinks
});
function toKnownErr32(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}
function isLinks(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.server.describeServer#links";
}
function validateLinks(v) {
  return lexicons.validate("com.atproto.server.describeServer#links", v);
}

// src/client/types/com/atproto/server/getAccountInviteCodes.ts
var getAccountInviteCodes_exports = {};
__export(getAccountInviteCodes_exports, {
  DuplicateCreateError: () => DuplicateCreateError,
  toKnownErr: () => toKnownErr33
});
var DuplicateCreateError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
function toKnownErr33(e) {
  if (e instanceof XRPCError) {
    if (e.error === "DuplicateCreate")
      return new DuplicateCreateError(e);
  }
  return e;
}

// src/client/types/com/atproto/server/getSession.ts
var getSession_exports = {};
__export(getSession_exports, {
  toKnownErr: () => toKnownErr34
});
function toKnownErr34(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/refreshSession.ts
var refreshSession_exports = {};
__export(refreshSession_exports, {
  AccountTakedownError: () => AccountTakedownError2,
  toKnownErr: () => toKnownErr35
});
var AccountTakedownError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
function toKnownErr35(e) {
  if (e instanceof XRPCError) {
    if (e.error === "AccountTakedown")
      return new AccountTakedownError2(e);
  }
  return e;
}

// src/client/types/com/atproto/server/requestAccountDelete.ts
var requestAccountDelete_exports = {};
__export(requestAccountDelete_exports, {
  toKnownErr: () => toKnownErr36
});
function toKnownErr36(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/requestPasswordReset.ts
var requestPasswordReset_exports = {};
__export(requestPasswordReset_exports, {
  toKnownErr: () => toKnownErr37
});
function toKnownErr37(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/resetPassword.ts
var resetPassword_exports = {};
__export(resetPassword_exports, {
  ExpiredTokenError: () => ExpiredTokenError2,
  InvalidTokenError: () => InvalidTokenError2,
  toKnownErr: () => toKnownErr38
});
var ExpiredTokenError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
var InvalidTokenError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
function toKnownErr38(e) {
  if (e instanceof XRPCError) {
    if (e.error === "ExpiredToken")
      return new ExpiredTokenError2(e);
    if (e.error === "InvalidToken")
      return new InvalidTokenError2(e);
  }
  return e;
}

// src/client/types/com/atproto/sync/getBlob.ts
var getBlob_exports = {};
__export(getBlob_exports, {
  toKnownErr: () => toKnownErr39
});
function toKnownErr39(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/getBlocks.ts
var getBlocks_exports = {};
__export(getBlocks_exports, {
  toKnownErr: () => toKnownErr40
});
function toKnownErr40(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/getCheckout.ts
var getCheckout_exports = {};
__export(getCheckout_exports, {
  toKnownErr: () => toKnownErr41
});
function toKnownErr41(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/getCommitPath.ts
var getCommitPath_exports = {};
__export(getCommitPath_exports, {
  toKnownErr: () => toKnownErr42
});
function toKnownErr42(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/getHead.ts
var getHead_exports = {};
__export(getHead_exports, {
  toKnownErr: () => toKnownErr43
});
function toKnownErr43(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/getRecord.ts
var getRecord_exports3 = {};
__export(getRecord_exports3, {
  toKnownErr: () => toKnownErr44
});
function toKnownErr44(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/getRepo.ts
var getRepo_exports2 = {};
__export(getRepo_exports2, {
  toKnownErr: () => toKnownErr45
});
function toKnownErr45(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/listBlobs.ts
var listBlobs_exports = {};
__export(listBlobs_exports, {
  toKnownErr: () => toKnownErr46
});
function toKnownErr46(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/listRepos.ts
var listRepos_exports = {};
__export(listRepos_exports, {
  isRepo: () => isRepo,
  toKnownErr: () => toKnownErr47,
  validateRepo: () => validateRepo
});
function toKnownErr47(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}
function isRepo(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.listRepos#repo";
}
function validateRepo(v) {
  return lexicons.validate("com.atproto.sync.listRepos#repo", v);
}

// src/client/types/com/atproto/sync/notifyOfUpdate.ts
var notifyOfUpdate_exports = {};
__export(notifyOfUpdate_exports, {
  toKnownErr: () => toKnownErr48
});
function toKnownErr48(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/requestCrawl.ts
var requestCrawl_exports = {};
__export(requestCrawl_exports, {
  toKnownErr: () => toKnownErr49
});
function toKnownErr49(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/actor/getProfile.ts
var getProfile_exports = {};
__export(getProfile_exports, {
  toKnownErr: () => toKnownErr50
});
function toKnownErr50(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/actor/getProfiles.ts
var getProfiles_exports = {};
__export(getProfiles_exports, {
  toKnownErr: () => toKnownErr51
});
function toKnownErr51(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/actor/getSuggestions.ts
var getSuggestions_exports = {};
__export(getSuggestions_exports, {
  toKnownErr: () => toKnownErr52
});
function toKnownErr52(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/actor/searchActors.ts
var searchActors_exports = {};
__export(searchActors_exports, {
  toKnownErr: () => toKnownErr53
});
function toKnownErr53(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/actor/searchActorsTypeahead.ts
var searchActorsTypeahead_exports = {};
__export(searchActorsTypeahead_exports, {
  toKnownErr: () => toKnownErr54
});
function toKnownErr54(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/feed/getAuthorFeed.ts
var getAuthorFeed_exports = {};
__export(getAuthorFeed_exports, {
  toKnownErr: () => toKnownErr55
});
function toKnownErr55(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/feed/getLikes.ts
var getLikes_exports = {};
__export(getLikes_exports, {
  isLike: () => isLike,
  toKnownErr: () => toKnownErr56,
  validateLike: () => validateLike
});
function toKnownErr56(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}
function isLike(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.getLikes#like";
}
function validateLike(v) {
  return lexicons.validate("app.bsky.feed.getLikes#like", v);
}

// src/client/types/app/bsky/feed/getPostThread.ts
var getPostThread_exports = {};
__export(getPostThread_exports, {
  NotFoundError: () => NotFoundError,
  toKnownErr: () => toKnownErr57
});
var NotFoundError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message);
  }
};
function toKnownErr57(e) {
  if (e instanceof XRPCError) {
    if (e.error === "NotFound")
      return new NotFoundError(e);
  }
  return e;
}

// src/client/types/app/bsky/feed/getRepostedBy.ts
var getRepostedBy_exports = {};
__export(getRepostedBy_exports, {
  toKnownErr: () => toKnownErr58
});
function toKnownErr58(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/feed/getTimeline.ts
var getTimeline_exports = {};
__export(getTimeline_exports, {
  toKnownErr: () => toKnownErr59
});
function toKnownErr59(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/getFollowers.ts
var getFollowers_exports = {};
__export(getFollowers_exports, {
  toKnownErr: () => toKnownErr60
});
function toKnownErr60(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/getFollows.ts
var getFollows_exports = {};
__export(getFollows_exports, {
  toKnownErr: () => toKnownErr61
});
function toKnownErr61(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/getMutes.ts
var getMutes_exports = {};
__export(getMutes_exports, {
  toKnownErr: () => toKnownErr62
});
function toKnownErr62(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/muteActor.ts
var muteActor_exports = {};
__export(muteActor_exports, {
  toKnownErr: () => toKnownErr63
});
function toKnownErr63(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/unmuteActor.ts
var unmuteActor_exports = {};
__export(unmuteActor_exports, {
  toKnownErr: () => toKnownErr64
});
function toKnownErr64(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/notification/getUnreadCount.ts
var getUnreadCount_exports = {};
__export(getUnreadCount_exports, {
  toKnownErr: () => toKnownErr65
});
function toKnownErr65(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/notification/listNotifications.ts
var listNotifications_exports = {};
__export(listNotifications_exports, {
  isNotification: () => isNotification,
  toKnownErr: () => toKnownErr66,
  validateNotification: () => validateNotification
});
function toKnownErr66(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}
function isNotification(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.notification.listNotifications#notification";
}
function validateNotification(v) {
  return lexicons.validate(
    "app.bsky.notification.listNotifications#notification",
    v
  );
}

// src/client/types/app/bsky/notification/updateSeen.ts
var updateSeen_exports = {};
__export(updateSeen_exports, {
  toKnownErr: () => toKnownErr67
});
function toKnownErr67(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/unspecced/getPopular.ts
var getPopular_exports = {};
__export(getPopular_exports, {
  toKnownErr: () => toKnownErr68
});
function toKnownErr68(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/defs.ts
var defs_exports = {};
__export(defs_exports, {
  ACKNOWLEDGE: () => ACKNOWLEDGE,
  FLAG: () => FLAG,
  TAKEDOWN: () => TAKEDOWN,
  isActionReversal: () => isActionReversal,
  isActionView: () => isActionView,
  isActionViewCurrent: () => isActionViewCurrent,
  isActionViewDetail: () => isActionViewDetail,
  isBlobView: () => isBlobView,
  isImageDetails: () => isImageDetails,
  isModeration: () => isModeration,
  isModerationDetail: () => isModerationDetail,
  isRecordView: () => isRecordView,
  isRecordViewDetail: () => isRecordViewDetail,
  isRepoRef: () => isRepoRef,
  isRepoView: () => isRepoView,
  isRepoViewDetail: () => isRepoViewDetail,
  isReportView: () => isReportView,
  isReportViewDetail: () => isReportViewDetail,
  isVideoDetails: () => isVideoDetails,
  validateActionReversal: () => validateActionReversal,
  validateActionView: () => validateActionView,
  validateActionViewCurrent: () => validateActionViewCurrent,
  validateActionViewDetail: () => validateActionViewDetail,
  validateBlobView: () => validateBlobView,
  validateImageDetails: () => validateImageDetails,
  validateModeration: () => validateModeration,
  validateModerationDetail: () => validateModerationDetail,
  validateRecordView: () => validateRecordView,
  validateRecordViewDetail: () => validateRecordViewDetail,
  validateRepoRef: () => validateRepoRef,
  validateRepoView: () => validateRepoView,
  validateRepoViewDetail: () => validateRepoViewDetail,
  validateReportView: () => validateReportView,
  validateReportViewDetail: () => validateReportViewDetail,
  validateVideoDetails: () => validateVideoDetails
});
function isActionView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#actionView";
}
function validateActionView(v) {
  return lexicons.validate("com.atproto.admin.defs#actionView", v);
}
function isActionViewDetail(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#actionViewDetail";
}
function validateActionViewDetail(v) {
  return lexicons.validate("com.atproto.admin.defs#actionViewDetail", v);
}
function isActionViewCurrent(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#actionViewCurrent";
}
function validateActionViewCurrent(v) {
  return lexicons.validate("com.atproto.admin.defs#actionViewCurrent", v);
}
function isActionReversal(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#actionReversal";
}
function validateActionReversal(v) {
  return lexicons.validate("com.atproto.admin.defs#actionReversal", v);
}
var TAKEDOWN = "com.atproto.admin.defs#takedown";
var FLAG = "com.atproto.admin.defs#flag";
var ACKNOWLEDGE = "com.atproto.admin.defs#acknowledge";
function isReportView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#reportView";
}
function validateReportView(v) {
  return lexicons.validate("com.atproto.admin.defs#reportView", v);
}
function isReportViewDetail(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#reportViewDetail";
}
function validateReportViewDetail(v) {
  return lexicons.validate("com.atproto.admin.defs#reportViewDetail", v);
}
function isRepoView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#repoView";
}
function validateRepoView(v) {
  return lexicons.validate("com.atproto.admin.defs#repoView", v);
}
function isRepoViewDetail(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#repoViewDetail";
}
function validateRepoViewDetail(v) {
  return lexicons.validate("com.atproto.admin.defs#repoViewDetail", v);
}
function isRepoRef(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#repoRef";
}
function validateRepoRef(v) {
  return lexicons.validate("com.atproto.admin.defs#repoRef", v);
}
function isRecordView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#recordView";
}
function validateRecordView(v) {
  return lexicons.validate("com.atproto.admin.defs#recordView", v);
}
function isRecordViewDetail(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#recordViewDetail";
}
function validateRecordViewDetail(v) {
  return lexicons.validate("com.atproto.admin.defs#recordViewDetail", v);
}
function isModeration(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#moderation";
}
function validateModeration(v) {
  return lexicons.validate("com.atproto.admin.defs#moderation", v);
}
function isModerationDetail(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#moderationDetail";
}
function validateModerationDetail(v) {
  return lexicons.validate("com.atproto.admin.defs#moderationDetail", v);
}
function isBlobView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#blobView";
}
function validateBlobView(v) {
  return lexicons.validate("com.atproto.admin.defs#blobView", v);
}
function isImageDetails(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#imageDetails";
}
function validateImageDetails(v) {
  return lexicons.validate("com.atproto.admin.defs#imageDetails", v);
}
function isVideoDetails(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#videoDetails";
}
function validateVideoDetails(v) {
  return lexicons.validate("com.atproto.admin.defs#videoDetails", v);
}

// src/client/types/com/atproto/label/defs.ts
var defs_exports2 = {};
__export(defs_exports2, {
  isLabel: () => isLabel,
  validateLabel: () => validateLabel
});
function isLabel(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.label.defs#label";
}
function validateLabel(v) {
  return lexicons.validate("com.atproto.label.defs#label", v);
}

// src/client/types/com/atproto/label/subscribeLabels.ts
var subscribeLabels_exports = {};
__export(subscribeLabels_exports, {
  isInfo: () => isInfo,
  isLabels: () => isLabels,
  validateInfo: () => validateInfo,
  validateLabels: () => validateLabels
});
function isLabels(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.label.subscribeLabels#labels";
}
function validateLabels(v) {
  return lexicons.validate("com.atproto.label.subscribeLabels#labels", v);
}
function isInfo(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.label.subscribeLabels#info";
}
function validateInfo(v) {
  return lexicons.validate("com.atproto.label.subscribeLabels#info", v);
}

// src/client/types/com/atproto/moderation/defs.ts
var defs_exports3 = {};
__export(defs_exports3, {
  REASONOTHER: () => REASONOTHER,
  REASONSPAM: () => REASONSPAM
});
var REASONSPAM = "com.atproto.moderation.defs#reasonSpam";
var REASONOTHER = "com.atproto.moderation.defs#reasonOther";

// src/client/types/com/atproto/repo/strongRef.ts
var strongRef_exports = {};
__export(strongRef_exports, {
  isMain: () => isMain,
  validateMain: () => validateMain
});
function isMain(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "com.atproto.repo.strongRef#main" || v.$type === "com.atproto.repo.strongRef");
}
function validateMain(v) {
  return lexicons.validate("com.atproto.repo.strongRef#main", v);
}

// src/client/types/com/atproto/server/defs.ts
var defs_exports4 = {};
__export(defs_exports4, {
  isInviteCode: () => isInviteCode,
  isInviteCodeUse: () => isInviteCodeUse,
  validateInviteCode: () => validateInviteCode,
  validateInviteCodeUse: () => validateInviteCodeUse
});
function isInviteCode(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.server.defs#inviteCode";
}
function validateInviteCode(v) {
  return lexicons.validate("com.atproto.server.defs#inviteCode", v);
}
function isInviteCodeUse(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.server.defs#inviteCodeUse";
}
function validateInviteCodeUse(v) {
  return lexicons.validate("com.atproto.server.defs#inviteCodeUse", v);
}

// src/client/types/com/atproto/sync/subscribeRepos.ts
var subscribeRepos_exports = {};
__export(subscribeRepos_exports, {
  isCommit: () => isCommit,
  isHandle: () => isHandle,
  isInfo: () => isInfo2,
  isMigrate: () => isMigrate,
  isRepoOp: () => isRepoOp,
  isTombstone: () => isTombstone,
  validateCommit: () => validateCommit,
  validateHandle: () => validateHandle,
  validateInfo: () => validateInfo2,
  validateMigrate: () => validateMigrate,
  validateRepoOp: () => validateRepoOp,
  validateTombstone: () => validateTombstone
});
function isCommit(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.subscribeRepos#commit";
}
function validateCommit(v) {
  return lexicons.validate("com.atproto.sync.subscribeRepos#commit", v);
}
function isHandle(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.subscribeRepos#handle";
}
function validateHandle(v) {
  return lexicons.validate("com.atproto.sync.subscribeRepos#handle", v);
}
function isMigrate(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.subscribeRepos#migrate";
}
function validateMigrate(v) {
  return lexicons.validate("com.atproto.sync.subscribeRepos#migrate", v);
}
function isTombstone(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.subscribeRepos#tombstone";
}
function validateTombstone(v) {
  return lexicons.validate("com.atproto.sync.subscribeRepos#tombstone", v);
}
function isInfo2(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.subscribeRepos#info";
}
function validateInfo2(v) {
  return lexicons.validate("com.atproto.sync.subscribeRepos#info", v);
}
function isRepoOp(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.subscribeRepos#repoOp";
}
function validateRepoOp(v) {
  return lexicons.validate("com.atproto.sync.subscribeRepos#repoOp", v);
}

// src/client/types/app/bsky/actor/defs.ts
var defs_exports5 = {};
__export(defs_exports5, {
  isProfileView: () => isProfileView,
  isProfileViewBasic: () => isProfileViewBasic,
  isProfileViewDetailed: () => isProfileViewDetailed,
  isViewerState: () => isViewerState,
  validateProfileView: () => validateProfileView,
  validateProfileViewBasic: () => validateProfileViewBasic,
  validateProfileViewDetailed: () => validateProfileViewDetailed,
  validateViewerState: () => validateViewerState
});
function isProfileViewBasic(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.actor.defs#profileViewBasic";
}
function validateProfileViewBasic(v) {
  return lexicons.validate("app.bsky.actor.defs#profileViewBasic", v);
}
function isProfileView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.actor.defs#profileView";
}
function validateProfileView(v) {
  return lexicons.validate("app.bsky.actor.defs#profileView", v);
}
function isProfileViewDetailed(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.actor.defs#profileViewDetailed";
}
function validateProfileViewDetailed(v) {
  return lexicons.validate("app.bsky.actor.defs#profileViewDetailed", v);
}
function isViewerState(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.actor.defs#viewerState";
}
function validateViewerState(v) {
  return lexicons.validate("app.bsky.actor.defs#viewerState", v);
}

// src/client/types/app/bsky/actor/profile.ts
var profile_exports = {};
__export(profile_exports, {
  isRecord: () => isRecord2,
  validateRecord: () => validateRecord2
});
function isRecord2(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.actor.profile#main" || v.$type === "app.bsky.actor.profile");
}
function validateRecord2(v) {
  return lexicons.validate("app.bsky.actor.profile#main", v);
}

// src/client/types/app/bsky/embed/external.ts
var external_exports = {};
__export(external_exports, {
  isExternal: () => isExternal,
  isMain: () => isMain2,
  isView: () => isView,
  isViewExternal: () => isViewExternal,
  validateExternal: () => validateExternal,
  validateMain: () => validateMain2,
  validateView: () => validateView,
  validateViewExternal: () => validateViewExternal
});
function isMain2(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.embed.external#main" || v.$type === "app.bsky.embed.external");
}
function validateMain2(v) {
  return lexicons.validate("app.bsky.embed.external#main", v);
}
function isExternal(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.external#external";
}
function validateExternal(v) {
  return lexicons.validate("app.bsky.embed.external#external", v);
}
function isView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.external#view";
}
function validateView(v) {
  return lexicons.validate("app.bsky.embed.external#view", v);
}
function isViewExternal(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.external#viewExternal";
}
function validateViewExternal(v) {
  return lexicons.validate("app.bsky.embed.external#viewExternal", v);
}

// src/client/types/app/bsky/embed/images.ts
var images_exports = {};
__export(images_exports, {
  isImage: () => isImage,
  isMain: () => isMain3,
  isView: () => isView2,
  isViewImage: () => isViewImage,
  validateImage: () => validateImage,
  validateMain: () => validateMain3,
  validateView: () => validateView2,
  validateViewImage: () => validateViewImage
});
function isMain3(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.embed.images#main" || v.$type === "app.bsky.embed.images");
}
function validateMain3(v) {
  return lexicons.validate("app.bsky.embed.images#main", v);
}
function isImage(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.images#image";
}
function validateImage(v) {
  return lexicons.validate("app.bsky.embed.images#image", v);
}
function isView2(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.images#view";
}
function validateView2(v) {
  return lexicons.validate("app.bsky.embed.images#view", v);
}
function isViewImage(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.images#viewImage";
}
function validateViewImage(v) {
  return lexicons.validate("app.bsky.embed.images#viewImage", v);
}

// src/client/types/app/bsky/embed/record.ts
var record_exports = {};
__export(record_exports, {
  isMain: () => isMain4,
  isView: () => isView3,
  isViewNotFound: () => isViewNotFound,
  isViewRecord: () => isViewRecord,
  validateMain: () => validateMain4,
  validateView: () => validateView3,
  validateViewNotFound: () => validateViewNotFound,
  validateViewRecord: () => validateViewRecord
});
function isMain4(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.embed.record#main" || v.$type === "app.bsky.embed.record");
}
function validateMain4(v) {
  return lexicons.validate("app.bsky.embed.record#main", v);
}
function isView3(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.record#view";
}
function validateView3(v) {
  return lexicons.validate("app.bsky.embed.record#view", v);
}
function isViewRecord(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.record#viewRecord";
}
function validateViewRecord(v) {
  return lexicons.validate("app.bsky.embed.record#viewRecord", v);
}
function isViewNotFound(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.record#viewNotFound";
}
function validateViewNotFound(v) {
  return lexicons.validate("app.bsky.embed.record#viewNotFound", v);
}

// src/client/types/app/bsky/embed/recordWithMedia.ts
var recordWithMedia_exports = {};
__export(recordWithMedia_exports, {
  isMain: () => isMain5,
  isView: () => isView4,
  validateMain: () => validateMain5,
  validateView: () => validateView4
});
function isMain5(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.embed.recordWithMedia#main" || v.$type === "app.bsky.embed.recordWithMedia");
}
function validateMain5(v) {
  return lexicons.validate("app.bsky.embed.recordWithMedia#main", v);
}
function isView4(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.recordWithMedia#view";
}
function validateView4(v) {
  return lexicons.validate("app.bsky.embed.recordWithMedia#view", v);
}

// src/client/types/app/bsky/feed/defs.ts
var defs_exports6 = {};
__export(defs_exports6, {
  isFeedViewPost: () => isFeedViewPost,
  isNotFoundPost: () => isNotFoundPost,
  isPostView: () => isPostView,
  isReasonRepost: () => isReasonRepost,
  isReplyRef: () => isReplyRef,
  isThreadViewPost: () => isThreadViewPost,
  isViewerState: () => isViewerState2,
  validateFeedViewPost: () => validateFeedViewPost,
  validateNotFoundPost: () => validateNotFoundPost,
  validatePostView: () => validatePostView,
  validateReasonRepost: () => validateReasonRepost,
  validateReplyRef: () => validateReplyRef,
  validateThreadViewPost: () => validateThreadViewPost,
  validateViewerState: () => validateViewerState2
});
function isPostView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#postView";
}
function validatePostView(v) {
  return lexicons.validate("app.bsky.feed.defs#postView", v);
}
function isViewerState2(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#viewerState";
}
function validateViewerState2(v) {
  return lexicons.validate("app.bsky.feed.defs#viewerState", v);
}
function isFeedViewPost(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#feedViewPost";
}
function validateFeedViewPost(v) {
  return lexicons.validate("app.bsky.feed.defs#feedViewPost", v);
}
function isReplyRef(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#replyRef";
}
function validateReplyRef(v) {
  return lexicons.validate("app.bsky.feed.defs#replyRef", v);
}
function isReasonRepost(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#reasonRepost";
}
function validateReasonRepost(v) {
  return lexicons.validate("app.bsky.feed.defs#reasonRepost", v);
}
function isThreadViewPost(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#threadViewPost";
}
function validateThreadViewPost(v) {
  return lexicons.validate("app.bsky.feed.defs#threadViewPost", v);
}
function isNotFoundPost(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#notFoundPost";
}
function validateNotFoundPost(v) {
  return lexicons.validate("app.bsky.feed.defs#notFoundPost", v);
}

// src/client/types/app/bsky/feed/like.ts
var like_exports = {};
__export(like_exports, {
  isRecord: () => isRecord3,
  validateRecord: () => validateRecord3
});
function isRecord3(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.feed.like#main" || v.$type === "app.bsky.feed.like");
}
function validateRecord3(v) {
  return lexicons.validate("app.bsky.feed.like#main", v);
}

// src/client/types/app/bsky/feed/post.ts
var post_exports = {};
__export(post_exports, {
  isEntity: () => isEntity,
  isRecord: () => isRecord4,
  isReplyRef: () => isReplyRef2,
  isTextSlice: () => isTextSlice,
  validateEntity: () => validateEntity,
  validateRecord: () => validateRecord4,
  validateReplyRef: () => validateReplyRef2,
  validateTextSlice: () => validateTextSlice
});
function isRecord4(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.feed.post#main" || v.$type === "app.bsky.feed.post");
}
function validateRecord4(v) {
  return lexicons.validate("app.bsky.feed.post#main", v);
}
function isReplyRef2(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.post#replyRef";
}
function validateReplyRef2(v) {
  return lexicons.validate("app.bsky.feed.post#replyRef", v);
}
function isEntity(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.post#entity";
}
function validateEntity(v) {
  return lexicons.validate("app.bsky.feed.post#entity", v);
}
function isTextSlice(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.post#textSlice";
}
function validateTextSlice(v) {
  return lexicons.validate("app.bsky.feed.post#textSlice", v);
}

// src/client/types/app/bsky/feed/repost.ts
var repost_exports = {};
__export(repost_exports, {
  isRecord: () => isRecord5,
  validateRecord: () => validateRecord5
});
function isRecord5(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.feed.repost#main" || v.$type === "app.bsky.feed.repost");
}
function validateRecord5(v) {
  return lexicons.validate("app.bsky.feed.repost#main", v);
}

// src/client/types/app/bsky/graph/follow.ts
var follow_exports = {};
__export(follow_exports, {
  isRecord: () => isRecord6,
  validateRecord: () => validateRecord6
});
function isRecord6(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.graph.follow#main" || v.$type === "app.bsky.graph.follow");
}
function validateRecord6(v) {
  return lexicons.validate("app.bsky.graph.follow#main", v);
}

// src/client/types/app/bsky/richtext/facet.ts
var facet_exports = {};
__export(facet_exports, {
  isByteSlice: () => isByteSlice,
  isLink: () => isLink,
  isMain: () => isMain6,
  isMention: () => isMention,
  validateByteSlice: () => validateByteSlice,
  validateLink: () => validateLink,
  validateMain: () => validateMain6,
  validateMention: () => validateMention
});
function isMain6(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.richtext.facet#main" || v.$type === "app.bsky.richtext.facet");
}
function validateMain6(v) {
  return lexicons.validate("app.bsky.richtext.facet#main", v);
}
function isMention(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.richtext.facet#mention";
}
function validateMention(v) {
  return lexicons.validate("app.bsky.richtext.facet#mention", v);
}
function isLink(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.richtext.facet#link";
}
function validateLink(v) {
  return lexicons.validate("app.bsky.richtext.facet#link", v);
}
function isByteSlice(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.richtext.facet#byteSlice";
}
function validateByteSlice(v) {
  return lexicons.validate("app.bsky.richtext.facet#byteSlice", v);
}

// src/client/index.ts
var COM_ATPROTO_ADMIN = {
  DefsTakedown: "com.atproto.admin.defs#takedown",
  DefsFlag: "com.atproto.admin.defs#flag",
  DefsAcknowledge: "com.atproto.admin.defs#acknowledge"
};
var COM_ATPROTO_MODERATION = {
  DefsReasonSpam: "com.atproto.moderation.defs#reasonSpam",
  DefsReasonOther: "com.atproto.moderation.defs#reasonOther"
};
var AtpBaseClient = class {
  constructor() {
    this.xrpc = new Client();
    this.xrpc.addLexicons(schemas);
  }
  service(serviceUri) {
    return new AtpServiceClient(this, this.xrpc.service(serviceUri));
  }
};
var AtpServiceClient = class {
  constructor(baseClient, xrpcService) {
    this._baseClient = baseClient;
    this.xrpc = xrpcService;
    this.com = new ComNS(this);
    this.app = new AppNS(this);
  }
  setHeader(key, value) {
    this.xrpc.setHeader(key, value);
  }
};
var ComNS = class {
  constructor(service) {
    this._service = service;
    this.atproto = new AtprotoNS(service);
  }
};
var AtprotoNS = class {
  constructor(service) {
    this._service = service;
    this.admin = new AdminNS(service);
    this.identity = new IdentityNS(service);
    this.label = new LabelNS(service);
    this.moderation = new ModerationNS(service);
    this.repo = new RepoNS(service);
    this.server = new ServerNS(service);
    this.sync = new SyncNS(service);
  }
};
var AdminNS = class {
  constructor(service) {
    this._service = service;
  }
  disableInviteCodes(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.disableInviteCodes", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr(e);
    });
  }
  getInviteCodes(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getInviteCodes", params2, void 0, opts).catch((e) => {
      throw toKnownErr2(e);
    });
  }
  getModerationAction(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getModerationAction", params2, void 0, opts).catch((e) => {
      throw toKnownErr3(e);
    });
  }
  getModerationActions(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getModerationActions", params2, void 0, opts).catch((e) => {
      throw toKnownErr4(e);
    });
  }
  getModerationReport(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getModerationReport", params2, void 0, opts).catch((e) => {
      throw toKnownErr5(e);
    });
  }
  getModerationReports(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getModerationReports", params2, void 0, opts).catch((e) => {
      throw toKnownErr6(e);
    });
  }
  getRecord(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getRecord", params2, void 0, opts).catch((e) => {
      throw toKnownErr7(e);
    });
  }
  getRepo(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getRepo", params2, void 0, opts).catch((e) => {
      throw toKnownErr8(e);
    });
  }
  resolveModerationReports(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.resolveModerationReports", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr9(e);
    });
  }
  reverseModerationAction(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.reverseModerationAction", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr10(e);
    });
  }
  searchRepos(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.searchRepos", params2, void 0, opts).catch((e) => {
      throw toKnownErr11(e);
    });
  }
  takeModerationAction(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.takeModerationAction", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr12(e);
    });
  }
  updateAccountHandle(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.updateAccountHandle", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr13(e);
    });
  }
};
var IdentityNS = class {
  constructor(service) {
    this._service = service;
  }
  resolveHandle(params2, opts) {
    return this._service.xrpc.call("com.atproto.identity.resolveHandle", params2, void 0, opts).catch((e) => {
      throw toKnownErr14(e);
    });
  }
  updateHandle(data, opts) {
    return this._service.xrpc.call("com.atproto.identity.updateHandle", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr15(e);
    });
  }
};
var LabelNS = class {
  constructor(service) {
    this._service = service;
  }
  queryLabels(params2, opts) {
    return this._service.xrpc.call("com.atproto.label.queryLabels", params2, void 0, opts).catch((e) => {
      throw toKnownErr16(e);
    });
  }
};
var ModerationNS = class {
  constructor(service) {
    this._service = service;
  }
  createReport(data, opts) {
    return this._service.xrpc.call("com.atproto.moderation.createReport", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr17(e);
    });
  }
};
var RepoNS = class {
  constructor(service) {
    this._service = service;
  }
  applyWrites(data, opts) {
    return this._service.xrpc.call("com.atproto.repo.applyWrites", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr18(e);
    });
  }
  createRecord(data, opts) {
    return this._service.xrpc.call("com.atproto.repo.createRecord", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr19(e);
    });
  }
  deleteRecord(data, opts) {
    return this._service.xrpc.call("com.atproto.repo.deleteRecord", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr20(e);
    });
  }
  describeRepo(params2, opts) {
    return this._service.xrpc.call("com.atproto.repo.describeRepo", params2, void 0, opts).catch((e) => {
      throw toKnownErr21(e);
    });
  }
  getRecord(params2, opts) {
    return this._service.xrpc.call("com.atproto.repo.getRecord", params2, void 0, opts).catch((e) => {
      throw toKnownErr22(e);
    });
  }
  listRecords(params2, opts) {
    return this._service.xrpc.call("com.atproto.repo.listRecords", params2, void 0, opts).catch((e) => {
      throw toKnownErr23(e);
    });
  }
  putRecord(data, opts) {
    return this._service.xrpc.call("com.atproto.repo.putRecord", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr24(e);
    });
  }
  uploadBlob(data, opts) {
    return this._service.xrpc.call("com.atproto.repo.uploadBlob", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr25(e);
    });
  }
};
var ServerNS = class {
  constructor(service) {
    this._service = service;
  }
  createAccount(data, opts) {
    return this._service.xrpc.call("com.atproto.server.createAccount", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr26(e);
    });
  }
  createInviteCode(data, opts) {
    return this._service.xrpc.call("com.atproto.server.createInviteCode", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr27(e);
    });
  }
  createInviteCodes(data, opts) {
    return this._service.xrpc.call("com.atproto.server.createInviteCodes", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr28(e);
    });
  }
  createSession(data, opts) {
    return this._service.xrpc.call("com.atproto.server.createSession", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr29(e);
    });
  }
  deleteAccount(data, opts) {
    return this._service.xrpc.call("com.atproto.server.deleteAccount", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr30(e);
    });
  }
  deleteSession(data, opts) {
    return this._service.xrpc.call("com.atproto.server.deleteSession", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr31(e);
    });
  }
  describeServer(params2, opts) {
    return this._service.xrpc.call("com.atproto.server.describeServer", params2, void 0, opts).catch((e) => {
      throw toKnownErr32(e);
    });
  }
  getAccountInviteCodes(params2, opts) {
    return this._service.xrpc.call("com.atproto.server.getAccountInviteCodes", params2, void 0, opts).catch((e) => {
      throw toKnownErr33(e);
    });
  }
  getSession(params2, opts) {
    return this._service.xrpc.call("com.atproto.server.getSession", params2, void 0, opts).catch((e) => {
      throw toKnownErr34(e);
    });
  }
  refreshSession(data, opts) {
    return this._service.xrpc.call("com.atproto.server.refreshSession", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr35(e);
    });
  }
  requestAccountDelete(data, opts) {
    return this._service.xrpc.call("com.atproto.server.requestAccountDelete", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr36(e);
    });
  }
  requestPasswordReset(data, opts) {
    return this._service.xrpc.call("com.atproto.server.requestPasswordReset", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr37(e);
    });
  }
  resetPassword(data, opts) {
    return this._service.xrpc.call("com.atproto.server.resetPassword", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr38(e);
    });
  }
};
var SyncNS = class {
  constructor(service) {
    this._service = service;
  }
  getBlob(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getBlob", params2, void 0, opts).catch((e) => {
      throw toKnownErr39(e);
    });
  }
  getBlocks(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getBlocks", params2, void 0, opts).catch((e) => {
      throw toKnownErr40(e);
    });
  }
  getCheckout(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getCheckout", params2, void 0, opts).catch((e) => {
      throw toKnownErr41(e);
    });
  }
  getCommitPath(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getCommitPath", params2, void 0, opts).catch((e) => {
      throw toKnownErr42(e);
    });
  }
  getHead(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getHead", params2, void 0, opts).catch((e) => {
      throw toKnownErr43(e);
    });
  }
  getRecord(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getRecord", params2, void 0, opts).catch((e) => {
      throw toKnownErr44(e);
    });
  }
  getRepo(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getRepo", params2, void 0, opts).catch((e) => {
      throw toKnownErr45(e);
    });
  }
  listBlobs(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.listBlobs", params2, void 0, opts).catch((e) => {
      throw toKnownErr46(e);
    });
  }
  listRepos(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.listRepos", params2, void 0, opts).catch((e) => {
      throw toKnownErr47(e);
    });
  }
  notifyOfUpdate(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.notifyOfUpdate", params2, void 0, opts).catch((e) => {
      throw toKnownErr48(e);
    });
  }
  requestCrawl(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.requestCrawl", params2, void 0, opts).catch((e) => {
      throw toKnownErr49(e);
    });
  }
};
var AppNS = class {
  constructor(service) {
    this._service = service;
    this.bsky = new BskyNS(service);
  }
};
var BskyNS = class {
  constructor(service) {
    this._service = service;
    this.actor = new ActorNS(service);
    this.embed = new EmbedNS(service);
    this.feed = new FeedNS(service);
    this.graph = new GraphNS(service);
    this.notification = new NotificationNS(service);
    this.richtext = new RichtextNS(service);
    this.unspecced = new UnspeccedNS(service);
  }
};
var ActorNS = class {
  constructor(service) {
    this._service = service;
    this.profile = new ProfileRecord(service);
  }
  getProfile(params2, opts) {
    return this._service.xrpc.call("app.bsky.actor.getProfile", params2, void 0, opts).catch((e) => {
      throw toKnownErr50(e);
    });
  }
  getProfiles(params2, opts) {
    return this._service.xrpc.call("app.bsky.actor.getProfiles", params2, void 0, opts).catch((e) => {
      throw toKnownErr51(e);
    });
  }
  getSuggestions(params2, opts) {
    return this._service.xrpc.call("app.bsky.actor.getSuggestions", params2, void 0, opts).catch((e) => {
      throw toKnownErr52(e);
    });
  }
  searchActors(params2, opts) {
    return this._service.xrpc.call("app.bsky.actor.searchActors", params2, void 0, opts).catch((e) => {
      throw toKnownErr53(e);
    });
  }
  searchActorsTypeahead(params2, opts) {
    return this._service.xrpc.call("app.bsky.actor.searchActorsTypeahead", params2, void 0, opts).catch((e) => {
      throw toKnownErr54(e);
    });
  }
};
var ProfileRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.actor.profile",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.actor.profile",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.actor.profile";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.actor.profile", rkey: "self", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.actor.profile", ...params2 },
      { headers }
    );
  }
};
var EmbedNS = class {
  constructor(service) {
    this._service = service;
  }
};
var FeedNS = class {
  constructor(service) {
    this._service = service;
    this.like = new LikeRecord(service);
    this.post = new PostRecord(service);
    this.repost = new RepostRecord(service);
  }
  getAuthorFeed(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getAuthorFeed", params2, void 0, opts).catch((e) => {
      throw toKnownErr55(e);
    });
  }
  getLikes(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getLikes", params2, void 0, opts).catch((e) => {
      throw toKnownErr56(e);
    });
  }
  getPostThread(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getPostThread", params2, void 0, opts).catch((e) => {
      throw toKnownErr57(e);
    });
  }
  getRepostedBy(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getRepostedBy", params2, void 0, opts).catch((e) => {
      throw toKnownErr58(e);
    });
  }
  getTimeline(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getTimeline", params2, void 0, opts).catch((e) => {
      throw toKnownErr59(e);
    });
  }
};
var LikeRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.feed.like",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.feed.like",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.feed.like";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.feed.like", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.feed.like", ...params2 },
      { headers }
    );
  }
};
var PostRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.feed.post",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.feed.post",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.feed.post";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.feed.post", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.feed.post", ...params2 },
      { headers }
    );
  }
};
var RepostRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.feed.repost",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.feed.repost",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.feed.repost";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.feed.repost", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.feed.repost", ...params2 },
      { headers }
    );
  }
};
var GraphNS = class {
  constructor(service) {
    this._service = service;
    this.follow = new FollowRecord(service);
  }
  getFollowers(params2, opts) {
    return this._service.xrpc.call("app.bsky.graph.getFollowers", params2, void 0, opts).catch((e) => {
      throw toKnownErr60(e);
    });
  }
  getFollows(params2, opts) {
    return this._service.xrpc.call("app.bsky.graph.getFollows", params2, void 0, opts).catch((e) => {
      throw toKnownErr61(e);
    });
  }
  getMutes(params2, opts) {
    return this._service.xrpc.call("app.bsky.graph.getMutes", params2, void 0, opts).catch((e) => {
      throw toKnownErr62(e);
    });
  }
  muteActor(data, opts) {
    return this._service.xrpc.call("app.bsky.graph.muteActor", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr63(e);
    });
  }
  unmuteActor(data, opts) {
    return this._service.xrpc.call("app.bsky.graph.unmuteActor", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr64(e);
    });
  }
};
var FollowRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.graph.follow",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.graph.follow",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.graph.follow";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.graph.follow", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.graph.follow", ...params2 },
      { headers }
    );
  }
};
var NotificationNS = class {
  constructor(service) {
    this._service = service;
  }
  getUnreadCount(params2, opts) {
    return this._service.xrpc.call("app.bsky.notification.getUnreadCount", params2, void 0, opts).catch((e) => {
      throw toKnownErr65(e);
    });
  }
  listNotifications(params2, opts) {
    return this._service.xrpc.call("app.bsky.notification.listNotifications", params2, void 0, opts).catch((e) => {
      throw toKnownErr66(e);
    });
  }
  updateSeen(data, opts) {
    return this._service.xrpc.call("app.bsky.notification.updateSeen", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr67(e);
    });
  }
};
var RichtextNS = class {
  constructor(service) {
    this._service = service;
  }
};
var UnspeccedNS = class {
  constructor(service) {
    this._service = service;
  }
  getPopular(params2, opts) {
    return this._service.xrpc.call("app.bsky.unspecced.getPopular", params2, void 0, opts).catch((e) => {
      throw toKnownErr68(e);
    });
  }
};

// src/agent.ts
var REFRESH_SESSION = "com.atproto.server.refreshSession";
var _AtpAgent = class {
  constructor(opts) {
    this.uploadBlob = (data, opts) => this.api.com.atproto.repo.uploadBlob(data, opts);
    this.resolveHandle = (params2, opts) => this.api.com.atproto.identity.resolveHandle(params2, opts);
    this.updateHandle = (data, opts) => this.api.com.atproto.identity.updateHandle(data, opts);
    this.createModerationReport = (data, opts) => this.api.com.atproto.moderation.createReport(data, opts);
    this.service = opts.service instanceof URL ? opts.service : new URL(opts.service);
    this._persistSession = opts.persistSession;
    this._baseClient = new AtpBaseClient();
    this._baseClient.xrpc.fetch = this._fetch.bind(this);
    this.api = this._baseClient.service(opts.service);
  }
  get com() {
    return this.api.com;
  }
  static configure(opts) {
    _AtpAgent.fetch = opts.fetch;
  }
  get hasSession() {
    return !!this.session;
  }
  setPersistSessionHandler(handler) {
    this._persistSession = handler;
  }
  async createAccount(opts) {
    try {
      const res = await this.api.com.atproto.server.createAccount({
        handle: opts.handle,
        password: opts.password,
        email: opts.email,
        inviteCode: opts.inviteCode
      });
      this.session = {
        accessJwt: res.data.accessJwt,
        refreshJwt: res.data.refreshJwt,
        handle: res.data.handle,
        did: res.data.did,
        email: opts.email
      };
      return res;
    } catch (e) {
      this.session = void 0;
      throw e;
    } finally {
      if (this.session) {
        this._persistSession?.("create", this.session);
      } else {
        this._persistSession?.("create-failed", void 0);
      }
    }
  }
  async login(opts) {
    try {
      const res = await this.api.com.atproto.server.createSession({
        identifier: opts.identifier,
        password: opts.password
      });
      this.session = {
        accessJwt: res.data.accessJwt,
        refreshJwt: res.data.refreshJwt,
        handle: res.data.handle,
        did: res.data.did,
        email: res.data.email
      };
      return res;
    } catch (e) {
      this.session = void 0;
      throw e;
    } finally {
      if (this.session) {
        this._persistSession?.("create", this.session);
      } else {
        this._persistSession?.("create-failed", void 0);
      }
    }
  }
  async resumeSession(session) {
    try {
      this.session = session;
      const res = await this.api.com.atproto.server.getSession();
      if (!res.success || res.data.did !== this.session.did) {
        throw new Error("Invalid session");
      }
      this.session.email = res.data.email;
      this.session.handle = res.data.handle;
      return res;
    } catch (e) {
      this.session = void 0;
      throw e;
    } finally {
      if (this.session) {
        this._persistSession?.("create", this.session);
      } else {
        this._persistSession?.("create-failed", void 0);
      }
    }
  }
  _addAuthHeader(reqHeaders) {
    if (!reqHeaders.authorization && this.session?.accessJwt) {
      return {
        ...reqHeaders,
        authorization: `Bearer ${this.session.accessJwt}`
      };
    }
    return reqHeaders;
  }
  async _fetch(reqUri, reqMethod, reqHeaders, reqBody) {
    if (!_AtpAgent.fetch) {
      throw new Error("AtpAgent fetch() method not configured");
    }
    await this._refreshSessionPromise;
    let res = await _AtpAgent.fetch(
      reqUri,
      reqMethod,
      this._addAuthHeader(reqHeaders),
      reqBody
    );
    if (isErrorResponse(res, ["ExpiredToken"]) && this.session?.refreshJwt) {
      await this._refreshSession();
      res = await _AtpAgent.fetch(
        reqUri,
        reqMethod,
        this._addAuthHeader(reqHeaders),
        reqBody
      );
    }
    return res;
  }
  async _refreshSession() {
    if (this._refreshSessionPromise) {
      return this._refreshSessionPromise;
    }
    this._refreshSessionPromise = this._refreshSessionInner();
    try {
      await this._refreshSessionPromise;
    } finally {
      this._refreshSessionPromise = void 0;
    }
  }
  async _refreshSessionInner() {
    if (!_AtpAgent.fetch) {
      throw new Error("AtpAgent fetch() method not configured");
    }
    if (!this.session?.refreshJwt) {
      return;
    }
    const url = new URL(this.service.origin);
    url.pathname = `/xrpc/${REFRESH_SESSION}`;
    const res = await _AtpAgent.fetch(
      url.toString(),
      "POST",
      {
        authorization: `Bearer ${this.session.refreshJwt}`
      },
      void 0
    );
    if (isErrorResponse(res, ["ExpiredToken", "InvalidToken"])) {
      this.session = void 0;
      this._persistSession?.("expired", void 0);
    } else if (isNewSessionObject(this._baseClient, res.body)) {
      this.session = {
        accessJwt: res.body.accessJwt,
        refreshJwt: res.body.refreshJwt,
        handle: res.body.handle,
        did: res.body.did
      };
      this._persistSession?.("update", this.session);
    }
  }
};
var AtpAgent = _AtpAgent;
AtpAgent.fetch = defaultFetchHandler;
function isErrorObject(v) {
  return errorResponseBody.safeParse(v).success;
}
function isErrorResponse(res, errorNames) {
  if (res.status !== 400) {
    return false;
  }
  if (!isErrorObject(res.body)) {
    return false;
  }
  return typeof res.body.error === "string" && errorNames.includes(res.body.error);
}
function isNewSessionObject(client, v) {
  try {
    client.xrpc.lex.assertValidXrpcOutput(
      "com.atproto.server.refreshSession",
      v
    );
    return true;
  } catch {
    return false;
  }
}

// src/rich-text/unicode.ts
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var UnicodeString = class {
  constructor(utf16) {
    this.utf16 = utf16;
    this.utf8 = encoder.encode(utf16);
  }
  get length() {
    return this.utf8.byteLength;
  }
  get graphemeLength() {
    if (!this._graphemeLen) {
      this._graphemeLen = graphemeLen(this.utf16);
    }
    return this._graphemeLen;
  }
  slice(start, end) {
    return decoder.decode(this.utf8.slice(start, end));
  }
  utf16IndexToUtf8Index(i) {
    return encoder.encode(this.utf16.slice(0, i)).byteLength;
  }
  toString() {
    return this.utf16;
  }
};

// src/rich-text/sanitization.ts
var EXCESS_SPACE_RE = /[\r\n]([\u00AD\u2060\u200D\u200C\u200B\s]*[\r\n]){2,}/;
var REPLACEMENT_STR = "\n\n";
function sanitizeRichText(richText, opts) {
  if (opts.cleanNewlines) {
    richText = clean(richText, EXCESS_SPACE_RE, REPLACEMENT_STR);
  }
  return richText;
}
function clean(richText, targetRegexp, replacementString) {
  richText = richText.clone();
  let match = richText.unicodeText.utf16.match(targetRegexp);
  while (match && typeof match.index !== "undefined") {
    const oldText = richText.unicodeText;
    const removeStartIndex = richText.unicodeText.utf16IndexToUtf8Index(
      match.index
    );
    const removeEndIndex = removeStartIndex + new UnicodeString(match[0]).length;
    richText.delete(removeStartIndex, removeEndIndex);
    if (richText.unicodeText.utf16 === oldText.utf16) {
      break;
    }
    richText.insert(removeStartIndex, replacementString);
    match = richText.unicodeText.utf16.match(targetRegexp);
  }
  return richText;
}

// ../../node_modules/tlds/index.json
var tlds_default = [
  "aaa",
  "aarp",
  "abarth",
  "abb",
  "abbott",
  "abbvie",
  "abc",
  "able",
  "abogado",
  "abudhabi",
  "ac",
  "academy",
  "accenture",
  "accountant",
  "accountants",
  "aco",
  "actor",
  "ad",
  "ads",
  "adult",
  "ae",
  "aeg",
  "aero",
  "aetna",
  "af",
  "afl",
  "africa",
  "ag",
  "agakhan",
  "agency",
  "ai",
  "aig",
  "airbus",
  "airforce",
  "airtel",
  "akdn",
  "al",
  "alfaromeo",
  "alibaba",
  "alipay",
  "allfinanz",
  "allstate",
  "ally",
  "alsace",
  "alstom",
  "am",
  "amazon",
  "americanexpress",
  "americanfamily",
  "amex",
  "amfam",
  "amica",
  "amsterdam",
  "analytics",
  "android",
  "anquan",
  "anz",
  "ao",
  "aol",
  "apartments",
  "app",
  "apple",
  "aq",
  "aquarelle",
  "ar",
  "arab",
  "aramco",
  "archi",
  "army",
  "arpa",
  "art",
  "arte",
  "as",
  "asda",
  "asia",
  "associates",
  "at",
  "athleta",
  "attorney",
  "au",
  "auction",
  "audi",
  "audible",
  "audio",
  "auspost",
  "author",
  "auto",
  "autos",
  "avianca",
  "aw",
  "aws",
  "ax",
  "axa",
  "az",
  "azure",
  "ba",
  "baby",
  "baidu",
  "banamex",
  "bananarepublic",
  "band",
  "bank",
  "bar",
  "barcelona",
  "barclaycard",
  "barclays",
  "barefoot",
  "bargains",
  "baseball",
  "basketball",
  "bauhaus",
  "bayern",
  "bb",
  "bbc",
  "bbt",
  "bbva",
  "bcg",
  "bcn",
  "bd",
  "be",
  "beats",
  "beauty",
  "beer",
  "bentley",
  "berlin",
  "best",
  "bestbuy",
  "bet",
  "bf",
  "bg",
  "bh",
  "bharti",
  "bi",
  "bible",
  "bid",
  "bike",
  "bing",
  "bingo",
  "bio",
  "biz",
  "bj",
  "black",
  "blackfriday",
  "blockbuster",
  "blog",
  "bloomberg",
  "blue",
  "bm",
  "bms",
  "bmw",
  "bn",
  "bnpparibas",
  "bo",
  "boats",
  "boehringer",
  "bofa",
  "bom",
  "bond",
  "boo",
  "book",
  "booking",
  "bosch",
  "bostik",
  "boston",
  "bot",
  "boutique",
  "box",
  "br",
  "bradesco",
  "bridgestone",
  "broadway",
  "broker",
  "brother",
  "brussels",
  "bs",
  "bt",
  "build",
  "builders",
  "business",
  "buy",
  "buzz",
  "bv",
  "bw",
  "by",
  "bz",
  "bzh",
  "ca",
  "cab",
  "cafe",
  "cal",
  "call",
  "calvinklein",
  "cam",
  "camera",
  "camp",
  "canon",
  "capetown",
  "capital",
  "capitalone",
  "car",
  "caravan",
  "cards",
  "care",
  "career",
  "careers",
  "cars",
  "casa",
  "case",
  "cash",
  "casino",
  "cat",
  "catering",
  "catholic",
  "cba",
  "cbn",
  "cbre",
  "cbs",
  "cc",
  "cd",
  "center",
  "ceo",
  "cern",
  "cf",
  "cfa",
  "cfd",
  "cg",
  "ch",
  "chanel",
  "channel",
  "charity",
  "chase",
  "chat",
  "cheap",
  "chintai",
  "christmas",
  "chrome",
  "church",
  "ci",
  "cipriani",
  "circle",
  "cisco",
  "citadel",
  "citi",
  "citic",
  "city",
  "cityeats",
  "ck",
  "cl",
  "claims",
  "cleaning",
  "click",
  "clinic",
  "clinique",
  "clothing",
  "cloud",
  "club",
  "clubmed",
  "cm",
  "cn",
  "co",
  "coach",
  "codes",
  "coffee",
  "college",
  "cologne",
  "com",
  "comcast",
  "commbank",
  "community",
  "company",
  "compare",
  "computer",
  "comsec",
  "condos",
  "construction",
  "consulting",
  "contact",
  "contractors",
  "cooking",
  "cookingchannel",
  "cool",
  "coop",
  "corsica",
  "country",
  "coupon",
  "coupons",
  "courses",
  "cpa",
  "cr",
  "credit",
  "creditcard",
  "creditunion",
  "cricket",
  "crown",
  "crs",
  "cruise",
  "cruises",
  "cu",
  "cuisinella",
  "cv",
  "cw",
  "cx",
  "cy",
  "cymru",
  "cyou",
  "cz",
  "dabur",
  "dad",
  "dance",
  "data",
  "date",
  "dating",
  "datsun",
  "day",
  "dclk",
  "dds",
  "de",
  "deal",
  "dealer",
  "deals",
  "degree",
  "delivery",
  "dell",
  "deloitte",
  "delta",
  "democrat",
  "dental",
  "dentist",
  "desi",
  "design",
  "dev",
  "dhl",
  "diamonds",
  "diet",
  "digital",
  "direct",
  "directory",
  "discount",
  "discover",
  "dish",
  "diy",
  "dj",
  "dk",
  "dm",
  "dnp",
  "do",
  "docs",
  "doctor",
  "dog",
  "domains",
  "dot",
  "download",
  "drive",
  "dtv",
  "dubai",
  "dunlop",
  "dupont",
  "durban",
  "dvag",
  "dvr",
  "dz",
  "earth",
  "eat",
  "ec",
  "eco",
  "edeka",
  "edu",
  "education",
  "ee",
  "eg",
  "email",
  "emerck",
  "energy",
  "engineer",
  "engineering",
  "enterprises",
  "epson",
  "equipment",
  "er",
  "ericsson",
  "erni",
  "es",
  "esq",
  "estate",
  "et",
  "etisalat",
  "eu",
  "eurovision",
  "eus",
  "events",
  "exchange",
  "expert",
  "exposed",
  "express",
  "extraspace",
  "fage",
  "fail",
  "fairwinds",
  "faith",
  "family",
  "fan",
  "fans",
  "farm",
  "farmers",
  "fashion",
  "fast",
  "fedex",
  "feedback",
  "ferrari",
  "ferrero",
  "fi",
  "fiat",
  "fidelity",
  "fido",
  "film",
  "final",
  "finance",
  "financial",
  "fire",
  "firestone",
  "firmdale",
  "fish",
  "fishing",
  "fit",
  "fitness",
  "fj",
  "fk",
  "flickr",
  "flights",
  "flir",
  "florist",
  "flowers",
  "fly",
  "fm",
  "fo",
  "foo",
  "food",
  "foodnetwork",
  "football",
  "ford",
  "forex",
  "forsale",
  "forum",
  "foundation",
  "fox",
  "fr",
  "free",
  "fresenius",
  "frl",
  "frogans",
  "frontdoor",
  "frontier",
  "ftr",
  "fujitsu",
  "fun",
  "fund",
  "furniture",
  "futbol",
  "fyi",
  "ga",
  "gal",
  "gallery",
  "gallo",
  "gallup",
  "game",
  "games",
  "gap",
  "garden",
  "gay",
  "gb",
  "gbiz",
  "gd",
  "gdn",
  "ge",
  "gea",
  "gent",
  "genting",
  "george",
  "gf",
  "gg",
  "ggee",
  "gh",
  "gi",
  "gift",
  "gifts",
  "gives",
  "giving",
  "gl",
  "glass",
  "gle",
  "global",
  "globo",
  "gm",
  "gmail",
  "gmbh",
  "gmo",
  "gmx",
  "gn",
  "godaddy",
  "gold",
  "goldpoint",
  "golf",
  "goo",
  "goodyear",
  "goog",
  "google",
  "gop",
  "got",
  "gov",
  "gp",
  "gq",
  "gr",
  "grainger",
  "graphics",
  "gratis",
  "green",
  "gripe",
  "grocery",
  "group",
  "gs",
  "gt",
  "gu",
  "guardian",
  "gucci",
  "guge",
  "guide",
  "guitars",
  "guru",
  "gw",
  "gy",
  "hair",
  "hamburg",
  "hangout",
  "haus",
  "hbo",
  "hdfc",
  "hdfcbank",
  "health",
  "healthcare",
  "help",
  "helsinki",
  "here",
  "hermes",
  "hgtv",
  "hiphop",
  "hisamitsu",
  "hitachi",
  "hiv",
  "hk",
  "hkt",
  "hm",
  "hn",
  "hockey",
  "holdings",
  "holiday",
  "homedepot",
  "homegoods",
  "homes",
  "homesense",
  "honda",
  "horse",
  "hospital",
  "host",
  "hosting",
  "hot",
  "hoteles",
  "hotels",
  "hotmail",
  "house",
  "how",
  "hr",
  "hsbc",
  "ht",
  "hu",
  "hughes",
  "hyatt",
  "hyundai",
  "ibm",
  "icbc",
  "ice",
  "icu",
  "id",
  "ie",
  "ieee",
  "ifm",
  "ikano",
  "il",
  "im",
  "imamat",
  "imdb",
  "immo",
  "immobilien",
  "in",
  "inc",
  "industries",
  "infiniti",
  "info",
  "ing",
  "ink",
  "institute",
  "insurance",
  "insure",
  "int",
  "international",
  "intuit",
  "investments",
  "io",
  "ipiranga",
  "iq",
  "ir",
  "irish",
  "is",
  "ismaili",
  "ist",
  "istanbul",
  "it",
  "itau",
  "itv",
  "jaguar",
  "java",
  "jcb",
  "je",
  "jeep",
  "jetzt",
  "jewelry",
  "jio",
  "jll",
  "jm",
  "jmp",
  "jnj",
  "jo",
  "jobs",
  "joburg",
  "jot",
  "joy",
  "jp",
  "jpmorgan",
  "jprs",
  "juegos",
  "juniper",
  "kaufen",
  "kddi",
  "ke",
  "kerryhotels",
  "kerrylogistics",
  "kerryproperties",
  "kfh",
  "kg",
  "kh",
  "ki",
  "kia",
  "kids",
  "kim",
  "kinder",
  "kindle",
  "kitchen",
  "kiwi",
  "km",
  "kn",
  "koeln",
  "komatsu",
  "kosher",
  "kp",
  "kpmg",
  "kpn",
  "kr",
  "krd",
  "kred",
  "kuokgroup",
  "kw",
  "ky",
  "kyoto",
  "kz",
  "la",
  "lacaixa",
  "lamborghini",
  "lamer",
  "lancaster",
  "lancia",
  "land",
  "landrover",
  "lanxess",
  "lasalle",
  "lat",
  "latino",
  "latrobe",
  "law",
  "lawyer",
  "lb",
  "lc",
  "lds",
  "lease",
  "leclerc",
  "lefrak",
  "legal",
  "lego",
  "lexus",
  "lgbt",
  "li",
  "lidl",
  "life",
  "lifeinsurance",
  "lifestyle",
  "lighting",
  "like",
  "lilly",
  "limited",
  "limo",
  "lincoln",
  "link",
  "lipsy",
  "live",
  "living",
  "lk",
  "llc",
  "llp",
  "loan",
  "loans",
  "locker",
  "locus",
  "lol",
  "london",
  "lotte",
  "lotto",
  "love",
  "lpl",
  "lplfinancial",
  "lr",
  "ls",
  "lt",
  "ltd",
  "ltda",
  "lu",
  "lundbeck",
  "luxe",
  "luxury",
  "lv",
  "ly",
  "ma",
  "madrid",
  "maif",
  "maison",
  "makeup",
  "man",
  "management",
  "mango",
  "map",
  "market",
  "marketing",
  "markets",
  "marriott",
  "marshalls",
  "maserati",
  "mattel",
  "mba",
  "mc",
  "mckinsey",
  "md",
  "me",
  "med",
  "media",
  "meet",
  "melbourne",
  "meme",
  "memorial",
  "men",
  "menu",
  "merckmsd",
  "mg",
  "mh",
  "miami",
  "microsoft",
  "mil",
  "mini",
  "mint",
  "mit",
  "mitsubishi",
  "mk",
  "ml",
  "mlb",
  "mls",
  "mm",
  "mma",
  "mn",
  "mo",
  "mobi",
  "mobile",
  "moda",
  "moe",
  "moi",
  "mom",
  "monash",
  "money",
  "monster",
  "mormon",
  "mortgage",
  "moscow",
  "moto",
  "motorcycles",
  "mov",
  "movie",
  "mp",
  "mq",
  "mr",
  "ms",
  "msd",
  "mt",
  "mtn",
  "mtr",
  "mu",
  "museum",
  "music",
  "mutual",
  "mv",
  "mw",
  "mx",
  "my",
  "mz",
  "na",
  "nab",
  "nagoya",
  "name",
  "natura",
  "navy",
  "nba",
  "nc",
  "ne",
  "nec",
  "net",
  "netbank",
  "netflix",
  "network",
  "neustar",
  "new",
  "news",
  "next",
  "nextdirect",
  "nexus",
  "nf",
  "nfl",
  "ng",
  "ngo",
  "nhk",
  "ni",
  "nico",
  "nike",
  "nikon",
  "ninja",
  "nissan",
  "nissay",
  "nl",
  "no",
  "nokia",
  "northwesternmutual",
  "norton",
  "now",
  "nowruz",
  "nowtv",
  "np",
  "nr",
  "nra",
  "nrw",
  "ntt",
  "nu",
  "nyc",
  "nz",
  "obi",
  "observer",
  "office",
  "okinawa",
  "olayan",
  "olayangroup",
  "oldnavy",
  "ollo",
  "om",
  "omega",
  "one",
  "ong",
  "onl",
  "online",
  "ooo",
  "open",
  "oracle",
  "orange",
  "org",
  "organic",
  "origins",
  "osaka",
  "otsuka",
  "ott",
  "ovh",
  "pa",
  "page",
  "panasonic",
  "paris",
  "pars",
  "partners",
  "parts",
  "party",
  "passagens",
  "pay",
  "pccw",
  "pe",
  "pet",
  "pf",
  "pfizer",
  "pg",
  "ph",
  "pharmacy",
  "phd",
  "philips",
  "phone",
  "photo",
  "photography",
  "photos",
  "physio",
  "pics",
  "pictet",
  "pictures",
  "pid",
  "pin",
  "ping",
  "pink",
  "pioneer",
  "pizza",
  "pk",
  "pl",
  "place",
  "play",
  "playstation",
  "plumbing",
  "plus",
  "pm",
  "pn",
  "pnc",
  "pohl",
  "poker",
  "politie",
  "porn",
  "post",
  "pr",
  "pramerica",
  "praxi",
  "press",
  "prime",
  "pro",
  "prod",
  "productions",
  "prof",
  "progressive",
  "promo",
  "properties",
  "property",
  "protection",
  "pru",
  "prudential",
  "ps",
  "pt",
  "pub",
  "pw",
  "pwc",
  "py",
  "qa",
  "qpon",
  "quebec",
  "quest",
  "racing",
  "radio",
  "re",
  "read",
  "realestate",
  "realtor",
  "realty",
  "recipes",
  "red",
  "redstone",
  "redumbrella",
  "rehab",
  "reise",
  "reisen",
  "reit",
  "reliance",
  "ren",
  "rent",
  "rentals",
  "repair",
  "report",
  "republican",
  "rest",
  "restaurant",
  "review",
  "reviews",
  "rexroth",
  "rich",
  "richardli",
  "ricoh",
  "ril",
  "rio",
  "rip",
  "ro",
  "rocher",
  "rocks",
  "rodeo",
  "rogers",
  "room",
  "rs",
  "rsvp",
  "ru",
  "rugby",
  "ruhr",
  "run",
  "rw",
  "rwe",
  "ryukyu",
  "sa",
  "saarland",
  "safe",
  "safety",
  "sakura",
  "sale",
  "salon",
  "samsclub",
  "samsung",
  "sandvik",
  "sandvikcoromant",
  "sanofi",
  "sap",
  "sarl",
  "sas",
  "save",
  "saxo",
  "sb",
  "sbi",
  "sbs",
  "sc",
  "sca",
  "scb",
  "schaeffler",
  "schmidt",
  "scholarships",
  "school",
  "schule",
  "schwarz",
  "science",
  "scot",
  "sd",
  "se",
  "search",
  "seat",
  "secure",
  "security",
  "seek",
  "select",
  "sener",
  "services",
  "seven",
  "sew",
  "sex",
  "sexy",
  "sfr",
  "sg",
  "sh",
  "shangrila",
  "sharp",
  "shaw",
  "shell",
  "shia",
  "shiksha",
  "shoes",
  "shop",
  "shopping",
  "shouji",
  "show",
  "showtime",
  "si",
  "silk",
  "sina",
  "singles",
  "site",
  "sj",
  "sk",
  "ski",
  "skin",
  "sky",
  "skype",
  "sl",
  "sling",
  "sm",
  "smart",
  "smile",
  "sn",
  "sncf",
  "so",
  "soccer",
  "social",
  "softbank",
  "software",
  "sohu",
  "solar",
  "solutions",
  "song",
  "sony",
  "soy",
  "spa",
  "space",
  "sport",
  "spot",
  "sr",
  "srl",
  "ss",
  "st",
  "stada",
  "staples",
  "star",
  "statebank",
  "statefarm",
  "stc",
  "stcgroup",
  "stockholm",
  "storage",
  "store",
  "stream",
  "studio",
  "study",
  "style",
  "su",
  "sucks",
  "supplies",
  "supply",
  "support",
  "surf",
  "surgery",
  "suzuki",
  "sv",
  "swatch",
  "swiss",
  "sx",
  "sy",
  "sydney",
  "systems",
  "sz",
  "tab",
  "taipei",
  "talk",
  "taobao",
  "target",
  "tatamotors",
  "tatar",
  "tattoo",
  "tax",
  "taxi",
  "tc",
  "tci",
  "td",
  "tdk",
  "team",
  "tech",
  "technology",
  "tel",
  "temasek",
  "tennis",
  "teva",
  "tf",
  "tg",
  "th",
  "thd",
  "theater",
  "theatre",
  "tiaa",
  "tickets",
  "tienda",
  "tiffany",
  "tips",
  "tires",
  "tirol",
  "tj",
  "tjmaxx",
  "tjx",
  "tk",
  "tkmaxx",
  "tl",
  "tm",
  "tmall",
  "tn",
  "to",
  "today",
  "tokyo",
  "tools",
  "top",
  "toray",
  "toshiba",
  "total",
  "tours",
  "town",
  "toyota",
  "toys",
  "tr",
  "trade",
  "trading",
  "training",
  "travel",
  "travelchannel",
  "travelers",
  "travelersinsurance",
  "trust",
  "trv",
  "tt",
  "tube",
  "tui",
  "tunes",
  "tushu",
  "tv",
  "tvs",
  "tw",
  "tz",
  "ua",
  "ubank",
  "ubs",
  "ug",
  "uk",
  "unicom",
  "university",
  "uno",
  "uol",
  "ups",
  "us",
  "uy",
  "uz",
  "va",
  "vacations",
  "vana",
  "vanguard",
  "vc",
  "ve",
  "vegas",
  "ventures",
  "verisign",
  "verm\xF6gensberater",
  "verm\xF6gensberatung",
  "versicherung",
  "vet",
  "vg",
  "vi",
  "viajes",
  "video",
  "vig",
  "viking",
  "villas",
  "vin",
  "vip",
  "virgin",
  "visa",
  "vision",
  "viva",
  "vivo",
  "vlaanderen",
  "vn",
  "vodka",
  "volkswagen",
  "volvo",
  "vote",
  "voting",
  "voto",
  "voyage",
  "vu",
  "vuelos",
  "wales",
  "walmart",
  "walter",
  "wang",
  "wanggou",
  "watch",
  "watches",
  "weather",
  "weatherchannel",
  "webcam",
  "weber",
  "website",
  "wed",
  "wedding",
  "weibo",
  "weir",
  "wf",
  "whoswho",
  "wien",
  "wiki",
  "williamhill",
  "win",
  "windows",
  "wine",
  "winners",
  "wme",
  "wolterskluwer",
  "woodside",
  "work",
  "works",
  "world",
  "wow",
  "ws",
  "wtc",
  "wtf",
  "xbox",
  "xerox",
  "xfinity",
  "xihuan",
  "xin",
  "xxx",
  "xyz",
  "yachts",
  "yahoo",
  "yamaxun",
  "yandex",
  "ye",
  "yodobashi",
  "yoga",
  "yokohama",
  "you",
  "youtube",
  "yt",
  "yun",
  "za",
  "zappos",
  "zara",
  "zero",
  "zip",
  "zm",
  "zone",
  "zuerich",
  "zw",
  "\u03B5\u03BB",
  "\u03B5\u03C5",
  "\u0431\u0433",
  "\u0431\u0435\u043B",
  "\u0434\u0435\u0442\u0438",
  "\u0435\u044E",
  "\u043A\u0430\u0442\u043E\u043B\u0438\u043A",
  "\u043A\u043E\u043C",
  "\u043C\u043A\u0434",
  "\u043C\u043E\u043D",
  "\u043C\u043E\u0441\u043A\u0432\u0430",
  "\u043E\u043D\u043B\u0430\u0439\u043D",
  "\u043E\u0440\u0433",
  "\u0440\u0443\u0441",
  "\u0440\u0444",
  "\u0441\u0430\u0439\u0442",
  "\u0441\u0440\u0431",
  "\u0443\u043A\u0440",
  "\u049B\u0430\u0437",
  "\u0570\u0561\u0575",
  "\u05D9\u05E9\u05E8\u05D0\u05DC",
  "\u05E7\u05D5\u05DD",
  "\u0627\u0628\u0648\u0638\u0628\u064A",
  "\u0627\u062A\u0635\u0627\u0644\u0627\u062A",
  "\u0627\u0631\u0627\u0645\u0643\u0648",
  "\u0627\u0644\u0627\u0631\u062F\u0646",
  "\u0627\u0644\u0628\u062D\u0631\u064A\u0646",
  "\u0627\u0644\u062C\u0632\u0627\u0626\u0631",
  "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629",
  "\u0627\u0644\u0639\u0644\u064A\u0627\u0646",
  "\u0627\u0644\u0645\u063A\u0631\u0628",
  "\u0627\u0645\u0627\u0631\u0627\u062A",
  "\u0627\u06CC\u0631\u0627\u0646",
  "\u0628\u0627\u0631\u062A",
  "\u0628\u0627\u0632\u0627\u0631",
  "\u0628\u064A\u062A\u0643",
  "\u0628\u06BE\u0627\u0631\u062A",
  "\u062A\u0648\u0646\u0633",
  "\u0633\u0648\u062F\u0627\u0646",
  "\u0633\u0648\u0631\u064A\u0629",
  "\u0634\u0628\u0643\u0629",
  "\u0639\u0631\u0627\u0642",
  "\u0639\u0631\u0628",
  "\u0639\u0645\u0627\u0646",
  "\u0641\u0644\u0633\u0637\u064A\u0646",
  "\u0642\u0637\u0631",
  "\u0643\u0627\u062B\u0648\u0644\u064A\u0643",
  "\u0643\u0648\u0645",
  "\u0645\u0635\u0631",
  "\u0645\u0644\u064A\u0633\u064A\u0627",
  "\u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627",
  "\u0645\u0648\u0642\u0639",
  "\u0647\u0645\u0631\u0627\u0647",
  "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646",
  "\u0680\u0627\u0631\u062A",
  "\u0915\u0949\u092E",
  "\u0928\u0947\u091F",
  "\u092D\u093E\u0930\u0924",
  "\u092D\u093E\u0930\u0924\u092E\u094D",
  "\u092D\u093E\u0930\u094B\u0924",
  "\u0938\u0902\u0917\u0920\u0928",
  "\u09AC\u09BE\u0982\u09B2\u09BE",
  "\u09AD\u09BE\u09B0\u09A4",
  "\u09AD\u09BE\u09F0\u09A4",
  "\u0A2D\u0A3E\u0A30\u0A24",
  "\u0AAD\u0ABE\u0AB0\u0AA4",
  "\u0B2D\u0B3E\u0B30\u0B24",
  "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE",
  "\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8",
  "\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD",
  "\u0C2D\u0C3E\u0C30\u0C24\u0C4D",
  "\u0CAD\u0CBE\u0CB0\u0CA4",
  "\u0D2D\u0D3E\u0D30\u0D24\u0D02",
  "\u0DBD\u0D82\u0D9A\u0DCF",
  "\u0E04\u0E2D\u0E21",
  "\u0E44\u0E17\u0E22",
  "\u0EA5\u0EB2\u0EA7",
  "\u10D2\u10D4",
  "\u307F\u3093\u306A",
  "\u30A2\u30DE\u30BE\u30F3",
  "\u30AF\u30E9\u30A6\u30C9",
  "\u30B0\u30FC\u30B0\u30EB",
  "\u30B3\u30E0",
  "\u30B9\u30C8\u30A2",
  "\u30BB\u30FC\u30EB",
  "\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3",
  "\u30DD\u30A4\u30F3\u30C8",
  "\u4E16\u754C",
  "\u4E2D\u4FE1",
  "\u4E2D\u56FD",
  "\u4E2D\u570B",
  "\u4E2D\u6587\u7F51",
  "\u4E9A\u9A6C\u900A",
  "\u4F01\u4E1A",
  "\u4F5B\u5C71",
  "\u4FE1\u606F",
  "\u5065\u5EB7",
  "\u516B\u5366",
  "\u516C\u53F8",
  "\u516C\u76CA",
  "\u53F0\u6E7E",
  "\u53F0\u7063",
  "\u5546\u57CE",
  "\u5546\u5E97",
  "\u5546\u6807",
  "\u5609\u91CC",
  "\u5609\u91CC\u5927\u9152\u5E97",
  "\u5728\u7EBF",
  "\u5927\u62FF",
  "\u5929\u4E3B\u6559",
  "\u5A31\u4E50",
  "\u5BB6\u96FB",
  "\u5E7F\u4E1C",
  "\u5FAE\u535A",
  "\u6148\u5584",
  "\u6211\u7231\u4F60",
  "\u624B\u673A",
  "\u62DB\u8058",
  "\u653F\u52A1",
  "\u653F\u5E9C",
  "\u65B0\u52A0\u5761",
  "\u65B0\u95FB",
  "\u65F6\u5C1A",
  "\u66F8\u7C4D",
  "\u673A\u6784",
  "\u6DE1\u9A6C\u9521",
  "\u6E38\u620F",
  "\u6FB3\u9580",
  "\u70B9\u770B",
  "\u79FB\u52A8",
  "\u7EC4\u7EC7\u673A\u6784",
  "\u7F51\u5740",
  "\u7F51\u5E97",
  "\u7F51\u7AD9",
  "\u7F51\u7EDC",
  "\u8054\u901A",
  "\u8C37\u6B4C",
  "\u8D2D\u7269",
  "\u901A\u8CA9",
  "\u96C6\u56E2",
  "\u96FB\u8A0A\u76C8\u79D1",
  "\u98DE\u5229\u6D66",
  "\u98DF\u54C1",
  "\u9910\u5385",
  "\u9999\u683C\u91CC\u62C9",
  "\u9999\u6E2F",
  "\uB2F7\uB137",
  "\uB2F7\uCEF4",
  "\uC0BC\uC131",
  "\uD55C\uAD6D"
];

// src/rich-text/detection.ts
function detectFacets(text) {
  let match;
  const facets = [];
  {
    const re = /(^|\s|\()(@)([a-zA-Z0-9.-]+)(\b)/g;
    while (match = re.exec(text.utf16)) {
      if (!isValidDomain(match[3]) && !match[3].endsWith(".test")) {
        continue;
      }
      const start = text.utf16.indexOf(match[3], match.index) - 1;
      facets.push({
        $type: "app.bsky.richtext.facet",
        index: {
          byteStart: text.utf16IndexToUtf8Index(start),
          byteEnd: text.utf16IndexToUtf8Index(start + match[3].length + 1)
        },
        features: [
          {
            $type: "app.bsky.richtext.facet#mention",
            did: match[3]
          }
        ]
      });
    }
  }
  {
    const re = /(^|\s|\()((https?:\/\/[\S]+)|((?<domain>[a-z][a-z0-9]*(\.[a-z0-9]+)+)[\S]*))/gim;
    while (match = re.exec(text.utf16)) {
      let uri2 = match[2];
      if (!uri2.startsWith("http")) {
        const domain = match.groups?.domain;
        if (!domain || !isValidDomain(domain)) {
          continue;
        }
        uri2 = `https://${uri2}`;
      }
      const start = text.utf16.indexOf(match[2], match.index);
      const index = { start, end: start + match[2].length };
      if (/[.,;!?]$/.test(uri2)) {
        uri2 = uri2.slice(0, -1);
        index.end--;
      }
      if (/[)]$/.test(uri2) && !uri2.includes("(")) {
        uri2 = uri2.slice(0, -1);
        index.end--;
      }
      facets.push({
        index: {
          byteStart: text.utf16IndexToUtf8Index(index.start),
          byteEnd: text.utf16IndexToUtf8Index(index.end)
        },
        features: [
          {
            $type: "app.bsky.richtext.facet#link",
            uri: uri2
          }
        ]
      });
    }
  }
  return facets.length > 0 ? facets : void 0;
}
function isValidDomain(str) {
  return !!tlds_default.find((tld) => {
    const i = str.lastIndexOf(tld);
    if (i === -1) {
      return false;
    }
    return str.charAt(i - 1) === "." && i === str.length - tld.length;
  });
}

// src/rich-text/rich-text.ts
var RichTextSegment = class {
  constructor(text, facet) {
    this.text = text;
    this.facet = facet;
  }
  get link() {
    const link = this.facet?.features.find(facet_exports.isLink);
    if (facet_exports.isLink(link)) {
      return link;
    }
    return void 0;
  }
  isLink() {
    return !!this.link;
  }
  get mention() {
    const mention = this.facet?.features.find(facet_exports.isMention);
    if (facet_exports.isMention(mention)) {
      return mention;
    }
    return void 0;
  }
  isMention() {
    return !!this.mention;
  }
};
var RichText = class {
  constructor(props, opts) {
    this.unicodeText = new UnicodeString(props.text);
    this.facets = props.facets;
    if (!this.facets?.length && props.entities?.length) {
      this.facets = entitiesToFacets(this.unicodeText, props.entities);
    }
    if (this.facets) {
      this.facets.sort(facetSort);
    }
    if (opts?.cleanNewlines) {
      sanitizeRichText(this, { cleanNewlines: true }).copyInto(this);
    }
  }
  get text() {
    return this.unicodeText.toString();
  }
  get length() {
    return this.unicodeText.length;
  }
  get graphemeLength() {
    return this.unicodeText.graphemeLength;
  }
  clone() {
    return new RichText({
      text: this.unicodeText.utf16,
      facets: cloneDeep(this.facets)
    });
  }
  copyInto(target) {
    target.unicodeText = this.unicodeText;
    target.facets = cloneDeep(this.facets);
  }
  *segments() {
    const facets = this.facets || [];
    if (!facets.length) {
      yield new RichTextSegment(this.unicodeText.utf16);
      return;
    }
    let textCursor = 0;
    let facetCursor = 0;
    do {
      const currFacet = facets[facetCursor];
      if (textCursor < currFacet.index.byteStart) {
        yield new RichTextSegment(
          this.unicodeText.slice(textCursor, currFacet.index.byteStart)
        );
      } else if (textCursor > currFacet.index.byteStart) {
        facetCursor++;
        continue;
      }
      if (currFacet.index.byteStart < currFacet.index.byteEnd) {
        const subtext = this.unicodeText.slice(
          currFacet.index.byteStart,
          currFacet.index.byteEnd
        );
        if (!subtext.trim()) {
          yield new RichTextSegment(subtext);
        } else {
          yield new RichTextSegment(subtext, currFacet);
        }
      }
      textCursor = currFacet.index.byteEnd;
      facetCursor++;
    } while (facetCursor < facets.length);
    if (textCursor < this.unicodeText.length) {
      yield new RichTextSegment(
        this.unicodeText.slice(textCursor, this.unicodeText.length)
      );
    }
  }
  insert(insertIndex, insertText) {
    this.unicodeText = new UnicodeString(
      this.unicodeText.slice(0, insertIndex) + insertText + this.unicodeText.slice(insertIndex)
    );
    if (!this.facets?.length) {
      return this;
    }
    const numCharsAdded = insertText.length;
    for (const ent of this.facets) {
      if (insertIndex <= ent.index.byteStart) {
        ent.index.byteStart += numCharsAdded;
        ent.index.byteEnd += numCharsAdded;
      } else if (insertIndex >= ent.index.byteStart && insertIndex < ent.index.byteEnd) {
        ent.index.byteEnd += numCharsAdded;
      }
    }
    return this;
  }
  delete(removeStartIndex, removeEndIndex) {
    this.unicodeText = new UnicodeString(
      this.unicodeText.slice(0, removeStartIndex) + this.unicodeText.slice(removeEndIndex)
    );
    if (!this.facets?.length) {
      return this;
    }
    const numCharsRemoved = removeEndIndex - removeStartIndex;
    for (const ent of this.facets) {
      if (removeStartIndex <= ent.index.byteStart && removeEndIndex >= ent.index.byteEnd) {
        ent.index.byteStart = 0;
        ent.index.byteEnd = 0;
      } else if (removeStartIndex > ent.index.byteEnd) {
      } else if (removeStartIndex > ent.index.byteStart && removeStartIndex <= ent.index.byteEnd && removeEndIndex > ent.index.byteEnd) {
        ent.index.byteEnd = removeStartIndex;
      } else if (removeStartIndex >= ent.index.byteStart && removeEndIndex <= ent.index.byteEnd) {
        ent.index.byteEnd -= numCharsRemoved;
      } else if (removeStartIndex < ent.index.byteStart && removeEndIndex >= ent.index.byteStart && removeEndIndex <= ent.index.byteEnd) {
        ent.index.byteStart = removeStartIndex;
        ent.index.byteEnd -= numCharsRemoved;
      } else if (removeEndIndex < ent.index.byteStart) {
        ent.index.byteStart -= numCharsRemoved;
        ent.index.byteEnd -= numCharsRemoved;
      }
    }
    this.facets = this.facets.filter(
      (ent) => ent.index.byteStart < ent.index.byteEnd
    );
    return this;
  }
  async detectFacets(agent) {
    this.facets = detectFacets(this.unicodeText);
    if (this.facets) {
      for (const facet of this.facets) {
        for (const feature of facet.features) {
          if (facet_exports.isMention(feature)) {
            const did2 = await agent.resolveHandle({ handle: feature.did }).catch((_) => void 0).then((res) => res?.data.did);
            feature.did = did2 || "";
          }
        }
      }
      this.facets.sort(facetSort);
    }
  }
  detectFacetsWithoutResolution() {
    this.facets = detectFacets(this.unicodeText);
    if (this.facets) {
      this.facets.sort(facetSort);
    }
  }
};
var facetSort = (a, b) => a.index.byteStart - b.index.byteStart;
function entitiesToFacets(text, entities) {
  const facets = [];
  for (const ent of entities) {
    if (ent.type === "link") {
      facets.push({
        $type: "app.bsky.richtext.facet",
        index: {
          byteStart: text.utf16IndexToUtf8Index(ent.index.start),
          byteEnd: text.utf16IndexToUtf8Index(ent.index.end)
        },
        features: [{ $type: "app.bsky.richtext.facet#link", uri: ent.value }]
      });
    } else if (ent.type === "mention") {
      facets.push({
        $type: "app.bsky.richtext.facet",
        index: {
          byteStart: text.utf16IndexToUtf8Index(ent.index.start),
          byteEnd: text.utf16IndexToUtf8Index(ent.index.end)
        },
        features: [
          { $type: "app.bsky.richtext.facet#mention", did: ent.value }
        ]
      });
    }
  }
  return facets;
}
function cloneDeep(v) {
  if (typeof v === "undefined") {
    return v;
  }
  return JSON.parse(JSON.stringify(v));
}

// src/bsky-agent.ts
var BskyAgent = class extends AtpAgent {
  constructor() {
    super(...arguments);
    this.getTimeline = (params2, opts) => this.api.app.bsky.feed.getTimeline(params2, opts);
    this.getAuthorFeed = (params2, opts) => this.api.app.bsky.feed.getAuthorFeed(params2, opts);
    this.getPostThread = (params2, opts) => this.api.app.bsky.feed.getPostThread(params2, opts);
    this.getPost = (params2) => this.api.app.bsky.feed.post.get(params2);
    this.getLikes = (params2, opts) => this.api.app.bsky.feed.getLikes(params2, opts);
    this.getRepostedBy = (params2, opts) => this.api.app.bsky.feed.getRepostedBy(params2, opts);
    this.getFollows = (params2, opts) => this.api.app.bsky.graph.getFollows(params2, opts);
    this.getFollowers = (params2, opts) => this.api.app.bsky.graph.getFollowers(params2, opts);
    this.getProfile = (params2, opts) => this.api.app.bsky.actor.getProfile(params2, opts);
    this.getProfiles = (params2, opts) => this.api.app.bsky.actor.getProfiles(params2, opts);
    this.searchActors = (params2, opts) => this.api.app.bsky.actor.searchActors(params2, opts);
    this.searchActorsTypeahead = (params2, opts) => this.api.app.bsky.actor.searchActorsTypeahead(params2, opts);
    this.listNotifications = (params2, opts) => this.api.app.bsky.notification.listNotifications(params2, opts);
    this.countUnreadNotifications = (params2, opts) => this.api.app.bsky.notification.getUnreadCount(params2, opts);
  }
  get app() {
    return this.api.app;
  }
  async post(record) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    record.createdAt = record.createdAt || new Date().toISOString();
    return this.api.app.bsky.feed.post.create(
      { repo: this.session.did },
      record
    );
  }
  async deletePost(postUri) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    const postUrip = new AtUri(postUri);
    return await this.api.app.bsky.feed.post.delete({
      repo: postUrip.hostname,
      rkey: postUrip.rkey
    });
  }
  async like(uri2, cid2) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    return await this.api.app.bsky.feed.like.create(
      { repo: this.session.did },
      {
        subject: { uri: uri2, cid: cid2 },
        createdAt: new Date().toISOString()
      }
    );
  }
  async deleteLike(likeUri) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    const likeUrip = new AtUri(likeUri);
    return await this.api.app.bsky.feed.like.delete({
      repo: likeUrip.hostname,
      rkey: likeUrip.rkey
    });
  }
  async repost(uri2, cid2) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    return await this.api.app.bsky.feed.repost.create(
      { repo: this.session.did },
      {
        subject: { uri: uri2, cid: cid2 },
        createdAt: new Date().toISOString()
      }
    );
  }
  async deleteRepost(repostUri) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    const repostUrip = new AtUri(repostUri);
    return await this.api.app.bsky.feed.repost.delete({
      repo: repostUrip.hostname,
      rkey: repostUrip.rkey
    });
  }
  async follow(subjectDid) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    return await this.api.app.bsky.graph.follow.create(
      { repo: this.session.did },
      {
        subject: subjectDid,
        createdAt: new Date().toISOString()
      }
    );
  }
  async deleteFollow(followUri) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    const followUrip = new AtUri(followUri);
    return await this.api.app.bsky.graph.follow.delete({
      repo: followUrip.hostname,
      rkey: followUrip.rkey
    });
  }
  async upsertProfile(updateFn) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    let retriesRemaining = 5;
    while (retriesRemaining >= 0) {
      const existing = await this.com.atproto.repo.getRecord({
        repo: this.session.did,
        collection: "app.bsky.actor.profile",
        rkey: "self"
      }).catch((_) => void 0);
      const updated = await updateFn(existing?.data.value);
      if (updated) {
        updated.$type = "app.bsky.actor.profile";
      }
      const validation = profile_exports.validateRecord(updated);
      if (!validation.success) {
        throw validation.error;
      }
      try {
        await this.com.atproto.repo.putRecord({
          repo: this.session.did,
          collection: "app.bsky.actor.profile",
          rkey: "self",
          record: updated,
          swapRecord: existing?.data.cid || null
        });
      } catch (e) {
        if (retriesRemaining > 0 && e instanceof putRecord_exports.InvalidSwapError) {
          retriesRemaining--;
          continue;
        } else {
          throw e;
        }
      }
      break;
    }
  }
  async mute(actor) {
    return this.api.app.bsky.graph.muteActor({ actor });
  }
  async unmute(actor) {
    return this.api.app.bsky.graph.unmuteActor({ actor });
  }
  async updateSeenNotifications(seenAt) {
    seenAt = seenAt || new Date().toISOString();
    return this.api.app.bsky.notification.updateSeen({
      seenAt
    });
  }
};
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 1351:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

if (!globalThis.DOMException) {
  try {
    const { MessageChannel } = __nccwpck_require__(1267),
    port = new MessageChannel().port1,
    ab = new ArrayBuffer()
    port.postMessage(ab, [ab, ab])
  } catch (err) {
    err.constructor.name === 'DOMException' && (
      globalThis.DOMException = err.constructor
    )
  }
}

module.exports = globalThis.DOMException


/***/ }),

/***/ 4249:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(709);


/***/ }),

/***/ 709:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



var net = __nccwpck_require__(1808);
var tls = __nccwpck_require__(4404);
var http = __nccwpck_require__(3685);
var https = __nccwpck_require__(5687);
var events = __nccwpck_require__(2361);
var assert = __nccwpck_require__(9491);
var util = __nccwpck_require__(3837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 2033:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function () {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function () {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function () {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function () {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function () {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function () {
    return _version.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function () {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function () {
    return _parse.default;
  }
}));

var _v = _interopRequireDefault(__nccwpck_require__(9370));

var _v2 = _interopRequireDefault(__nccwpck_require__(8638));

var _v3 = _interopRequireDefault(__nccwpck_require__(3519));

var _v4 = _interopRequireDefault(__nccwpck_require__(8239));

var _nil = _interopRequireDefault(__nccwpck_require__(680));

var _version = _interopRequireDefault(__nccwpck_require__(3609));

var _validate = _interopRequireDefault(__nccwpck_require__(6009));

var _stringify = _interopRequireDefault(__nccwpck_require__(9729));

var _parse = _interopRequireDefault(__nccwpck_require__(8951));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 7276:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(6113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('md5').update(bytes).digest();
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ 680:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ 8951:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(6009));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ 646:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ 7548:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;

var _crypto = _interopRequireDefault(__nccwpck_require__(6113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;

function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    _crypto.default.randomFillSync(rnds8Pool);

    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),

/***/ 3557:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(6113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('sha1').update(bytes).digest();
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ 9729:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(6009));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ 9370:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(7548));

var _stringify = _interopRequireDefault(__nccwpck_require__(9729));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ 8638:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(6694));

var _md = _interopRequireDefault(__nccwpck_require__(7276));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ 6694:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(__nccwpck_require__(9729));

var _parse = _interopRequireDefault(__nccwpck_require__(8951));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ 3519:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(7548));

var _stringify = _interopRequireDefault(__nccwpck_require__(9729));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ 8239:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(6694));

var _sha = _interopRequireDefault(__nccwpck_require__(3557));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ 6009:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__nccwpck_require__(646));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ 3609:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(6009));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports["default"] = _default;

/***/ }),

/***/ 6484:
/***/ (function(__unused_webpack_module, exports) {

/**
 * web-streams-polyfill v3.2.1
 */
(function (global, factory) {
     true ? factory(exports) :
    0;
}(this, (function (exports) { 'use strict';

    /// <reference lib="es2015.symbol" />
    const SymbolPolyfill = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ?
        Symbol :
        description => `Symbol(${description})`;

    /// <reference lib="dom" />
    function noop() {
        return undefined;
    }
    function getGlobals() {
        if (typeof self !== 'undefined') {
            return self;
        }
        else if (typeof window !== 'undefined') {
            return window;
        }
        else if (typeof global !== 'undefined') {
            return global;
        }
        return undefined;
    }
    const globals = getGlobals();

    function typeIsObject(x) {
        return (typeof x === 'object' && x !== null) || typeof x === 'function';
    }
    const rethrowAssertionErrorRejection = noop;

    const originalPromise = Promise;
    const originalPromiseThen = Promise.prototype.then;
    const originalPromiseResolve = Promise.resolve.bind(originalPromise);
    const originalPromiseReject = Promise.reject.bind(originalPromise);
    function newPromise(executor) {
        return new originalPromise(executor);
    }
    function promiseResolvedWith(value) {
        return originalPromiseResolve(value);
    }
    function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
    }
    function PerformPromiseThen(promise, onFulfilled, onRejected) {
        // There doesn't appear to be any way to correctly emulate the behaviour from JavaScript, so this is just an
        // approximation.
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
    }
    function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), undefined, rethrowAssertionErrorRejection);
    }
    function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
    }
    function uponRejection(promise, onRejected) {
        uponPromise(promise, undefined, onRejected);
    }
    function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
    }
    function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, undefined, rethrowAssertionErrorRejection);
    }
    const queueMicrotask = (() => {
        const globalQueueMicrotask = globals && globals.queueMicrotask;
        if (typeof globalQueueMicrotask === 'function') {
            return globalQueueMicrotask;
        }
        const resolvedPromise = promiseResolvedWith(undefined);
        return (fn) => PerformPromiseThen(resolvedPromise, fn);
    })();
    function reflectCall(F, V, args) {
        if (typeof F !== 'function') {
            throw new TypeError('Argument is not a function');
        }
        return Function.prototype.apply.call(F, V, args);
    }
    function promiseCall(F, V, args) {
        try {
            return promiseResolvedWith(reflectCall(F, V, args));
        }
        catch (value) {
            return promiseRejectedWith(value);
        }
    }

    // Original from Chromium
    // https://chromium.googlesource.com/chromium/src/+/0aee4434a4dba42a42abaea9bfbc0cd196a63bc1/third_party/blink/renderer/core/streams/SimpleQueue.js
    const QUEUE_MAX_ARRAY_SIZE = 16384;
    /**
     * Simple queue structure.
     *
     * Avoids scalability issues with using a packed array directly by using
     * multiple arrays in a linked list and keeping the array size bounded.
     */
    class SimpleQueue {
        constructor() {
            this._cursor = 0;
            this._size = 0;
            // _front and _back are always defined.
            this._front = {
                _elements: [],
                _next: undefined
            };
            this._back = this._front;
            // The cursor is used to avoid calling Array.shift().
            // It contains the index of the front element of the array inside the
            // front-most node. It is always in the range [0, QUEUE_MAX_ARRAY_SIZE).
            this._cursor = 0;
            // When there is only one node, size === elements.length - cursor.
            this._size = 0;
        }
        get length() {
            return this._size;
        }
        // For exception safety, this method is structured in order:
        // 1. Read state
        // 2. Calculate required state mutations
        // 3. Perform state mutations
        push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
                newBack = {
                    _elements: [],
                    _next: undefined
                };
            }
            // push() is the mutation most likely to throw an exception, so it
            // goes first.
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
                this._back = newBack;
                oldBack._next = newBack;
            }
            ++this._size;
        }
        // Like push(), shift() follows the read -> calculate -> mutate pattern for
        // exception safety.
        shift() { // must not be called on an empty queue
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
                newFront = oldFront._next;
                newCursor = 0;
            }
            // No mutations before this point.
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
                this._front = newFront;
            }
            // Permit shifted element to be garbage collected.
            elements[oldCursor] = undefined;
            return element;
        }
        // The tricky thing about forEach() is that it can be called
        // re-entrantly. The queue may be mutated inside the callback. It is easy to
        // see that push() within the callback has no negative effects since the end
        // of the queue is checked for on every iteration. If shift() is called
        // repeatedly within the callback then the next iteration may return an
        // element that has been removed. In this case the callback will be called
        // with undefined values until we either "catch up" with elements that still
        // exist or reach the back of the queue.
        forEach(callback) {
            let i = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i !== elements.length || node._next !== undefined) {
                if (i === elements.length) {
                    node = node._next;
                    elements = node._elements;
                    i = 0;
                    if (elements.length === 0) {
                        break;
                    }
                }
                callback(elements[i]);
                ++i;
            }
        }
        // Return the element that would be returned if shift() was called now,
        // without modifying the queue.
        peek() { // must not be called on an empty queue
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
        }
    }

    function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === 'readable') {
            defaultReaderClosedPromiseInitialize(reader);
        }
        else if (stream._state === 'closed') {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
        }
        else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
    }
    // A client of ReadableStreamDefaultReader and ReadableStreamBYOBReader may use these functions directly to bypass state
    // check.
    function ReadableStreamReaderGenericCancel(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
    }
    function ReadableStreamReaderGenericRelease(reader) {
        if (reader._ownerReadableStream._state === 'readable') {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        reader._ownerReadableStream._reader = undefined;
        reader._ownerReadableStream = undefined;
    }
    // Helper functions for the readers.
    function readerLockException(name) {
        return new TypeError('Cannot ' + name + ' a stream using a released reader');
    }
    // Helper functions for the ReadableStreamDefaultReader.
    function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise((resolve, reject) => {
            reader._closedPromise_resolve = resolve;
            reader._closedPromise_reject = reject;
        });
    }
    function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
    }
    function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
    }
    function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === undefined) {
            return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = undefined;
        reader._closedPromise_reject = undefined;
    }
    function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
    }
    function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === undefined) {
            return;
        }
        reader._closedPromise_resolve(undefined);
        reader._closedPromise_resolve = undefined;
        reader._closedPromise_reject = undefined;
    }

    const AbortSteps = SymbolPolyfill('[[AbortSteps]]');
    const ErrorSteps = SymbolPolyfill('[[ErrorSteps]]');
    const CancelSteps = SymbolPolyfill('[[CancelSteps]]');
    const PullSteps = SymbolPolyfill('[[PullSteps]]');

    /// <reference lib="es2015.core" />
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#Polyfill
    const NumberIsFinite = Number.isFinite || function (x) {
        return typeof x === 'number' && isFinite(x);
    };

    /// <reference lib="es2015.core" />
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc#Polyfill
    const MathTrunc = Math.trunc || function (v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
    };

    // https://heycam.github.io/webidl/#idl-dictionaries
    function isDictionary(x) {
        return typeof x === 'object' || typeof x === 'function';
    }
    function assertDictionary(obj, context) {
        if (obj !== undefined && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
        }
    }
    // https://heycam.github.io/webidl/#idl-callback-functions
    function assertFunction(x, context) {
        if (typeof x !== 'function') {
            throw new TypeError(`${context} is not a function.`);
        }
    }
    // https://heycam.github.io/webidl/#idl-object
    function isObject(x) {
        return (typeof x === 'object' && x !== null) || typeof x === 'function';
    }
    function assertObject(x, context) {
        if (!isObject(x)) {
            throw new TypeError(`${context} is not an object.`);
        }
    }
    function assertRequiredArgument(x, position, context) {
        if (x === undefined) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
    }
    function assertRequiredField(x, field, context) {
        if (x === undefined) {
            throw new TypeError(`${field} is required in '${context}'.`);
        }
    }
    // https://heycam.github.io/webidl/#idl-unrestricted-double
    function convertUnrestrictedDouble(value) {
        return Number(value);
    }
    function censorNegativeZero(x) {
        return x === 0 ? 0 : x;
    }
    function integerPart(x) {
        return censorNegativeZero(MathTrunc(x));
    }
    // https://heycam.github.io/webidl/#idl-unsigned-long-long
    function convertUnsignedLongLongWithEnforceRange(value, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x = Number(value);
        x = censorNegativeZero(x);
        if (!NumberIsFinite(x)) {
            throw new TypeError(`${context} is not a finite number`);
        }
        x = integerPart(x);
        if (x < lowerBound || x > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite(x) || x === 0) {
            return 0;
        }
        // TODO Use BigInt if supported?
        // let xBigInt = BigInt(integerPart(x));
        // xBigInt = BigInt.asUintN(64, xBigInt);
        // return Number(xBigInt);
        return x;
    }

    function assertReadableStream(x, context) {
        if (!IsReadableStream(x)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
        }
    }

    // Abstract operations for the ReadableStream.
    function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
    }
    // ReadableStream API exposed for controllers.
    function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
    }
    function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
            readRequest._closeSteps();
        }
        else {
            readRequest._chunkSteps(chunk);
        }
    }
    function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
    }
    function ReadableStreamHasDefaultReader(stream) {
        const reader = stream._reader;
        if (reader === undefined) {
            return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
            return false;
        }
        return true;
    }
    /**
     * A default reader vended by a {@link ReadableStream}.
     *
     * @public
     */
    class ReadableStreamDefaultReader {
        constructor(stream) {
            assertRequiredArgument(stream, 1, 'ReadableStreamDefaultReader');
            assertReadableStream(stream, 'First parameter');
            if (IsReadableStreamLocked(stream)) {
                throw new TypeError('This stream has already been locked for exclusive reading by another reader');
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed,
         * or rejected if the stream ever errors or the reader's lock is released before the stream finishes closing.
         */
        get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
                return promiseRejectedWith(defaultReaderBrandCheckException('closed'));
            }
            return this._closedPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(reason = undefined) {
            if (!IsReadableStreamDefaultReader(this)) {
                return promiseRejectedWith(defaultReaderBrandCheckException('cancel'));
            }
            if (this._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('cancel'));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
        }
        /**
         * Returns a promise that allows access to the next chunk from the stream's internal queue, if available.
         *
         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
         */
        read() {
            if (!IsReadableStreamDefaultReader(this)) {
                return promiseRejectedWith(defaultReaderBrandCheckException('read'));
            }
            if (this._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('read from'));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve, reject) => {
                resolvePromise = resolve;
                rejectPromise = reject;
            });
            const readRequest = {
                _chunkSteps: chunk => resolvePromise({ value: chunk, done: false }),
                _closeSteps: () => resolvePromise({ value: undefined, done: true }),
                _errorSteps: e => rejectPromise(e)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamDefaultReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
                throw defaultReaderBrandCheckException('releaseLock');
            }
            if (this._ownerReadableStream === undefined) {
                return;
            }
            if (this._readRequests.length > 0) {
                throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
            }
            ReadableStreamReaderGenericRelease(this);
        }
    }
    Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStreamDefaultReader',
            configurable: true
        });
    }
    // Abstract operations for the readers.
    function IsReadableStreamDefaultReader(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_readRequests')) {
            return false;
        }
        return x instanceof ReadableStreamDefaultReader;
    }
    function ReadableStreamDefaultReaderRead(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === 'closed') {
            readRequest._closeSteps();
        }
        else if (stream._state === 'errored') {
            readRequest._errorSteps(stream._storedError);
        }
        else {
            stream._readableStreamController[PullSteps](readRequest);
        }
    }
    // Helper functions for the ReadableStreamDefaultReader.
    function defaultReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
    }

    /// <reference lib="es2018.asynciterable" />
    /* eslint-disable @typescript-eslint/no-empty-function */
    const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () { }).prototype);

    /// <reference lib="es2018.asynciterable" />
    class ReadableStreamAsyncIteratorImpl {
        constructor(reader, preventCancel) {
            this._ongoingPromise = undefined;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
        }
        next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ?
                transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) :
                nextSteps();
            return this._ongoingPromise;
        }
        return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ?
                transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) :
                returnSteps();
        }
        _nextSteps() {
            if (this._isFinished) {
                return Promise.resolve({ value: undefined, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('iterate'));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve, reject) => {
                resolvePromise = resolve;
                rejectPromise = reject;
            });
            const readRequest = {
                _chunkSteps: chunk => {
                    this._ongoingPromise = undefined;
                    // This needs to be delayed by one microtask, otherwise we stop pulling too early which breaks a test.
                    // FIXME Is this a bug in the specification, or in the test?
                    queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
                },
                _closeSteps: () => {
                    this._ongoingPromise = undefined;
                    this._isFinished = true;
                    ReadableStreamReaderGenericRelease(reader);
                    resolvePromise({ value: undefined, done: true });
                },
                _errorSteps: reason => {
                    this._ongoingPromise = undefined;
                    this._isFinished = true;
                    ReadableStreamReaderGenericRelease(reader);
                    rejectPromise(reason);
                }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
        }
        _returnSteps(value) {
            if (this._isFinished) {
                return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('finish iterating'));
            }
            if (!this._preventCancel) {
                const result = ReadableStreamReaderGenericCancel(reader, value);
                ReadableStreamReaderGenericRelease(reader);
                return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
        }
    }
    const ReadableStreamAsyncIteratorPrototype = {
        next() {
            if (!IsReadableStreamAsyncIterator(this)) {
                return promiseRejectedWith(streamAsyncIteratorBrandCheckException('next'));
            }
            return this._asyncIteratorImpl.next();
        },
        return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
                return promiseRejectedWith(streamAsyncIteratorBrandCheckException('return'));
            }
            return this._asyncIteratorImpl.return(value);
        }
    };
    if (AsyncIteratorPrototype !== undefined) {
        Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
    }
    // Abstract operations for the ReadableStream.
    function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
    }
    function IsReadableStreamAsyncIterator(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_asyncIteratorImpl')) {
            return false;
        }
        try {
            // noinspection SuspiciousTypeOfGuard
            return x._asyncIteratorImpl instanceof
                ReadableStreamAsyncIteratorImpl;
        }
        catch (_a) {
            return false;
        }
    }
    // Helper functions for the ReadableStream.
    function streamAsyncIteratorBrandCheckException(name) {
        return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
    }

    /// <reference lib="es2015.core" />
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#Polyfill
    const NumberIsNaN = Number.isNaN || function (x) {
        // eslint-disable-next-line no-self-compare
        return x !== x;
    };

    function CreateArrayFromList(elements) {
        // We use arrays to represent lists, so this is basically a no-op.
        // Do a slice though just in case we happen to depend on the unique-ness.
        return elements.slice();
    }
    function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
    }
    // Not implemented correctly
    function TransferArrayBuffer(O) {
        return O;
    }
    // Not implemented correctly
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function IsDetachedBuffer(O) {
        return false;
    }
    function ArrayBufferSlice(buffer, begin, end) {
        // ArrayBuffer.prototype.slice is not available on IE10
        // https://www.caniuse.com/mdn-javascript_builtins_arraybuffer_slice
        if (buffer.slice) {
            return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes(slice, 0, buffer, begin, length);
        return slice;
    }

    function IsNonNegativeNumber(v) {
        if (typeof v !== 'number') {
            return false;
        }
        if (NumberIsNaN(v)) {
            return false;
        }
        if (v < 0) {
            return false;
        }
        return true;
    }
    function CloneAsUint8Array(O) {
        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
    }

    function DequeueValue(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
        }
        return pair.value;
    }
    function EnqueueValueWithSize(container, value, size) {
        if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError('Size must be a finite, non-NaN, non-negative number.');
        }
        container._queue.push({ value, size });
        container._queueTotalSize += size;
    }
    function PeekQueueValue(container) {
        const pair = container._queue.peek();
        return pair.value;
    }
    function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
    }

    /**
     * A pull-into request in a {@link ReadableByteStreamController}.
     *
     * @public
     */
    class ReadableStreamBYOBRequest {
        constructor() {
            throw new TypeError('Illegal constructor');
        }
        /**
         * Returns the view for writing in to, or `null` if the BYOB request has already been responded to.
         */
        get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
                throw byobRequestBrandCheckException('view');
            }
            return this._view;
        }
        respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
                throw byobRequestBrandCheckException('respond');
            }
            assertRequiredArgument(bytesWritten, 1, 'respond');
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, 'First parameter');
            if (this._associatedReadableByteStreamController === undefined) {
                throw new TypeError('This BYOB request has been invalidated');
            }
            if (IsDetachedBuffer(this._view.buffer)) ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
                throw byobRequestBrandCheckException('respondWithNewView');
            }
            assertRequiredArgument(view, 1, 'respondWithNewView');
            if (!ArrayBuffer.isView(view)) {
                throw new TypeError('You can only respond with array buffer views');
            }
            if (this._associatedReadableByteStreamController === undefined) {
                throw new TypeError('This BYOB request has been invalidated');
            }
            if (IsDetachedBuffer(view.buffer)) ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        }
    }
    Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStreamBYOBRequest',
            configurable: true
        });
    }
    /**
     * Allows control of a {@link ReadableStream | readable byte stream}'s state and internal queue.
     *
     * @public
     */
    class ReadableByteStreamController {
        constructor() {
            throw new TypeError('Illegal constructor');
        }
        /**
         * Returns the current BYOB pull request, or `null` if there isn't one.
         */
        get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('byobRequest');
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying byte source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('desiredSize');
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('close');
            }
            if (this._closeRequested) {
                throw new TypeError('The stream has already been closed; do not close it again!');
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== 'readable') {
                throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
        }
        enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('enqueue');
            }
            assertRequiredArgument(chunk, 1, 'enqueue');
            if (!ArrayBuffer.isView(chunk)) {
                throw new TypeError('chunk must be an array buffer view');
            }
            if (chunk.byteLength === 0) {
                throw new TypeError('chunk must have non-zero byteLength');
            }
            if (chunk.buffer.byteLength === 0) {
                throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
                throw new TypeError('stream is closed or draining');
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== 'readable') {
                throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(e = undefined) {
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('error');
            }
            ReadableByteStreamControllerError(this, e);
        }
        /** @internal */
        [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
        }
        /** @internal */
        [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
                const entry = this._queue.shift();
                this._queueTotalSize -= entry.byteLength;
                ReadableByteStreamControllerHandleQueueDrain(this);
                const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
                readRequest._chunkSteps(view);
                return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== undefined) {
                let buffer;
                try {
                    buffer = new ArrayBuffer(autoAllocateChunkSize);
                }
                catch (bufferE) {
                    readRequest._errorSteps(bufferE);
                    return;
                }
                const pullIntoDescriptor = {
                    buffer,
                    bufferByteLength: autoAllocateChunkSize,
                    byteOffset: 0,
                    byteLength: autoAllocateChunkSize,
                    bytesFilled: 0,
                    elementSize: 1,
                    viewConstructor: Uint8Array,
                    readerType: 'default'
                };
                this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
        }
    }
    Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableByteStreamController',
            configurable: true
        });
    }
    // Abstract operations for the ReadableByteStreamController.
    function IsReadableByteStreamController(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableByteStream')) {
            return false;
        }
        return x instanceof ReadableByteStreamController;
    }
    function IsReadableStreamBYOBRequest(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_associatedReadableByteStreamController')) {
            return false;
        }
        return x instanceof ReadableStreamBYOBRequest;
    }
    function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
            return;
        }
        if (controller._pulling) {
            controller._pullAgain = true;
            return;
        }
        controller._pulling = true;
        // TODO: Test controller argument
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
                controller._pullAgain = false;
                ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
        }, e => {
            ReadableByteStreamControllerError(controller, e);
        });
    }
    function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
    }
    function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === 'closed') {
            done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === 'default') {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
        }
        else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
    }
    function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
    }
    function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
    }
    function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        const elementSize = pullIntoDescriptor.elementSize;
        const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready = false;
        if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
                queue.shift();
            }
            else {
                headOfQueue.byteOffset += bytesToCopy;
                headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready;
    }
    function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size;
    }
    function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
        }
        else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
    }
    function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
            return;
        }
        controller._byobRequest._associatedReadableByteStreamController = undefined;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
    }
    function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
                return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
                ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
        }
    }
    function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        let elementSize = 1;
        if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
        }
        const ctor = view.constructor;
        // try {
        const buffer = TransferArrayBuffer(view.buffer);
        // } catch (e) {
        //   readIntoRequest._errorSteps(e);
        //   return;
        // }
        const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: 'byob'
        };
        if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            // No ReadableByteStreamControllerCallPullIfNeeded() call since:
            // - No change happens on desiredSize
            // - The source has already been notified of that there's at least 1 pending read(view)
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
        }
        if (stream._state === 'closed') {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
        }
        if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
                const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
                ReadableByteStreamControllerHandleQueueDrain(controller);
                readIntoRequest._chunkSteps(filledView);
                return;
            }
            if (controller._closeRequested) {
                const e = new TypeError('Insufficient bytes to fill elements in the given buffer');
                ReadableByteStreamControllerError(controller, e);
                readIntoRequest._errorSteps(e);
                return;
            }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
                const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
                ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
        }
    }
    function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
    }
    function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        const state = controller._controlledReadableByteStream._state;
        if (state === 'closed') {
            ReadableByteStreamControllerRespondInClosedState(controller);
        }
        else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
    }
    function ReadableByteStreamControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== 'readable') {
            return false;
        }
        if (controller._closeRequested) {
            return false;
        }
        if (!controller._started) {
            return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
            return true;
        }
        return false;
    }
    function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = undefined;
        controller._cancelAlgorithm = undefined;
    }
    // A client of ReadableByteStreamController may use these functions directly to bypass state check.
    function ReadableByteStreamControllerClose(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== 'readable') {
            return;
        }
        if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
        }
        if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
                const e = new TypeError('Insufficient bytes to fill elements in the given buffer');
                ReadableByteStreamControllerError(controller, e);
                throw e;
            }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
    }
    function ReadableByteStreamControllerEnqueue(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== 'readable') {
            return;
        }
        const buffer = chunk.buffer;
        const byteOffset = chunk.byteOffset;
        const byteLength = chunk.byteLength;
        const transferredBuffer = TransferArrayBuffer(buffer);
        if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer)) ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
        }
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
                ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            }
            else {
                if (controller._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerShiftPendingPullInto(controller);
                }
                const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
                ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
        }
        else if (ReadableStreamHasBYOBReader(stream)) {
            // TODO: Ideally in this branch detaching should happen only if the buffer is not consumed fully.
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerError(controller, e) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== 'readable') {
            return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e);
    }
    function ReadableByteStreamControllerGetBYOBRequest(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
    }
    function ReadableByteStreamControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableByteStream._state;
        if (state === 'errored') {
            return null;
        }
        if (state === 'closed') {
            return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === 'closed') {
            if (bytesWritten !== 0) {
                throw new TypeError('bytesWritten must be 0 when calling respond() on a closed stream');
            }
        }
        else {
            if (bytesWritten === 0) {
                throw new TypeError('bytesWritten must be greater than 0 when calling respond() on a readable stream');
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
                throw new RangeError('bytesWritten out of range');
            }
        }
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
    }
    function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === 'closed') {
            if (view.byteLength !== 0) {
                throw new TypeError('The view\'s length must be 0 when calling respondWithNewView() on a closed stream');
            }
        }
        else {
            if (view.byteLength === 0) {
                throw new TypeError('The view\'s length must be greater than 0 when calling respondWithNewView() on a readable stream');
            }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError('The region specified by view does not match byobRequest');
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError('The buffer of view has different capacity than byobRequest');
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError('The region specified by view is larger than byobRequest');
        }
        const viewByteLength = view.byteLength;
        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
        ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
    }
    function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        // Need to set the slots so that the assert doesn't fire. In the spec the slots already exist implicitly.
        controller._queue = controller._queueTotalSize = undefined;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
        }, r => {
            ReadableByteStreamControllerError(controller, r);
        });
    }
    function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController.prototype);
        let startAlgorithm = () => undefined;
        let pullAlgorithm = () => promiseResolvedWith(undefined);
        let cancelAlgorithm = () => promiseResolvedWith(undefined);
        if (underlyingByteSource.start !== undefined) {
            startAlgorithm = () => underlyingByteSource.start(controller);
        }
        if (underlyingByteSource.pull !== undefined) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
        }
        if (underlyingByteSource.cancel !== undefined) {
            cancelAlgorithm = reason => underlyingByteSource.cancel(reason);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
            throw new TypeError('autoAllocateChunkSize must be greater than 0');
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
    }
    function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
    }
    // Helper functions for the ReadableStreamBYOBRequest.
    function byobRequestBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
    }
    // Helper functions for the ReadableByteStreamController.
    function byteStreamControllerBrandCheckException(name) {
        return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
    }

    // Abstract operations for the ReadableStream.
    function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
    }
    // ReadableStream API exposed for controllers.
    function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
    }
    function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
            readIntoRequest._closeSteps(chunk);
        }
        else {
            readIntoRequest._chunkSteps(chunk);
        }
    }
    function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
    }
    function ReadableStreamHasBYOBReader(stream) {
        const reader = stream._reader;
        if (reader === undefined) {
            return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
            return false;
        }
        return true;
    }
    /**
     * A BYOB reader vended by a {@link ReadableStream}.
     *
     * @public
     */
    class ReadableStreamBYOBReader {
        constructor(stream) {
            assertRequiredArgument(stream, 1, 'ReadableStreamBYOBReader');
            assertReadableStream(stream, 'First parameter');
            if (IsReadableStreamLocked(stream)) {
                throw new TypeError('This stream has already been locked for exclusive reading by another reader');
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
                throw new TypeError('Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte ' +
                    'source');
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the reader's lock is released before the stream finishes closing.
         */
        get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
                return promiseRejectedWith(byobReaderBrandCheckException('closed'));
            }
            return this._closedPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(reason = undefined) {
            if (!IsReadableStreamBYOBReader(this)) {
                return promiseRejectedWith(byobReaderBrandCheckException('cancel'));
            }
            if (this._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('cancel'));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
        }
        /**
         * Attempts to reads bytes into view, and returns a promise resolved with the result.
         *
         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
         */
        read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
                return promiseRejectedWith(byobReaderBrandCheckException('read'));
            }
            if (!ArrayBuffer.isView(view)) {
                return promiseRejectedWith(new TypeError('view must be an array buffer view'));
            }
            if (view.byteLength === 0) {
                return promiseRejectedWith(new TypeError('view must have non-zero byteLength'));
            }
            if (view.buffer.byteLength === 0) {
                return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer)) ;
            if (this._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('read from'));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve, reject) => {
                resolvePromise = resolve;
                rejectPromise = reject;
            });
            const readIntoRequest = {
                _chunkSteps: chunk => resolvePromise({ value: chunk, done: false }),
                _closeSteps: chunk => resolvePromise({ value: chunk, done: true }),
                _errorSteps: e => rejectPromise(e)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamBYOBReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
                throw byobReaderBrandCheckException('releaseLock');
            }
            if (this._ownerReadableStream === undefined) {
                return;
            }
            if (this._readIntoRequests.length > 0) {
                throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
            }
            ReadableStreamReaderGenericRelease(this);
        }
    }
    Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStreamBYOBReader',
            configurable: true
        });
    }
    // Abstract operations for the readers.
    function IsReadableStreamBYOBReader(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_readIntoRequests')) {
            return false;
        }
        return x instanceof ReadableStreamBYOBReader;
    }
    function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === 'errored') {
            readIntoRequest._errorSteps(stream._storedError);
        }
        else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
        }
    }
    // Helper functions for the ReadableStreamBYOBReader.
    function byobReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
    }

    function ExtractHighWaterMark(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === undefined) {
            return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError('Invalid highWaterMark');
        }
        return highWaterMark;
    }
    function ExtractSizeAlgorithm(strategy) {
        const { size } = strategy;
        if (!size) {
            return () => 1;
        }
        return size;
    }

    function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size = init === null || init === void 0 ? void 0 : init.size;
        return {
            highWaterMark: highWaterMark === undefined ? undefined : convertUnrestrictedDouble(highWaterMark),
            size: size === undefined ? undefined : convertQueuingStrategySize(size, `${context} has member 'size' that`)
        };
    }
    function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return chunk => convertUnrestrictedDouble(fn(chunk));
    }

    function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
            abort: abort === undefined ?
                undefined :
                convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === undefined ?
                undefined :
                convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === undefined ?
                undefined :
                convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === undefined ?
                undefined :
                convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
        };
    }
    function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return () => promiseCall(fn, original, []);
    }
    function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }

    function assertWritableStream(x, context) {
        if (!IsWritableStream(x)) {
            throw new TypeError(`${context} is not a WritableStream.`);
        }
    }

    function isAbortSignal(value) {
        if (typeof value !== 'object' || value === null) {
            return false;
        }
        try {
            return typeof value.aborted === 'boolean';
        }
        catch (_a) {
            // AbortSignal.prototype.aborted throws if its brand check fails
            return false;
        }
    }
    const supportsAbortController = typeof AbortController === 'function';
    /**
     * Construct a new AbortController, if supported by the platform.
     *
     * @internal
     */
    function createAbortController() {
        if (supportsAbortController) {
            return new AbortController();
        }
        return undefined;
    }

    /**
     * A writable stream represents a destination for data, into which you can write.
     *
     * @public
     */
    class WritableStream {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === undefined) {
                rawUnderlyingSink = null;
            }
            else {
                assertObject(rawUnderlyingSink, 'First parameter');
            }
            const strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, 'First parameter');
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== undefined) {
                throw new RangeError('Invalid type is specified');
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        /**
         * Returns whether or not the writable stream is locked to a writer.
         */
        get locked() {
            if (!IsWritableStream(this)) {
                throw streamBrandCheckException$2('locked');
            }
            return IsWritableStreamLocked(this);
        }
        /**
         * Aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be
         * immediately moved to an errored state, with any queued-up writes discarded. This will also execute any abort
         * mechanism of the underlying sink.
         *
         * The returned promise will fulfill if the stream shuts down successfully, or reject if the underlying sink signaled
         * that there was an error doing so. Additionally, it will reject with a `TypeError` (without attempting to cancel
         * the stream) if the stream is currently locked.
         */
        abort(reason = undefined) {
            if (!IsWritableStream(this)) {
                return promiseRejectedWith(streamBrandCheckException$2('abort'));
            }
            if (IsWritableStreamLocked(this)) {
                return promiseRejectedWith(new TypeError('Cannot abort a stream that already has a writer'));
            }
            return WritableStreamAbort(this, reason);
        }
        /**
         * Closes the stream. The underlying sink will finish processing any previously-written chunks, before invoking its
         * close behavior. During this time any further attempts to write will fail (without erroring the stream).
         *
         * The method returns a promise that will fulfill if all remaining chunks are successfully written and the stream
         * successfully closes, or rejects if an error is encountered during this process. Additionally, it will reject with
         * a `TypeError` (without attempting to cancel the stream) if the stream is currently locked.
         */
        close() {
            if (!IsWritableStream(this)) {
                return promiseRejectedWith(streamBrandCheckException$2('close'));
            }
            if (IsWritableStreamLocked(this)) {
                return promiseRejectedWith(new TypeError('Cannot close a stream that already has a writer'));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
                return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
            }
            return WritableStreamClose(this);
        }
        /**
         * Creates a {@link WritableStreamDefaultWriter | writer} and locks the stream to the new writer. While the stream
         * is locked, no other writer can be acquired until this one is released.
         *
         * This functionality is especially useful for creating abstractions that desire the ability to write to a stream
         * without interruption or interleaving. By getting a writer for the stream, you can ensure nobody else can write at
         * the same time, which would cause the resulting written data to be unpredictable and probably useless.
         */
        getWriter() {
            if (!IsWritableStream(this)) {
                throw streamBrandCheckException$2('getWriter');
            }
            return AcquireWritableStreamDefaultWriter(this);
        }
    }
    Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: 'WritableStream',
            configurable: true
        });
    }
    // Abstract operations for the WritableStream.
    function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
    }
    // Throws if and only if startAlgorithm throws.
    function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        const controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
    }
    function InitializeWritableStream(stream) {
        stream._state = 'writable';
        // The error that will be reported by new method calls once the state becomes errored. Only set when [[state]] is
        // 'erroring' or 'errored'. May be set to an undefined value.
        stream._storedError = undefined;
        stream._writer = undefined;
        // Initialize to undefined first because the constructor of the controller checks this
        // variable to validate the caller.
        stream._writableStreamController = undefined;
        // This queue is placed here instead of the writer class in order to allow for passing a writer to the next data
        // producer without waiting for the queued writes to finish.
        stream._writeRequests = new SimpleQueue();
        // Write requests are removed from _writeRequests when write() is called on the underlying sink. This prevents
        // them from being erroneously rejected on error. If a write() call is in-flight, the request is stored here.
        stream._inFlightWriteRequest = undefined;
        // The promise that was returned from writer.close(). Stored here because it may be fulfilled after the writer
        // has been detached.
        stream._closeRequest = undefined;
        // Close request is removed from _closeRequest when close() is called on the underlying sink. This prevents it
        // from being erroneously rejected on error. If a close() call is in-flight, the request is stored here.
        stream._inFlightCloseRequest = undefined;
        // The promise that was returned from writer.abort(). This may also be fulfilled after the writer has detached.
        stream._pendingAbortRequest = undefined;
        // The backpressure signal set by the controller.
        stream._backpressure = false;
    }
    function IsWritableStream(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_writableStreamController')) {
            return false;
        }
        return x instanceof WritableStream;
    }
    function IsWritableStreamLocked(stream) {
        if (stream._writer === undefined) {
            return false;
        }
        return true;
    }
    function WritableStreamAbort(stream, reason) {
        var _a;
        if (stream._state === 'closed' || stream._state === 'errored') {
            return promiseResolvedWith(undefined);
        }
        stream._writableStreamController._abortReason = reason;
        (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
        // TypeScript narrows the type of `stream._state` down to 'writable' | 'erroring',
        // but it doesn't know that signaling abort runs author code that might have changed the state.
        // Widen the type again by casting to WritableStreamState.
        const state = stream._state;
        if (state === 'closed' || state === 'errored') {
            return promiseResolvedWith(undefined);
        }
        if (stream._pendingAbortRequest !== undefined) {
            return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state === 'erroring') {
            wasAlreadyErroring = true;
            // reason will not be used, so don't keep a reference to it.
            reason = undefined;
        }
        const promise = newPromise((resolve, reject) => {
            stream._pendingAbortRequest = {
                _promise: undefined,
                _resolve: resolve,
                _reject: reject,
                _reason: reason,
                _wasAlreadyErroring: wasAlreadyErroring
            };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
        }
        return promise;
    }
    function WritableStreamClose(stream) {
        const state = stream._state;
        if (state === 'closed' || state === 'errored') {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise((resolve, reject) => {
            const closeRequest = {
                _resolve: resolve,
                _reject: reject
            };
            stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== undefined && stream._backpressure && state === 'writable') {
            defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
    }
    // WritableStream API exposed for controllers.
    function WritableStreamAddWriteRequest(stream) {
        const promise = newPromise((resolve, reject) => {
            const writeRequest = {
                _resolve: resolve,
                _reject: reject
            };
            stream._writeRequests.push(writeRequest);
        });
        return promise;
    }
    function WritableStreamDealWithRejection(stream, error) {
        const state = stream._state;
        if (state === 'writable') {
            WritableStreamStartErroring(stream, error);
            return;
        }
        WritableStreamFinishErroring(stream);
    }
    function WritableStreamStartErroring(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = 'erroring';
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== undefined) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
        }
    }
    function WritableStreamFinishErroring(stream) {
        stream._state = 'errored';
        stream._writableStreamController[ErrorSteps]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach(writeRequest => {
            writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === undefined) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = undefined;
        if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
        }
        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        });
    }
    function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(undefined);
        stream._inFlightWriteRequest = undefined;
    }
    function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = undefined;
        WritableStreamDealWithRejection(stream, error);
    }
    function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(undefined);
        stream._inFlightCloseRequest = undefined;
        const state = stream._state;
        if (state === 'erroring') {
            // The error was too late to do anything, so it is ignored.
            stream._storedError = undefined;
            if (stream._pendingAbortRequest !== undefined) {
                stream._pendingAbortRequest._resolve();
                stream._pendingAbortRequest = undefined;
            }
        }
        stream._state = 'closed';
        const writer = stream._writer;
        if (writer !== undefined) {
            defaultWriterClosedPromiseResolve(writer);
        }
    }
    function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = undefined;
        // Never execute sink abort() after sink close().
        if (stream._pendingAbortRequest !== undefined) {
            stream._pendingAbortRequest._reject(error);
            stream._pendingAbortRequest = undefined;
        }
        WritableStreamDealWithRejection(stream, error);
    }
    // TODO(ricea): Fix alphabetical order.
    function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === undefined && stream._inFlightCloseRequest === undefined) {
            return false;
        }
        return true;
    }
    function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === undefined && stream._inFlightCloseRequest === undefined) {
            return false;
        }
        return true;
    }
    function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = undefined;
    }
    function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
    }
    function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== undefined) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = undefined;
        }
        const writer = stream._writer;
        if (writer !== undefined) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
    }
    function WritableStreamUpdateBackpressure(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== undefined && backpressure !== stream._backpressure) {
            if (backpressure) {
                defaultWriterReadyPromiseReset(writer);
            }
            else {
                defaultWriterReadyPromiseResolve(writer);
            }
        }
        stream._backpressure = backpressure;
    }
    /**
     * A default writer vended by a {@link WritableStream}.
     *
     * @public
     */
    class WritableStreamDefaultWriter {
        constructor(stream) {
            assertRequiredArgument(stream, 1, 'WritableStreamDefaultWriter');
            assertWritableStream(stream, 'First parameter');
            if (IsWritableStreamLocked(stream)) {
                throw new TypeError('This stream has already been locked for exclusive writing by another writer');
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === 'writable') {
                if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                    defaultWriterReadyPromiseInitialize(this);
                }
                else {
                    defaultWriterReadyPromiseInitializeAsResolved(this);
                }
                defaultWriterClosedPromiseInitialize(this);
            }
            else if (state === 'erroring') {
                defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
                defaultWriterClosedPromiseInitialize(this);
            }
            else if (state === 'closed') {
                defaultWriterReadyPromiseInitializeAsResolved(this);
                defaultWriterClosedPromiseInitializeAsResolved(this);
            }
            else {
                const storedError = stream._storedError;
                defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
                defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the writer’s lock is released before the stream finishes closing.
         */
        get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('closed'));
            }
            return this._closedPromise;
        }
        /**
         * Returns the desired size to fill the stream’s internal queue. It can be negative, if the queue is over-full.
         * A producer can use this information to determine the right amount of data to write.
         *
         * It will be `null` if the stream cannot be successfully written to (due to either being errored, or having an abort
         * queued up). It will return zero if the stream is closed. And the getter will throw an exception if invoked when
         * the writer’s lock is released.
         */
        get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
                throw defaultWriterBrandCheckException('desiredSize');
            }
            if (this._ownerWritableStream === undefined) {
                throw defaultWriterLockException('desiredSize');
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
        }
        /**
         * Returns a promise that will be fulfilled when the desired size to fill the stream’s internal queue transitions
         * from non-positive to positive, signaling that it is no longer applying backpressure. Once the desired size dips
         * back to zero or below, the getter will return a new promise that stays pending until the next transition.
         *
         * If the stream becomes errored or aborted, or the writer’s lock is released, the returned promise will become
         * rejected.
         */
        get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('ready'));
            }
            return this._readyPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.abort | stream.abort(reason)}.
         */
        abort(reason = undefined) {
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('abort'));
            }
            if (this._ownerWritableStream === undefined) {
                return promiseRejectedWith(defaultWriterLockException('abort'));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.close | stream.close()}.
         */
        close() {
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('close'));
            }
            const stream = this._ownerWritableStream;
            if (stream === undefined) {
                return promiseRejectedWith(defaultWriterLockException('close'));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
                return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
            }
            return WritableStreamDefaultWriterClose(this);
        }
        /**
         * Releases the writer’s lock on the corresponding stream. After the lock is released, the writer is no longer active.
         * If the associated stream is errored when the lock is released, the writer will appear errored in the same way from
         * now on; otherwise, the writer will appear closed.
         *
         * Note that the lock can still be released even if some ongoing writes have not yet finished (i.e. even if the
         * promises returned from previous calls to {@link WritableStreamDefaultWriter.write | write()} have not yet settled).
         * It’s not necessary to hold the lock on the writer for the duration of the write; the lock instead simply prevents
         * other producers from writing in an interleaved manner.
         */
        releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
                throw defaultWriterBrandCheckException('releaseLock');
            }
            const stream = this._ownerWritableStream;
            if (stream === undefined) {
                return;
            }
            WritableStreamDefaultWriterRelease(this);
        }
        write(chunk = undefined) {
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('write'));
            }
            if (this._ownerWritableStream === undefined) {
                return promiseRejectedWith(defaultWriterLockException('write to'));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
        }
    }
    Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: 'WritableStreamDefaultWriter',
            configurable: true
        });
    }
    // Abstract operations for the WritableStreamDefaultWriter.
    function IsWritableStreamDefaultWriter(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_ownerWritableStream')) {
            return false;
        }
        return x instanceof WritableStreamDefaultWriter;
    }
    // A client of WritableStreamDefaultWriter may use these functions directly to bypass state check.
    function WritableStreamDefaultWriterAbort(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
    }
    function WritableStreamDefaultWriterClose(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
    }
    function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
            return promiseResolvedWith(undefined);
        }
        if (state === 'errored') {
            return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
    }
    function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === 'pending') {
            defaultWriterClosedPromiseReject(writer, error);
        }
        else {
            defaultWriterClosedPromiseResetToRejected(writer, error);
        }
    }
    function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === 'pending') {
            defaultWriterReadyPromiseReject(writer, error);
        }
        else {
            defaultWriterReadyPromiseResetToRejected(writer, error);
        }
    }
    function WritableStreamDefaultWriterGetDesiredSize(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (state === 'errored' || state === 'erroring') {
            return null;
        }
        if (state === 'closed') {
            return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
    }
    function WritableStreamDefaultWriterRelease(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        // The state transitions to "errored" before the sink abort() method runs, but the writer.closed promise is not
        // rejected until afterwards. This means that simply testing state will not work.
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = undefined;
        writer._ownerWritableStream = undefined;
    }
    function WritableStreamDefaultWriterWrite(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException('write to'));
        }
        const state = stream._state;
        if (state === 'errored') {
            return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
            return promiseRejectedWith(new TypeError('The stream is closing or closed and cannot be written to'));
        }
        if (state === 'erroring') {
            return promiseRejectedWith(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
    }
    const closeSentinel = {};
    /**
     * Allows control of a {@link WritableStream | writable stream}'s state and internal queue.
     *
     * @public
     */
    class WritableStreamDefaultController {
        constructor() {
            throw new TypeError('Illegal constructor');
        }
        /**
         * The reason which was passed to `WritableStream.abort(reason)` when the stream was aborted.
         *
         * @deprecated
         *  This property has been removed from the specification, see https://github.com/whatwg/streams/pull/1177.
         *  Use {@link WritableStreamDefaultController.signal}'s `reason` instead.
         */
        get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$2('abortReason');
            }
            return this._abortReason;
        }
        /**
         * An `AbortSignal` that can be used to abort the pending write or close operation when the stream is aborted.
         */
        get signal() {
            if (!IsWritableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$2('signal');
            }
            if (this._abortController === undefined) {
                // Older browsers or older Node versions may not support `AbortController` or `AbortSignal`.
                // We don't want to bundle and ship an `AbortController` polyfill together with our polyfill,
                // so instead we only implement support for `signal` if we find a global `AbortController` constructor.
                throw new TypeError('WritableStreamDefaultController.prototype.signal is not supported');
            }
            return this._abortController.signal;
        }
        /**
         * Closes the controlled writable stream, making all future interactions with it fail with the given error `e`.
         *
         * This method is rarely used, since usually it suffices to return a rejected promise from one of the underlying
         * sink's methods. However, it can be useful for suddenly shutting down a stream in response to an event outside the
         * normal lifecycle of interactions with the underlying sink.
         */
        error(e = undefined) {
            if (!IsWritableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$2('error');
            }
            const state = this._controlledWritableStream._state;
            if (state !== 'writable') {
                // The stream is closed, errored or will be soon. The sink can't do anything useful if it gets an error here, so
                // just treat it as a no-op.
                return;
            }
            WritableStreamDefaultControllerError(this, e);
        }
        /** @internal */
        [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
        }
        /** @internal */
        [ErrorSteps]() {
            ResetQueue(this);
        }
    }
    Object.defineProperties(WritableStreamDefaultController.prototype, {
        abortReason: { enumerable: true },
        signal: { enumerable: true },
        error: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: 'WritableStreamDefaultController',
            configurable: true
        });
    }
    // Abstract operations implementing interface required by the WritableStream.
    function IsWritableStreamDefaultController(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_controlledWritableStream')) {
            return false;
        }
        return x instanceof WritableStreamDefaultController;
    }
    function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        // Need to set the slots so that the assert doesn't fire. In the spec the slots already exist implicitly.
        controller._queue = undefined;
        controller._queueTotalSize = undefined;
        ResetQueue(controller);
        controller._abortReason = undefined;
        controller._abortController = createAbortController();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, r => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r);
        });
    }
    function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController.prototype);
        let startAlgorithm = () => undefined;
        let writeAlgorithm = () => promiseResolvedWith(undefined);
        let closeAlgorithm = () => promiseResolvedWith(undefined);
        let abortAlgorithm = () => promiseResolvedWith(undefined);
        if (underlyingSink.start !== undefined) {
            startAlgorithm = () => underlyingSink.start(controller);
        }
        if (underlyingSink.write !== undefined) {
            writeAlgorithm = chunk => underlyingSink.write(chunk, controller);
        }
        if (underlyingSink.close !== undefined) {
            closeAlgorithm = () => underlyingSink.close();
        }
        if (underlyingSink.abort !== undefined) {
            abortAlgorithm = reason => underlyingSink.abort(reason);
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
    }
    // ClearAlgorithms may be called twice. Erroring the same stream in multiple ways will often result in redundant calls.
    function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = undefined;
        controller._closeAlgorithm = undefined;
        controller._abortAlgorithm = undefined;
        controller._strategySizeAlgorithm = undefined;
    }
    function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
            return controller._strategySizeAlgorithm(chunk);
        }
        catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
        }
    }
    function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
    }
    function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
        }
        catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === 'writable') {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    // Abstract operations for the WritableStreamDefaultController.
    function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
            return;
        }
        if (stream._inFlightWriteRequest !== undefined) {
            return;
        }
        const state = stream._state;
        if (state === 'erroring') {
            WritableStreamFinishErroring(stream);
            return;
        }
        if (controller._queue.length === 0) {
            return;
        }
        const value = PeekQueueValue(controller);
        if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
        }
        else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
        }
    }
    function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === 'writable') {
            WritableStreamDefaultControllerError(controller, error);
        }
    }
    function WritableStreamDefaultControllerProcessClose(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
        }, reason => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
        });
    }
    function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === 'writable') {
                const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
                WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, reason => {
            if (stream._state === 'writable') {
                WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
        });
    }
    function WritableStreamDefaultControllerGetBackpressure(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
    }
    // A client of WritableStreamDefaultController may use these functions directly to bypass state check.
    function WritableStreamDefaultControllerError(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
    }
    // Helper functions for the WritableStream.
    function streamBrandCheckException$2(name) {
        return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
    }
    // Helper functions for the WritableStreamDefaultController.
    function defaultControllerBrandCheckException$2(name) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
    }
    // Helper functions for the WritableStreamDefaultWriter.
    function defaultWriterBrandCheckException(name) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
    }
    function defaultWriterLockException(name) {
        return new TypeError('Cannot ' + name + ' a stream using a released writer');
    }
    function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise((resolve, reject) => {
            writer._closedPromise_resolve = resolve;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = 'pending';
        });
    }
    function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
    }
    function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
    }
    function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === undefined) {
            return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = undefined;
        writer._closedPromise_reject = undefined;
        writer._closedPromiseState = 'rejected';
    }
    function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === undefined) {
            return;
        }
        writer._closedPromise_resolve(undefined);
        writer._closedPromise_resolve = undefined;
        writer._closedPromise_reject = undefined;
        writer._closedPromiseState = 'resolved';
    }
    function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise((resolve, reject) => {
            writer._readyPromise_resolve = resolve;
            writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = 'pending';
    }
    function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
    }
    function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
    }
    function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === undefined) {
            return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = undefined;
        writer._readyPromise_reject = undefined;
        writer._readyPromiseState = 'rejected';
    }
    function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
    }
    function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === undefined) {
            return;
        }
        writer._readyPromise_resolve(undefined);
        writer._readyPromise_resolve = undefined;
        writer._readyPromise_reject = undefined;
        writer._readyPromiseState = 'fulfilled';
    }

    /// <reference lib="dom" />
    const NativeDOMException = typeof DOMException !== 'undefined' ? DOMException : undefined;

    /// <reference types="node" />
    function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === 'function' || typeof ctor === 'object')) {
            return false;
        }
        try {
            new ctor();
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    function createDOMExceptionPolyfill() {
        // eslint-disable-next-line no-shadow
        const ctor = function DOMException(message, name) {
            this.message = message || '';
            this.name = name || 'Error';
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, this.constructor);
            }
        };
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, 'constructor', { value: ctor, writable: true, configurable: true });
        return ctor;
    }
    // eslint-disable-next-line no-redeclare
    const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();

    function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader(source);
        const writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        let shuttingDown = false;
        // This is used to keep track of the spec's requirement that we wait for ongoing writes during shutdown.
        let currentWrite = promiseResolvedWith(undefined);
        return newPromise((resolve, reject) => {
            let abortAlgorithm;
            if (signal !== undefined) {
                abortAlgorithm = () => {
                    const error = new DOMException$1('Aborted', 'AbortError');
                    const actions = [];
                    if (!preventAbort) {
                        actions.push(() => {
                            if (dest._state === 'writable') {
                                return WritableStreamAbort(dest, error);
                            }
                            return promiseResolvedWith(undefined);
                        });
                    }
                    if (!preventCancel) {
                        actions.push(() => {
                            if (source._state === 'readable') {
                                return ReadableStreamCancel(source, error);
                            }
                            return promiseResolvedWith(undefined);
                        });
                    }
                    shutdownWithAction(() => Promise.all(actions.map(action => action())), true, error);
                };
                if (signal.aborted) {
                    abortAlgorithm();
                    return;
                }
                signal.addEventListener('abort', abortAlgorithm);
            }
            // Using reader and writer, read all chunks from this and write them to dest
            // - Backpressure must be enforced
            // - Shutdown must stop all activity
            function pipeLoop() {
                return newPromise((resolveLoop, rejectLoop) => {
                    function next(done) {
                        if (done) {
                            resolveLoop();
                        }
                        else {
                            // Use `PerformPromiseThen` instead of `uponPromise` to avoid
                            // adding unnecessary `.catch(rethrowAssertionErrorRejection)` handlers
                            PerformPromiseThen(pipeStep(), next, rejectLoop);
                        }
                    }
                    next(false);
                });
            }
            function pipeStep() {
                if (shuttingDown) {
                    return promiseResolvedWith(true);
                }
                return PerformPromiseThen(writer._readyPromise, () => {
                    return newPromise((resolveRead, rejectRead) => {
                        ReadableStreamDefaultReaderRead(reader, {
                            _chunkSteps: chunk => {
                                currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), undefined, noop);
                                resolveRead(false);
                            },
                            _closeSteps: () => resolveRead(true),
                            _errorSteps: rejectRead
                        });
                    });
                });
            }
            // Errors must be propagated forward
            isOrBecomesErrored(source, reader._closedPromise, storedError => {
                if (!preventAbort) {
                    shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
                }
                else {
                    shutdown(true, storedError);
                }
            });
            // Errors must be propagated backward
            isOrBecomesErrored(dest, writer._closedPromise, storedError => {
                if (!preventCancel) {
                    shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
                }
                else {
                    shutdown(true, storedError);
                }
            });
            // Closing must be propagated forward
            isOrBecomesClosed(source, reader._closedPromise, () => {
                if (!preventClose) {
                    shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
                }
                else {
                    shutdown();
                }
            });
            // Closing must be propagated backward
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === 'closed') {
                const destClosed = new TypeError('the destination writable stream closed before all data could be piped to it');
                if (!preventCancel) {
                    shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
                }
                else {
                    shutdown(true, destClosed);
                }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
                // Another write may have started while we were waiting on this currentWrite, so we have to be sure to wait
                // for that too.
                const oldCurrentWrite = currentWrite;
                return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : undefined);
            }
            function isOrBecomesErrored(stream, promise, action) {
                if (stream._state === 'errored') {
                    action(stream._storedError);
                }
                else {
                    uponRejection(promise, action);
                }
            }
            function isOrBecomesClosed(stream, promise, action) {
                if (stream._state === 'closed') {
                    action();
                }
                else {
                    uponFulfillment(promise, action);
                }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
                if (shuttingDown) {
                    return;
                }
                shuttingDown = true;
                if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
                    uponFulfillment(waitForWritesToFinish(), doTheRest);
                }
                else {
                    doTheRest();
                }
                function doTheRest() {
                    uponPromise(action(), () => finalize(originalIsError, originalError), newError => finalize(true, newError));
                }
            }
            function shutdown(isError, error) {
                if (shuttingDown) {
                    return;
                }
                shuttingDown = true;
                if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
                    uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
                }
                else {
                    finalize(isError, error);
                }
            }
            function finalize(isError, error) {
                WritableStreamDefaultWriterRelease(writer);
                ReadableStreamReaderGenericRelease(reader);
                if (signal !== undefined) {
                    signal.removeEventListener('abort', abortAlgorithm);
                }
                if (isError) {
                    reject(error);
                }
                else {
                    resolve(undefined);
                }
            }
        });
    }

    /**
     * Allows control of a {@link ReadableStream | readable stream}'s state and internal queue.
     *
     * @public
     */
    class ReadableStreamDefaultController {
        constructor() {
            throw new TypeError('Illegal constructor');
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$1('desiredSize');
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
            if (!IsReadableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$1('close');
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
                throw new TypeError('The stream is not in a state that permits close');
            }
            ReadableStreamDefaultControllerClose(this);
        }
        enqueue(chunk = undefined) {
            if (!IsReadableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$1('enqueue');
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
                throw new TypeError('The stream is not in a state that permits enqueue');
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(e = undefined) {
            if (!IsReadableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$1('error');
            }
            ReadableStreamDefaultControllerError(this, e);
        }
        /** @internal */
        [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
        }
        /** @internal */
        [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
                const chunk = DequeueValue(this);
                if (this._closeRequested && this._queue.length === 0) {
                    ReadableStreamDefaultControllerClearAlgorithms(this);
                    ReadableStreamClose(stream);
                }
                else {
                    ReadableStreamDefaultControllerCallPullIfNeeded(this);
                }
                readRequest._chunkSteps(chunk);
            }
            else {
                ReadableStreamAddReadRequest(stream, readRequest);
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
        }
    }
    Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStreamDefaultController',
            configurable: true
        });
    }
    // Abstract operations for the ReadableStreamDefaultController.
    function IsReadableStreamDefaultController(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableStream')) {
            return false;
        }
        return x instanceof ReadableStreamDefaultController;
    }
    function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
            return;
        }
        if (controller._pulling) {
            controller._pullAgain = true;
            return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
                controller._pullAgain = false;
                ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
        }, e => {
            ReadableStreamDefaultControllerError(controller, e);
        });
    }
    function ReadableStreamDefaultControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
        }
        if (!controller._started) {
            return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
            return true;
        }
        return false;
    }
    function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = undefined;
        controller._cancelAlgorithm = undefined;
        controller._strategySizeAlgorithm = undefined;
    }
    // A client of ReadableStreamDefaultController may use these functions directly to bypass state check.
    function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
        }
    }
    function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
        }
        else {
            let chunkSize;
            try {
                chunkSize = controller._strategySizeAlgorithm(chunk);
            }
            catch (chunkSizeE) {
                ReadableStreamDefaultControllerError(controller, chunkSizeE);
                throw chunkSizeE;
            }
            try {
                EnqueueValueWithSize(controller, chunk, chunkSize);
            }
            catch (enqueueE) {
                ReadableStreamDefaultControllerError(controller, enqueueE);
                throw enqueueE;
            }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }
    function ReadableStreamDefaultControllerError(controller, e) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== 'readable') {
            return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e);
    }
    function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableStream._state;
        if (state === 'errored') {
            return null;
        }
        if (state === 'closed') {
            return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
    }
    // This is used in the implementation of TransformStream.
    function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
        }
        return true;
    }
    function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        const state = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state === 'readable') {
            return true;
        }
        return false;
    }
    function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = undefined;
        controller._queueTotalSize = undefined;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }, r => {
            ReadableStreamDefaultControllerError(controller, r);
        });
    }
    function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        let startAlgorithm = () => undefined;
        let pullAlgorithm = () => promiseResolvedWith(undefined);
        let cancelAlgorithm = () => promiseResolvedWith(undefined);
        if (underlyingSource.start !== undefined) {
            startAlgorithm = () => underlyingSource.start(controller);
        }
        if (underlyingSource.pull !== undefined) {
            pullAlgorithm = () => underlyingSource.pull(controller);
        }
        if (underlyingSource.cancel !== undefined) {
            cancelAlgorithm = reason => underlyingSource.cancel(reason);
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
    }
    // Helper functions for the ReadableStreamDefaultController.
    function defaultControllerBrandCheckException$1(name) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
    }

    function ReadableStreamTee(stream, cloneForBranch2) {
        if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
        }
        return ReadableStreamDefaultTee(stream);
    }
    function ReadableStreamDefaultTee(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgain = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise(resolve => {
            resolveCancelPromise = resolve;
        });
        function pullAlgorithm() {
            if (reading) {
                readAgain = true;
                return promiseResolvedWith(undefined);
            }
            reading = true;
            const readRequest = {
                _chunkSteps: chunk => {
                    // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
                    // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
                    // successful synchronously-available reads get ahead of asynchronously-available errors.
                    queueMicrotask(() => {
                        readAgain = false;
                        const chunk1 = chunk;
                        const chunk2 = chunk;
                        // There is no way to access the cloning code right now in the reference implementation.
                        // If we add one then we'll need an implementation for serializable objects.
                        // if (!canceled2 && cloneForBranch2) {
                        //   chunk2 = StructuredDeserialize(StructuredSerialize(chunk2));
                        // }
                        if (!canceled1) {
                            ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                        }
                        if (!canceled2) {
                            ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                        }
                        reading = false;
                        if (readAgain) {
                            pullAlgorithm();
                        }
                    });
                },
                _closeSteps: () => {
                    reading = false;
                    if (!canceled1) {
                        ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                    }
                    if (!canceled2) {
                        ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                    }
                    if (!canceled1 || !canceled2) {
                        resolveCancelPromise(undefined);
                    }
                },
                _errorSteps: () => {
                    reading = false;
                }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(undefined);
        }
        function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
                const compositeReason = CreateArrayFromList([reason1, reason2]);
                const cancelResult = ReadableStreamCancel(stream, compositeReason);
                resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
        }
        function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
                const compositeReason = CreateArrayFromList([reason1, reason2]);
                const cancelResult = ReadableStreamCancel(stream, compositeReason);
                resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
        }
        function startAlgorithm() {
            // do nothing
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, (r) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
            if (!canceled1 || !canceled2) {
                resolveCancelPromise(undefined);
            }
        });
        return [branch1, branch2];
    }
    function ReadableByteStreamTee(stream) {
        let reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgainForBranch1 = false;
        let readAgainForBranch2 = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise(resolve => {
            resolveCancelPromise = resolve;
        });
        function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, r => {
                if (thisReader !== reader) {
                    return;
                }
                ReadableByteStreamControllerError(branch1._readableStreamController, r);
                ReadableByteStreamControllerError(branch2._readableStreamController, r);
                if (!canceled1 || !canceled2) {
                    resolveCancelPromise(undefined);
                }
            });
        }
        function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
                ReadableStreamReaderGenericRelease(reader);
                reader = AcquireReadableStreamDefaultReader(stream);
                forwardReaderError(reader);
            }
            const readRequest = {
                _chunkSteps: chunk => {
                    // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
                    // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
                    // successful synchronously-available reads get ahead of asynchronously-available errors.
                    queueMicrotask(() => {
                        readAgainForBranch1 = false;
                        readAgainForBranch2 = false;
                        const chunk1 = chunk;
                        let chunk2 = chunk;
                        if (!canceled1 && !canceled2) {
                            try {
                                chunk2 = CloneAsUint8Array(chunk);
                            }
                            catch (cloneE) {
                                ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                                ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                                resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                                return;
                            }
                        }
                        if (!canceled1) {
                            ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                        }
                        if (!canceled2) {
                            ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                        }
                        reading = false;
                        if (readAgainForBranch1) {
                            pull1Algorithm();
                        }
                        else if (readAgainForBranch2) {
                            pull2Algorithm();
                        }
                    });
                },
                _closeSteps: () => {
                    reading = false;
                    if (!canceled1) {
                        ReadableByteStreamControllerClose(branch1._readableStreamController);
                    }
                    if (!canceled2) {
                        ReadableByteStreamControllerClose(branch2._readableStreamController);
                    }
                    if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                        ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                    }
                    if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                        ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                    }
                    if (!canceled1 || !canceled2) {
                        resolveCancelPromise(undefined);
                    }
                },
                _errorSteps: () => {
                    reading = false;
                }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
                ReadableStreamReaderGenericRelease(reader);
                reader = AcquireReadableStreamBYOBReader(stream);
                forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
                _chunkSteps: chunk => {
                    // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
                    // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
                    // successful synchronously-available reads get ahead of asynchronously-available errors.
                    queueMicrotask(() => {
                        readAgainForBranch1 = false;
                        readAgainForBranch2 = false;
                        const byobCanceled = forBranch2 ? canceled2 : canceled1;
                        const otherCanceled = forBranch2 ? canceled1 : canceled2;
                        if (!otherCanceled) {
                            let clonedChunk;
                            try {
                                clonedChunk = CloneAsUint8Array(chunk);
                            }
                            catch (cloneE) {
                                ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                                ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                                resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                                return;
                            }
                            if (!byobCanceled) {
                                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                            }
                            ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                        }
                        else if (!byobCanceled) {
                            ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                        }
                        reading = false;
                        if (readAgainForBranch1) {
                            pull1Algorithm();
                        }
                        else if (readAgainForBranch2) {
                            pull2Algorithm();
                        }
                    });
                },
                _closeSteps: chunk => {
                    reading = false;
                    const byobCanceled = forBranch2 ? canceled2 : canceled1;
                    const otherCanceled = forBranch2 ? canceled1 : canceled2;
                    if (!byobCanceled) {
                        ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                    }
                    if (!otherCanceled) {
                        ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                    }
                    if (chunk !== undefined) {
                        if (!byobCanceled) {
                            ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                        }
                        if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                            ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                        }
                    }
                    if (!byobCanceled || !otherCanceled) {
                        resolveCancelPromise(undefined);
                    }
                },
                _errorSteps: () => {
                    reading = false;
                }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
        }
        function pull1Algorithm() {
            if (reading) {
                readAgainForBranch1 = true;
                return promiseResolvedWith(undefined);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
                pullWithDefaultReader();
            }
            else {
                pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(undefined);
        }
        function pull2Algorithm() {
            if (reading) {
                readAgainForBranch2 = true;
                return promiseResolvedWith(undefined);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
                pullWithDefaultReader();
            }
            else {
                pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(undefined);
        }
        function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
                const compositeReason = CreateArrayFromList([reason1, reason2]);
                const cancelResult = ReadableStreamCancel(stream, compositeReason);
                resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
        }
        function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
                const compositeReason = CreateArrayFromList([reason1, reason2]);
                const cancelResult = ReadableStreamCancel(stream, compositeReason);
                resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
        }
        function startAlgorithm() {
            return;
        }
        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
    }

    function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
            autoAllocateChunkSize: autoAllocateChunkSize === undefined ?
                undefined :
                convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === undefined ?
                undefined :
                convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === undefined ?
                undefined :
                convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === undefined ?
                undefined :
                convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === undefined ? undefined : convertReadableStreamType(type, `${context} has member 'type' that`)
        };
    }
    function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertReadableStreamType(type, context) {
        type = `${type}`;
        if (type !== 'bytes') {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
    }

    function convertReaderOptions(options, context) {
        assertDictionary(options, context);
        const mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
            mode: mode === undefined ? undefined : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
        };
    }
    function convertReadableStreamReaderMode(mode, context) {
        mode = `${mode}`;
        if (mode !== 'byob') {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
    }

    function convertIteratorOptions(options, context) {
        assertDictionary(options, context);
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
    }

    function convertPipeOptions(options, context) {
        assertDictionary(options, context);
        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        const signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== undefined) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
        }
        return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
        };
    }
    function assertAbortSignal(signal, context) {
        if (!isAbortSignal(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
        }
    }

    function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, 'readable', 'ReadableWritablePair');
        assertReadableStream(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, 'writable', 'ReadableWritablePair');
        assertWritableStream(writable, `${context} has member 'writable' that`);
        return { readable, writable };
    }

    /**
     * A readable stream represents a source of data, from which you can read.
     *
     * @public
     */
    class ReadableStream {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === undefined) {
                rawUnderlyingSource = null;
            }
            else {
                assertObject(rawUnderlyingSource, 'First parameter');
            }
            const strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, 'First parameter');
            InitializeReadableStream(this);
            if (underlyingSource.type === 'bytes') {
                if (strategy.size !== undefined) {
                    throw new RangeError('The strategy for a byte stream cannot have a size function');
                }
                const highWaterMark = ExtractHighWaterMark(strategy, 0);
                SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            }
            else {
                const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
                const highWaterMark = ExtractHighWaterMark(strategy, 1);
                SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
        }
        /**
         * Whether or not the readable stream is locked to a {@link ReadableStreamDefaultReader | reader}.
         */
        get locked() {
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('locked');
            }
            return IsReadableStreamLocked(this);
        }
        /**
         * Cancels the stream, signaling a loss of interest in the stream by a consumer.
         *
         * The supplied `reason` argument will be given to the underlying source's {@link UnderlyingSource.cancel | cancel()}
         * method, which might or might not use it.
         */
        cancel(reason = undefined) {
            if (!IsReadableStream(this)) {
                return promiseRejectedWith(streamBrandCheckException$1('cancel'));
            }
            if (IsReadableStreamLocked(this)) {
                return promiseRejectedWith(new TypeError('Cannot cancel a stream that already has a reader'));
            }
            return ReadableStreamCancel(this, reason);
        }
        getReader(rawOptions = undefined) {
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('getReader');
            }
            const options = convertReaderOptions(rawOptions, 'First parameter');
            if (options.mode === undefined) {
                return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('pipeThrough');
            }
            assertRequiredArgument(rawTransform, 1, 'pipeThrough');
            const transform = convertReadableWritablePair(rawTransform, 'First parameter');
            const options = convertPipeOptions(rawOptions, 'Second parameter');
            if (IsReadableStreamLocked(this)) {
                throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream');
            }
            if (IsWritableStreamLocked(transform.writable)) {
                throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream');
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
                return promiseRejectedWith(streamBrandCheckException$1('pipeTo'));
            }
            if (destination === undefined) {
                return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
                return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
                options = convertPipeOptions(rawOptions, 'Second parameter');
            }
            catch (e) {
                return promiseRejectedWith(e);
            }
            if (IsReadableStreamLocked(this)) {
                return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream'));
            }
            if (IsWritableStreamLocked(destination)) {
                return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream'));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        }
        /**
         * Tees this readable stream, returning a two-element array containing the two resulting branches as
         * new {@link ReadableStream} instances.
         *
         * Teeing a stream will lock it, preventing any other consumer from acquiring a reader.
         * To cancel the stream, cancel both of the resulting branches; a composite cancellation reason will then be
         * propagated to the stream's underlying source.
         *
         * Note that the chunks seen in each branch will be the same object. If the chunks are not immutable,
         * this could allow interference between the two branches.
         */
        tee() {
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('tee');
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
        }
        values(rawOptions = undefined) {
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('values');
            }
            const options = convertIteratorOptions(rawOptions, 'First parameter');
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
        }
    }
    Object.defineProperties(ReadableStream.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStream',
            configurable: true
        });
    }
    if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
        Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream.prototype.values,
            writable: true,
            configurable: true
        });
    }
    // Abstract operations for the ReadableStream.
    // Throws if and only if startAlgorithm throws.
    function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
    }
    // Throws if and only if startAlgorithm throws.
    function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableByteStreamController.prototype);
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, undefined);
        return stream;
    }
    function InitializeReadableStream(stream) {
        stream._state = 'readable';
        stream._reader = undefined;
        stream._storedError = undefined;
        stream._disturbed = false;
    }
    function IsReadableStream(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_readableStreamController')) {
            return false;
        }
        return x instanceof ReadableStream;
    }
    function IsReadableStreamLocked(stream) {
        if (stream._reader === undefined) {
            return false;
        }
        return true;
    }
    // ReadableStream API exposed for controllers.
    function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === 'closed') {
            return promiseResolvedWith(undefined);
        }
        if (stream._state === 'errored') {
            return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        const reader = stream._reader;
        if (reader !== undefined && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach(readIntoRequest => {
                readIntoRequest._closeSteps(undefined);
            });
            reader._readIntoRequests = new SimpleQueue();
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop);
    }
    function ReadableStreamClose(stream) {
        stream._state = 'closed';
        const reader = stream._reader;
        if (reader === undefined) {
            return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach(readRequest => {
                readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
        }
    }
    function ReadableStreamError(stream, e) {
        stream._state = 'errored';
        stream._storedError = e;
        const reader = stream._reader;
        if (reader === undefined) {
            return;
        }
        defaultReaderClosedPromiseReject(reader, e);
        if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach(readRequest => {
                readRequest._errorSteps(e);
            });
            reader._readRequests = new SimpleQueue();
        }
        else {
            reader._readIntoRequests.forEach(readIntoRequest => {
                readIntoRequest._errorSteps(e);
            });
            reader._readIntoRequests = new SimpleQueue();
        }
    }
    // Helper functions for the ReadableStream.
    function streamBrandCheckException$1(name) {
        return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
    }

    function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, 'highWaterMark', 'QueuingStrategyInit');
        return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
    }

    // The size function must not have a prototype property nor be a constructor
    const byteLengthSizeFunction = (chunk) => {
        return chunk.byteLength;
    };
    try {
        Object.defineProperty(byteLengthSizeFunction, 'name', {
            value: 'size',
            configurable: true
        });
    }
    catch (_a) {
        // This property is non-configurable in older browsers, so ignore if this throws.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#browser_compatibility
    }
    /**
     * A queuing strategy that counts the number of bytes in each chunk.
     *
     * @public
     */
    class ByteLengthQueuingStrategy {
        constructor(options) {
            assertRequiredArgument(options, 1, 'ByteLengthQueuingStrategy');
            options = convertQueuingStrategyInit(options, 'First parameter');
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
                throw byteLengthBrandCheckException('highWaterMark');
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by returning the value of its `byteLength` property.
         */
        get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
                throw byteLengthBrandCheckException('size');
            }
            return byteLengthSizeFunction;
        }
    }
    Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: 'ByteLengthQueuingStrategy',
            configurable: true
        });
    }
    // Helper functions for the ByteLengthQueuingStrategy.
    function byteLengthBrandCheckException(name) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
    }
    function IsByteLengthQueuingStrategy(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_byteLengthQueuingStrategyHighWaterMark')) {
            return false;
        }
        return x instanceof ByteLengthQueuingStrategy;
    }

    // The size function must not have a prototype property nor be a constructor
    const countSizeFunction = () => {
        return 1;
    };
    try {
        Object.defineProperty(countSizeFunction, 'name', {
            value: 'size',
            configurable: true
        });
    }
    catch (_a) {
        // This property is non-configurable in older browsers, so ignore if this throws.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#browser_compatibility
    }
    /**
     * A queuing strategy that counts the number of chunks.
     *
     * @public
     */
    class CountQueuingStrategy {
        constructor(options) {
            assertRequiredArgument(options, 1, 'CountQueuingStrategy');
            options = convertQueuingStrategyInit(options, 'First parameter');
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
                throw countBrandCheckException('highWaterMark');
            }
            return this._countQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by always returning 1.
         * This ensures that the total queue size is a count of the number of chunks in the queue.
         */
        get size() {
            if (!IsCountQueuingStrategy(this)) {
                throw countBrandCheckException('size');
            }
            return countSizeFunction;
        }
    }
    Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: 'CountQueuingStrategy',
            configurable: true
        });
    }
    // Helper functions for the CountQueuingStrategy.
    function countBrandCheckException(name) {
        return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
    }
    function IsCountQueuingStrategy(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_countQueuingStrategyHighWaterMark')) {
            return false;
        }
        return x instanceof CountQueuingStrategy;
    }

    function convertTransformer(original, context) {
        assertDictionary(original, context);
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
            flush: flush === undefined ?
                undefined :
                convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === undefined ?
                undefined :
                convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === undefined ?
                undefined :
                convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
        };
    }
    function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }

    // Class TransformStream
    /**
     * A transform stream consists of a pair of streams: a {@link WritableStream | writable stream},
     * known as its writable side, and a {@link ReadableStream | readable stream}, known as its readable side.
     * In a manner specific to the transform stream in question, writes to the writable side result in new data being
     * made available for reading from the readable side.
     *
     * @public
     */
    class TransformStream {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === undefined) {
                rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, 'Second parameter');
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, 'Third parameter');
            const transformer = convertTransformer(rawTransformer, 'First parameter');
            if (transformer.readableType !== undefined) {
                throw new RangeError('Invalid readableType specified');
            }
            if (transformer.writableType !== undefined) {
                throw new RangeError('Invalid writableType specified');
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise(resolve => {
                startPromise_resolve = resolve;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== undefined) {
                startPromise_resolve(transformer.start(this._transformStreamController));
            }
            else {
                startPromise_resolve(undefined);
            }
        }
        /**
         * The readable side of the transform stream.
         */
        get readable() {
            if (!IsTransformStream(this)) {
                throw streamBrandCheckException('readable');
            }
            return this._readable;
        }
        /**
         * The writable side of the transform stream.
         */
        get writable() {
            if (!IsTransformStream(this)) {
                throw streamBrandCheckException('writable');
            }
            return this._writable;
        }
    }
    Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: 'TransformStream',
            configurable: true
        });
    }
    function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
            return startPromise;
        }
        function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(undefined);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        // The [[backpressure]] slot is set to undefined so that it can be initialised by TransformStreamSetBackpressure.
        stream._backpressure = undefined;
        stream._backpressureChangePromise = undefined;
        stream._backpressureChangePromise_resolve = undefined;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = undefined;
    }
    function IsTransformStream(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_transformStreamController')) {
            return false;
        }
        return x instanceof TransformStream;
    }
    // This is a no-op if both sides are already errored.
    function TransformStreamError(stream, e) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
        TransformStreamErrorWritableAndUnblockWrite(stream, e);
    }
    function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
        if (stream._backpressure) {
            // Pretend that pull() was called to permit any pending write() calls to complete. TransformStreamSetBackpressure()
            // cannot be called from enqueue() or pull() once the ReadableStream is errored, so this will will be the final time
            // _backpressure is set.
            TransformStreamSetBackpressure(stream, false);
        }
    }
    function TransformStreamSetBackpressure(stream, backpressure) {
        // Passes also when called during construction.
        if (stream._backpressureChangePromise !== undefined) {
            stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise(resolve => {
            stream._backpressureChangePromise_resolve = resolve;
        });
        stream._backpressure = backpressure;
    }
    // Class TransformStreamDefaultController
    /**
     * Allows control of the {@link ReadableStream} and {@link WritableStream} of the associated {@link TransformStream}.
     *
     * @public
     */
    class TransformStreamDefaultController {
        constructor() {
            throw new TypeError('Illegal constructor');
        }
        /**
         * Returns the desired size to fill the readable side’s internal queue. It can be negative, if the queue is over-full.
         */
        get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException('desiredSize');
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
        }
        enqueue(chunk = undefined) {
            if (!IsTransformStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException('enqueue');
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
        }
        /**
         * Errors both the readable side and the writable side of the controlled transform stream, making all future
         * interactions with it fail with the given error `e`. Any chunks queued for transformation will be discarded.
         */
        error(reason = undefined) {
            if (!IsTransformStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException('error');
            }
            TransformStreamDefaultControllerError(this, reason);
        }
        /**
         * Closes the readable side and errors the writable side of the controlled transform stream. This is useful when the
         * transformer only needs to consume a portion of the chunks written to the writable side.
         */
        terminate() {
            if (!IsTransformStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException('terminate');
            }
            TransformStreamDefaultControllerTerminate(this);
        }
    }
    Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: 'TransformStreamDefaultController',
            configurable: true
        });
    }
    // Transform Stream Default Controller Abstract Operations
    function IsTransformStreamDefaultController(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_controlledTransformStream')) {
            return false;
        }
        return x instanceof TransformStreamDefaultController;
    }
    function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
    }
    function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController.prototype);
        let transformAlgorithm = (chunk) => {
            try {
                TransformStreamDefaultControllerEnqueue(controller, chunk);
                return promiseResolvedWith(undefined);
            }
            catch (transformResultE) {
                return promiseRejectedWith(transformResultE);
            }
        };
        let flushAlgorithm = () => promiseResolvedWith(undefined);
        if (transformer.transform !== undefined) {
            transformAlgorithm = chunk => transformer.transform(chunk, controller);
        }
        if (transformer.flush !== undefined) {
            flushAlgorithm = () => transformer.flush(controller);
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
    }
    function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = undefined;
        controller._flushAlgorithm = undefined;
    }
    function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError('Readable side is not in a state that permits enqueue');
        }
        // We throttle transform invocations based on the backpressure of the ReadableStream, but we still
        // accept TransformStreamDefaultControllerEnqueue() calls.
        try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        }
        catch (e) {
            // This happens when readableStrategy.size() throws.
            TransformStreamErrorWritableAndUnblockWrite(stream, e);
            throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
        }
    }
    function TransformStreamDefaultControllerError(controller, e) {
        TransformStreamError(controller._controlledTransformStream, e);
    }
    function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, undefined, r => {
            TransformStreamError(controller._controlledTransformStream, r);
            throw r;
        });
    }
    function TransformStreamDefaultControllerTerminate(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        const error = new TypeError('TransformStream terminated');
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
    }
    // TransformStreamDefaultSink Algorithms
    function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
                const writable = stream._writable;
                const state = writable._state;
                if (state === 'erroring') {
                    throw writable._storedError;
                }
                return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
    }
    function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        // abort() is not called synchronously, so it is possible for abort() to be called when the stream is already
        // errored.
        TransformStreamError(stream, reason);
        return promiseResolvedWith(undefined);
    }
    function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        // stream._readable cannot change after construction, so caching it across a call to user code is safe.
        const readable = stream._readable;
        const controller = stream._transformStreamController;
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        // Return a promise that is fulfilled with undefined on success.
        return transformPromiseWith(flushPromise, () => {
            if (readable._state === 'errored') {
                throw readable._storedError;
            }
            ReadableStreamDefaultControllerClose(readable._readableStreamController);
        }, r => {
            TransformStreamError(stream, r);
            throw readable._storedError;
        });
    }
    // TransformStreamDefaultSource Algorithms
    function TransformStreamDefaultSourcePullAlgorithm(stream) {
        // Invariant. Enforced by the promises returned by start() and pull().
        TransformStreamSetBackpressure(stream, false);
        // Prevent the next pull() call until there is backpressure.
        return stream._backpressureChangePromise;
    }
    // Helper functions for the TransformStreamDefaultController.
    function defaultControllerBrandCheckException(name) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
    }
    // Helper functions for the TransformStream.
    function streamBrandCheckException(name) {
        return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
    }

    exports.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
    exports.CountQueuingStrategy = CountQueuingStrategy;
    exports.ReadableByteStreamController = ReadableByteStreamController;
    exports.ReadableStream = ReadableStream;
    exports.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
    exports.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
    exports.ReadableStreamDefaultController = ReadableStreamDefaultController;
    exports.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
    exports.TransformStream = TransformStream;
    exports.TransformStreamDefaultController = TransformStreamDefaultController;
    exports.WritableStream = WritableStream;
    exports.WritableStreamDefaultController = WritableStreamDefaultController;
    exports.WritableStreamDefaultWriter = WritableStreamDefaultWriter;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ponyfill.es2018.js.map


/***/ }),

/***/ 9491:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("assert");

/***/ }),

/***/ 4300:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("buffer");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("crypto");

/***/ }),

/***/ 2361:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("net");

/***/ }),

/***/ 7742:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:process");

/***/ }),

/***/ 2477:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:stream/web");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("path");

/***/ }),

/***/ 4404:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("tls");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("util");

/***/ }),

/***/ 1267:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("worker_threads");

/***/ }),

/***/ 4348:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nccwpck_require__) => {

/* c8 ignore start */
// 64 KiB (same size chrome slice theirs blob into Uint8array's)
const POOL_SIZE = 65536

if (!globalThis.ReadableStream) {
  // `node:stream/web` got introduced in v16.5.0 as experimental
  // and it's preferred over the polyfilled version. So we also
  // suppress the warning that gets emitted by NodeJS for using it.
  try {
    const process = __nccwpck_require__(7742)
    const { emitWarning } = process
    try {
      process.emitWarning = () => {}
      Object.assign(globalThis, __nccwpck_require__(2477))
      process.emitWarning = emitWarning
    } catch (error) {
      process.emitWarning = emitWarning
      throw error
    }
  } catch (error) {
    // fallback to polyfill implementation
    Object.assign(globalThis, __nccwpck_require__(6484))
  }
}

try {
  // Don't use node: prefix for this, require+node: is not supported until node v14.14
  // Only `import()` can use prefix in 12.20 and later
  const { Blob } = __nccwpck_require__(4300)
  if (Blob && !Blob.prototype.stream) {
    Blob.prototype.stream = function name (params) {
      let position = 0
      const blob = this

      return new ReadableStream({
        type: 'bytes',
        async pull (ctrl) {
          const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE))
          const buffer = await chunk.arrayBuffer()
          position += buffer.byteLength
          ctrl.enqueue(new Uint8Array(buffer))

          if (position === blob.size) {
            ctrl.close()
          }
        }
      })
    }
  }
} catch (error) {}
/* c8 ignore end */


/***/ }),

/***/ 1564:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export File */
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(8967);


const _File = class File extends _index_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z {
  #lastModified = 0
  #name = ''

  /**
   * @param {*[]} fileBits
   * @param {string} fileName
   * @param {{lastModified?: number, type?: string}} options
   */// @ts-ignore
  constructor (fileBits, fileName, options = {}) {
    if (arguments.length < 2) {
      throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`)
    }
    super(fileBits, options)

    if (options === null) options = {}

    // Simulate WebIDL type casting for NaN value in lastModified option.
    const lastModified = options.lastModified === undefined ? Date.now() : Number(options.lastModified)
    if (!Number.isNaN(lastModified)) {
      this.#lastModified = lastModified
    }

    this.#name = String(fileName)
  }

  get name () {
    return this.#name
  }

  get lastModified () {
    return this.#lastModified
  }

  get [Symbol.toStringTag] () {
    return 'File'
  }

  static [Symbol.hasInstance] (object) {
    return !!object && object instanceof _index_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z &&
      /^(File)$/.test(object[Symbol.toStringTag])
  }
}

/** @type {typeof globalThis.File} */// @ts-ignore
const File = _File
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (File);


/***/ }),

/***/ 7253:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {


// EXPORTS
__nccwpck_require__.d(__webpack_exports__, {
  "$B": () => (/* reexport */ file/* default */.Z)
});

// UNUSED EXPORTS: Blob, blobFrom, blobFromSync, default, fileFrom, fileFromSync

;// CONCATENATED MODULE: external "node:fs"
const external_node_fs_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");
;// CONCATENATED MODULE: external "node:path"
const external_node_path_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");
// EXTERNAL MODULE: ./node_modules/.pnpm/node-domexception@1.0.0/node_modules/node-domexception/index.js
var node_domexception = __nccwpck_require__(1351);
// EXTERNAL MODULE: ./node_modules/.pnpm/fetch-blob@3.2.0/node_modules/fetch-blob/file.js
var file = __nccwpck_require__(1564);
// EXTERNAL MODULE: ./node_modules/.pnpm/fetch-blob@3.2.0/node_modules/fetch-blob/index.js
var fetch_blob = __nccwpck_require__(8967);
;// CONCATENATED MODULE: ./node_modules/.pnpm/fetch-blob@3.2.0/node_modules/fetch-blob/from.js







const { stat } = external_node_fs_namespaceObject.promises

/**
 * @param {string} path filepath on the disk
 * @param {string} [type] mimetype to use
 */
const blobFromSync = (path, type) => fromBlob(statSync(path), path, type)

/**
 * @param {string} path filepath on the disk
 * @param {string} [type] mimetype to use
 * @returns {Promise<Blob>}
 */
const blobFrom = (path, type) => stat(path).then(stat => fromBlob(stat, path, type))

/**
 * @param {string} path filepath on the disk
 * @param {string} [type] mimetype to use
 * @returns {Promise<File>}
 */
const fileFrom = (path, type) => stat(path).then(stat => fromFile(stat, path, type))

/**
 * @param {string} path filepath on the disk
 * @param {string} [type] mimetype to use
 */
const fileFromSync = (path, type) => fromFile(statSync(path), path, type)

// @ts-ignore
const fromBlob = (stat, path, type = '') => new Blob([new BlobDataItem({
  path,
  size: stat.size,
  lastModified: stat.mtimeMs,
  start: 0
})], { type })

// @ts-ignore
const fromFile = (stat, path, type = '') => new File([new BlobDataItem({
  path,
  size: stat.size,
  lastModified: stat.mtimeMs,
  start: 0
})], basename(path), { type, lastModified: stat.mtimeMs })

/**
 * This is a blob backed up by a file on the disk
 * with minium requirement. Its wrapped around a Blob as a blobPart
 * so you have no direct access to this.
 *
 * @private
 */
class BlobDataItem {
  #path
  #start

  constructor (options) {
    this.#path = options.path
    this.#start = options.start
    this.size = options.size
    this.lastModified = options.lastModified
  }

  /**
   * Slicing arguments is first validated and formatted
   * to not be out of range by Blob.prototype.slice
   */
  slice (start, end) {
    return new BlobDataItem({
      path: this.#path,
      lastModified: this.lastModified,
      size: end - start,
      start: this.#start + start
    })
  }

  async * stream () {
    const { mtimeMs } = await stat(this.#path)
    if (mtimeMs > this.lastModified) {
      throw new DOMException('The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.', 'NotReadableError')
    }
    yield * createReadStream(this.#path, {
      start: this.#start,
      end: this.#start + this.size - 1
    })
  }

  get [Symbol.toStringTag] () {
    return 'Blob'
  }
}

/* harmony default export */ const from = ((/* unused pure expression or super */ null && (blobFromSync)));



/***/ }),

/***/ 8967:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export Blob */
/* harmony import */ var _streams_cjs__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(4348);
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

// TODO (jimmywarting): in the feature use conditional loading with top level await (requires 14.x)
// Node has recently added whatwg stream into core



// 64 KiB (same size chrome slice theirs blob into Uint8array's)
const POOL_SIZE = 65536

/** @param {(Blob | Uint8Array)[]} parts */
async function * toIterator (parts, clone = true) {
  for (const part of parts) {
    if ('stream' in part) {
      yield * (/** @type {AsyncIterableIterator<Uint8Array>} */ (part.stream()))
    } else if (ArrayBuffer.isView(part)) {
      if (clone) {
        let position = part.byteOffset
        const end = part.byteOffset + part.byteLength
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE)
          const chunk = part.buffer.slice(position, position + size)
          position += chunk.byteLength
          yield new Uint8Array(chunk)
        }
      } else {
        yield part
      }
    /* c8 ignore next 10 */
    } else {
      // For blobs that have arrayBuffer but no stream method (nodes buffer.Blob)
      let position = 0, b = (/** @type {Blob} */ (part))
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE))
        const buffer = await chunk.arrayBuffer()
        position += buffer.byteLength
        yield new Uint8Array(buffer)
      }
    }
  }
}

const _Blob = class Blob {
  /** @type {Array.<(Blob|Uint8Array)>} */
  #parts = []
  #type = ''
  #size = 0
  #endings = 'transparent'

  /**
   * The Blob() constructor returns a new Blob object. The content
   * of the blob consists of the concatenation of the values given
   * in the parameter array.
   *
   * @param {*} blobParts
   * @param {{ type?: string, endings?: string }} [options]
   */
  constructor (blobParts = [], options = {}) {
    if (typeof blobParts !== 'object' || blobParts === null) {
      throw new TypeError('Failed to construct \'Blob\': The provided value cannot be converted to a sequence.')
    }

    if (typeof blobParts[Symbol.iterator] !== 'function') {
      throw new TypeError('Failed to construct \'Blob\': The object must have a callable @@iterator property.')
    }

    if (typeof options !== 'object' && typeof options !== 'function') {
      throw new TypeError('Failed to construct \'Blob\': parameter 2 cannot convert to dictionary.')
    }

    if (options === null) options = {}

    const encoder = new TextEncoder()
    for (const element of blobParts) {
      let part
      if (ArrayBuffer.isView(element)) {
        part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength))
      } else if (element instanceof ArrayBuffer) {
        part = new Uint8Array(element.slice(0))
      } else if (element instanceof Blob) {
        part = element
      } else {
        part = encoder.encode(`${element}`)
      }

      this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size
      this.#parts.push(part)
    }

    this.#endings = `${options.endings === undefined ? 'transparent' : options.endings}`
    const type = options.type === undefined ? '' : String(options.type)
    this.#type = /^[\x20-\x7E]*$/.test(type) ? type : ''
  }

  /**
   * The Blob interface's size property returns the
   * size of the Blob in bytes.
   */
  get size () {
    return this.#size
  }

  /**
   * The type property of a Blob object returns the MIME type of the file.
   */
  get type () {
    return this.#type
  }

  /**
   * The text() method in the Blob interface returns a Promise
   * that resolves with a string containing the contents of
   * the blob, interpreted as UTF-8.
   *
   * @return {Promise<string>}
   */
  async text () {
    // More optimized than using this.arrayBuffer()
    // that requires twice as much ram
    const decoder = new TextDecoder()
    let str = ''
    for await (const part of toIterator(this.#parts, false)) {
      str += decoder.decode(part, { stream: true })
    }
    // Remaining
    str += decoder.decode()
    return str
  }

  /**
   * The arrayBuffer() method in the Blob interface returns a
   * Promise that resolves with the contents of the blob as
   * binary data contained in an ArrayBuffer.
   *
   * @return {Promise<ArrayBuffer>}
   */
  async arrayBuffer () {
    // Easier way... Just a unnecessary overhead
    // const view = new Uint8Array(this.size);
    // await this.stream().getReader({mode: 'byob'}).read(view);
    // return view.buffer;

    const data = new Uint8Array(this.size)
    let offset = 0
    for await (const chunk of toIterator(this.#parts, false)) {
      data.set(chunk, offset)
      offset += chunk.length
    }

    return data.buffer
  }

  stream () {
    const it = toIterator(this.#parts, true)

    return new globalThis.ReadableStream({
      // @ts-ignore
      type: 'bytes',
      async pull (ctrl) {
        const chunk = await it.next()
        chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value)
      },

      async cancel () {
        await it.return()
      }
    })
  }

  /**
   * The Blob interface's slice() method creates and returns a
   * new Blob object which contains data from a subset of the
   * blob on which it's called.
   *
   * @param {number} [start]
   * @param {number} [end]
   * @param {string} [type]
   */
  slice (start = 0, end = this.size, type = '') {
    const { size } = this

    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size)
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size)

    const span = Math.max(relativeEnd - relativeStart, 0)
    const parts = this.#parts
    const blobParts = []
    let added = 0

    for (const part of parts) {
      // don't add the overflow to new blobParts
      if (added >= span) {
        break
      }

      const size = ArrayBuffer.isView(part) ? part.byteLength : part.size
      if (relativeStart && size <= relativeStart) {
        // Skip the beginning and change the relative
        // start & end position as we skip the unwanted parts
        relativeStart -= size
        relativeEnd -= size
      } else {
        let chunk
        if (ArrayBuffer.isView(part)) {
          chunk = part.subarray(relativeStart, Math.min(size, relativeEnd))
          added += chunk.byteLength
        } else {
          chunk = part.slice(relativeStart, Math.min(size, relativeEnd))
          added += chunk.size
        }
        relativeEnd -= size
        blobParts.push(chunk)
        relativeStart = 0 // All next sequential parts should start at 0
      }
    }

    const blob = new Blob([], { type: String(type).toLowerCase() })
    blob.#size = span
    blob.#parts = blobParts

    return blob
  }

  get [Symbol.toStringTag] () {
    return 'Blob'
  }

  static [Symbol.hasInstance] (object) {
    return (
      object &&
      typeof object === 'object' &&
      typeof object.constructor === 'function' &&
      (
        typeof object.stream === 'function' ||
        typeof object.arrayBuffer === 'function'
      ) &&
      /^(Blob|File)$/.test(object[Symbol.toStringTag])
    )
  }
}

Object.defineProperties(_Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
})

/** @type {typeof globalThis.Blob} */
const Blob = _Blob
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Blob);


/***/ }),

/***/ 2000:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "Ct": () => (/* binding */ FormData),
/* harmony export */   "au": () => (/* binding */ formDataToBlob)
/* harmony export */ });
/* unused harmony export File */
/* harmony import */ var fetch_blob__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(8967);
/* harmony import */ var fetch_blob_file_js__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(1564);
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */




var {toStringTag:t,iterator:i,hasInstance:h}=Symbol,
r=Math.random,
m='append,set,get,getAll,delete,keys,values,entries,forEach,constructor'.split(','),
f=(a,b,c)=>(a+='',/^(Blob|File)$/.test(b && b[t])?[(c=c!==void 0?c+'':b[t]=='File'?b.name:'blob',a),b.name!==c||b[t]=='blob'?new fetch_blob_file_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z([b],c,b):b]:[a,b+'']),
e=(c,f)=>(f?c:c.replace(/\r?\n|\r/g,'\r\n')).replace(/\n/g,'%0A').replace(/\r/g,'%0D').replace(/"/g,'%22'),
x=(n, a, e)=>{if(a.length<e){throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e} arguments required, but only ${a.length} present.`)}}

const File = (/* unused pure expression or super */ null && (F))

/** @type {typeof globalThis.FormData} */
const FormData = class FormData {
#d=[];
constructor(...a){if(a.length)throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`)}
get [t]() {return 'FormData'}
[i](){return this.entries()}
static [h](o) {return o&&typeof o==='object'&&o[t]==='FormData'&&!m.some(m=>typeof o[m]!='function')}
append(...a){x('append',arguments,2);this.#d.push(f(...a))}
delete(a){x('delete',arguments,1);a+='';this.#d=this.#d.filter(([b])=>b!==a)}
get(a){x('get',arguments,1);a+='';for(var b=this.#d,l=b.length,c=0;c<l;c++)if(b[c][0]===a)return b[c][1];return null}
getAll(a,b){x('getAll',arguments,1);b=[];a+='';this.#d.forEach(c=>c[0]===a&&b.push(c[1]));return b}
has(a){x('has',arguments,1);a+='';return this.#d.some(b=>b[0]===a)}
forEach(a,b){x('forEach',arguments,1);for(var [c,d]of this)a.call(b,d,c,this)}
set(...a){x('set',arguments,2);var b=[],c=!0;a=f(...a);this.#d.forEach(d=>{d[0]===a[0]?c&&(c=!b.push(a)):b.push(d)});c&&b.push(a);this.#d=b}
*entries(){yield*this.#d}
*keys(){for(var[a]of this)yield a}
*values(){for(var[,a]of this)yield a}}

/** @param {FormData} F */
function formDataToBlob (F,B=fetch_blob__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z){
var b=`${r()}${r()}`.replace(/\./g, '').slice(-28).padStart(32, '-'),c=[],p=`--${b}\r\nContent-Disposition: form-data; name="`
F.forEach((v,n)=>typeof v=='string'
?c.push(p+e(n)+`"\r\n\r\n${v.replace(/\r(?!\n)|(?<!\r)\n/g, '\r\n')}\r\n`)
:c.push(p+e(n)+`"; filename="${e(v.name, 1)}"\r\nContent-Type: ${v.type||"application/octet-stream"}\r\n\r\n`, v, '\r\n'))
c.push(`--${b}--`)
return new B(c,{type:"multipart/form-data; boundary="+b})}


/***/ }),

/***/ 7196:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {


// EXPORTS
__nccwpck_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ bsky)
});

;// CONCATENATED MODULE: external "node:http"
const external_node_http_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:http");
;// CONCATENATED MODULE: external "node:https"
const external_node_https_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:https");
;// CONCATENATED MODULE: external "node:zlib"
const external_node_zlib_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:zlib");
;// CONCATENATED MODULE: external "node:stream"
const external_node_stream_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:stream");
;// CONCATENATED MODULE: external "node:buffer"
const external_node_buffer_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:buffer");
;// CONCATENATED MODULE: ./node_modules/.pnpm/data-uri-to-buffer@4.0.1/node_modules/data-uri-to-buffer/dist/index.js
/**
 * Returns a `Buffer` instance from the given data URI `uri`.
 *
 * @param {String} uri Data URI to turn into a Buffer instance
 * @returns {Buffer} Buffer instance from Data URI
 * @api public
 */
function dataUriToBuffer(uri) {
    if (!/^data:/i.test(uri)) {
        throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
    }
    // strip newlines
    uri = uri.replace(/\r?\n/g, '');
    // split the URI up into the "metadata" and the "data" portions
    const firstComma = uri.indexOf(',');
    if (firstComma === -1 || firstComma <= 4) {
        throw new TypeError('malformed data: URI');
    }
    // remove the "data:" scheme and parse the metadata
    const meta = uri.substring(5, firstComma).split(';');
    let charset = '';
    let base64 = false;
    const type = meta[0] || 'text/plain';
    let typeFull = type;
    for (let i = 1; i < meta.length; i++) {
        if (meta[i] === 'base64') {
            base64 = true;
        }
        else if (meta[i]) {
            typeFull += `;${meta[i]}`;
            if (meta[i].indexOf('charset=') === 0) {
                charset = meta[i].substring(8);
            }
        }
    }
    // defaults to US-ASCII only if type is not provided
    if (!meta[0] && !charset.length) {
        typeFull += ';charset=US-ASCII';
        charset = 'US-ASCII';
    }
    // get the encoded data portion and decode URI-encoded chars
    const encoding = base64 ? 'base64' : 'ascii';
    const data = unescape(uri.substring(firstComma + 1));
    const buffer = Buffer.from(data, encoding);
    // set `.type` and `.typeFull` properties to MIME type
    buffer.type = type;
    buffer.typeFull = typeFull;
    // set the `.charset` property
    buffer.charset = charset;
    return buffer;
}
/* harmony default export */ const dist = (dataUriToBuffer);
//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: external "node:util"
const external_node_util_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:util");
// EXTERNAL MODULE: ./node_modules/.pnpm/fetch-blob@3.2.0/node_modules/fetch-blob/index.js
var fetch_blob = __nccwpck_require__(8967);
// EXTERNAL MODULE: ./node_modules/.pnpm/formdata-polyfill@4.0.10/node_modules/formdata-polyfill/esm.min.js
var esm_min = __nccwpck_require__(2000);
;// CONCATENATED MODULE: ./node_modules/.pnpm/node-fetch@3.3.1/node_modules/node-fetch/src/errors/base.js
class FetchBaseError extends Error {
	constructor(message, type) {
		super(message);
		// Hide custom error implementation details from end-users
		Error.captureStackTrace(this, this.constructor);

		this.type = type;
	}

	get name() {
		return this.constructor.name;
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/node-fetch@3.3.1/node_modules/node-fetch/src/errors/fetch-error.js



/**
 * @typedef {{ address?: string, code: string, dest?: string, errno: number, info?: object, message: string, path?: string, port?: number, syscall: string}} SystemError
*/

/**
 * FetchError interface for operational errors
 */
class FetchError extends FetchBaseError {
	/**
	 * @param  {string} message -      Error message for human
	 * @param  {string} [type] -        Error type for machine
	 * @param  {SystemError} [systemError] - For Node.js system error
	 */
	constructor(message, type, systemError) {
		super(message, type);
		// When err.type is `system`, err.erroredSysCall contains system error and err.code contains system error code
		if (systemError) {
			// eslint-disable-next-line no-multi-assign
			this.code = this.errno = systemError.code;
			this.erroredSysCall = systemError.syscall;
		}
	}
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/node-fetch@3.3.1/node_modules/node-fetch/src/utils/is.js
/**
 * Is.js
 *
 * Object type checks.
 */

const NAME = Symbol.toStringTag;

/**
 * Check if `obj` is a URLSearchParams object
 * ref: https://github.com/node-fetch/node-fetch/issues/296#issuecomment-307598143
 * @param {*} object - Object to check for
 * @return {boolean}
 */
const isURLSearchParameters = object => {
	return (
		typeof object === 'object' &&
		typeof object.append === 'function' &&
		typeof object.delete === 'function' &&
		typeof object.get === 'function' &&
		typeof object.getAll === 'function' &&
		typeof object.has === 'function' &&
		typeof object.set === 'function' &&
		typeof object.sort === 'function' &&
		object[NAME] === 'URLSearchParams'
	);
};

/**
 * Check if `object` is a W3C `Blob` object (which `File` inherits from)
 * @param {*} object - Object to check for
 * @return {boolean}
 */
const isBlob = object => {
	return (
		object &&
		typeof object === 'object' &&
		typeof object.arrayBuffer === 'function' &&
		typeof object.type === 'string' &&
		typeof object.stream === 'function' &&
		typeof object.constructor === 'function' &&
		/^(Blob|File)$/.test(object[NAME])
	);
};

/**
 * Check if `obj` is an instance of AbortSignal.
 * @param {*} object - Object to check for
 * @return {boolean}
 */
const isAbortSignal = object => {
	return (
		typeof object === 'object' && (
			object[NAME] === 'AbortSignal' ||
			object[NAME] === 'EventTarget'
		)
	);
};

/**
 * isDomainOrSubdomain reports whether sub is a subdomain (or exact match) of
 * the parent domain.
 *
 * Both domains must already be in canonical form.
 * @param {string|URL} original
 * @param {string|URL} destination
 */
const isDomainOrSubdomain = (destination, original) => {
	const orig = new URL(original).hostname;
	const dest = new URL(destination).hostname;

	return orig === dest || orig.endsWith(`.${dest}`);
};

/**
 * isSameProtocol reports whether the two provided URLs use the same protocol.
 *
 * Both domains must already be in canonical form.
 * @param {string|URL} original
 * @param {string|URL} destination
 */
const isSameProtocol = (destination, original) => {
	const orig = new URL(original).protocol;
	const dest = new URL(destination).protocol;

	return orig === dest;
};

;// CONCATENATED MODULE: ./node_modules/.pnpm/node-fetch@3.3.1/node_modules/node-fetch/src/body.js

/**
 * Body.js
 *
 * Body interface provides common methods for Request and Response
 */












const pipeline = (0,external_node_util_namespaceObject.promisify)(external_node_stream_namespaceObject.pipeline);
const INTERNALS = Symbol('Body internals');

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Body {
	constructor(body, {
		size = 0
	} = {}) {
		let boundary = null;

		if (body === null) {
			// Body is undefined or null
			body = null;
		} else if (isURLSearchParameters(body)) {
			// Body is a URLSearchParams
			body = external_node_buffer_namespaceObject.Buffer.from(body.toString());
		} else if (isBlob(body)) {
			// Body is blob
		} else if (external_node_buffer_namespaceObject.Buffer.isBuffer(body)) {
			// Body is Buffer
		} else if (external_node_util_namespaceObject.types.isAnyArrayBuffer(body)) {
			// Body is ArrayBuffer
			body = external_node_buffer_namespaceObject.Buffer.from(body);
		} else if (ArrayBuffer.isView(body)) {
			// Body is ArrayBufferView
			body = external_node_buffer_namespaceObject.Buffer.from(body.buffer, body.byteOffset, body.byteLength);
		} else if (body instanceof external_node_stream_namespaceObject) {
			// Body is stream
		} else if (body instanceof esm_min/* FormData */.Ct) {
			// Body is FormData
			body = (0,esm_min/* formDataToBlob */.au)(body);
			boundary = body.type.split('=')[1];
		} else {
			// None of the above
			// coerce to string then buffer
			body = external_node_buffer_namespaceObject.Buffer.from(String(body));
		}

		let stream = body;

		if (external_node_buffer_namespaceObject.Buffer.isBuffer(body)) {
			stream = external_node_stream_namespaceObject.Readable.from(body);
		} else if (isBlob(body)) {
			stream = external_node_stream_namespaceObject.Readable.from(body.stream());
		}

		this[INTERNALS] = {
			body,
			stream,
			boundary,
			disturbed: false,
			error: null
		};
		this.size = size;

		if (body instanceof external_node_stream_namespaceObject) {
			body.on('error', error_ => {
				const error = error_ instanceof FetchBaseError ?
					error_ :
					new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, 'system', error_);
				this[INTERNALS].error = error;
			});
		}
	}

	get body() {
		return this[INTERNALS].stream;
	}

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	}

	/**
	 * Decode response as ArrayBuffer
	 *
	 * @return  Promise
	 */
	async arrayBuffer() {
		const {buffer, byteOffset, byteLength} = await consumeBody(this);
		return buffer.slice(byteOffset, byteOffset + byteLength);
	}

	async formData() {
		const ct = this.headers.get('content-type');

		if (ct.startsWith('application/x-www-form-urlencoded')) {
			const formData = new esm_min/* FormData */.Ct();
			const parameters = new URLSearchParams(await this.text());

			for (const [name, value] of parameters) {
				formData.append(name, value);
			}

			return formData;
		}

		const {toFormData} = await __nccwpck_require__.e(/* import() */ 747).then(__nccwpck_require__.bind(__nccwpck_require__, 747));
		return toFormData(this.body, ct);
	}

	/**
	 * Return raw response as Blob
	 *
	 * @return Promise
	 */
	async blob() {
		const ct = (this.headers && this.headers.get('content-type')) || (this[INTERNALS].body && this[INTERNALS].body.type) || '';
		const buf = await this.arrayBuffer();

		return new fetch_blob/* default */.Z([buf], {
			type: ct
		});
	}

	/**
	 * Decode response as json
	 *
	 * @return  Promise
	 */
	async json() {
		const text = await this.text();
		return JSON.parse(text);
	}

	/**
	 * Decode response as text
	 *
	 * @return  Promise
	 */
	async text() {
		const buffer = await consumeBody(this);
		return new TextDecoder().decode(buffer);
	}

	/**
	 * Decode response as buffer (non-spec api)
	 *
	 * @return  Promise
	 */
	buffer() {
		return consumeBody(this);
	}
}

Body.prototype.buffer = (0,external_node_util_namespaceObject.deprecate)(Body.prototype.buffer, 'Please use \'response.arrayBuffer()\' instead of \'response.buffer()\'', 'node-fetch#buffer');

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: {enumerable: true},
	bodyUsed: {enumerable: true},
	arrayBuffer: {enumerable: true},
	blob: {enumerable: true},
	json: {enumerable: true},
	text: {enumerable: true},
	data: {get: (0,external_node_util_namespaceObject.deprecate)(() => {},
		'data doesn\'t exist, use json(), text(), arrayBuffer(), or body instead',
		'https://github.com/node-fetch/node-fetch/issues/1000 (response)')}
});

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return Promise
 */
async function consumeBody(data) {
	if (data[INTERNALS].disturbed) {
		throw new TypeError(`body used already for: ${data.url}`);
	}

	data[INTERNALS].disturbed = true;

	if (data[INTERNALS].error) {
		throw data[INTERNALS].error;
	}

	const {body} = data;

	// Body is null
	if (body === null) {
		return external_node_buffer_namespaceObject.Buffer.alloc(0);
	}

	/* c8 ignore next 3 */
	if (!(body instanceof external_node_stream_namespaceObject)) {
		return external_node_buffer_namespaceObject.Buffer.alloc(0);
	}

	// Body is stream
	// get ready to actually consume the body
	const accum = [];
	let accumBytes = 0;

	try {
		for await (const chunk of body) {
			if (data.size > 0 && accumBytes + chunk.length > data.size) {
				const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, 'max-size');
				body.destroy(error);
				throw error;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		}
	} catch (error) {
		const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, 'system', error);
		throw error_;
	}

	if (body.readableEnded === true || body._readableState.ended === true) {
		try {
			if (accum.every(c => typeof c === 'string')) {
				return external_node_buffer_namespaceObject.Buffer.from(accum.join(''));
			}

			return external_node_buffer_namespaceObject.Buffer.concat(accum, accumBytes);
		} catch (error) {
			throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, 'system', error);
		}
	} else {
		throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
	}
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed   instance       Response or Request instance
 * @param   String  highWaterMark  highWaterMark for both PassThrough body streams
 * @return  Mixed
 */
const clone = (instance, highWaterMark) => {
	let p1;
	let p2;
	let {body} = instance[INTERNALS];

	// Don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// Check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if ((body instanceof external_node_stream_namespaceObject) && (typeof body.getBoundary !== 'function')) {
		// Tee instance body
		p1 = new external_node_stream_namespaceObject.PassThrough({highWaterMark});
		p2 = new external_node_stream_namespaceObject.PassThrough({highWaterMark});
		body.pipe(p1);
		body.pipe(p2);
		// Set instance body to teed body and return the other teed body
		instance[INTERNALS].stream = p1;
		body = p2;
	}

	return body;
};

const getNonSpecFormDataBoundary = (0,external_node_util_namespaceObject.deprecate)(
	body => body.getBoundary(),
	'form-data doesn\'t follow the spec and requires special treatment. Use alternative package',
	'https://github.com/node-fetch/node-fetch/issues/1167'
);

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param {any} body Any options.body input
 * @returns {string | null}
 */
const extractContentType = (body, request) => {
	// Body is null or undefined
	if (body === null) {
		return null;
	}

	// Body is string
	if (typeof body === 'string') {
		return 'text/plain;charset=UTF-8';
	}

	// Body is a URLSearchParams
	if (isURLSearchParameters(body)) {
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	}

	// Body is blob
	if (isBlob(body)) {
		return body.type || null;
	}

	// Body is a Buffer (Buffer, ArrayBuffer or ArrayBufferView)
	if (external_node_buffer_namespaceObject.Buffer.isBuffer(body) || external_node_util_namespaceObject.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
		return null;
	}

	if (body instanceof esm_min/* FormData */.Ct) {
		return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
	}

	// Detect form data input from form-data module
	if (body && typeof body.getBoundary === 'function') {
		return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
	}

	// Body is stream - can't really do much about this
	if (body instanceof external_node_stream_namespaceObject) {
		return null;
	}

	// Body constructor defaults other things to string
	return 'text/plain;charset=UTF-8';
};

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param {any} obj.body Body object from the Body instance.
 * @returns {number | null}
 */
const getTotalBytes = request => {
	const {body} = request[INTERNALS];

	// Body is null or undefined
	if (body === null) {
		return 0;
	}

	// Body is Blob
	if (isBlob(body)) {
		return body.size;
	}

	// Body is Buffer
	if (external_node_buffer_namespaceObject.Buffer.isBuffer(body)) {
		return body.length;
	}

	// Detect form data input from form-data module
	if (body && typeof body.getLengthSync === 'function') {
		return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
	}

	// Body is stream
	return null;
};

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param {Stream.Writable} dest The stream to write to.
 * @param obj.body Body object from the Body instance.
 * @returns {Promise<void>}
 */
const writeToStream = async (dest, {body}) => {
	if (body === null) {
		// Body is null
		dest.end();
	} else {
		// Body is stream
		await pipeline(body, dest);
	}
};

;// CONCATENATED MODULE: ./node_modules/.pnpm/node-fetch@3.3.1/node_modules/node-fetch/src/headers.js
/**
 * Headers.js
 *
 * Headers class offers convenient helpers
 */




/* c8 ignore next 9 */
const validateHeaderName = typeof external_node_http_namespaceObject.validateHeaderName === 'function' ?
	external_node_http_namespaceObject.validateHeaderName :
	name => {
		if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
			const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
			Object.defineProperty(error, 'code', {value: 'ERR_INVALID_HTTP_TOKEN'});
			throw error;
		}
	};

/* c8 ignore next 9 */
const validateHeaderValue = typeof external_node_http_namespaceObject.validateHeaderValue === 'function' ?
	external_node_http_namespaceObject.validateHeaderValue :
	(name, value) => {
		if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
			const error = new TypeError(`Invalid character in header content ["${name}"]`);
			Object.defineProperty(error, 'code', {value: 'ERR_INVALID_CHAR'});
			throw error;
		}
	};

/**
 * @typedef {Headers | Record<string, string> | Iterable<readonly [string, string]> | Iterable<Iterable<string>>} HeadersInit
 */

/**
 * This Fetch API interface allows you to perform various actions on HTTP request and response headers.
 * These actions include retrieving, setting, adding to, and removing.
 * A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.
 * You can add to this using methods like append() (see Examples.)
 * In all methods of this interface, header names are matched by case-insensitive byte sequence.
 *
 */
class Headers extends URLSearchParams {
	/**
	 * Headers class
	 *
	 * @constructor
	 * @param {HeadersInit} [init] - Response headers
	 */
	constructor(init) {
		// Validate and normalize init object in [name, value(s)][]
		/** @type {string[][]} */
		let result = [];
		if (init instanceof Headers) {
			const raw = init.raw();
			for (const [name, values] of Object.entries(raw)) {
				result.push(...values.map(value => [name, value]));
			}
		} else if (init == null) { // eslint-disable-line no-eq-null, eqeqeq
			// No op
		} else if (typeof init === 'object' && !external_node_util_namespaceObject.types.isBoxedPrimitive(init)) {
			const method = init[Symbol.iterator];
			// eslint-disable-next-line no-eq-null, eqeqeq
			if (method == null) {
				// Record<ByteString, ByteString>
				result.push(...Object.entries(init));
			} else {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// Sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				result = [...init]
					.map(pair => {
						if (
							typeof pair !== 'object' || external_node_util_namespaceObject.types.isBoxedPrimitive(pair)
						) {
							throw new TypeError('Each header pair must be an iterable object');
						}

						return [...pair];
					}).map(pair => {
						if (pair.length !== 2) {
							throw new TypeError('Each header pair must be a name/value tuple');
						}

						return [...pair];
					});
			}
		} else {
			throw new TypeError('Failed to construct \'Headers\': The provided value is not of type \'(sequence<sequence<ByteString>> or record<ByteString, ByteString>)');
		}

		// Validate and lowercase
		result =
			result.length > 0 ?
				result.map(([name, value]) => {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return [String(name).toLowerCase(), String(value)];
				}) :
				undefined;

		super(result);

		// Returning a Proxy that will lowercase key names, validate parameters and sort keys
		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get(target, p, receiver) {
				switch (p) {
					case 'append':
					case 'set':
						return (name, value) => {
							validateHeaderName(name);
							validateHeaderValue(name, String(value));
							return URLSearchParams.prototype[p].call(
								target,
								String(name).toLowerCase(),
								String(value)
							);
						};

					case 'delete':
					case 'has':
					case 'getAll':
						return name => {
							validateHeaderName(name);
							return URLSearchParams.prototype[p].call(
								target,
								String(name).toLowerCase()
							);
						};

					case 'keys':
						return () => {
							target.sort();
							return new Set(URLSearchParams.prototype.keys.call(target)).keys();
						};

					default:
						return Reflect.get(target, p, receiver);
				}
			}
		});
		/* c8 ignore next */
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	toString() {
		return Object.prototype.toString.call(this);
	}

	get(name) {
		const values = this.getAll(name);
		if (values.length === 0) {
			return null;
		}

		let value = values.join(', ');
		if (/^content-encoding$/i.test(name)) {
			value = value.toLowerCase();
		}

		return value;
	}

	forEach(callback, thisArg = undefined) {
		for (const name of this.keys()) {
			Reflect.apply(callback, thisArg, [this.get(name), name, this]);
		}
	}

	* values() {
		for (const name of this.keys()) {
			yield this.get(name);
		}
	}

	/**
	 * @type {() => IterableIterator<[string, string]>}
	 */
	* entries() {
		for (const name of this.keys()) {
			yield [name, this.get(name)];
		}
	}

	[Symbol.iterator]() {
		return this.entries();
	}

	/**
	 * Node-fetch non-spec method
	 * returning all headers and their values as array
	 * @returns {Record<string, string[]>}
	 */
	raw() {
		return [...this.keys()].reduce((result, key) => {
			result[key] = this.getAll(key);
			return result;
		}, {});
	}

	/**
	 * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
	 */
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return [...this.keys()].reduce((result, key) => {
			const values = this.getAll(key);
			// Http.request() only supports string as Host header.
			// This hack makes specifying custom Host header possible.
			if (key === 'host') {
				result[key] = values[0];
			} else {
				result[key] = values.length > 1 ? values : values[0];
			}

			return result;
		}, {});
	}
}

/**
 * Re-shaping object for Web IDL tests
 * Only need to do it for overridden methods
 */
Object.defineProperties(
	Headers.prototype,
	['get', 'entries', 'forEach', 'values'].reduce((result, property) => {
		result[property] = {enumerable: true};
		return result;
	}, {})
);

/**
 * Create a Headers object from an http.IncomingMessage.rawHeaders, ignoring those that do
 * not conform to HTTP grammar productions.
 * @param {import('http').IncomingMessage['rawHeaders']} headers
 */
function fromRawHeaders(headers = []) {
	return new Headers(
		headers
			// Split into pairs
			.reduce((result, value, index, array) => {
				if (index % 2 === 0) {
					result.push(array.slice(index, index + 2));
				}

				return result;
			}, [])
			.filter(([name, value]) => {
				try {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return true;
				} catch {
					return false;
				}
			})

	);
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/node-fetch@3.3.1/node_modules/node-fetch/src/utils/is-redirect.js
const redirectStatus = new Set([301, 302, 303, 307, 308]);

/**
 * Redirect code matching
 *
 * @param {number} code - Status code
 * @return {boolean}
 */
const isRedirect = code => {
	return redirectStatus.has(code);
};

;// CONCATENATED MODULE: ./node_modules/.pnpm/node-fetch@3.3.1/node_modules/node-fetch/src/response.js
/**
 * Response.js
 *
 * Response class provides content decoding
 */





const response_INTERNALS = Symbol('Response internals');

/**
 * Response class
 *
 * Ref: https://fetch.spec.whatwg.org/#response-class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response extends Body {
	constructor(body = null, options = {}) {
		super(body, options);

		// eslint-disable-next-line no-eq-null, eqeqeq, no-negated-condition
		const status = options.status != null ? options.status : 200;

		const headers = new Headers(options.headers);

		if (body !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body, this);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[response_INTERNALS] = {
			type: 'default',
			url: options.url,
			status,
			statusText: options.statusText || '',
			headers,
			counter: options.counter,
			highWaterMark: options.highWaterMark
		};
	}

	get type() {
		return this[response_INTERNALS].type;
	}

	get url() {
		return this[response_INTERNALS].url || '';
	}

	get status() {
		return this[response_INTERNALS].status;
	}

	/**
	 * Convenience property representing if the request ended normally
	 */
	get ok() {
		return this[response_INTERNALS].status >= 200 && this[response_INTERNALS].status < 300;
	}

	get redirected() {
		return this[response_INTERNALS].counter > 0;
	}

	get statusText() {
		return this[response_INTERNALS].statusText;
	}

	get headers() {
		return this[response_INTERNALS].headers;
	}

	get highWaterMark() {
		return this[response_INTERNALS].highWaterMark;
	}

	/**
	 * Clone this response
	 *
	 * @return  Response
	 */
	clone() {
		return new Response(clone(this, this.highWaterMark), {
			type: this.type,
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected,
			size: this.size,
			highWaterMark: this.highWaterMark
		});
	}

	/**
	 * @param {string} url    The URL that the new response is to originate from.
	 * @param {number} status An optional status code for the response (e.g., 302.)
	 * @returns {Response}    A Response object.
	 */
	static redirect(url, status = 302) {
		if (!isRedirect(status)) {
			throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
		}

		return new Response(null, {
			headers: {
				location: new URL(url).toString()
			},
			status
		});
	}

	static error() {
		const response = new Response(null, {status: 0, statusText: ''});
		response[response_INTERNALS].type = 'error';
		return response;
	}

	static json(data = undefined, init = {}) {
		const body = JSON.stringify(data);

		if (body === undefined) {
			throw new TypeError('data is not JSON serializable');
		}

		const headers = new Headers(init && init.headers);

		if (!headers.has('content-type')) {
			headers.set('content-type', 'application/json');
		}

		return new Response(body, {
			...init,
			headers
		});
	}

	get [Symbol.toStringTag]() {
		return 'Response';
	}
}

Object.defineProperties(Response.prototype, {
	type: {enumerable: true},
	url: {enumerable: true},
	status: {enumerable: true},
	ok: {enumerable: true},
	redirected: {enumerable: true},
	statusText: {enumerable: true},
	headers: {enumerable: true},
	clone: {enumerable: true}
});

;// CONCATENATED MODULE: external "node:url"
const external_node_url_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:url");
;// CONCATENATED MODULE: ./node_modules/.pnpm/node-fetch@3.3.1/node_modules/node-fetch/src/utils/get-search.js
const getSearch = parsedURL => {
	if (parsedURL.search) {
		return parsedURL.search;
	}

	const lastOffset = parsedURL.href.length - 1;
	const hash = parsedURL.hash || (parsedURL.href[lastOffset] === '#' ? '#' : '');
	return parsedURL.href[lastOffset - hash.length] === '?' ? '?' : '';
};

;// CONCATENATED MODULE: external "node:net"
const external_node_net_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:net");
;// CONCATENATED MODULE: ./node_modules/.pnpm/node-fetch@3.3.1/node_modules/node-fetch/src/utils/referrer.js


/**
 * @external URL
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URL|URL}
 */

/**
 * @module utils/referrer
 * @private
 */

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#strip-url|Referrer Policy §8.4. Strip url for use as a referrer}
 * @param {string} URL
 * @param {boolean} [originOnly=false]
 */
function stripURLForUseAsAReferrer(url, originOnly = false) {
	// 1. If url is null, return no referrer.
	if (url == null) { // eslint-disable-line no-eq-null, eqeqeq
		return 'no-referrer';
	}

	url = new URL(url);

	// 2. If url's scheme is a local scheme, then return no referrer.
	if (/^(about|blob|data):$/.test(url.protocol)) {
		return 'no-referrer';
	}

	// 3. Set url's username to the empty string.
	url.username = '';

	// 4. Set url's password to null.
	// Note: `null` appears to be a mistake as this actually results in the password being `"null"`.
	url.password = '';

	// 5. Set url's fragment to null.
	// Note: `null` appears to be a mistake as this actually results in the fragment being `"#null"`.
	url.hash = '';

	// 6. If the origin-only flag is true, then:
	if (originOnly) {
		// 6.1. Set url's path to null.
		// Note: `null` appears to be a mistake as this actually results in the path being `"/null"`.
		url.pathname = '';

		// 6.2. Set url's query to null.
		// Note: `null` appears to be a mistake as this actually results in the query being `"?null"`.
		url.search = '';
	}

	// 7. Return url.
	return url;
}

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#enumdef-referrerpolicy|enum ReferrerPolicy}
 */
const ReferrerPolicy = new Set([
	'',
	'no-referrer',
	'no-referrer-when-downgrade',
	'same-origin',
	'origin',
	'strict-origin',
	'origin-when-cross-origin',
	'strict-origin-when-cross-origin',
	'unsafe-url'
]);

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#default-referrer-policy|default referrer policy}
 */
const DEFAULT_REFERRER_POLICY = 'strict-origin-when-cross-origin';

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#referrer-policies|Referrer Policy §3. Referrer Policies}
 * @param {string} referrerPolicy
 * @returns {string} referrerPolicy
 */
function validateReferrerPolicy(referrerPolicy) {
	if (!ReferrerPolicy.has(referrerPolicy)) {
		throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
	}

	return referrerPolicy;
}

/**
 * @see {@link https://w3c.github.io/webappsec-secure-contexts/#is-origin-trustworthy|Referrer Policy §3.2. Is origin potentially trustworthy?}
 * @param {external:URL} url
 * @returns `true`: "Potentially Trustworthy", `false`: "Not Trustworthy"
 */
function isOriginPotentiallyTrustworthy(url) {
	// 1. If origin is an opaque origin, return "Not Trustworthy".
	// Not applicable

	// 2. Assert: origin is a tuple origin.
	// Not for implementations

	// 3. If origin's scheme is either "https" or "wss", return "Potentially Trustworthy".
	if (/^(http|ws)s:$/.test(url.protocol)) {
		return true;
	}

	// 4. If origin's host component matches one of the CIDR notations 127.0.0.0/8 or ::1/128 [RFC4632], return "Potentially Trustworthy".
	const hostIp = url.host.replace(/(^\[)|(]$)/g, '');
	const hostIPVersion = (0,external_node_net_namespaceObject.isIP)(hostIp);

	if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
		return true;
	}

	if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
		return true;
	}

	// 5. If origin's host component is "localhost" or falls within ".localhost", and the user agent conforms to the name resolution rules in [let-localhost-be-localhost], return "Potentially Trustworthy".
	// We are returning FALSE here because we cannot ensure conformance to
	// let-localhost-be-loalhost (https://tools.ietf.org/html/draft-west-let-localhost-be-localhost)
	if (url.host === 'localhost' || url.host.endsWith('.localhost')) {
		return false;
	}

	// 6. If origin's scheme component is file, return "Potentially Trustworthy".
	if (url.protocol === 'file:') {
		return true;
	}

	// 7. If origin's scheme component is one which the user agent considers to be authenticated, return "Potentially Trustworthy".
	// Not supported

	// 8. If origin has been configured as a trustworthy origin, return "Potentially Trustworthy".
	// Not supported

	// 9. Return "Not Trustworthy".
	return false;
}

/**
 * @see {@link https://w3c.github.io/webappsec-secure-contexts/#is-url-trustworthy|Referrer Policy §3.3. Is url potentially trustworthy?}
 * @param {external:URL} url
 * @returns `true`: "Potentially Trustworthy", `false`: "Not Trustworthy"
 */
function isUrlPotentiallyTrustworthy(url) {
	// 1. If url is "about:blank" or "about:srcdoc", return "Potentially Trustworthy".
	if (/^about:(blank|srcdoc)$/.test(url)) {
		return true;
	}

	// 2. If url's scheme is "data", return "Potentially Trustworthy".
	if (url.protocol === 'data:') {
		return true;
	}

	// Note: The origin of blob: and filesystem: URLs is the origin of the context in which they were
	// created. Therefore, blobs created in a trustworthy origin will themselves be potentially
	// trustworthy.
	if (/^(blob|filesystem):$/.test(url.protocol)) {
		return true;
	}

	// 3. Return the result of executing §3.2 Is origin potentially trustworthy? on url's origin.
	return isOriginPotentiallyTrustworthy(url);
}

/**
 * Modifies the referrerURL to enforce any extra security policy considerations.
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#determine-requests-referrer|Referrer Policy §8.3. Determine request's Referrer}, step 7
 * @callback module:utils/referrer~referrerURLCallback
 * @param {external:URL} referrerURL
 * @returns {external:URL} modified referrerURL
 */

/**
 * Modifies the referrerOrigin to enforce any extra security policy considerations.
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#determine-requests-referrer|Referrer Policy §8.3. Determine request's Referrer}, step 7
 * @callback module:utils/referrer~referrerOriginCallback
 * @param {external:URL} referrerOrigin
 * @returns {external:URL} modified referrerOrigin
 */

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#determine-requests-referrer|Referrer Policy §8.3. Determine request's Referrer}
 * @param {Request} request
 * @param {object} o
 * @param {module:utils/referrer~referrerURLCallback} o.referrerURLCallback
 * @param {module:utils/referrer~referrerOriginCallback} o.referrerOriginCallback
 * @returns {external:URL} Request's referrer
 */
function determineRequestsReferrer(request, {referrerURLCallback, referrerOriginCallback} = {}) {
	// There are 2 notes in the specification about invalid pre-conditions.  We return null, here, for
	// these cases:
	// > Note: If request's referrer is "no-referrer", Fetch will not call into this algorithm.
	// > Note: If request's referrer policy is the empty string, Fetch will not call into this
	// > algorithm.
	if (request.referrer === 'no-referrer' || request.referrerPolicy === '') {
		return null;
	}

	// 1. Let policy be request's associated referrer policy.
	const policy = request.referrerPolicy;

	// 2. Let environment be request's client.
	// not applicable to node.js

	// 3. Switch on request's referrer:
	if (request.referrer === 'about:client') {
		return 'no-referrer';
	}

	// "a URL": Let referrerSource be request's referrer.
	const referrerSource = request.referrer;

	// 4. Let request's referrerURL be the result of stripping referrerSource for use as a referrer.
	let referrerURL = stripURLForUseAsAReferrer(referrerSource);

	// 5. Let referrerOrigin be the result of stripping referrerSource for use as a referrer, with the
	//    origin-only flag set to true.
	let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);

	// 6. If the result of serializing referrerURL is a string whose length is greater than 4096, set
	//    referrerURL to referrerOrigin.
	if (referrerURL.toString().length > 4096) {
		referrerURL = referrerOrigin;
	}

	// 7. The user agent MAY alter referrerURL or referrerOrigin at this point to enforce arbitrary
	//    policy considerations in the interests of minimizing data leakage. For example, the user
	//    agent could strip the URL down to an origin, modify its host, replace it with an empty
	//    string, etc.
	if (referrerURLCallback) {
		referrerURL = referrerURLCallback(referrerURL);
	}

	if (referrerOriginCallback) {
		referrerOrigin = referrerOriginCallback(referrerOrigin);
	}

	// 8.Execute the statements corresponding to the value of policy:
	const currentURL = new URL(request.url);

	switch (policy) {
		case 'no-referrer':
			return 'no-referrer';

		case 'origin':
			return referrerOrigin;

		case 'unsafe-url':
			return referrerURL;

		case 'strict-origin':
			// 1. If referrerURL is a potentially trustworthy URL and request's current URL is not a
			//    potentially trustworthy URL, then return no referrer.
			if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
				return 'no-referrer';
			}

			// 2. Return referrerOrigin.
			return referrerOrigin.toString();

		case 'strict-origin-when-cross-origin':
			// 1. If the origin of referrerURL and the origin of request's current URL are the same, then
			//    return referrerURL.
			if (referrerURL.origin === currentURL.origin) {
				return referrerURL;
			}

			// 2. If referrerURL is a potentially trustworthy URL and request's current URL is not a
			//    potentially trustworthy URL, then return no referrer.
			if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
				return 'no-referrer';
			}

			// 3. Return referrerOrigin.
			return referrerOrigin;

		case 'same-origin':
			// 1. If the origin of referrerURL and the origin of request's current URL are the same, then
			//    return referrerURL.
			if (referrerURL.origin === currentURL.origin) {
				return referrerURL;
			}

			// 2. Return no referrer.
			return 'no-referrer';

		case 'origin-when-cross-origin':
			// 1. If the origin of referrerURL and the origin of request's current URL are the same, then
			//    return referrerURL.
			if (referrerURL.origin === currentURL.origin) {
				return referrerURL;
			}

			// Return referrerOrigin.
			return referrerOrigin;

		case 'no-referrer-when-downgrade':
			// 1. If referrerURL is a potentially trustworthy URL and request's current URL is not a
			//    potentially trustworthy URL, then return no referrer.
			if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
				return 'no-referrer';
			}

			// 2. Return referrerURL.
			return referrerURL;

		default:
			throw new TypeError(`Invalid referrerPolicy: ${policy}`);
	}
}

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#parse-referrer-policy-from-header|Referrer Policy §8.1. Parse a referrer policy from a Referrer-Policy header}
 * @param {Headers} headers Response headers
 * @returns {string} policy
 */
function parseReferrerPolicyFromHeader(headers) {
	// 1. Let policy-tokens be the result of extracting header list values given `Referrer-Policy`
	//    and response’s header list.
	const policyTokens = (headers.get('referrer-policy') || '').split(/[,\s]+/);

	// 2. Let policy be the empty string.
	let policy = '';

	// 3. For each token in policy-tokens, if token is a referrer policy and token is not the empty
	//    string, then set policy to token.
	// Note: This algorithm loops over multiple policy values to allow deployment of new policy
	// values with fallbacks for older user agents, as described in § 11.1 Unknown Policy Values.
	for (const token of policyTokens) {
		if (token && ReferrerPolicy.has(token)) {
			policy = token;
		}
	}

	// 4. Return policy.
	return policy;
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/node-fetch@3.3.1/node_modules/node-fetch/src/request.js
/**
 * Request.js
 *
 * Request class contains server only options
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */









const request_INTERNALS = Symbol('Request internals');

/**
 * Check if `obj` is an instance of Request.
 *
 * @param  {*} object
 * @return {boolean}
 */
const isRequest = object => {
	return (
		typeof object === 'object' &&
		typeof object[request_INTERNALS] === 'object'
	);
};

const doBadDataWarn = (0,external_node_util_namespaceObject.deprecate)(() => {},
	'.data is not a valid RequestInit property, use .body instead',
	'https://github.com/node-fetch/node-fetch/issues/1000 (request)');

/**
 * Request class
 *
 * Ref: https://fetch.spec.whatwg.org/#request-class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request extends Body {
	constructor(input, init = {}) {
		let parsedURL;

		// Normalize input and force URL to be encoded as UTF-8 (https://github.com/node-fetch/node-fetch/issues/245)
		if (isRequest(input)) {
			parsedURL = new URL(input.url);
		} else {
			parsedURL = new URL(input);
			input = {};
		}

		if (parsedURL.username !== '' || parsedURL.password !== '') {
			throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
		}

		let method = init.method || input.method || 'GET';
		if (/^(delete|get|head|options|post|put)$/i.test(method)) {
			method = method.toUpperCase();
		}

		if (!isRequest(init) && 'data' in init) {
			doBadDataWarn();
		}

		// eslint-disable-next-line no-eq-null, eqeqeq
		if ((init.body != null || (isRequest(input) && input.body !== null)) &&
			(method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		const inputBody = init.body ?
			init.body :
			(isRequest(input) && input.body !== null ?
				clone(input) :
				null);

		super(inputBody, {
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody, this);
			if (contentType) {
				headers.set('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ?
			input.signal :
			null;
		if ('signal' in init) {
			signal = init.signal;
		}

		// eslint-disable-next-line no-eq-null, eqeqeq
		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal or EventTarget');
		}

		// §5.4, Request constructor steps, step 15.1
		// eslint-disable-next-line no-eq-null, eqeqeq
		let referrer = init.referrer == null ? input.referrer : init.referrer;
		if (referrer === '') {
			// §5.4, Request constructor steps, step 15.2
			referrer = 'no-referrer';
		} else if (referrer) {
			// §5.4, Request constructor steps, step 15.3.1, 15.3.2
			const parsedReferrer = new URL(referrer);
			// §5.4, Request constructor steps, step 15.3.3, 15.3.4
			referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? 'client' : parsedReferrer;
		} else {
			referrer = undefined;
		}

		this[request_INTERNALS] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal,
			referrer
		};

		// Node-fetch-only options
		this.follow = init.follow === undefined ? (input.follow === undefined ? 20 : input.follow) : init.follow;
		this.compress = init.compress === undefined ? (input.compress === undefined ? true : input.compress) : init.compress;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
		this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
		this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;

		// §5.4, Request constructor steps, step 16.
		// Default is empty string per https://fetch.spec.whatwg.org/#concept-request-referrer-policy
		this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || '';
	}

	/** @returns {string} */
	get method() {
		return this[request_INTERNALS].method;
	}

	/** @returns {string} */
	get url() {
		return (0,external_node_url_namespaceObject.format)(this[request_INTERNALS].parsedURL);
	}

	/** @returns {Headers} */
	get headers() {
		return this[request_INTERNALS].headers;
	}

	get redirect() {
		return this[request_INTERNALS].redirect;
	}

	/** @returns {AbortSignal} */
	get signal() {
		return this[request_INTERNALS].signal;
	}

	// https://fetch.spec.whatwg.org/#dom-request-referrer
	get referrer() {
		if (this[request_INTERNALS].referrer === 'no-referrer') {
			return '';
		}

		if (this[request_INTERNALS].referrer === 'client') {
			return 'about:client';
		}

		if (this[request_INTERNALS].referrer) {
			return this[request_INTERNALS].referrer.toString();
		}

		return undefined;
	}

	get referrerPolicy() {
		return this[request_INTERNALS].referrerPolicy;
	}

	set referrerPolicy(referrerPolicy) {
		this[request_INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
	}

	/**
	 * Clone this request
	 *
	 * @return  Request
	 */
	clone() {
		return new Request(this);
	}

	get [Symbol.toStringTag]() {
		return 'Request';
	}
}

Object.defineProperties(Request.prototype, {
	method: {enumerable: true},
	url: {enumerable: true},
	headers: {enumerable: true},
	redirect: {enumerable: true},
	clone: {enumerable: true},
	signal: {enumerable: true},
	referrer: {enumerable: true},
	referrerPolicy: {enumerable: true}
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param {Request} request - A Request instance
 * @return The options object to be passed to http.request
 */
const getNodeRequestOptions = request => {
	const {parsedURL} = request[request_INTERNALS];
	const headers = new Headers(request[request_INTERNALS].headers);

	// Fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body === null && /^(post|put)$/i.test(request.method)) {
		contentLengthValue = '0';
	}

	if (request.body !== null) {
		const totalBytes = getTotalBytes(request);
		// Set Content-Length if totalBytes is a number (that is not NaN)
		if (typeof totalBytes === 'number' && !Number.isNaN(totalBytes)) {
			contentLengthValue = String(totalBytes);
		}
	}

	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// 4.1. Main fetch, step 2.6
	// > If request's referrer policy is the empty string, then set request's referrer policy to the
	// > default referrer policy.
	if (request.referrerPolicy === '') {
		request.referrerPolicy = DEFAULT_REFERRER_POLICY;
	}

	// 4.1. Main fetch, step 2.7
	// > If request's referrer is not "no-referrer", set request's referrer to the result of invoking
	// > determine request's referrer.
	if (request.referrer && request.referrer !== 'no-referrer') {
		request[request_INTERNALS].referrer = determineRequestsReferrer(request);
	} else {
		request[request_INTERNALS].referrer = 'no-referrer';
	}

	// 4.5. HTTP-network-or-cache fetch, step 6.9
	// > If httpRequest's referrer is a URL, then append `Referer`/httpRequest's referrer, serialized
	// >  and isomorphic encoded, to httpRequest's header list.
	if (request[request_INTERNALS].referrer instanceof URL) {
		headers.set('Referer', request.referrer);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip, deflate, br');
	}

	let {agent} = request;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	const search = getSearch(parsedURL);

	// Pass the full URL directly to request(), but overwrite the following
	// options:
	const options = {
		// Overwrite search to retain trailing ? (issue #776)
		path: parsedURL.pathname + search,
		// The following options are not expressed in the URL
		method: request.method,
		headers: headers[Symbol.for('nodejs.util.inspect.custom')](),
		insecureHTTPParser: request.insecureHTTPParser,
		agent
	};

	return {
		/** @type {URL} */
		parsedURL,
		options
	};
};

;// CONCATENATED MODULE: ./node_modules/.pnpm/node-fetch@3.3.1/node_modules/node-fetch/src/errors/abort-error.js


/**
 * AbortError interface for cancelled requests
 */
class AbortError extends FetchBaseError {
	constructor(message, type = 'aborted') {
		super(message, type);
	}
}

// EXTERNAL MODULE: ./node_modules/.pnpm/fetch-blob@3.2.0/node_modules/fetch-blob/from.js + 2 modules
var from = __nccwpck_require__(7253);
;// CONCATENATED MODULE: ./node_modules/.pnpm/node-fetch@3.3.1/node_modules/node-fetch/src/index.js
/**
 * Index.js
 *
 * a request API compatible with window.fetch
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */
























const supportedSchemas = new Set(['data:', 'http:', 'https:']);

/**
 * Fetch function
 *
 * @param   {string | URL | import('./request').default} url - Absolute url or Request instance
 * @param   {*} [options_] - Fetch options
 * @return  {Promise<import('./response').default>}
 */
async function fetch(url, options_) {
	return new Promise((resolve, reject) => {
		// Build request object
		const request = new Request(url, options_);
		const {parsedURL, options} = getNodeRequestOptions(request);
		if (!supportedSchemas.has(parsedURL.protocol)) {
			throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, '')}" is not supported.`);
		}

		if (parsedURL.protocol === 'data:') {
			const data = dist(request.url);
			const response = new Response(data, {headers: {'Content-Type': data.typeFull}});
			resolve(response);
			return;
		}

		// Wrap http.request into fetch
		const send = (parsedURL.protocol === 'https:' ? external_node_https_namespaceObject : external_node_http_namespaceObject).request;
		const {signal} = request;
		let response = null;

		const abort = () => {
			const error = new AbortError('The operation was aborted.');
			reject(error);
			if (request.body && request.body instanceof external_node_stream_namespaceObject.Readable) {
				request.body.destroy(error);
			}

			if (!response || !response.body) {
				return;
			}

			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = () => {
			abort();
			finalize();
		};

		// Send request
		const request_ = send(parsedURL.toString(), options);

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		const finalize = () => {
			request_.abort();
			if (signal) {
				signal.removeEventListener('abort', abortAndFinalize);
			}
		};

		request_.on('error', error => {
			reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, 'system', error));
			finalize();
		});

		fixResponseChunkedTransferBadEnding(request_, error => {
			if (response && response.body) {
				response.body.destroy(error);
			}
		});

		/* c8 ignore next 18 */
		if (process.version < 'v14') {
			// Before Node.js 14, pipeline() does not fully support async iterators and does not always
			// properly handle when the socket close/end events are out of order.
			request_.on('socket', s => {
				let endedWithEventsCount;
				s.prependListener('end', () => {
					endedWithEventsCount = s._eventsCount;
				});
				s.prependListener('close', hadError => {
					// if end happened before close but the socket didn't emit an error, do it now
					if (response && endedWithEventsCount < s._eventsCount && !hadError) {
						const error = new Error('Premature close');
						error.code = 'ERR_STREAM_PREMATURE_CLOSE';
						response.body.emit('error', error);
					}
				});
			});
		}

		request_.on('response', response_ => {
			request_.setTimeout(0);
			const headers = fromRawHeaders(response_.rawHeaders);

			// HTTP fetch step 5
			if (isRedirect(response_.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				let locationURL = null;
				try {
					locationURL = location === null ? null : new URL(location, request.url);
				} catch {
					// error here can only be invalid URL in Location: header
					// do not throw when options.redirect == manual
					// let the user extract the errorneous redirect URL
					if (request.redirect !== 'manual') {
						reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, 'invalid-redirect'));
						finalize();
						return;
					}
				}

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// Nothing to do
						break;
					case 'follow': {
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOptions = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: clone(request),
							signal: request.signal,
							size: request.size,
							referrer: request.referrer,
							referrerPolicy: request.referrerPolicy
						};

						// when forwarding sensitive headers like "Authorization",
						// "WWW-Authenticate", and "Cookie" to untrusted targets,
						// headers will be ignored when following a redirect to a domain
						// that is not a subdomain match or exact match of the initial domain.
						// For example, a redirect from "foo.com" to either "foo.com" or "sub.foo.com"
						// will forward the sensitive headers, but a redirect to "bar.com" will not.
						// headers will also be ignored when following a redirect to a domain using
						// a different protocol. For example, a redirect from "https://foo.com" to "http://foo.com"
						// will not forward the sensitive headers
						if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) {
							for (const name of ['authorization', 'www-authenticate', 'cookie', 'cookie2']) {
								requestOptions.headers.delete(name);
							}
						}

						// HTTP-redirect fetch step 9
						if (response_.statusCode !== 303 && request.body && options_.body instanceof external_node_stream_namespaceObject.Readable) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (response_.statusCode === 303 || ((response_.statusCode === 301 || response_.statusCode === 302) && request.method === 'POST')) {
							requestOptions.method = 'GET';
							requestOptions.body = undefined;
							requestOptions.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 14
						const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
						if (responseReferrerPolicy) {
							requestOptions.referrerPolicy = responseReferrerPolicy;
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOptions)));
						finalize();
						return;
					}

					default:
						return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
				}
			}

			// Prepare response
			if (signal) {
				response_.once('end', () => {
					signal.removeEventListener('abort', abortAndFinalize);
				});
			}

			let body = (0,external_node_stream_namespaceObject.pipeline)(response_, new external_node_stream_namespaceObject.PassThrough(), error => {
				if (error) {
					reject(error);
				}
			});
			// see https://github.com/nodejs/node/pull/29376
			/* c8 ignore next 3 */
			if (process.version < 'v12.10') {
				response_.on('aborted', abortAndFinalize);
			}

			const responseOptions = {
				url: request.url,
				status: response_.statusCode,
				statusText: response_.statusMessage,
				headers,
				size: request.size,
				counter: request.counter,
				highWaterMark: request.highWaterMark
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: external_node_zlib_namespaceObject.Z_SYNC_FLUSH,
				finishFlush: external_node_zlib_namespaceObject.Z_SYNC_FLUSH
			};

			// For gzip
			if (codings === 'gzip' || codings === 'x-gzip') {
				body = (0,external_node_stream_namespaceObject.pipeline)(body, external_node_zlib_namespaceObject.createGunzip(zlibOptions), error => {
					if (error) {
						reject(error);
					}
				});
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// For deflate
			if (codings === 'deflate' || codings === 'x-deflate') {
				// Handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = (0,external_node_stream_namespaceObject.pipeline)(response_, new external_node_stream_namespaceObject.PassThrough(), error => {
					if (error) {
						reject(error);
					}
				});
				raw.once('data', chunk => {
					// See http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = (0,external_node_stream_namespaceObject.pipeline)(body, external_node_zlib_namespaceObject.createInflate(), error => {
							if (error) {
								reject(error);
							}
						});
					} else {
						body = (0,external_node_stream_namespaceObject.pipeline)(body, external_node_zlib_namespaceObject.createInflateRaw(), error => {
							if (error) {
								reject(error);
							}
						});
					}

					response = new Response(body, responseOptions);
					resolve(response);
				});
				raw.once('end', () => {
					// Some old IIS servers return zero-length OK deflate responses, so
					// 'data' is never emitted. See https://github.com/node-fetch/node-fetch/pull/903
					if (!response) {
						response = new Response(body, responseOptions);
						resolve(response);
					}
				});
				return;
			}

			// For br
			if (codings === 'br') {
				body = (0,external_node_stream_namespaceObject.pipeline)(body, external_node_zlib_namespaceObject.createBrotliDecompress(), error => {
					if (error) {
						reject(error);
					}
				});
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// Otherwise, use response as-is
			response = new Response(body, responseOptions);
			resolve(response);
		});

		// eslint-disable-next-line promise/prefer-await-to-then
		writeToStream(request_, request).catch(reject);
	});
}

function fixResponseChunkedTransferBadEnding(request, errorCallback) {
	const LAST_CHUNK = external_node_buffer_namespaceObject.Buffer.from('0\r\n\r\n');

	let isChunkedTransfer = false;
	let properLastChunkReceived = false;
	let previousChunk;

	request.on('response', response => {
		const {headers} = response;
		isChunkedTransfer = headers['transfer-encoding'] === 'chunked' && !headers['content-length'];
	});

	request.on('socket', socket => {
		const onSocketClose = () => {
			if (isChunkedTransfer && !properLastChunkReceived) {
				const error = new Error('Premature close');
				error.code = 'ERR_STREAM_PREMATURE_CLOSE';
				errorCallback(error);
			}
		};

		const onData = buf => {
			properLastChunkReceived = external_node_buffer_namespaceObject.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;

			// Sometimes final 0-length chunk and end of message code are in separate packets
			if (!properLastChunkReceived && previousChunk) {
				properLastChunkReceived = (
					external_node_buffer_namespaceObject.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 &&
					external_node_buffer_namespaceObject.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0
				);
			}

			previousChunk = buf;
		};

		socket.prependListener('close', onSocketClose);
		socket.on('data', onData);

		request.on('close', () => {
			socket.removeListener('close', onSocketClose);
			socket.removeListener('data', onData);
		});
	});
}

// EXTERNAL MODULE: ./node_modules/.pnpm/@atproto+api@0.2.7/node_modules/@atproto/api/dist/index.js
var api_dist = __nccwpck_require__(9788);
;// CONCATENATED MODULE: ./src/agent.js


const { BskyAgent } = api_dist

async function bsky(service) {
  BskyAgent.configure({
    // fetch polyfill
    async fetch(httpUri, httpMethod, httpHeaders, httpReqBody) {
      const res = await fetch(httpUri, {
        method: httpMethod,
        headers: httpHeaders,
        body: JSON.stringify(httpReqBody)
      })
      const response = {
        status: res.status,
        body: await res.json()
      }
      return response
    }
  })

  const agent = new BskyAgent({
    service: service
  })

  await agent.login({
    identifier: process.env.BSKY_IDENTIFIER,
    password: process.env.BSKY_PASSWORD
  })

  return agent
}


/***/ }),

/***/ 614:
/***/ ((__webpack_module__, __unused_webpack___webpack_exports__, __nccwpck_require__) => {

__nccwpck_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(7733);
/* harmony import */ var _agent_js__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(7196);
/* harmony import */ var _post_js__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(8418);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_3__ = __nccwpck_require__(5968);





const content = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput('post', { required: true })
const service = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput('service')

const bskyAgent = await (0,_agent_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(service)
const bskyPost = await (0,_post_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(content, bskyAgent)
const validation = await (0,_validate_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(bskyPost)

if (validation.success) {
  try {
    await bskyAgent.post(bskyPost)
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.info('Post successful')
  } catch (error) {
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.error(error)
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(error)
  }
} else {
  _actions_core__WEBPACK_IMPORTED_MODULE_0__.error(validation)
  _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(validation)
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ 8418:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ post)
/* harmony export */ });
/* harmony import */ var _atproto_api__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(9788);

const { RichText } = _atproto_api__WEBPACK_IMPORTED_MODULE_0__

async function post(content, agent) {
  const rt = new RichText({
    text: content
  })

  // Automatically detect facets.
  await rt.detectFacets(agent)

  // https://github.com/bluesky-social/atproto/issues/834#issuecomment-1514046354
  // Filter out any facets with features
  // that have no value set value.
  let facets = null

  if (rt.facets) {
    facets = rt.facets.filter((facet) => {
      const features = facet.features.filter(
        (feature) =>
          (feature?.uri && feature?.uri !== '') ||
          (feature?.did && feature?.did !== '')
      )

      return features.length > 0
    })
  }

  const postRecord = {
    $type: 'app.bsky.feed.post',
    text: rt.text,
    ...(facets && { facets }),
    createdAt: new Date().toISOString()
  }

  return postRecord
}


/***/ }),

/***/ 5968:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ validate)
/* harmony export */ });
/* harmony import */ var _atproto_api__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(9788);

const { AppBskyFeedPost } = _atproto_api__WEBPACK_IMPORTED_MODULE_0__

async function validate(bskyPost) {
  if (AppBskyFeedPost.isRecord(bskyPost)) {
    const res = AppBskyFeedPost.validateRecord(bskyPost)
    if (res.error) {
      return res.error
    }
    return res
  }
}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/******/ // expose the modules object (__webpack_modules__)
/******/ __nccwpck_require__.m = __webpack_modules__;
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/async module */
/******/ (() => {
/******/ 	var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 	var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 	var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 	var resolveQueue = (queue) => {
/******/ 		if(queue && !queue.d) {
/******/ 			queue.d = 1;
/******/ 			queue.forEach((fn) => (fn.r--));
/******/ 			queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 		}
/******/ 	}
/******/ 	var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 		if(dep !== null && typeof dep === "object") {
/******/ 			if(dep[webpackQueues]) return dep;
/******/ 			if(dep.then) {
/******/ 				var queue = [];
/******/ 				queue.d = 0;
/******/ 				dep.then((r) => {
/******/ 					obj[webpackExports] = r;
/******/ 					resolveQueue(queue);
/******/ 				}, (e) => {
/******/ 					obj[webpackError] = e;
/******/ 					resolveQueue(queue);
/******/ 				});
/******/ 				var obj = {};
/******/ 				obj[webpackQueues] = (fn) => (fn(queue));
/******/ 				return obj;
/******/ 			}
/******/ 		}
/******/ 		var ret = {};
/******/ 		ret[webpackQueues] = x => {};
/******/ 		ret[webpackExports] = dep;
/******/ 		return ret;
/******/ 	}));
/******/ 	__nccwpck_require__.a = (module, body, hasAwait) => {
/******/ 		var queue;
/******/ 		hasAwait && ((queue = []).d = 1);
/******/ 		var depQueues = new Set();
/******/ 		var exports = module.exports;
/******/ 		var currentDeps;
/******/ 		var outerResolve;
/******/ 		var reject;
/******/ 		var promise = new Promise((resolve, rej) => {
/******/ 			reject = rej;
/******/ 			outerResolve = resolve;
/******/ 		});
/******/ 		promise[webpackExports] = exports;
/******/ 		promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 		module.exports = promise;
/******/ 		body((deps) => {
/******/ 			currentDeps = wrapDeps(deps);
/******/ 			var fn;
/******/ 			var getResult = () => (currentDeps.map((d) => {
/******/ 				if(d[webpackError]) throw d[webpackError];
/******/ 				return d[webpackExports];
/******/ 			}))
/******/ 			var promise = new Promise((resolve) => {
/******/ 				fn = () => (resolve(getResult));
/******/ 				fn.r = 0;
/******/ 				var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 				currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 			});
/******/ 			return fn.r ? promise : getResult();
/******/ 		}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 		queue && (queue.d = 0);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__nccwpck_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/ensure chunk */
/******/ (() => {
/******/ 	__nccwpck_require__.f = {};
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__nccwpck_require__.e = (chunkId) => {
/******/ 		return Promise.all(Object.keys(__nccwpck_require__.f).reduce((promises, key) => {
/******/ 			__nccwpck_require__.f[key](chunkId, promises);
/******/ 			return promises;
/******/ 		}, []));
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/get javascript chunk filename */
/******/ (() => {
/******/ 	// This function allow to reference async chunks
/******/ 	__nccwpck_require__.u = (chunkId) => {
/******/ 		// return url for filenames based on template
/******/ 		return "" + chunkId + ".index.js";
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__nccwpck_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/******/ /* webpack/runtime/import chunk loading */
/******/ (() => {
/******/ 	// no baseURI
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		179: 0
/******/ 	};
/******/ 	
/******/ 	var installChunk = (data) => {
/******/ 		var {ids, modules, runtime} = data;
/******/ 		// add "modules" to the modules object,
/******/ 		// then flag all "ids" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0;
/******/ 		for(moduleId in modules) {
/******/ 			if(__nccwpck_require__.o(modules, moduleId)) {
/******/ 				__nccwpck_require__.m[moduleId] = modules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(runtime) runtime(__nccwpck_require__);
/******/ 		for(;i < ids.length; i++) {
/******/ 			chunkId = ids[i];
/******/ 			if(__nccwpck_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				installedChunks[chunkId][0]();
/******/ 			}
/******/ 			installedChunks[ids[i]] = 0;
/******/ 		}
/******/ 	
/******/ 	}
/******/ 	
/******/ 	__nccwpck_require__.f.j = (chunkId, promises) => {
/******/ 			// import() chunk loading for javascript
/******/ 			var installedChunkData = __nccwpck_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 			if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 	
/******/ 				// a Promise means "currently loading".
/******/ 				if(installedChunkData) {
/******/ 					promises.push(installedChunkData[1]);
/******/ 				} else {
/******/ 					if(true) { // all chunks have JS
/******/ 						// setup Promise in chunk cache
/******/ 						var promise = import("./" + __nccwpck_require__.u(chunkId)).then(installChunk, (e) => {
/******/ 							if(installedChunks[chunkId] !== 0) installedChunks[chunkId] = undefined;
/******/ 							throw e;
/******/ 						});
/******/ 						var promise = Promise.race([promise, new Promise((resolve) => (installedChunkData = installedChunks[chunkId] = [resolve]))])
/******/ 						promises.push(installedChunkData[1] = promise);
/******/ 					} else installedChunks[chunkId] = 0;
/******/ 				}
/******/ 			}
/******/ 	};
/******/ 	
/******/ 	// no external install chunk
/******/ 	
/******/ 	// no on chunks loaded
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module used 'module' so it can't be inlined
/******/ var __webpack_exports__ = __nccwpck_require__(614);
/******/ __webpack_exports__ = await __webpack_exports__;
/******/ 

//# sourceMappingURL=index.js.map