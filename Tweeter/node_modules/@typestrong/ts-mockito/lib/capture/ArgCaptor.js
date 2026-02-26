"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgCaptor = void 0;
var ArgCaptor = (function () {
    function ArgCaptor(actions) {
        this.actions = actions;
    }
    ArgCaptor.prototype.first = function () {
        return this.byCallIndex(0);
    };
    ArgCaptor.prototype.second = function () {
        return this.byCallIndex(1);
    };
    ArgCaptor.prototype.third = function () {
        return this.byCallIndex(2);
    };
    ArgCaptor.prototype.beforeLast = function () {
        return this.byCallIndex(this.actions.length - 2);
    };
    ArgCaptor.prototype.last = function () {
        return this.byCallIndex(this.actions.length - 1);
    };
    ArgCaptor.prototype.byCallIndex = function (index) {
        if (this.actions.length > index && index >= 0) {
            return this.actions[index].args;
        }
        throw new Error("Cannot capture arguments, method has not been called so many times: ".concat(index + 1));
    };
    return ArgCaptor;
}());
exports.ArgCaptor = ArgCaptor;
//# sourceMappingURL=ArgCaptor.js.map