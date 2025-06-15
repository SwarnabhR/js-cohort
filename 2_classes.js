class Rectangle {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    area() {
        const area = this.width * this.height;
        return area;
    }

    paint() {
        console.log(`Painting with color ${this.color}`);
    }
}

// const rect = new Rectangle(2, 4, "red");
// const area = rect.area();
// const paint = rect.paint();
// console.log(area);
// console.log(paint);

// const date = new Date();
// console.log(date);

// const map = new Map();
// map.set('name', 'Swarnabh');
// map.set('age', 22);
// console.log(map.get('age'));