/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wwwroot/js/app.ts":
/*!***************************!*\
  !*** ./wwwroot/js/app.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_AvailableSlide__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/AvailableSlide */ \"./wwwroot/js/components/AvailableSlide.ts\");\n/* harmony import */ var _components_SidebarItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/SidebarItem */ \"./wwwroot/js/components/SidebarItem.ts\");\n/* harmony import */ var _shared_GlobalMeta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/GlobalMeta */ \"./wwwroot/js/shared/GlobalMeta.ts\");\n/* harmony import */ var _shared_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/Logger */ \"./wwwroot/js/shared/Logger.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n$(function () {\n    return __awaiter(this, void 0, void 0, function* () {\n        let container = $('#right-sidebar-container');\n        let infoAvailableSlide = new _components_AvailableSlide__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        infoAvailableSlide.rendered.title = 'Info slide';\n        infoAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--info';\n        infoAvailableSlide.rendered.schemeName = 'info';\n        infoAvailableSlide.rendered.schemeContent = '{ \"Title\":\"\", \"Subtitle\":\"\", \"Infotitle\":\"\", \"Infotext\":\"\", \"NextPrevButtons\": [{\"Button next\":\"asdz\"}, {\"Button previous\":\"\" }] }';\n        let sidebarItemControl = new _components_SidebarItem__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        sidebarItemControl.rendered.innerContent = yield infoAvailableSlide.render();\n        container.append(yield sidebarItemControl.render());\n        let questionAvailableSlide = new _components_AvailableSlide__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        questionAvailableSlide.rendered.title = 'Question slide';\n        questionAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--question';\n        questionAvailableSlide.rendered.schemeName = 'question';\n        questionAvailableSlide.rendered.schemeContent = '{ \"Title\":\"\", \"Subtitle\":\"\", \"Question\":\"\", \"Assistive text\":\"\", \"Buttons\": [ {\"Yes\": \"Yes\", \"Value\": 1}, {\"No\": \"No\", \"Value\": 2}], \"NextPrevButtons\": [{\"Button next\":\"asdz\"}, {\"Button previous\":\"\" }] }';\n        let sidebarItemControl2 = new _components_SidebarItem__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        sidebarItemControl2.rendered.innerContent = yield questionAvailableSlide.render();\n        container.append(yield sidebarItemControl2.render());\n        let multiSelectionAvailableSlide = new _components_AvailableSlide__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        multiSelectionAvailableSlide.rendered.title = 'Multi selection slide';\n        multiSelectionAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--multi';\n        multiSelectionAvailableSlide.rendered.schemeName = 'multiselect';\n        multiSelectionAvailableSlide.rendered.schemeContent = '{ \"Title\":\"\", \"Subtitle\":\"\", \"Question\":\"\", \"Assistive text\":\"\", \"Buttons\": [ {\"Variant1\": \"Variant1\", \"Value\": 1}], \"NextPrevButtons\": [{\"Button next\":\"asdz\"}, {\"Button previous\":\"\" }], \"Multiselect\": true }';\n        let sidebarItemControl3 = new _components_SidebarItem__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        sidebarItemControl3.rendered.innerContent = yield multiSelectionAvailableSlide.render();\n        container.append(yield sidebarItemControl3.render());\n        (0,_shared_Logger__WEBPACK_IMPORTED_MODULE_3__.log)('warn', \"aaaaa\");\n        (0,_shared_Logger__WEBPACK_IMPORTED_MODULE_3__.log)('warn', \"bye\");\n        _shared_GlobalMeta__WEBPACK_IMPORTED_MODULE_2__.GlobalMeta.initialize();\n    });\n});\n\n\n//# sourceURL=webpack://questionnaireconstructor/./wwwroot/js/app.ts?");

/***/ }),

/***/ "./wwwroot/js/components/AvailableSlide.ts":
/*!*************************************************!*\
  !*** ./wwwroot/js/components/AvailableSlide.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Base_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base/BaseComponent.js */ \"./wwwroot/js/components/Base/BaseComponent.js\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nclass AvailableSlide extends _Base_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor() {\n        super();\n        this.rendered = Object.create({});\n    }\n    render() {\n        const _super = Object.create(null, {\n            getControl: { get: () => super.getControl }\n        });\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield _super.getControl.call(this, \"/js/components/AvailableSlide.html\", this.rendered);\n        });\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AvailableSlide);\n\n\n//# sourceURL=webpack://questionnaireconstructor/./wwwroot/js/components/AvailableSlide.ts?");

