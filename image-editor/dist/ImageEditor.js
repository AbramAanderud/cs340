"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class Color {
    r;
    g;
    b;
    constructor() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
    }
}
class Image {
    pixels;
    constructor(width, height) {
        this.pixels = Array.from({ length: width }, () => Array.from({ length: height }, () => new Color()));
    }
    setPixel(x, y, color) {
        this.pixels[x][y] = color;
    }
    getPixel(x, y) {
        return this.pixels[x][y];
    }
    getWidth() {
        return this.pixels.length;
    }
    getHeight() {
        return this.pixels[0].length;
    }
}
class Tokenizer {
    s;
    i = 0;
    constructor(s) {
        this.s = s;
    }
    skipWhitespace() {
        while (this.i < this.s.length) {
            const c = this.s[this.i];
            if (c === " " || c === "\n" || c === "\r" || c === "\t" || c === "\f" || c === "\v") {
                this.i++;
                continue;
            }
            if (c === "#") {
                while (this.i < this.s.length && this.s[this.i] !== "\n")
                    this.i++;
                continue;
            }
            break;
        }
    }
    next() {
        this.skipWhitespace();
        if (this.i >= this.s.length) {
            throw new Error("Unexpected end of input");
        }
        const start = this.i;
        while (this.i < this.s.length) {
            const c = this.s[this.i];
            if (c === " " || c === "\n" || c === "\r" || c === "\t" || c === "\f" || c === "\v" || c === "#") {
                break;
            }
            this.i++;
        }
        return this.s.slice(start, this.i);
    }
    nextInt() {
        const t = this.next();
        const n = Number.parseInt(t ?? "", 10);
        if (!Number.isFinite(n))
            throw new Error(`Expected integer but got ${t}`);
        return n;
    }
}
function clamp255(v) {
    return Math.max(0, Math.min(255, v));
}
class ImageEditor {
    static main(args) {
        new ImageEditor().run(args);
    }
    constructor() {
        return;
    }
    run(args) {
        try {
            if (args.length < 3) {
                this.usage();
                return;
            }
            const inputPath = args[0];
            const outputPath = args[1];
            const filter = args[2];
            const image = this.read(inputPath);
            if (filter === "grayscale" || filter === "greyscale") {
                if (args.length !== 3) {
                    this.usage();
                    return;
                }
                this.greyscale(image);
            }
            else if (filter === "invert") {
                if (args.length !== 3) {
                    this.usage();
                    return;
                }
                this.invert(image);
            }
            else if (filter === "emboss") {
                if (args.length !== 3) {
                    this.usage();
                    return;
                }
                this.emboss(image);
            }
            else if (filter === "motionblur") {
                if (args.length !== 4) {
                    this.usage();
                    return;
                }
                let length = -1;
                try {
                    length = Number.parseInt(args[3], 10);
                    if (!Number.isFinite(length) || length < 0) {
                        this.usage();
                        return;
                    }
                }
                catch {
                }
                if (length < 0) {
                    this.usage();
                    return;
                }
                this.motionBlur(image, length);
            }
            else {
                this.usage();
                return;
            }
            this.write(outputPath, image);
        }
        catch (e) {
            console.error(e);
        }
    }
    usage() {
        console.log("USAGE: java ImageEditor <in-file> <out-file> <grayscale|invert|emboss|motionblur> {motion-blur-length}");
    }
    motionBlur(image, length) {
        if (length < 1)
            return;
        for (let x = 0; x < image.getWidth(); ++x) {
            for (let y = 0; y < image.getHeight(); ++y) {
                const cur = image.getPixel(x, y);
                const maxX = Math.min(image.getWidth() - 1, x + length - 1);
                for (let i = x + 1; i <= maxX; ++i) {
                    const tmp = image.getPixel(i, y);
                    cur.r += tmp.r;
                    cur.g += tmp.g;
                    cur.b += tmp.b;
                }
                const delta = maxX - x + 1;
                cur.r = Math.floor(cur.r / delta);
                cur.g = Math.floor(cur.g / delta);
                cur.b = Math.floor(cur.b / delta);
            }
        }
    }
    invert(image) {
        for (let x = 0; x < image.getWidth(); ++x) {
            for (let y = 0; y < image.getHeight(); ++y) {
                const color = image.getPixel(x, y);
                color.r = 255 - color.r;
                color.g = 255 - color.g;
                color.b = 255 - color.b;
            }
        }
    }
    greyscale(image) {
        for (let x = 0; x < image.getWidth(); ++x) {
            for (let y = 0; y < image.getHeight(); ++y) {
                const color = image.getPixel(x, y);
                const gray = clamp255(Math.floor((color.r + color.g + color.b) / 3));
                color.r = gray;
                color.g = gray;
                color.b = gray;
            }
        }
    }
    emboss(image) {
        for (let x = image.getWidth() - 1; x >= 0; --x) {
            for (let y = image.getHeight() - 1; y >= 0; --y) {
                const cur = image.getPixel(x, y);
                let diff = 0;
                if (x > 0 && y > 0) {
                    const ul = image.getPixel(x - 1, y - 1);
                    if (Math.abs(cur.r - ul.r) > Math.abs(diff))
                        diff = cur.r - ul.r;
                    if (Math.abs(cur.g - ul.g) > Math.abs(diff))
                        diff = cur.g - ul.g;
                    if (Math.abs(cur.b - ul.b) > Math.abs(diff))
                        diff = cur.b - ul.b;
                }
                let gray = 128 + diff;
                gray = clamp255(gray);
                cur.r = gray;
                cur.g = gray;
                cur.b = gray;
            }
        }
    }
    read(path) {
        const text = fs.readFileSync(path, "utf-8");
        const input = new Tokenizer(text);
        const magic = input.next();
        if (magic !== "P3")
            throw new Error(`Expected P3 but got ${magic}`);
        const width = input.nextInt();
        const height = input.nextInt();
        const image = new Image(width, height);
        input.nextInt();
        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                const color = new Color();
                color.r = input.nextInt();
                color.g = input.nextInt();
                color.b = input.nextInt();
                image.setPixel(x, y, color);
            }
        }
        return image;
    }
    write(path, image) {
        const lines = [];
        lines.push("P3");
        lines.push(`${image.getWidth()} ${image.getHeight()}`);
        lines.push("255");
        for (let y = 0; y < image.getHeight(); ++y) {
            let row = "";
            for (let x = 0; x < image.getWidth(); ++x) {
                const c = image.getPixel(x, y);
                row += `${x === 0 ? "" : " "}${c.r} ${c.g} ${c.b}`;
            }
            lines.push(row);
        }
        fs.writeFileSync(path, lines.join("\r\n") + "\r\n", "utf-8");
    }
}
ImageEditor.main(process.argv.slice(2));
//# sourceMappingURL=ImageEditor.js.map