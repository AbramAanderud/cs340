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
exports.RejectPromiseMethodStub = void 0;
var ArgsToMatchersValidator_1 = require("../matcher/ArgsToMatchersValidator");
var AbstractMethodStub_1 = require("./AbstractMethodStub");
var RejectPromiseMethodStub = (function (_super) {
    __extends(RejectPromiseMethodStub, _super);
    function RejectPromiseMethodStub(groupIndex, matchers, value) {
        var _this = _super.call(this) || this;
        _this.groupIndex = groupIndex;
        _this.matchers = matchers;
        _this.value = value;
        _this.validator = new ArgsToMatchersValidator_1.ArgsToMatchersValidator();
        return _this;
    }
    RejectPromiseMethodStub.prototype.isApplicable = function (args) {
        return this.validator.validate(this.matchers, args);
    };
    RejectPromiseMethodStub.prototype.execute = function (args) {
    };
    RejectPromiseMethodStub.prototype.getValue = function () {
        return Promise.reject(this.value);
    };
    return RejectPromiseMethodStub;
}(AbstractMethodStub_1.AbstractMethodStub));
exports.RejectPromiseMethodStub = RejectPromiseMethodStub;
//# sourceMappingURL=RejectPromiseMethodStub.js.map