/***/ }),

/***/ "./wwwroot/js/components/SidebarItem.ts":
/*!**********************************************!*\
  !*** ./wwwroot/js/components/SidebarItem.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Base_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base/BaseComponent.js */ \"./wwwroot/js/components/Base/BaseComponent.js\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nclass SidebarItem extends _Base_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor() {\n        super();\n        this.rendered = Object.create({});\n    }\n    render() {\n        const _super = Object.create(null, {\n            getControl: { get: () => super.getControl }\n        });\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield _super.getControl.call(this, \"/js/components/SidebarItem.html\", this.rendered);\n        });\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidebarItem);\n\n\n//# sourceURL=webpack://questionnaireconstructor/./wwwroot/js/components/SidebarItem.ts?");

/***/ }),

/***/ "./wwwroot/js/shared/GlobalMeta.ts":
/*!*****************************************!*\
  !*** ./wwwroot/js/shared/GlobalMeta.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EventData: () => (/* binding */ EventData),\n/* harmony export */   GlobalMeta: () => (/* binding */ GlobalMeta),\n/* harmony export */   Meta: () => (/* binding */ Meta),\n/* harmony export */   SlideData: () => (/* binding */ SlideData)\n/* harmony export */ });\n/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random.js */ \"./wwwroot/js/shared/random.js\");\n/* harmony import */ var _Logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Logger.js */ \"./wwwroot/js/shared/Logger.js\");\nvar __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a getter\");\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot read private member from an object whose class did not declare it\");\n    return kind === \"m\" ? f : kind === \"a\" ? f.call(receiver) : f ? f.value : state.get(receiver);\n};\nvar _a, _GlobalMeta_storageSectionName, _GlobalMeta_generateAddedEvent, _GlobalMeta_generateUpdatedEvent, _GlobalMeta_generateRemovedEvent, _GlobalMeta_generateEventInternal, _GlobalMeta_createStorageSection;\n\n\nconst globalMeta = '#global-meta';\nclass GlobalMeta {\n    static initialize() {\n        let dataJson = window.localStorage.getItem(__classPrivateFieldGet(this, _a, \"f\", _GlobalMeta_storageSectionName));\n        let data = JSON.parse(dataJson);\n        if (data == null || (data === null || data === void 0 ? void 0 : data.length) == 0) {\n            (0,_Logger_js__WEBPACK_IMPORTED_MODULE_1__.log)('warn', 'GlobalMeta: initialize is not completed - the data in the storage is empty');\n            return;\n        }\n        for (var i = 0; i < data.length; i++) {\n            let item = data.filter(x => x.meta.order == i + 1)[0];\n            __classPrivateFieldGet(this, _a, \"m\", _GlobalMeta_generateAddedEvent).call(this, item.meta.id, item.meta.type);\n        }\n    }\n    static addOrUpdateSlideData(slideData) {\n        var _b;\n        if (slideData == null) {\n            console.error('questionData value cannot be null');\n            return;\n        }\n        if (slideData.meta.id == null) {\n            slideData.meta.id = (0,_random_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_a.getIds());\n        }\n        let storageData = (_b = window.localStorage.getItem(__classPrivateFieldGet(this, _a, \"f\", _GlobalMeta_storageSectionName))) !== null && _b !== void 0 ? _b : __classPrivateFieldGet(this, _a, \"m\", _GlobalMeta_createStorageSection).call(this);\n        let storageSlidesData = JSON.parse(storageData);\n        if (storageSlidesData.length == 0) {\n            storageSlidesData.push(slideData);\n        }\n        else {\n            let updated = false;\n            for (let i = 0; i < storageSlidesData.length; i++) {\n                let storageSlideData = storageSlidesData[i];\n                if (storageSlideData.meta.id == slideData.meta.id) {\n                    Object.assign(storageSlideData, slideData);\n                    updated = true;\n                    break;\n                }\n            }\n            if (!updated) {\n                storageSlidesData.push(slideData);\n            }\n        }\n        let localDataJson = JSON.stringify(storageSlidesData);\n        window.localStorage.setItem(__classPrivateFieldGet(this, _a, \"f\", _GlobalMeta_storageSectionName), localDataJson);\n        __classPrivateFieldGet(this, _a, \"m\", _GlobalMeta_generateAddedEvent).call(this, slideData.meta.id, slideData.meta.type);\n    }\n    static updateSlideData(slideData) {\n        const storageSlidesData = this.getStorageData(slideData);\n        let updated = false;\n        for (let i = 0; i < storageSlidesData.length; i++) {\n            let storageSlideData = storageSlidesData[i];\n            if (storageSlideData.meta.id == slideData.meta.id) {\n                Object.assign(storageSlideData, slideData);\n                updated = true;\n                break;\n            }\n        }\n        let localDataJson = JSON.stringify(storageSlidesData);\n        window.localStorage.setItem(__classPrivateFieldGet(this, _a, \"f\", _GlobalMeta_storageSectionName), localDataJson);\n        __classPrivateFieldGet(this, _a, \"m\", _GlobalMeta_generateUpdatedEvent).call(this, slideData.meta.id, slideData.meta.type);\n    }\n    static removeSlideDataById(id) {\n        const slideData = this.getSlideData(id);\n        this.removeSlideData(slideData);\n    }\n    static removeSlideData(slideData) {\n        const storageSlidesData = this.getStorageData(slideData);\n        const filtered = storageSlidesData.filter(x => x.meta.id != slideData.meta.id);\n        _a.reorder(filtered);\n        let localDataJson = JSON.stringify(filtered);\n        window.localStorage.setItem(__classPrivateFieldGet(this, _a, \"f\", _GlobalMeta_storageSectionName), localDataJson);\n        __classPrivateFieldGet(this, _a, \"m\", _GlobalMeta_generateRemovedEvent).call(this, slideData.meta.id, slideData.meta.type);\n    }\n    static reorder(slidesData) {\n        for (var i = 0; i < slidesData.length; i++) {\n            let item = slidesData[i];\n            item.meta.order = i + 1;\n        }\n    }\n    static getStorageData(slideData) {\n        if (slideData == null) {\n            console.error('questionData value cannot be null');\n            return;\n        }\n        if (slideData.meta.id == null) {\n            console.error('questionData.meta.id cannot be null');\n            return;\n        }\n        let storageData = window.localStorage.getItem(__classPrivateFieldGet(this, _a, \"f\", _GlobalMeta_storageSectionName));\n        if (storageData == null) {\n            console.error('There is no section ' + __classPrivateFieldGet(this, _a, \"f\", _GlobalMeta_storageSectionName) + ' in storage');\n            return;\n        }\n        let storageSlidesData = JSON.parse(storageData);\n        if (storageSlidesData.length == 0) {\n            console.error(`There is not entity in array \"${__classPrivateFieldGet(this, _a, \"f\", _GlobalMeta_storageSectionName)} with id: ${slideData.meta.id}\"`);\n            return;\n        }\n        return storageSlidesData;\n    }\n    static getIds() {\n        let items = window.localStorage.getItem(__classPrivateFieldGet(this, _a, \"f\", _GlobalMeta_storageSectionName));\n        let parsed = JSON.parse(items);\n        if (parsed == null || parsed.length == 0) {\n            return [];\n        }\n        let ids = parsed.map(x => x.meta.id);\n        return ids;\n    }\n    static getSlideData(id) {\n        let dataJson = window.localStorage.getItem(__classPrivateFieldGet(this, _a, \"f\", _GlobalMeta_storageSectionName));\n        if (dataJson == null || dataJson == '') {\n            console.error(\"There is no \" + __classPrivateFieldGet(this, _a, \"f\", _GlobalMeta_storageSectionName) + \" section in storage\");\n            return;\n        }\n        let data = JSON.parse(dataJson);\n        let questionData = data.filter(x => x.meta.id == id)[0];\n        if (questionData == null) {\n            console.error('There is no data in storage with id: ' + id);\n            return;\n        }\n        return questionData;\n    }\n}\n_a = GlobalMeta, _GlobalMeta_generateAddedEvent = function _GlobalMeta_generateAddedEvent(slideId, type) {\n    let data = new EventData(slideId, type);\n    __classPrivateFieldGet(this, _a, \"m\", _GlobalMeta_generateEventInternal).call(this, \"SlideAdded\", data);\n}, _GlobalMeta_generateUpdatedEvent = function _GlobalMeta_generateUpdatedEvent(slideId, type) {\n    let data = new EventData(slideId, type);\n    __classPrivateFieldGet(this, _a, \"m\", _GlobalMeta_generateEventInternal).call(this, \"SlideUpdated\", data);\n}, _GlobalMeta_generateRemovedEvent = function _GlobalMeta_generateRemovedEvent(slideId, type) {\n    let data = new EventData(slideId, type);\n    __classPrivateFieldGet(this, _a, \"m\", _GlobalMeta_generateEventInternal).call(this, \"SlideRemoved\", data);\n}, _GlobalMeta_generateEventInternal = function _GlobalMeta_generateEventInternal(eventType, detail) {\n    let event = new CustomEvent(eventType, { detail: detail });\n    document.querySelector(globalMeta).dispatchEvent(event);\n}, _GlobalMeta_createStorageSection = function _GlobalMeta_createStorageSection() {\n    let value = [];\n    let valueJson = JSON.stringify(value);\n    window.localStorage.setItem(__classPrivateFieldGet(this, _a, \"f\", _GlobalMeta_storageSectionName), valueJson);\n    return valueJson;\n};\n_GlobalMeta_storageSectionName = { value: 'Slides' };\nclass SlideData {\n    constructor() {\n        this.meta = new Meta();\n    }\n}\nclass Meta {\n}\nclass EventData {\n    constructor(slideId, type) {\n        this.slideId = slideId;\n        this.type = type;\n    }\n}\n\n\n//# sourceURL=webpack://questionnaireconstructor/./wwwroot/js/shared/GlobalMeta.ts?");

