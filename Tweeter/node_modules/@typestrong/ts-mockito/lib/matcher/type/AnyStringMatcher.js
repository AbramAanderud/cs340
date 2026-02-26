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
exports.AnyStringMatcher = void 0;
var _ = require("lodash");
var Matcher_1 = require("./Matcher");
var AnyStringMatcher = (function (_super) {
    __extends(AnyStringMatcher, _super);
    function AnyStringMatcher() {
        return _super.call(this) || this;
    }
    AnyStringMatcher.prototype.match = function (value) {
        return _.isString(value);
    };
    AnyStringMatcher.prototype.toString = function () {
        return "anyString()";
    };
    return AnyStringMatcher;
}(Matcher_1.Matcher));
exports.AnyStringMatcher = AnyStringMatcher;
//# sourceMappingURL=AnyStringMatcher.js.map