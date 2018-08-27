
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


// defineParameterType( {
//     name: 'pointname',           // name
//     regexp: /p(.+)?/, // regexp
//     type: string,             // type
//     transformer: s => s  // transformer function
// } );
