var common = require("../common");
var tuple = require("./tuple");

class Canvas {
	constructor(w,h) {
		this.width = w;
        this.height = h;
        this.pixels = [];
        let idx = 0, idy = 0;
        for(idx; idx < w; idx++) {
            this.pixels[idx] = [];
            for(idy; idy < h; idy++) {
                this.pixels[idx][idy] = new tuple.Color(0,0,0);
            } 
        }
	}
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
    }
};
module.id = "canvas";