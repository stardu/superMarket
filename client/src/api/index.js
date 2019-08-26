import req from '../http'

import USER from './user'
import GOODS from './goods'


function mix(...mixins) {
    class Mix {}

    for (let mixin of mixins) {
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
    }

    return Mix;
}

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== "constructor" &&
            key !== "prototype" &&
            key !== "name"
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

class Api extends mix(USER,GOODS) {
    constructor() {
        super();
    }

}

export default new Api()