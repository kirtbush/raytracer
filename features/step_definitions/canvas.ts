import * as tuple from"./tuple";

// export module canvas {

    const NL = "\n";
    const DEFAULT_COLOR_SCALE = 255;

    export class Canvas {
        width: number;
        height: number;
        pixels: any;
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

        write_pixel(x, y, c) {
            if( x > this.width - 1 || x < 0)
                return;

            if( y > this.height - 1 || y < 0)
                return;

            this.pixels[Math.round(x)][Math.round(y)] = c;
        }

    }

    //writes the line
    export function append_ppm_line(str, line) {
        return str + line + NL;
    }

    export function create_ppm_header(width, height, max_color) {
        let retStr = "";
        retStr += "P3" + NL;
        retStr += width + " " + height + NL;
        retStr += max_color;
        return retStr;
    }

    export function add_color_to_str(nextLine, dataLines, c) {
        
        if(nextLine.length + String(c).length + 1 > 69)
        {
            //nextLine += "\n";
            dataLines.push(nextLine);
            nextLine = "";
        }
        else if (nextLine.length > 0 && nextLine != "\n")
            nextLine += " ";
        
        c = scale(c, DEFAULT_COLOR_SCALE);

        if(nextLine.length + String(c).length > 69)
        {
            //nextLine += "\n";
            dataLines.push(nextLine);
            nextLine = "";
        }

        nextLine += c;

        return {dl: dataLines, nl: nextLine};
    }

    export function scale(value, scale) {
        let newVal = Math.round(value * scale);
        if(newVal < 0)
            newVal = 0;
        else if (newVal > scale)
            newVal = parseFloat(scale);
        return newVal;
    }
    export function createCanvas(w,h) {
        return new Canvas(w,h);
    }

    export function write_pixel(canvas1, x, y, color) {
        if( x > canvas1.width - 1 || x < 0)
            return;

        if( y > canvas1.height - 1 || y < 0)
            return;

        canvas1.pixels[Math.round(x)][Math.round(y)] = color;
    }

    export function pixel_at(canvas, x,y) {
        return canvas.pixels[x][y];
    }

    export function canvas_to_ppm(canvas1) {
        let ppmStr = create_ppm_header(canvas1.width, canvas1.height, DEFAULT_COLOR_SCALE);
        let idx = 0, idy = 0;
        
        let dataLines: string[] = [];
        let nextLine = "\n";
        let s = {dl: dataLines, nl: nextLine};
        for(idy=0; idy < canvas1.height; idy++) {
            for(idx=0; idx < canvas1.width; idx++) {
                let r = canvas1.pixels[idx][idy].red;
                s = add_color_to_str(nextLine, dataLines, r);
                nextLine = s.nl;
                dataLines = s.dl;

                let g = canvas1.pixels[idx][idy].green;
                s = add_color_to_str(nextLine, dataLines, g);
                nextLine = s.nl;
                dataLines = s.dl;

                let b = canvas1.pixels[idx][idy].blue;
                s = add_color_to_str(nextLine, dataLines, b);
                nextLine = s.nl;
                dataLines = s.dl;
            }

            dataLines.push()
            dataLines.push(nextLine);
            nextLine = "";
        }

        ppmStr += dataLines.join("\n");

        return ppmStr;
    }
//}
