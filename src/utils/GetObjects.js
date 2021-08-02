'use strict'

var GetObjects = module.exports = {}
function check(obj) {
    let len = 0;
    const keys = Object.keys(obj)
    for (let key of keys) {
        if (obj[key] !== null) {
            len++;
        }
    }
    return len === keys.length
}

function set(obj){
    if (obj !== undefined && obj !== null){
        const keys = Object.keys(obj)
        for (let key of keys) {
            if (typeof obj[key] === 'object'){
                set(obj[key])
            } else {
                obj[key] = null
            }
        }
    }
}

function createProps(obj, key, value){
    Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true
    });
}

function checkRepetion(array, obj){
    if (array.length === 0){
        return false
    }

    return array.filter((a) => a === obj).length > 0
}

GetObjects.get = async (objectTemplate, objects, values) => {
    async function getOfObject(object, obj, newObj) {
        if (object !== undefined && obj !== undefined) {
            if (typeof object === 'object' && typeof obj === 'object') {
                const keys = Object.keys(object)
                const keysObj = Object.keys(obj)
                for (let keyObj of keysObj) {
                    for (let key of keys) {
                        if (keyObj === key) {
                            if (typeof object[key] === 'object') {
                                createProps(newObj, key, obj[key])
                                getOfObject(object[key], obj[key], newObj)
                            } else {
                                obj[key] = object[key]
                                if (values !== undefined && check(obj)) {  
                                    if (newObj !== null && Object.keys(newObj).length > 0){
                                        if (!checkRepetion(values, newObj)){
                                            values.push(newObj)
                                        }
                                    }
                                }
                            }
                        }
                        GetObjects.get(obj[key], object[key], values)
                    }
                }
            }
        }
    }

    if (Array.isArray(objects)) {
        for (let object of objects) {
            for (let obj of objectTemplate) {
                set(obj)
                const newObj = {};
                getOfObject(object, obj, newObj)
            }
        }
    } else {
        if (objectTemplate !== undefined){
            getOfObject(objects, objectTemplate, {})
        }
    }
}