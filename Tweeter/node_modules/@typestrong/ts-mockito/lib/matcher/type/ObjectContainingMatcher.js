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
exports.ObjectContainingMatcher = void 0;
var _ = require("lodash");
var Matcher_1 = require("./Matcher");
var ObjectContainingMatcher = (function (_super) {
    __extends(ObjectContainingMatcher, _super);
    function ObjectContainingMatcher(expectedValue) {
        var _this = _super.call(this) || this;
        _this.expectedValue = expectedValue;
        return _this;
    }
    ObjectContainingMatcher.prototype.match = function (value) {
        return _.isMatch(value, this.expectedValue);
    };
    ObjectContainingMatcher.prototype.toString = function () {
        return "objectContaining(".concat(JSON.stringify(this.expectedValue), ")");
    };
    return ObjectContainingMatcher;
}(Matcher_1.Matcher));
exports.ObjectContainingMatcher = ObjectContainingMatcher;
//# sourceMappingURL=ObjectContainingMatcher.js.map