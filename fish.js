class Fish {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.head = new Segment(createVector(x, y), 150, 0);
        this.body = new Segment(this.head.p2, 50, 0);
        this.tail = new Segment(this.body.p2, 50, 0);

        this.head.child = this.body;
        this.body.child = this.tail;
    }

    follow(tx, ty) {
        this.head.follow(tx, ty);
    }

    drawHead() {
        ellipse(this.x, this.y, 30, 30);
    }

    // find 2 points that are perpendicular to the line formed by p1 and p2 and are len distance away from p1
    solveOrtho(p1, p2, len) {
        let a = p2.x - p1.x;
        let b = p2.y - p1.y;

        if (Math.abs(a) <= 0.01) {
            return [createVector(len, 0), createVector(-len, 0)];
        } else if (Math.abs(b) <= 0.01) {
            return [createVector(0, len), createVector(0, -len)];
        } else {
            let c1 = len / sqrt(1 + (a * a) / (b * b));
            let c2 = -c1;
            let d1 = (-a / b) * c1;
            let d2 = -d1;
            return [
                createVector(p1.x + c1, p1.y + d1),
                createVector(p1.x + c2, p1.y + d2),
            ];
        }
    }

    drawSegment(segment, color) {
        strokeWeight(1);
        stroke("#f00");
        let [p1, p2] = this.solveOrtho(segment.p1, segment.p2, 15);
        let [p3, p4] = this.solveOrtho(segment.p2, segment.p1, 30);
        line(p1.x, p1.y, p2.x, p2.y);
        line(p1.x, p1.y, p3.x, p3.y);
        line(p3.x, p3.y, p4.x, p4.y);
        line(p4.x, p4.y, p2.x, p2.y);
        stroke(color);
        line(segment.p1.x, segment.p1.y, segment.p2.x, segment.p2.y);
    }

    draw() {
        let next = this.head;
        while (next) {
            this.drawSegment(next, "#fff");
            next = next.child;
        }
    }
}