/***/ }),

/***/ "./wwwroot/js/shared/Logger.ts":
/*!*************************************!*\
  !*** ./wwwroot/js/shared/Logger.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   log: () => (/* binding */ log)\n/* harmony export */ });\nconst log = (level, message) => {\n    if (typeof message == typeof String) {\n        logFunctionMap.get(level)(`[${new Date().toLocaleTimeString()}] ${message}`);\n    }\n    else {\n        logFunctionMap.get(level)(message);\n    }\n};\nconst logFunctionMap = new Map();\nlogFunctionMap.set(\"log\", console.log);\nlogFunctionMap.set(\"warn\", console.warn);\nlogFunctionMap.set('error', console.error);\n\n\n\n//# sourceURL=webpack://questionnaireconstructor/./wwwroot/js/shared/Logger.ts?");

/***/ }),

/***/ "./wwwroot/js/components/Base/BaseComponent.js":
/*!*****************************************************!*\
  !*** ./wwwroot/js/components/Base/BaseComponent.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   replaceAll: () => (/* binding */ replaceAll)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nclass BaseComponent {\n    getControl(path, parameters) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let response = yield fetch(path);\n            if (response.ok) {\n                let control = yield response.text();\n                if (parameters != undefined) {\n                    for (let key in parameters) {\n                        control = replaceAll(control, `{{${key}}}`, parameters[key]);\n                    }\n                }\n                return control;\n            }\n            console.error(yield response.text());\n            return '{{undefined}}';\n        });\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseComponent);\nfunction replaceAll(string, search, replace) {\n    return string.split(search).join(replace !== null && replace !== void 0 ? replace : \"\");\n}\n//# sourceMappingURL=BaseComponent.js.map\n\n//# sourceURL=webpack://questionnaireconstructor/./wwwroot/js/components/Base/BaseComponent.js?");

/***/ }),

