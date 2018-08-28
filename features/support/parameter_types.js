
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
    transformer: tuple.sqrtString  // transformer function
} );

defineParameterType( {
    name: 'magnitude',           // name
    regexp: /magnitude\((.+)\)/, // regexp
    transformer: s => s  // transformer function
} );
