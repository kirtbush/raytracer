var common = require("../common");
var tuple = require("./tuple");

const NL = "\n";
const DEFAULT_COLOR_SCALE = 255;

class Canvas {
	constructor(w,h) {
		this.width = parseFloat(w);
        this.height = parseFloat(h);
        this.pixels = [];
        let idx = 0, idy = 0;
        for(idx=0; idx < this.width; idx++) {
            this.pixels.push([]);
            for(idy=0; idy < this.height; idy++) {
                this.pixels[idx].push(new tuple.Color(0,0,0));
            } 
        }

        // for(idx=0; idx < this.width; idx++) {
        //     console.log("\n");
        //     for(idy=0; idy < this.height; idy++) {
        //         console.log(this.pixels[idx][idy]);
        //     } 
        // }
    }

}

//writes the line
function append_ppm_line(str, line) {
    return str + line + NL;
}

function create_ppm_header(width, height, max_color) {
    let retStr = "";
    retStr += "P3" + NL;
    retStr += width + " " + height + NL;
    retStr += max_color;
    return retStr;
}

function add_color_to_str(dataLines, nextLine, c) {
    c = scale(c, DEFAULT_COLOR_SCALE);
    nextLine += c;
    if(nextLine.length + 1 > 70)
    {
        nextLine += "\n";
        dataLines += nextLine;
        nextLine = "";
    }
    else
        nextLine += " ";
}

function scale(value, scale) {
    let newVal = Math.round(value * scale);
    if(newVal < 0)
        newVal = 0;
    else if (newVal > scale)
        newVal = parseFloat(scale);
    return newVal;
}

module.exports = {
	Canvas: Canvas,	

    createCanvas: function(w,h) {
        return new Canvas(w,h);
    },

    write_pixel: function(canvas, x, y, color) {
        canvas.pixels[x][y] = color;
    },

    pixel_at: function(canvas, x,y) {
        return canvas.pixels[x][y];
    },



    canvas_to_ppm: function(canvas1) {
        let ppmStr = create_ppm_header(canvas1.width, canvas1.height, DEFAULT_COLOR_SCALE);
        let idx = 0, idy = 0;
        
        let dataLines = "";
        let nextLine = "\n";
        for(idy=0; idy < canvas1.height; idy++) {
            for(idx=0; idx < canvas1.width; idx++) {
                let r = canvas1.pixels[idx][idy].red;
                add_color_to_str(dataLines, nextLine, r);
                // r = canvas1.scale(r, DEFAULT_COLOR_SCALE);
                // nextLine += r;
                // if(nextLine.length + 1 > 70)
                // {
                //     nextLine += "\n";
                //     dataLines += nextLine;
                //     nextLine = "";
                // }
                // else
                //     nextLine += " ";

                let g = canvas1.pixels[idx][idy].green;
                g = canvas1.scale(g, DEFAULT_COLOR_SCALE);

                nextLine += g;
                if(nextLine.length + 1 > 70)
                {
                    nextLine += "\n";
                    dataLines += nextLine;
                    nextLine = "";
                }
                else
                    nextLine += " ";
                let b = canvas1.pixels[idx][idy].blue;
                b = canvas1.scale(b, DEFAULT_COLOR_SCALE);
                nextLine += b;
                if(nextLine.length + 1 > 70)
                {
                    nextLine += "\n";
                    dataLines += nextLine;
                    nextLine = "";
                }
                else if(idx + 1 < canvas1.width)
                    nextLine += " ";

                //need to add a new line for row major
                //if(dataLines.charAt(dataLines.length-1)!="\n") dataLines += "\n"; 
            }
            nextLine += "\n";
            dataLines += nextLine;
            nextLine = "";
        }

        ppmStr += dataLines;

        return ppmStr;
    }
};
module.id = "canvas";