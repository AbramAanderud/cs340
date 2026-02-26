"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallFunctionMethodStub = void 0;
var ArgsToMatchersValidator_1 = require("../matcher/ArgsToMatchersValidator");
var AbstractMethodStub_1 = require("./AbstractMethodStub");
var CallFunctionMethodStub = (function (_super) {
    __extends(CallFunctionMethodStub, _super);
    function CallFunctionMethodStub(groupIndex, matchers, func) {
        var _this = _super.call(this) || this;
        _this.groupIndex = groupIndex;
        _this.matchers = matchers;
        _this.func = func;
        _this.validator = new ArgsToMatchersValidator_1.ArgsToMatchersValidator();
        return _this;
    }
    CallFunctionMethodStub.prototype.isApplicable = function (args) {
        return this.validator.validate(this.matchers, args);
    };
    CallFunctionMethodStub.prototype.execute = function (args) {
        this.functionResult = this.func.apply(this, args);
    };
    CallFunctionMethodStub.prototype.getValue = function () {
        return this.functionResult;
    };
    return CallFunctionMethodStub;
}(AbstractMethodStub_1.AbstractMethodStub));
exports.CallFunctionMethodStub = CallFunctionMethodStub;
//# sourceMappingURL=CallFunctionMethodStub.js.map