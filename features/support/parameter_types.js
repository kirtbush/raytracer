
const { defineParameterType } = require('cucumber')
let tuple = require("../step_definitions/tuple");

/*
defineParameterType(new ParameterType<>(
    'color',           // name
    /red|blue|yellow/, // regexp
    Color,             // type
    s => new Color(s)  // transformer function
))
*/
defineParameterType( {
    name: 'point',           // name
    regexp: /point\((.+),(.+),(.+)\)/, // regexp
    type: tuple.point,             // type
    transformer: tuple.point  // transformer function
} );

defineParameterType( {
    name: 'vector',           // name
    regexp: /vector\((.+),(.+),(.+)\)/, // regexp
    type: tuple.vector,             // type
    transformer: tuple.vector  // transformer function
} );

defineParameterType( {
    name: 'tuple',           // name
    regexp: /tuple\((.+),(.+),(.+),(.+)\)/, // regexp
    type: tuple.tuple,             // type
    transformer: tuple.createTuple  // transformer function
} );

defineParameterType( {
    name: 'sqrt',           // name
    regexp: /√(.+)/, // regexp
    transformer: Math.sqrt  // transformer function
} );

//The below functions capture words with the functions magnitude and normalize
// and do nothing with them... this is because cucumber feature syntax is silly
// and cannot work with parenthesis (it tells them to make the text optional)
defineParameterType( {
    name: 'magnitudenorm',           // name
    regexp: /magnitude\(norm\)/, // regexp
    transformer: s => eval("this.norm")
} );

defineParameterType( {
    name: 'magnitude',           // name
    regexp: /magnitude\(v\)/, // regexp
    transformer: s => eval("this.v")  // transformer function
} );

defineParameterType( {
    name: 'normalize',           // name
    regexp: /^(normalize\(v\))/, // regexp
    transformer: s => eval("this.v")
} );