"use strict";
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubismJsonExtension = void 0;
var cubismjson_1 = require("./cubismjson");
/**
 * CubismJsonで実装されているJsonパーサを使用せず、
 * TypeScript標準のJsonパーサなどを使用し出力された結果を
 * Cubism SDKで定義されているJSONエレメントの要素に
 * 置き換える処理をするクラス。
 */
var CubismJsonExtension = /** @class */ (function () {
    function CubismJsonExtension() {
    }
    CubismJsonExtension.parseJsonObject = function (obj, map) {
        Object.keys(obj).forEach(function (key) {
            if (typeof obj[key] == 'boolean') {
                map.put(key, new cubismjson_1.JsonBoolean(obj[key]));
            }
            else if (typeof obj[key] == 'string') {
                map.put(key, new cubismjson_1.JsonString(obj[key]));
            }
            else if (typeof obj[key] == 'number') {
                map.put(key, new cubismjson_1.JsonFloat(obj[key]));
            }
            else if (obj[key] instanceof Array) {
                map.put(key, CubismJsonExtension.parseJsonArray(obj[key]));
            }
            else if (obj[key] instanceof Object) {
                map.put(key, CubismJsonExtension.parseJsonObject(obj[key], new cubismjson_1.JsonMap()));
            }
            else if (obj[key] == null) {
                map.put(key, new cubismjson_1.JsonNullvalue());
            }
            else {
                // どれにも当てはまらない場合でも処理する
                map.put(key, obj[key]);
            }
        });
        return map;
    };
    CubismJsonExtension.parseJsonArray = function (obj) {
        var _this = this;
        var arr = new cubismjson_1.JsonArray();
        Object.keys(obj).forEach(function (key) {
            var convKey = Number(key);
            if (typeof convKey == 'number') {
                if (typeof obj[convKey] == 'boolean') {
                    arr.add(new cubismjson_1.JsonBoolean(obj[convKey]));
                }
                else if (typeof obj[convKey] == 'string') {
                    arr.add(new cubismjson_1.JsonString(obj[convKey]));
                }
                else if (typeof obj[convKey] == 'number') {
                    arr.add(new cubismjson_1.JsonFloat(obj[convKey]));
                }
                else if (obj[key] instanceof Array) {
                    arr.add(_this.parseJsonArray(obj[key]));
                }
                else if (obj[key] instanceof Object) {
                    arr.add(_this.parseJsonObject(obj[key], new cubismjson_1.JsonMap()));
                }
                else if (obj[key] == null) {
                    arr.add(new cubismjson_1.JsonNullvalue());
                }
                else {
                    // どれにも当てはまらない場合でも処理する
                    arr.add(obj[key]);
                }
            }
            else if (obj[key] instanceof Array) {
                arr.add(_this.parseJsonArray(obj[key]));
            }
            else if (obj[key] instanceof Object) {
                arr.add(_this.parseJsonObject(obj[key], new cubismjson_1.JsonMap()));
            }
            else if (obj[key] == null) {
                arr.add(new cubismjson_1.JsonNullvalue());
            }
            else {
                // 配列ともObjectとも判定できなかった場合でも処理する
                for (var i = 0; i < obj[key].length; i++) {
                    arr.add(obj[key][i]);
                }
            }
        });
        return arr;
    };
    return CubismJsonExtension;
}());
exports.CubismJsonExtension = CubismJsonExtension;
//# sourceMappingURL=cubismjsonextension.js.map