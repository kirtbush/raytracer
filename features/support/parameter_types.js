
const { defineParameterType } = require('cucumber')
let tuple = require("../step_definitions/tuple");
let canvas = require("../step_definitions/canvas");

defineParameterType({
    name: 'point',           // name
    regexp: /point\((.+),(.+),(.+)\)/, // regexp
    type: tuple.point,             // type
    transformer: tuple.point  // transformer function
});

defineParameterType({
    name: 'vector',           // name
    regexp: /vector\((.+),(.+),(.+)\)/, // regexp
    type: tuple.vector,             // type
    transformer: tuple.vector  // transformer function
});

defineParameterType({
    name: 'tuple',           // name
    regexp: /tuple\((.+),(.+),(.+),(.+)\)/, // regexp
    type: tuple.tuple,             // type
    transformer: (x,y,z,w) => new tuple.tuple(x,y,z,w)  // transformer function
});

defineParameterType({
    name: 'Color',           // name
    regexp: /color\((.+),(.+),(.+)\)/, // regexp
    type: tuple.Color,             // type
    transformer: (r,g,b) => new tuple.Color(r,g,b)  // transformer function
});

defineParameterType({
    name: 'sqrt',           // name
    regexp: /√(.+)/, // regexp
    transformer: s => Math.sqrt(s)  // transformer function
});

//The below functions capture words with the functions magnitude and normalize
// and do nothing with them... this is because cucumber feature syntax is silly
// and cannot work with parenthesis (it tells them to make the text optional)
defineParameterType({
    name: 'magnitudenorm',           // name
    regexp: /magnitude\(norm\)/, // regexp
    transformer: s => eval("this.norm")
});

defineParameterType({
    name: 'magnitude',           // name
    regexp: /magnitude\(v\)/, // regexp
    transformer: s => eval("this.v")  // transformer function
});

defineParameterType({
    name: 'normalize',           // name
    regexp: /^(normalize\(v\))/, // regexp
    transformer: s => eval("this.v")
});



//canvas
defineParameterType({
    name: 'Canvas',           // name
    regexp: /canvas\((.+),(.+)\)/, // regexp
    type: canvas.Canvas,             // type
    transformer: (w, h) => new canvas.Canvas(w,h)  // transformer function
});

defineParameterType({
    name: 'canvas_to_ppm',           // name
    regexp: /canvas_to_ppm\([\w.+]\)/, // regexp
    type: canvas.Canvas
    //transformer: s => eval
});

