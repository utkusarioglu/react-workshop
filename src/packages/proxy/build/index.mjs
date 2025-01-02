"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
function hide(target, name, descriptor) {
    if (descriptor) {
        descriptor.enumerable = false;
    }
    else {
        Object.defineProperty(target, name, {
            enumerable: false,
        });
    }
}
var Cls = /** @class */ (function () {
    function Cls() {
        // @hide
        this.bird = "chirp";
    }
    Cls.prototype.method = function () {
        return "method";
    };
    Cls.meow = function () {
        return "aaa";
    };
    Cls.cat = "meow";
    Cls.dog = "woof";
    __decorate([
        hide,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Cls.prototype, "method", null);
    __decorate([
        hide,
        __metadata("design:type", Object)
    ], Cls, "cat", void 0);
    __decorate([
        hide,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Cls, "meow", null);
    return Cls;
}());
console.log(Object.keys(Cls), Object.keys(Cls.prototype));
var c = new Cls();
console.log(Object.keys(c));
export {};
