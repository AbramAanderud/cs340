"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodStubVerificator = void 0;
var MethodCallToStringConverter_1 = require("./utils/MethodCallToStringConverter");
var MethodStubVerificator = (function () {
    function MethodStubVerificator(methodToVerify) {
        this.methodToVerify = methodToVerify;
        this.methodCallToStringConverter = new MethodCallToStringConverter_1.MethodCallToStringConverter();
    }
    MethodStubVerificator.prototype.called = function () {
        this.atLeast(1);
    };
    MethodStubVerificator.prototype.never = function () {
        this.times(0);
    };
    MethodStubVerificator.prototype.once = function () {
        this.times(1);
    };
    MethodStubVerificator.prototype.twice = function () {
        this.times(2);
    };
    MethodStubVerificator.prototype.thrice = function () {
        this.times(3);
    };
    MethodStubVerificator.prototype.times = function (value) {
        var allMatchingActions = this.methodToVerify.mocker.getAllMatchingActions(this.methodToVerify.name, this.methodToVerify.matchers);
        if (value !== allMatchingActions.length) {
            var methodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
            var msg = "Expected \"".concat(methodToVerifyAsString, "to be called ").concat(value, " time(s). But has been called ").concat(allMatchingActions.length, " time(s).");
            throw new Error("".concat(msg, "\n").concat(this.actualCalls()));
        }
    };
    MethodStubVerificator.prototype.atLeast = function (value) {
        var allMatchingActions = this.methodToVerify.mocker.getAllMatchingActions(this.methodToVerify.name, this.methodToVerify.matchers);
        if (value > allMatchingActions.length) {
            var methodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
            throw new Error("Expected \"".concat(methodToVerifyAsString, "to be called at least ").concat(value, " time(s). But has been called ").concat(allMatchingActions.length, " time(s)."));
        }
    };
    MethodStubVerificator.prototype.atMost = function (value) {
        var allMatchingActions = this.methodToVerify.mocker.getAllMatchingActions(this.methodToVerify.name, this.methodToVerify.matchers);
        if (value < allMatchingActions.length) {
            var methodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
            throw new Error("Expected \"".concat(methodToVerifyAsString, "to be called at least ").concat(value, " time(s). But has been called ").concat(allMatchingActions.length, " time(s)."));
        }
    };
    MethodStubVerificator.prototype.calledBefore = function (method) {
        var firstMethodAction = this.methodToVerify.mocker.getFirstMatchingAction(this.methodToVerify.name, this.methodToVerify.matchers);
        var secondMethodAction = method.mocker.getFirstMatchingAction(method.name, method.matchers);
        var mainMethodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
        var secondMethodAsString = this.methodCallToStringConverter.convert(method);
        var errorBeginning = "Expected \"".concat(mainMethodToVerifyAsString, " to be called before ").concat(secondMethodAsString);
        if (firstMethodAction && secondMethodAction) {
            if (!firstMethodAction.hasBeenCalledBefore(secondMethodAction)) {
                throw new Error("".concat(errorBeginning, "but has been called after."));
            }
        }
        else if (firstMethodAction && !secondMethodAction) {
            throw new Error("".concat(errorBeginning, "but ").concat(secondMethodAsString, "has never been called."));
        }
        else if (!firstMethodAction && secondMethodAction) {
            throw new Error("".concat(errorBeginning, "but ").concat(mainMethodToVerifyAsString, "has never been called."));
        }
        else {
            throw new Error("".concat(errorBeginning, "but none of them has been called."));
        }
    };
    MethodStubVerificator.prototype.calledAfter = function (method) {
        var firstMethodAction = this.methodToVerify.mocker.getFirstMatchingAction(this.methodToVerify.name, this.methodToVerify.matchers);
        var secondMethodAction = method.mocker.getFirstMatchingAction(method.name, method.matchers);
        var mainMethodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
        var secondMethodAsString = this.methodCallToStringConverter.convert(method);
        var errorBeginning = "Expected \"".concat(mainMethodToVerifyAsString, "to be called after ").concat(secondMethodAsString);
        if (firstMethodAction && secondMethodAction) {
            if (firstMethodAction.hasBeenCalledBefore(secondMethodAction)) {
                throw new Error("".concat(errorBeginning, "but has been called before."));
            }
        }
        else if (firstMethodAction && !secondMethodAction) {
            throw new Error("".concat(errorBeginning, "but ").concat(secondMethodAsString, "has never been called."));
        }
        else if (!firstMethodAction && secondMethodAction) {
            throw new Error("".concat(errorBeginning, "but ").concat(mainMethodToVerifyAsString, "has never been called."));
        }
        else {
            throw new Error("".concat(errorBeginning, "but none of them has been called."));
        }
    };
    MethodStubVerificator.prototype.actualCalls = function () {
        var calls = this.methodToVerify.mocker.getActionsByName(this.methodToVerify.name);
        return "Actual calls:\n  ".concat(this.methodCallToStringConverter.convertActualCalls(calls).join("\n  "));
    };
    return MethodStubVerificator;
}());
exports.MethodStubVerificator = MethodStubVerificator;
//# sourceMappingURL=MethodStubVerificator.js.map