class Segment {
    constructor(startPoint, len, angle = 0) {
        this.p1 = startPoint;
        this.p2 = createVector(0, 0);
        this.len = len;
        this.angle = angle;
        this.update();
    }

    follow(tx, ty) {
        this.angle = Math.atan2(ty - this.p2.y, tx - this.p2.x);
        this.p1.x = tx;
        this.p1.y = ty;
        
        this.update();

        if (this.child) {
            this.child.p1 = this.p2;
            this.child.follow(this.p2.x, this.p2.y);
        }
    }

    update() {
        let dx = this.len * cos(this.angle);
        let dy = this.len * sin(this.angle);
        this.p2.x = this.p1.x - dx;
        this.p2.y = this.p1.y - dy;
    }

    draw() {
        stroke(255);
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        fill("#f00")
        ellipse(this.p1.x, this.p1.y, 3, 3);
        fill("#0f0")
        ellipse(this.p2.x, this.p2.y, 3, 3);
    }
}