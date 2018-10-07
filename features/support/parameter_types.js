"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { defineParameterType } = require('cucumber');
const tuple = require("../step_definitions/tuple");
const canvas = require("../step_definitions/canvas");
const matrices = require("../step_definitions/matrices");
const rays_1 = require("../step_definitions/rays");
const lights_1 = require("../step_definitions/lights");
defineParameterType({
    name: 'point',
    regexp: /point\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)/,
    type: tuple.point,
    transformer: (x, y, z) => new tuple.point(x, y, z) // transformer function
});
defineParameterType({
    name: 'sfloat',
    regexp: /([-]?\d+\.?\d*)/,
});
//look at this bullsh!t
defineParameterType({
    name: 'ray',
    regexp: /ray\(point\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\), vector\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)\)/,
    type: rays_1.Ray,
    transformer: (pt1, pt2, pt3, vct1, vct2, vct3) => new rays_1.Ray(new tuple.point(pt1, pt2, pt3), new tuple.vector(vct1, vct2, vct3)) // transformer function
});
defineParameterType({
    name: 'position',
    regexp: /position\(r, ([-]?\d+\.?\d*)\)/,
    //type: number,             // type
    transformer: (num) => (num) // transformer function
});
defineParameterType({
    name: 'vector',
    regexp: /vector\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)/,
    type: tuple.vector,
    transformer: (x, y, z) => new tuple.vector(x.trim(), y.trim(), z.trim()) // transformer function
});
defineParameterType({
    name: 'tuple',
    regexp: /tuple\((.+),(.+),(.+),(.+)\)/,
    type: tuple.tuple,
    transformer: (x, y, z, w) => new tuple.tuple(x, y, z, w) // transformer function
});
defineParameterType({
    name: 'Color',
    regexp: /color\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)/,
    type: tuple.Color,
    transformer: (r, g, b) => new tuple.Color(r, g, b) // transformer function
});
defineParameterType({
    name: 'point_light',
    regexp: /point_light\(point\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\), color\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)\)/,
    type: lights_1.point_light,
    transformer: (x, y, z, r, g, b) => new lights_1.point_light(new tuple.point(x, y, z), new tuple.Color(r, g, b)) // transformer function
});
defineParameterType({
    name: 'sqrt',
    regexp: /√([-]?\d+\.?\d*)/,
    transformer: s => Math.sqrt(s) // transformer function
});
//The below functions capture words with the functions magnitude and normalize
// and do nothing with them... this is because cucumber feature syntax is silly
// and cannot work with parenthesis (it tells them to make the text optional)
defineParameterType({
    name: 'magnitudenorm',
    regexp: /magnitude\(norm\)/,
    transformer: s => eval("this.norm")
});
defineParameterType({
    name: 'magnitude',
    regexp: /magnitude\(v\)/,
    transformer: s => eval("this.v") // transformer function
});
defineParameterType({
    name: 'normalize',
    regexp: /^(normalize\(v\))/,
    transformer: s => eval("this.v")
});
//canvas
defineParameterType({
    name: 'Canvas',
    regexp: /canvas\((.+),(.+)\)/,
    type: canvas.Canvas,
    transformer: (w, h) => new canvas.Canvas(w, h) // transformer function
});
defineParameterType({
    name: 'canvas_to_ppm',
    regexp: /canvas_to_ppm\([\w.+]\)/,
    type: canvas.Canvas
    //transformer: s => eval
});
defineParameterType({
    name: 'transposedM',
    regexp: /transpose\(([\w.+])\)/,
    type: matrices.Matrix,
    transformer: s => s
});
defineParameterType({
    name: 'transposedI',
    regexp: /transpose\((identity_matrix)\)/,
    type: matrices.Matrix,
    transformer: s => matrices.identity(4)
});
//# sourceMappingURL=parameter_types.js.map