/***/ "./wwwroot/js/shared/Logger.js":
/*!*************************************!*\
  !*** ./wwwroot/js/shared/Logger.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   log: () => (/* binding */ log)\n/* harmony export */ });\nconst log = (level, message) => {\n    if (typeof message == typeof String) {\n        logFunctionMap.get(level)(`[${new Date().toLocaleTimeString()}] ${message}`);\n    }\n    else {\n        logFunctionMap.get(level)(message);\n    }\n};\nconst logFunctionMap = new Map();\nlogFunctionMap.set(\"log\", console.log);\nlogFunctionMap.set(\"warn\", console.warn);\nlogFunctionMap.set('error', console.error);\n\n//# sourceMappingURL=Logger.js.map\n\n//# sourceURL=webpack://questionnaireconstructor/./wwwroot/js/shared/Logger.js?");

/***/ }),

/***/ "./wwwroot/js/shared/random.js":
/*!*************************************!*\
  !*** ./wwwroot/js/shared/random.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ generateRandomNumber)\n/* harmony export */ });\nfunction generateRandomNumber(existingNumbers) {\n    let n = Math.floor(Math.random() * 10000000);\n    while (existingNumbers.find(x => x == n)) {\n        n = Math.floor(Math.random() * 10000000);\n    }\n    return n;\n}\n//# sourceMappingURL=random.js.map\n\n//# sourceURL=webpack://questionnaireconstructor/./wwwroot/js/shared/random.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/js/app.ts");
/******/ 	
/******/ })()
;