"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { defineParameterType } = require('cucumber');
const tuple = require("../step_definitions/tuple");
const canvas = require("../step_definitions/canvas");
const matrices = require("../step_definitions/matrices");
defineParameterType({
    name: 'point',
    regexp: /point\((.+),(.+),(.+)\)/,
    type: tuple.point,
    transformer: tuple.point // transformer function
});
defineParameterType({
    name: 'vector',
    regexp: /vector\((.+),(.+),(.+)\)/,
    type: tuple.vector,
    transformer: tuple.vector // transformer function
});
defineParameterType({
    name: 'tuple',
    regexp: /tuple\((.+),(.+),(.+),(.+)\)/,
    type: tuple.tuple,
    transformer: (x, y, z, w) => new tuple.tuple(x, y, z, w) // transformer function
});
defineParameterType({
    name: 'Color',
    regexp: /color\((.+),(.+),(.+)\)/,
    type: tuple.Color,
    transformer: (r, g, b) => new tuple.Color(r, g, b) // transformer function
});
defineParameterType({
    name: 'sqrt',
    regexp: /√(.+)/,
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
