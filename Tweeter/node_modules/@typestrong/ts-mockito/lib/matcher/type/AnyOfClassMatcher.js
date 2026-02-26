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
exports.AnyOfClassMatcher = void 0;
var Matcher_1 = require("./Matcher");
var AnyOfClassMatcher = (function (_super) {
    __extends(AnyOfClassMatcher, _super);
    function AnyOfClassMatcher(expectedClass) {
        var _this = _super.call(this) || this;
        _this.expectedClass = expectedClass;
        if (expectedClass === null) {
            throw new Error("The expected class cannot be null.");
        }
        return _this;
    }
    AnyOfClassMatcher.prototype.match = function (value) {
        return value instanceof this.expectedClass;
    };
    AnyOfClassMatcher.prototype.toString = function () {
        return "anyOfClass(".concat(this.expectedClass["name"], ")");
    };
    return AnyOfClassMatcher;
}(Matcher_1.Matcher));
exports.AnyOfClassMatcher = AnyOfClassMatcher;
//# sourceMappingURL=AnyOfClassMatcher.js.map