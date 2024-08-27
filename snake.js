class Snake {
    constructor(x, y, nSegments, segmentLength) {
        this.x = x;
        this.y = y;
        this.head = new Segment(createVector(x, y), segmentLength, 0);
        this.segmentLength = segmentLength;

        let current = this.head;
        for (let i = 0; i < nSegments; i++) {
            let next = new Segment(current.p2, segmentLength, 0);
            current.child = next;
            current = next;
        }
    }

    follow(tx, ty) {
        this.head.follow(tx, ty);
    }

    drawHead() {
        strokeWeight(1);
        stroke("#000");

        push();
        fill("#fff");
        translate(this.head.p1.x, this.head.p1.y);
        rotate(this.head.angle);
        ellipse(0, 0, this.segmentLength*1.5, this.segmentLength);

        // eyes                
        fill("#fff");
        ellipse(this.segmentLength / 4, -this.segmentLength / 4, 5, 5);
        ellipse(this.segmentLength / 4, this.segmentLength / 4, 5, 5);
        // pupils
        fill("#000");
        ellipse(this.segmentLength / 4, -this.segmentLength / 4, 3, 3);
        ellipse(this.segmentLength / 4, this.segmentLength / 4, 3, 3);        

        pop();
    }

    drawSegment(segment, color) {
        strokeWeight(10);
        stroke(color);
        line(segment.p1.x, segment.p1.y, segment.p2.x, segment.p2.y);
    }

    draw() {
        let next = this.head;
        let i = 0;        
        while (next) {
            let color = i % 2 === 0 ? "#fff" : "#000";
            this.drawSegment(next, color);
            next = next.child;
            i++;
        }

        this.drawHead();
    }
}
