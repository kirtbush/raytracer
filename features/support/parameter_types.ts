
const { defineParameterType } = require('cucumber')
import * as tuple from "../step_definitions/tuple";
import * as canvas from "../step_definitions/canvas";
import * as matrices from "../step_definitions/matrices";
import {Ray} from "../step_definitions/rays";
import {point_light} from "../step_definitions/lights";

defineParameterType({
    name: 'point',           // name
    regexp: /point\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)/, // regexp
    type: tuple.point,             // type
    transformer: (x,y,z) => new tuple.point(x, y, z)  // transformer function
});

defineParameterType({
    name: 'sfloat',           // name
    regexp: /([-]?\d+\.?\d*)/, // regexp
    //type: number,             // type
    //transformer: (x,y,z) => new tuple.point(x, y, z)  // transformer function
});

//look at this bullsh!t
defineParameterType({
    name: 'ray',           // name
    regexp: /ray\(point\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\), vector\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)\)/, // regexp
    type: Ray,             // type
    transformer: (pt1,pt2,pt3,vct1, vct2, vct3) => new Ray(new tuple.point(pt1,pt2,pt3), new tuple.vector(vct1, vct2, vct3))  // transformer function
});

defineParameterType({
    name: 'position',           // name
    regexp: /position\(r, ([-]?\d+\.?\d*)\)/, // regexp
    //type: number,             // type
    transformer: (num) => (num)  // transformer function
});


defineParameterType({
    name: 'vector',           // name
    regexp: /vector\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)/, // regexp
    type: tuple.vector,             // type
    transformer: (x,y,z) => new tuple.vector(x.trim(), y.trim(), z.trim())  // transformer function
});

defineParameterType({
    name: 'tuple',           // name
    regexp: /tuple\((.+),(.+),(.+),(.+)\)/, // regexp
    type: tuple.tuple,             // type
    transformer: (x,y,z,w) => new tuple.tuple(x,y,z,w)  // transformer function
});

defineParameterType({
    name: 'Color',           // name
    regexp: /color\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)/, // regexp
    type: tuple.Color,             // type
    transformer: (r,g,b) => new tuple.Color(r,g,b)  // transformer function
});

defineParameterType({
    name: 'point_light',           // name
    regexp: /point_light\(point\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\), color\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)\)/, // regexp
    type: point_light,             // type
    transformer: (x,y,z,r,g,b) => new point_light(new tuple.point(x,y,z), new tuple.Color(r,g,b))  // transformer function
});

defineParameterType({
    name: 'sqrt',           // name
    regexp: /√([-]?\d+\.?\d*)/, // regexp
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

defineParameterType({
    name: 'transposedM',           // name
    regexp: /transpose\(([\w.+])\)/, // regexp
    type: matrices.Matrix,
    transformer: s => s
});

defineParameterType({
    name: 'transposedI',           // name
    regexp: /transpose\((identity_matrix)\)/, // regexp
    type: matrices.Matrix,
    transformer: s => matrices.identity(4)
});

