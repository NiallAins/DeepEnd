var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!function (e) { if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
else if ("function" == typeof define && define.amd)
    define([], e);
else {
    var t;
    t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.MatterJs = e();
} }(function () {
    return function () { function e(t, n, o) { function i(s, a) { if (!n[s]) {
        if (!t[s]) {
            var l = "function" == typeof require && require;
            if (!a && l)
                return l(s, !0);
            if (r)
                return r(s, !0);
            var c = new Error("Cannot find module '" + s + "'");
            throw c.code = "MODULE_NOT_FOUND", c;
        }
        var d = n[s] = { exports: {} };
        t[s][0].call(d.exports, function (e) { return i(t[s][1][e] || e); }, d, d.exports, e, t, n, o);
    } return n[s].exports; } for (var r = "function" == typeof require && require, s = 0; s < o.length; s++)
        i(o[s]); return i; } return e; }()({ 1: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../geometry/Vertices"), r = e("../geometry/Vector"), s = e("../core/Sleeping"), a = (e("../render/Render"), e("../core/Common")), l = e("../geometry/Bounds"), c = e("../geometry/Axes");
                !function () {
                    o._inertiaScale = 4,
                        o._nextCollidingGroupId = 1, o._nextNonCollidingGroupId = -1, o._nextCategory = 1, o.create = function (t) { var n = { id: a.nextId(), type: "body", label: "Body", parts: [], plugin: {}, angle: 0, vertices: i.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"), position: { x: 0, y: 0 }, force: { x: 0, y: 0 }, torque: 0, positionImpulse: { x: 0, y: 0 }, constraintImpulse: { x: 0, y: 0, angle: 0 }, totalContacts: 0, speed: 0, angularSpeed: 0, velocity: { x: 0, y: 0 }, angularVelocity: 0, isSensor: !1, isStatic: !1, isSleeping: !1, motion: 0, sleepThreshold: 60, density: .001, restitution: 0, friction: .1, frictionStatic: .5, frictionAir: .01, collisionFilter: { category: 1, mask: 4294967295, group: 0 }, slop: .05, timeScale: 1, render: { visible: !0, opacity: 1, sprite: { xScale: 1, yScale: 1, xOffset: 0, yOffset: 0 }, lineWidth: 0 } }, o = a.extend(n, t); return e(o, t), o; }, o.nextGroup = function (e) { return e ? o._nextNonCollidingGroupId-- : o._nextCollidingGroupId++; }, o.nextCategory = function () { return o._nextCategory = o._nextCategory << 1, o._nextCategory; };
                    var e = function (e, t) {
                        t = t || {}, o.set(e, { bounds: e.bounds || l.create(e.vertices),
                            positionPrev: e.positionPrev || r.clone(e.position), anglePrev: e.anglePrev || e.angle, vertices: e.vertices, parts: e.parts || [e], isStatic: e.isStatic, isSleeping: e.isSleeping, parent: e.parent || e }), i.rotate(e.vertices, e.angle, e.position), c.rotate(e.axes, e.angle), l.update(e.bounds, e.vertices, e.velocity), o.set(e, { axes: t.axes || e.axes, area: t.area || e.area, mass: t.mass || e.mass, inertia: t.inertia || e.inertia });
                        var n = e.isStatic ? "#2e2b44" : a.choose(["#006BA6", "#0496FF", "#FFBC42", "#D81159", "#8F2D56"]);
                        e.render.fillStyle = e.render.fillStyle || n, e.render.strokeStyle = e.render.strokeStyle || "#000", e.render.sprite.xOffset += -(e.bounds.min.x - e.position.x) / (e.bounds.max.x - e.bounds.min.x), e.render.sprite.yOffset += -(e.bounds.min.y - e.position.y) / (e.bounds.max.y - e.bounds.min.y);
                    };
                    o.set = function (e, t, n) {
                        var i;
                        "string" == typeof t && (i = t, t = {}, t[i] = n);
                        for (i in t)
                            if (n = t[i], t.hasOwnProperty(i))
                                switch (i) {
                                    case "isStatic":
                                        o.setStatic(e, n);
                                        break;
                                    case "isSleeping":
                                        s.set(e, n);
                                        break;
                                    case "mass":
                                        o.setMass(e, n);
                                        break;
                                    case "density":
                                        o.setDensity(e, n);
                                        break;
                                    case "inertia":
                                        o.setInertia(e, n);
                                        break;
                                    case "vertices":
                                        o.setVertices(e, n);
                                        break;
                                    case "position":
                                        o.setPosition(e, n);
                                        break;
                                    case "angle":
                                        o.setAngle(e, n);
                                        break;
                                    case "velocity":
                                        o.setVelocity(e, n);
                                        break;
                                    case "angularVelocity":
                                        o.setAngularVelocity(e, n);
                                        break;
                                    case "parts":
                                        o.setParts(e, n);
                                        break;
                                    default: e[i] = n;
                                }
                    }, o.setStatic = function (e, t) {
                        for (var n = 0; n < e.parts.length; n++) {
                            var o = e.parts[n];
                            o.isStatic = t, t ? (o._original = { restitution: o.restitution, friction: o.friction, mass: o.mass, inertia: o.inertia, density: o.density, inverseMass: o.inverseMass, inverseInertia: o.inverseInertia }, o.restitution = 0, o.friction = 1, o.mass = o.inertia = o.density = 1 / 0, o.inverseMass = o.inverseInertia = 0, o.positionPrev.x = o.position.x, o.positionPrev.y = o.position.y, o.anglePrev = o.angle, o.angularVelocity = 0, o.speed = 0, o.angularSpeed = 0, o.motion = 0) : o._original && (o.restitution = o._original.restitution, o.friction = o._original.friction, o.mass = o._original.mass, o.inertia = o._original.inertia, o.density = o._original.density,
                                o.inverseMass = o._original.inverseMass, o.inverseInertia = o._original.inverseInertia, delete o._original);
                        }
                    }, o.setMass = function (e, t) { var n = e.inertia / (e.mass / 6); e.inertia = n * (t / 6), e.inverseInertia = 1 / e.inertia, e.mass = t, e.inverseMass = 1 / e.mass, e.density = e.mass / e.area; }, o.setDensity = function (e, t) { o.setMass(e, t * e.area), e.density = t; }, o.setInertia = function (e, t) { e.inertia = t, e.inverseInertia = 1 / e.inertia; }, o.setVertices = function (e, t) { t[0].body === e ? e.vertices = t : e.vertices = i.create(t, e), e.axes = c.fromVertices(e.vertices), e.area = i.area(e.vertices), o.setMass(e, e.density * e.area); var n = i.centre(e.vertices); i.translate(e.vertices, n, -1), o.setInertia(e, o._inertiaScale * i.inertia(e.vertices, e.mass)), i.translate(e.vertices, e.position), l.update(e.bounds, e.vertices, e.velocity); }, o.setParts = function (e, t, n) {
                        var r;
                        for (t = t.slice(0), e.parts.length = 0, e.parts.push(e), e.parent = e, r = 0; r < t.length; r++) {
                            var s = t[r];
                            s !== e && (s.parent = e, e.parts.push(s));
                        }
                        if (1 !== e.parts.length) {
                            if (n = void 0 === n || n) {
                                var a = [];
                                for (r = 0; r < t.length; r++)
                                    a = a.concat(t[r].vertices);
                                i.clockwiseSort(a);
                                var l = i.hull(a), c = i.centre(l);
                                o.setVertices(e, l), i.translate(e.vertices, c);
                            }
                            var d = o._totalProperties(e);
                            e.area = d.area, e.parent = e, e.position.x = d.centre.x, e.position.y = d.centre.y, e.positionPrev.x = d.centre.x, e.positionPrev.y = d.centre.y, o.setMass(e, d.mass), o.setInertia(e, d.inertia), o.setPosition(e, d.centre);
                        }
                    }, o.setPosition = function (e, t) { var n = r.sub(t, e.position); e.positionPrev.x += n.x, e.positionPrev.y += n.y; for (var o = 0; o < e.parts.length; o++) {
                        var s = e.parts[o];
                        s.position.x += n.x, s.position.y += n.y, i.translate(s.vertices, n), l.update(s.bounds, s.vertices, e.velocity);
                    } }, o.setAngle = function (e, t) { var n = t - e.angle; e.anglePrev += n; for (var o = 0; o < e.parts.length; o++) {
                        var s = e.parts[o];
                        s.angle += n, i.rotate(s.vertices, n, e.position), c.rotate(s.axes, n), l.update(s.bounds, s.vertices, e.velocity), o > 0 && r.rotateAbout(s.position, n, e.position, s.position);
                    } }, o.setVelocity = function (e, t) {
                        e.positionPrev.x = e.position.x - t.x, e.positionPrev.y = e.position.y - t.y,
                            e.velocity.x = t.x, e.velocity.y = t.y, e.speed = r.magnitude(e.velocity);
                    }, o.setAngularVelocity = function (e, t) { e.anglePrev = e.angle - t, e.angularVelocity = t, e.angularSpeed = Math.abs(e.angularVelocity); }, o.translate = function (e, t) { o.setPosition(e, r.add(e.position, t)); }, o.rotate = function (e, t, n) { if (n) {
                        var i = Math.cos(t), r = Math.sin(t), s = e.position.x - n.x, a = e.position.y - n.y;
                        o.setPosition(e, { x: n.x + (s * i - a * r), y: n.y + (s * r + a * i) }), o.setAngle(e, e.angle + t);
                    }
                    else
                        o.setAngle(e, e.angle + t); }, o.scale = function (e, t, n, r) {
                        var s = 0, a = 0;
                        r = r || e.position;
                        for (var d = 0; d < e.parts.length; d++) {
                            var u = e.parts[d];
                            i.scale(u.vertices, t, n, r), u.axes = c.fromVertices(u.vertices), u.area = i.area(u.vertices), o.setMass(u, e.density * u.area), i.translate(u.vertices, { x: -u.position.x, y: -u.position.y }), o.setInertia(u, o._inertiaScale * i.inertia(u.vertices, u.mass)), i.translate(u.vertices, { x: u.position.x, y: u.position.y }), d > 0 && (s += u.area, a += u.inertia), u.position.x = r.x + (u.position.x - r.x) * t, u.position.y = r.y + (u.position.y - r.y) * n, l.update(u.bounds, u.vertices, e.velocity);
                        }
                        e.parts.length > 1 && (e.area = s, e.isStatic || (o.setMass(e, e.density * s), o.setInertia(e, a))), e.circleRadius && (t === n ? e.circleRadius *= t : e.circleRadius = null);
                    }, o.update = function (e, t, n, o) {
                        var s = Math.pow(t * n * e.timeScale, 2), a = 1 - e.frictionAir * n * e.timeScale, d = e.position.x - e.positionPrev.x, u = e.position.y - e.positionPrev.y;
                        e.velocity.x = d * a * o + e.force.x / e.mass * s, e.velocity.y = u * a * o + e.force.y / e.mass * s, e.positionPrev.x = e.position.x, e.positionPrev.y = e.position.y, e.position.x += e.velocity.x, e.position.y += e.velocity.y, e.angularVelocity = (e.angle - e.anglePrev) * a * o + e.torque / e.inertia * s, e.anglePrev = e.angle, e.angle += e.angularVelocity, e.speed = r.magnitude(e.velocity), e.angularSpeed = Math.abs(e.angularVelocity);
                        for (var p = 0; p < e.parts.length; p++) {
                            var f = e.parts[p];
                            i.translate(f.vertices, e.velocity), p > 0 && (f.position.x += e.velocity.x, f.position.y += e.velocity.y), 0 !== e.angularVelocity && (i.rotate(f.vertices, e.angularVelocity, e.position), c.rotate(f.axes, e.angularVelocity),
                                p > 0 && r.rotateAbout(f.position, e.angularVelocity, e.position, f.position)), l.update(f.bounds, f.vertices, e.velocity);
                        }
                    }, o.applyForce = function (e, t, n) { e.force.x += n.x, e.force.y += n.y; var o = { x: t.x - e.position.x, y: t.y - e.position.y }; e.torque += o.x * n.y - o.y * n.x; }, o._totalProperties = function (e) { for (var t = { mass: 0, area: 0, inertia: 0, centre: { x: 0, y: 0 } }, n = 1 === e.parts.length ? 0 : 1; n < e.parts.length; n++) {
                        var o = e.parts[n], i = o.mass !== 1 / 0 ? o.mass : 1;
                        t.mass += i, t.area += o.area, t.inertia += o.inertia, t.centre = r.add(t.centre, r.mult(o.position, i));
                    } return t.centre = r.div(t.centre, t.mass), t; };
                }();
            }, { "../core/Common": 14, "../core/Sleeping": 22, "../geometry/Axes": 25, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29, "../render/Render": 31 }], 2: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../core/Events"), r = e("../core/Common"), s = e("../geometry/Bounds"), a = e("./Body");
                !function () {
                    o.create = function (e) {
                        return r.extend({ id: r.nextId(), type: "composite", parent: null, isModified: !1, bodies: [], constraints: [], composites: [],
                            label: "Composite", plugin: {} }, e);
                    }, o.setModified = function (e, t, n, i) { if (e.isModified = t, n && e.parent && o.setModified(e.parent, t, n, i), i)
                        for (var r = 0; r < e.composites.length; r++) {
                            var s = e.composites[r];
                            o.setModified(s, t, n, i);
                        } }, o.add = function (e, t) { var n = [].concat(t); i.trigger(e, "beforeAdd", { object: t }); for (var s = 0; s < n.length; s++) {
                        var a = n[s];
                        switch (a.type) {
                            case "body":
                                if (a.parent !== a) {
                                    r.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");
                                    break;
                                }
                                o.addBody(e, a);
                                break;
                            case "constraint":
                                o.addConstraint(e, a);
                                break;
                            case "composite":
                                o.addComposite(e, a);
                                break;
                            case "mouseConstraint": o.addConstraint(e, a.constraint);
                        }
                    } return i.trigger(e, "afterAdd", { object: t }), e; }, o.remove = function (e, t, n) {
                        var r = [].concat(t);
                        i.trigger(e, "beforeRemove", { object: t });
                        for (var s = 0; s < r.length; s++) {
                            var a = r[s];
                            switch (a.type) {
                                case "body":
                                    o.removeBody(e, a, n);
                                    break;
                                case "constraint":
                                    o.removeConstraint(e, a, n);
                                    break;
                                case "composite":
                                    o.removeComposite(e, a, n);
                                    break;
                                case "mouseConstraint":
                                    o.removeConstraint(e, a.constraint);
                            }
                        }
                        return i.trigger(e, "afterRemove", { object: t }), e;
                    }, o.addComposite = function (e, t) { return e.composites.push(t), t.parent = e, o.setModified(e, !0, !0, !1), e; }, o.removeComposite = function (e, t, n) { var i = r.indexOf(e.composites, t); if (-1 !== i && (o.removeCompositeAt(e, i), o.setModified(e, !0, !0, !1)), n)
                        for (var s = 0; s < e.composites.length; s++)
                            o.removeComposite(e.composites[s], t, !0); return e; }, o.removeCompositeAt = function (e, t) { return e.composites.splice(t, 1), o.setModified(e, !0, !0, !1), e; }, o.addBody = function (e, t) { return e.bodies.push(t), o.setModified(e, !0, !0, !1), e; }, o.removeBody = function (e, t, n) { var i = r.indexOf(e.bodies, t); if (-1 !== i && (o.removeBodyAt(e, i), o.setModified(e, !0, !0, !1)), n)
                        for (var s = 0; s < e.composites.length; s++)
                            o.removeBody(e.composites[s], t, !0); return e; }, o.removeBodyAt = function (e, t) { return e.bodies.splice(t, 1), o.setModified(e, !0, !0, !1), e; }, o.addConstraint = function (e, t) { return e.constraints.push(t), o.setModified(e, !0, !0, !1), e; }, o.removeConstraint = function (e, t, n) {
                        var i = r.indexOf(e.constraints, t);
                        if (-1 !== i && o.removeConstraintAt(e, i), n)
                            for (var s = 0; s < e.composites.length; s++)
                                o.removeConstraint(e.composites[s], t, !0);
                        return e;
                    }, o.removeConstraintAt = function (e, t) { return e.constraints.splice(t, 1), o.setModified(e, !0, !0, !1), e; }, o.clear = function (e, t, n) { if (n)
                        for (var i = 0; i < e.composites.length; i++)
                            o.clear(e.composites[i], t, !0); return t ? e.bodies = e.bodies.filter(function (e) { return e.isStatic; }) : e.bodies.length = 0, e.constraints.length = 0, e.composites.length = 0, o.setModified(e, !0, !0, !1), e; }, o.allBodies = function (e) { for (var t = [].concat(e.bodies), n = 0; n < e.composites.length; n++)
                        t = t.concat(o.allBodies(e.composites[n])); return t; }, o.allConstraints = function (e) { for (var t = [].concat(e.constraints), n = 0; n < e.composites.length; n++)
                        t = t.concat(o.allConstraints(e.composites[n])); return t; }, o.allComposites = function (e) { for (var t = [].concat(e.composites), n = 0; n < e.composites.length; n++)
                        t = t.concat(o.allComposites(e.composites[n])); return t; }, o.get = function (e, t, n) {
                        var i, r;
                        switch (n) {
                            case "body":
                                i = o.allBodies(e);
                                break;
                            case "constraint":
                                i = o.allConstraints(e);
                                break;
                            case "composite": i = o.allComposites(e).concat(e);
                        }
                        return i ? (r = i.filter(function (e) { return e.id.toString() === t.toString(); }), 0 === r.length ? null : r[0]) : null;
                    }, o.move = function (e, t, n) { return o.remove(e, t), o.add(n, t), e; }, o.rebase = function (e) { for (var t = o.allBodies(e).concat(o.allConstraints(e)).concat(o.allComposites(e)), n = 0; n < t.length; n++)
                        t[n].id = r.nextId(); return o.setModified(e, !0, !0, !1), e; }, o.translate = function (e, t, n) { for (var i = n ? o.allBodies(e) : e.bodies, r = 0; r < i.length; r++)
                        a.translate(i[r], t); return o.setModified(e, !0, !0, !1), e; }, o.rotate = function (e, t, n, i) { for (var r = Math.cos(t), s = Math.sin(t), l = i ? o.allBodies(e) : e.bodies, c = 0; c < l.length; c++) {
                        var d = l[c], u = d.position.x - n.x, p = d.position.y - n.y;
                        a.setPosition(d, { x: n.x + (u * r - p * s), y: n.y + (u * s + p * r) }), a.rotate(d, t);
                    } return o.setModified(e, !0, !0, !1), e; }, o.scale = function (e, t, n, i, r) {
                        for (var s = r ? o.allBodies(e) : e.bodies, l = 0; l < s.length; l++) {
                            var c = s[l], d = c.position.x - i.x, u = c.position.y - i.y;
                            a.setPosition(c, { x: i.x + d * t, y: i.y + u * n }), a.scale(c, t, n);
                        }
                        return o.setModified(e, !0, !0, !1), e;
                    }, o.bounds = function (e) { for (var t = o.allBodies(e), n = [], i = 0; i < t.length; i += 1) {
                        var r = t[i];
                        n.push(r.bounds.min, r.bounds.max);
                    } return s.create(n); };
                }();
            }, { "../core/Common": 14, "../core/Events": 16, "../geometry/Bounds": 26, "./Body": 1 }], 3: [function (e, t, n) { var o = {}; t.exports = o; var i = e("./Composite"), r = (e("../constraint/Constraint"), e("../core/Common")); !function () { o.create = function (e) { var t = i.create(), n = { label: "World", gravity: { x: 0, y: 1, scale: .001 }, bounds: { min: { x: -1 / 0, y: -1 / 0 }, max: { x: 1 / 0, y: 1 / 0 } } }; return r.extend(t, n, e); }; }(); }, { "../constraint/Constraint": 12, "../core/Common": 14, "./Composite": 2 }], 4: [function (e, t, n) { var o = {}; t.exports = o, function () { o.create = function (e) { return { id: o.id(e), vertex: e, normalImpulse: 0, tangentImpulse: 0 }; }, o.id = function (e) { return e.body.id + "_" + e.index; }; }(); }, {}], 5: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("./SAT"), r = e("./Pair"), s = e("../geometry/Bounds");
                !function () {
                    o.collisions = function (e, t) {
                        for (var n = [], a = t.pairs.table, l = 0; l < e.length; l++) {
                            var c = e[l][0], d = e[l][1];
                            if ((!c.isStatic && !c.isSleeping || !d.isStatic && !d.isSleeping) && (o.canCollide(c.collisionFilter, d.collisionFilter) && s.overlaps(c.bounds, d.bounds)))
                                for (var u = c.parts.length > 1 ? 1 : 0; u < c.parts.length; u++)
                                    for (var p = c.parts[u], f = d.parts.length > 1 ? 1 : 0; f < d.parts.length; f++) {
                                        var m = d.parts[f];
                                        if (p === c && m === d || s.overlaps(p.bounds, m.bounds)) {
                                            var v, y = r.id(p, m), g = a[y];
                                            v = g && g.isActive ? g.collision : null;
                                            var x = i.collides(p, m, v);
                                            x.collided && n.push(x);
                                        }
                                    }
                        }
                        return n;
                    }, o.canCollide = function (e, t) { return e.group === t.group && 0 !== e.group ? e.group > 0 : 0 != (e.mask & t.category) && 0 != (t.mask & e.category); };
                }();
            }, { "../geometry/Bounds": 26, "./Pair": 7, "./SAT": 11 }], 6: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("./Pair"), r = e("./Detector"), s = e("../core/Common");
                !function () {
                    o.create = function (e) { var t = { controller: o, detector: r.collisions, buckets: {}, pairs: {}, pairsList: [], bucketWidth: 48, bucketHeight: 48 }; return s.extend(t, e); }, o.update = function (e, t, n, i) {
                        var r, s, a, l, c, d = n.world, u = e.buckets, p = !1;
                        for (r = 0; r < t.length; r++) {
                            var f = t[r];
                            if ((!f.isSleeping || i) && !(f.bounds.max.x < d.bounds.min.x || f.bounds.min.x > d.bounds.max.x || f.bounds.max.y < d.bounds.min.y || f.bounds.min.y > d.bounds.max.y)) {
                                var m = o._getRegion(e, f);
                                if (!f.region || m.id !== f.region.id || i) {
                                    f.region && !i || (f.region = m);
                                    var v = o._regionUnion(m, f.region);
                                    for (s = v.startCol; s <= v.endCol; s++)
                                        for (a = v.startRow; a <= v.endRow; a++) {
                                            c = o._getBucketId(s, a), l = u[c];
                                            var y = s >= m.startCol && s <= m.endCol && a >= m.startRow && a <= m.endRow, g = s >= f.region.startCol && s <= f.region.endCol && a >= f.region.startRow && a <= f.region.endRow;
                                            !y && g && g && l && o._bucketRemoveBody(e, l, f), (f.region === m || y && !g || i) && (l || (l = o._createBucket(u, c)), o._bucketAddBody(e, l, f));
                                        }
                                    f.region = m, p = !0;
                                }
                            }
                        }
                        p && (e.pairsList = o._createActivePairsList(e));
                    }, o.clear = function (e) { e.buckets = {}, e.pairs = {}, e.pairsList = []; }, o._regionUnion = function (e, t) {
                        var n = Math.min(e.startCol, t.startCol), i = Math.max(e.endCol, t.endCol), r = Math.min(e.startRow, t.startRow), s = Math.max(e.endRow, t.endRow);
                        return o._createRegion(n, i, r, s);
                    }, o._getRegion = function (e, t) { var n = t.bounds, i = Math.floor(n.min.x / e.bucketWidth), r = Math.floor(n.max.x / e.bucketWidth), s = Math.floor(n.min.y / e.bucketHeight), a = Math.floor(n.max.y / e.bucketHeight); return o._createRegion(i, r, s, a); }, o._createRegion = function (e, t, n, o) { return { id: e + "," + t + "," + n + "," + o, startCol: e, endCol: t, startRow: n, endRow: o }; }, o._getBucketId = function (e, t) { return "C" + e + "R" + t; }, o._createBucket = function (e, t) { return e[t] = []; }, o._bucketAddBody = function (e, t, n) { for (var o = 0; o < t.length; o++) {
                        var r = t[o];
                        if (!(n.id === r.id || n.isStatic && r.isStatic)) {
                            var s = i.id(n, r), a = e.pairs[s];
                            a ? a[2] += 1 : e.pairs[s] = [n, r, 1];
                        }
                    } t.push(n); }, o._bucketRemoveBody = function (e, t, n) { t.splice(s.indexOf(t, n), 1); for (var o = 0; o < t.length; o++) {
                        var r = t[o], a = i.id(n, r), l = e.pairs[a];
                        l && (l[2] -= 1);
                    } }, o._createActivePairsList = function (e) { var t, n, o = []; t = s.keys(e.pairs); for (var i = 0; i < t.length; i++)
                        n = e.pairs[t[i]], n[2] > 0 ? o.push(n) : delete e.pairs[t[i]]; return o; };
                }();
            }, { "../core/Common": 14, "./Detector": 5, "./Pair": 7 }],
        7: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("./Contact");
                !function () {
                    o.create = function (e, t) { var n = e.bodyA, i = e.bodyB, r = e.parentA, s = e.parentB, a = { id: o.id(n, i), bodyA: n, bodyB: i, contacts: {}, activeContacts: [], separation: 0, isActive: !0, isSensor: n.isSensor || i.isSensor, timeCreated: t, timeUpdated: t, inverseMass: r.inverseMass + s.inverseMass, friction: Math.min(r.friction, s.friction), frictionStatic: Math.max(r.frictionStatic, s.frictionStatic), restitution: Math.max(r.restitution, s.restitution), slop: Math.max(r.slop, s.slop) }; return o.update(a, e, t), a; }, o.update = function (e, t, n) {
                        var r = e.contacts, s = t.supports, a = e.activeContacts, l = t.parentA, c = t.parentB;
                        if (e.collision = t, e.inverseMass = l.inverseMass + c.inverseMass, e.friction = Math.min(l.friction, c.friction), e.frictionStatic = Math.max(l.frictionStatic, c.frictionStatic), e.restitution = Math.max(l.restitution, c.restitution), e.slop = Math.max(l.slop, c.slop), a.length = 0, t.collided) {
                            for (var d = 0; d < s.length; d++) {
                                var u = s[d], p = i.id(u), f = r[p];
                                f ? a.push(f) : a.push(r[p] = i.create(u));
                            }
                            e.separation = t.depth, o.setActive(e, !0, n);
                        }
                        else
                            !0 === e.isActive && o.setActive(e, !1, n);
                    }, o.setActive = function (e, t, n) { t ? (e.isActive = !0, e.timeUpdated = n) : (e.isActive = !1, e.activeContacts.length = 0); }, o.id = function (e, t) { return e.id < t.id ? "A" + e.id + "B" + t.id : "A" + t.id + "B" + e.id; };
                }();
            }, { "./Contact": 4 }], 8: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("./Pair"), r = e("../core/Common");
                !function () {
                    o._pairMaxIdleLife = 1e3, o.create = function (e) { return r.extend({ table: {}, list: [], collisionStart: [], collisionActive: [], collisionEnd: [] }, e); }, o.update = function (e, t, n) { var o, s, a, l, c = e.list, d = e.table, u = e.collisionStart, p = e.collisionEnd, f = e.collisionActive, m = []; for (u.length = 0, p.length = 0, f.length = 0, l = 0; l < t.length; l++)
                        o = t[l], o.collided && (s = i.id(o.bodyA, o.bodyB), m.push(s), a = d[s], a ? (a.isActive ? f.push(a) : u.push(a), i.update(a, o, n)) : (a = i.create(o, n), d[s] = a, u.push(a), c.push(a))); for (l = 0; l < c.length; l++)
                        a = c[l], a.isActive && -1 === r.indexOf(m, a.id) && (i.setActive(a, !1, n), p.push(a)); }, o.removeOld = function (e, t) {
                        var n, i, r, s, a = e.list, l = e.table, c = [];
                        for (s = 0; s < a.length; s++)
                            n = a[s], i = n.collision, i.bodyA.isSleeping || i.bodyB.isSleeping ? n.timeUpdated = t : t - n.timeUpdated > o._pairMaxIdleLife && c.push(s);
                        for (s = 0; s < c.length; s++)
                            r = c[s] - s, n = a[r], delete l[n.id], a.splice(r, 1);
                    }, o.clear = function (e) { return e.table = {}, e.list.length = 0, e.collisionStart.length = 0, e.collisionActive.length = 0, e.collisionEnd.length = 0, e; };
                }();
            }, { "../core/Common": 14, "./Pair": 7 }], 9: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../geometry/Vector"), r = e("./SAT"), s = e("../geometry/Bounds"), a = e("../factory/Bodies"), l = e("../geometry/Vertices");
                !function () {
                    o.collides = function (e, t) { for (var n = [], o = 0; o < t.length; o++) {
                        var i = t[o];
                        if (s.overlaps(i.bounds, e.bounds))
                            for (var a = 1 === i.parts.length ? 0 : 1; a < i.parts.length; a++) {
                                var l = i.parts[a];
                                if (s.overlaps(l.bounds, e.bounds)) {
                                    var c = r.collides(l, e);
                                    if (c.collided) {
                                        n.push(c);
                                        break;
                                    }
                                }
                            }
                    } return n; }, o.ray = function (e, t, n, r) {
                        r = r || 1e-100;
                        for (var s = i.angle(t, n), l = i.magnitude(i.sub(t, n)), c = .5 * (n.x + t.x), d = .5 * (n.y + t.y), u = a.rectangle(c, d, l, r, { angle: s }), p = o.collides(u, e), f = 0; f < p.length; f += 1) {
                            var m = p[f];
                            m.body = m.bodyB = m.bodyA;
                        }
                        return p;
                    }, o.region = function (e, t, n) { for (var o = [], i = 0; i < e.length; i++) {
                        var r = e[i], a = s.overlaps(r.bounds, t);
                        (a && !n || !a && n) && o.push(r);
                    } return o; }, o.point = function (e, t) { for (var n = [], o = 0; o < e.length; o++) {
                        var i = e[o];
                        if (s.contains(i.bounds, t))
                            for (var r = 1 === i.parts.length ? 0 : 1; r < i.parts.length; r++) {
                                var a = i.parts[r];
                                if (s.contains(a.bounds, t) && l.contains(a.vertices, t)) {
                                    n.push(i);
                                    break;
                                }
                            }
                    } return n; };
                }();
            }, { "../factory/Bodies": 23, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29, "./SAT": 11 }], 10: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../geometry/Vertices"), r = e("../geometry/Vector"), s = e("../core/Common"), a = e("../geometry/Bounds");
                !function () {
                    o._restingThresh = 4, o._restingThreshTangent = 6, o._positionDampen = .9, o._positionWarming = .8, o._frictionNormalMultiplier = 5, o.preSolvePosition = function (e) {
                        var t, n, o;
                        for (t = 0; t < e.length; t++)
                            n = e[t], n.isActive && (o = n.activeContacts.length, n.collision.parentA.totalContacts += o, n.collision.parentB.totalContacts += o);
                    }, o.solvePosition = function (e, t) { var n, i, s, a, l, c, d, u, p, f = r._temp[0], m = r._temp[1], v = r._temp[2], y = r._temp[3]; for (n = 0; n < e.length; n++)
                        i = e[n], i.isActive && !i.isSensor && (s = i.collision, a = s.parentA, l = s.parentB, c = s.normal, d = r.sub(r.add(l.positionImpulse, l.position, f), r.add(a.positionImpulse, r.sub(l.position, s.penetration, m), v), y), i.separation = r.dot(c, d)); for (n = 0; n < e.length; n++)
                        i = e[n], i.isActive && !i.isSensor && (s = i.collision, a = s.parentA, l = s.parentB, c = s.normal, p = (i.separation - i.slop) * t, (a.isStatic || l.isStatic) && (p *= 2), a.isStatic || a.isSleeping || (u = o._positionDampen / a.totalContacts, a.positionImpulse.x += c.x * p * u, a.positionImpulse.y += c.y * p * u), l.isStatic || l.isSleeping || (u = o._positionDampen / l.totalContacts, l.positionImpulse.x -= c.x * p * u, l.positionImpulse.y -= c.y * p * u)); }, o.postSolvePosition = function (e) {
                        for (var t = 0; t < e.length; t++) {
                            var n = e[t];
                            if (n.totalContacts = 0, 0 !== n.positionImpulse.x || 0 !== n.positionImpulse.y) {
                                for (var s = 0; s < n.parts.length; s++) {
                                    var l = n.parts[s];
                                    i.translate(l.vertices, n.positionImpulse), a.update(l.bounds, l.vertices, n.velocity), l.position.x += n.positionImpulse.x, l.position.y += n.positionImpulse.y;
                                }
                                n.positionPrev.x += n.positionImpulse.x, n.positionPrev.y += n.positionImpulse.y, r.dot(n.positionImpulse, n.velocity) < 0 ? (n.positionImpulse.x = 0, n.positionImpulse.y = 0) : (n.positionImpulse.x *= o._positionWarming, n.positionImpulse.y *= o._positionWarming);
                            }
                        }
                    }, o.preSolveVelocity = function (e) {
                        var t, n, o, i, s, a, l, c, d, u, p, f, m, v, y = r._temp[0], g = r._temp[1];
                        for (t = 0; t < e.length; t++)
                            if (o = e[t], o.isActive && !o.isSensor)
                                for (i = o.activeContacts, s = o.collision, a = s.parentA, l = s.parentB, c = s.normal, d = s.tangent, n = 0; n < i.length; n++)
                                    u = i[n], p = u.vertex, f = u.normalImpulse, m = u.tangentImpulse, 0 === f && 0 === m || (y.x = c.x * f + d.x * m, y.y = c.y * f + d.y * m, a.isStatic || a.isSleeping || (v = r.sub(p, a.position, g), a.positionPrev.x += y.x * a.inverseMass, a.positionPrev.y += y.y * a.inverseMass,
                                        a.anglePrev += r.cross(v, y) * a.inverseInertia), l.isStatic || l.isSleeping || (v = r.sub(p, l.position, g), l.positionPrev.x -= y.x * l.inverseMass, l.positionPrev.y -= y.y * l.inverseMass, l.anglePrev -= r.cross(v, y) * l.inverseInertia));
                    }, o.solveVelocity = function (e, t) {
                        for (var n = t * t, i = r._temp[0], a = r._temp[1], l = r._temp[2], c = r._temp[3], d = r._temp[4], u = r._temp[5], p = 0; p < e.length; p++) {
                            var f = e[p];
                            if (f.isActive && !f.isSensor) {
                                var m = f.collision, v = m.parentA, y = m.parentB, g = m.normal, x = m.tangent, h = f.activeContacts, b = 1 / h.length;
                                v.velocity.x = v.position.x - v.positionPrev.x, v.velocity.y = v.position.y - v.positionPrev.y, y.velocity.x = y.position.x - y.positionPrev.x, y.velocity.y = y.position.y - y.positionPrev.y, v.angularVelocity = v.angle - v.anglePrev, y.angularVelocity = y.angle - y.anglePrev;
                                for (var w = 0; w < h.length; w++) {
                                    var S = h[w], C = S.vertex, A = r.sub(C, v.position, a), P = r.sub(C, y.position, l), B = r.add(v.velocity, r.mult(r.perp(A), v.angularVelocity), c), M = r.add(y.velocity, r.mult(r.perp(P), y.angularVelocity), d), k = r.sub(B, M, u), I = r.dot(g, k), _ = r.dot(x, k), T = Math.abs(_), R = s.sign(_), V = (1 + f.restitution) * I, E = s.clamp(f.separation + I, 0, 1) * o._frictionNormalMultiplier, L = _, F = 1 / 0;
                                    T > f.friction * f.frictionStatic * E * n && (F = T, L = s.clamp(f.friction * R * n, -F, F));
                                    var O = r.cross(A, g), q = r.cross(P, g), W = b / (v.inverseMass + y.inverseMass + v.inverseInertia * O * O + y.inverseInertia * q * q);
                                    if (V *= W, L *= W, I < 0 && I * I > o._restingThresh * n)
                                        S.normalImpulse = 0;
                                    else {
                                        var D = S.normalImpulse;
                                        S.normalImpulse = Math.min(S.normalImpulse + V, 0), V = S.normalImpulse - D;
                                    }
                                    if (_ * _ > o._restingThreshTangent * n)
                                        S.tangentImpulse = 0;
                                    else {
                                        var N = S.tangentImpulse;
                                        S.tangentImpulse = s.clamp(S.tangentImpulse + L, -F, F), L = S.tangentImpulse - N;
                                    }
                                    i.x = g.x * V + x.x * L, i.y = g.y * V + x.y * L, v.isStatic || v.isSleeping || (v.positionPrev.x += i.x * v.inverseMass, v.positionPrev.y += i.y * v.inverseMass,
                                        v.anglePrev += r.cross(A, i) * v.inverseInertia), y.isStatic || y.isSleeping || (y.positionPrev.x -= i.x * y.inverseMass, y.positionPrev.y -= i.y * y.inverseMass, y.anglePrev -= r.cross(P, i) * y.inverseInertia);
                                }
                            }
                        }
                    };
                }();
            }, { "../core/Common": 14, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29 }], 11: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../geometry/Vertices"), r = e("../geometry/Vector");
                !function () {
                    o.collides = function (e, t, n) {
                        var s, a, l, c, d = !1;
                        if (n) {
                            var u = e.parent, p = t.parent, f = u.speed * u.speed + u.angularSpeed * u.angularSpeed + p.speed * p.speed + p.angularSpeed * p.angularSpeed;
                            d = n && n.collided && f < .2, c = n;
                        }
                        else
                            c = { collided: !1, bodyA: e, bodyB: t };
                        if (n && d) {
                            var m = c.axisBody, v = m === e ? t : e, y = [m.axes[n.axisNumber]];
                            if (l = o._overlapAxes(m.vertices, v.vertices, y), c.reused = !0, l.overlap <= 0)
                                return c.collided = !1, c;
                        }
                        else {
                            if (s = o._overlapAxes(e.vertices, t.vertices, e.axes), s.overlap <= 0)
                                return c.collided = !1, c;
                            if (a = o._overlapAxes(t.vertices, e.vertices, t.axes), a.overlap <= 0)
                                return c.collided = !1, c;
                            s.overlap < a.overlap ? (l = s,
                                c.axisBody = e) : (l = a, c.axisBody = t), c.axisNumber = l.axisNumber;
                        }
                        c.bodyA = e.id < t.id ? e : t, c.bodyB = e.id < t.id ? t : e, c.collided = !0, c.depth = l.overlap, c.parentA = c.bodyA.parent, c.parentB = c.bodyB.parent, e = c.bodyA, t = c.bodyB, r.dot(l.axis, r.sub(t.position, e.position)) < 0 ? c.normal = { x: l.axis.x, y: l.axis.y } : c.normal = { x: -l.axis.x, y: -l.axis.y }, c.tangent = r.perp(c.normal), c.penetration = c.penetration || {}, c.penetration.x = c.normal.x * c.depth, c.penetration.y = c.normal.y * c.depth;
                        var g = o._findSupports(e, t, c.normal), x = [];
                        if (i.contains(e.vertices, g[0]) && x.push(g[0]), i.contains(e.vertices, g[1]) && x.push(g[1]), x.length < 2) {
                            var h = o._findSupports(t, e, r.neg(c.normal));
                            i.contains(t.vertices, h[0]) && x.push(h[0]), x.length < 2 && i.contains(t.vertices, h[1]) && x.push(h[1]);
                        }
                        return x.length < 1 && (x = [g[0]]), c.supports = x, c;
                    }, o._overlapAxes = function (e, t, n) {
                        for (var i, s, a = r._temp[0], l = r._temp[1], c = { overlap: Number.MAX_VALUE }, d = 0; d < n.length; d++) {
                            if (s = n[d], o._projectToAxis(a, e, s), o._projectToAxis(l, t, s),
                                (i = Math.min(a.max - l.min, l.max - a.min)) <= 0)
                                return c.overlap = i, c;
                            i < c.overlap && (c.overlap = i, c.axis = s, c.axisNumber = d);
                        }
                        return c;
                    }, o._projectToAxis = function (e, t, n) { for (var o = r.dot(t[0], n), i = o, s = 1; s < t.length; s += 1) {
                        var a = r.dot(t[s], n);
                        a > i ? i = a : a < o && (o = a);
                    } e.min = o, e.max = i; }, o._findSupports = function (e, t, n) { for (var o, i, s, a, l = Number.MAX_VALUE, c = r._temp[0], d = t.vertices, u = e.position, p = 0; p < d.length; p++)
                        i = d[p], c.x = i.x - u.x, c.y = i.y - u.y, (o = -r.dot(n, c)) < l && (l = o, s = i); return i = d[s.index - 1 >= 0 ? s.index - 1 : d.length - 1], c.x = i.x - u.x, c.y = i.y - u.y, l = -r.dot(n, c), a = i, i = d[(s.index + 1) % d.length], c.x = i.x - u.x, c.y = i.y - u.y, o = -r.dot(n, c), o < l && (a = i), [s, a]; };
                }();
            }, { "../geometry/Vector": 28, "../geometry/Vertices": 29 }], 12: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../geometry/Vertices"), r = e("../geometry/Vector"), s = e("../core/Sleeping"), a = e("../geometry/Bounds"), l = e("../geometry/Axes"), c = e("../core/Common");
                !function () {
                    o._warming = .4, o._torqueDampen = 1, o._minLength = 1e-6, o.create = function (e) {
                        var t = e;
                        t.bodyA && !t.pointA && (t.pointA = { x: 0, y: 0 }),
                            t.bodyB && !t.pointB && (t.pointB = { x: 0, y: 0 });
                        var n = t.bodyA ? r.add(t.bodyA.position, t.pointA) : t.pointA, o = t.bodyB ? r.add(t.bodyB.position, t.pointB) : t.pointB, i = r.magnitude(r.sub(n, o));
                        t.length = void 0 !== t.length ? t.length : i, t.id = t.id || c.nextId(), t.label = t.label || "Constraint", t.type = "constraint", t.stiffness = t.stiffness || (t.length > 0 ? 1 : .7), t.damping = t.damping || 0, t.angularStiffness = t.angularStiffness || 0, t.angleA = t.bodyA ? t.bodyA.angle : t.angleA, t.angleB = t.bodyB ? t.bodyB.angle : t.angleB, t.plugin = {};
                        var s = { visible: !0, lineWidth: 2, strokeStyle: "#ffffff", type: "line", anchors: !0 };
                        return 0 === t.length && t.stiffness > .1 ? (s.type = "pin", s.anchors = !1) : t.stiffness < .9 && (s.type = "spring"), t.render = c.extend(s, t.render), t;
                    }, o.preSolveAll = function (e) { for (var t = 0; t < e.length; t += 1) {
                        var n = e[t], o = n.constraintImpulse;
                        n.isStatic || 0 === o.x && 0 === o.y && 0 === o.angle || (n.position.x += o.x, n.position.y += o.y, n.angle += o.angle);
                    } }, o.solveAll = function (e, t) {
                        for (var n = 0; n < e.length; n += 1) {
                            var i = e[n], r = !i.bodyA || i.bodyA && i.bodyA.isStatic, s = !i.bodyB || i.bodyB && i.bodyB.isStatic;
                            (r || s) && o.solve(e[n], t);
                        }
                        for (n = 0; n < e.length; n += 1)
                            i = e[n], r = !i.bodyA || i.bodyA && i.bodyA.isStatic, s = !i.bodyB || i.bodyB && i.bodyB.isStatic, r || s || o.solve(e[n], t);
                    }, o.solve = function (e, t) {
                        var n = e.bodyA, i = e.bodyB, s = e.pointA, a = e.pointB;
                        if (n || i) {
                            n && !n.isStatic && (r.rotate(s, n.angle - e.angleA, s), e.angleA = n.angle), i && !i.isStatic && (r.rotate(a, i.angle - e.angleB, a), e.angleB = i.angle);
                            var l = s, c = a;
                            if (n && (l = r.add(n.position, s)), i && (c = r.add(i.position, a)), l && c) {
                                var d = r.sub(l, c), u = r.magnitude(d);
                                u < o._minLength && (u = o._minLength);
                                var p, f, m, v, y, g = (u - e.length) / u, x = e.stiffness < 1 ? e.stiffness * t : e.stiffness, h = r.mult(d, g * x), b = (n ? n.inverseMass : 0) + (i ? i.inverseMass : 0), w = (n ? n.inverseInertia : 0) + (i ? i.inverseInertia : 0), S = b + w;
                                if (e.damping) {
                                    var C = r.create();
                                    m = r.div(d, u), y = r.sub(i && r.sub(i.position, i.positionPrev) || C, n && r.sub(n.position, n.positionPrev) || C), v = r.dot(m, y);
                                }
                                n && !n.isStatic && (f = n.inverseMass / b, n.constraintImpulse.x -= h.x * f,
                                    n.constraintImpulse.y -= h.y * f, n.position.x -= h.x * f, n.position.y -= h.y * f, e.damping && (n.positionPrev.x -= e.damping * m.x * v * f, n.positionPrev.y -= e.damping * m.y * v * f), p = r.cross(s, h) / S * o._torqueDampen * n.inverseInertia * (1 - e.angularStiffness), n.constraintImpulse.angle -= p, n.angle -= p), i && !i.isStatic && (f = i.inverseMass / b, i.constraintImpulse.x += h.x * f, i.constraintImpulse.y += h.y * f, i.position.x += h.x * f, i.position.y += h.y * f, e.damping && (i.positionPrev.x += e.damping * m.x * v * f, i.positionPrev.y += e.damping * m.y * v * f), p = r.cross(a, h) / S * o._torqueDampen * i.inverseInertia * (1 - e.angularStiffness), i.constraintImpulse.angle += p, i.angle += p);
                            }
                        }
                    }, o.postSolveAll = function (e) {
                        for (var t = 0; t < e.length; t++) {
                            var n = e[t], c = n.constraintImpulse;
                            if (!(n.isStatic || 0 === c.x && 0 === c.y && 0 === c.angle)) {
                                s.set(n, !1);
                                for (var d = 0; d < n.parts.length; d++) {
                                    var u = n.parts[d];
                                    i.translate(u.vertices, c), d > 0 && (u.position.x += c.x, u.position.y += c.y), 0 !== c.angle && (i.rotate(u.vertices, c.angle, n.position), l.rotate(u.axes, c.angle),
                                        d > 0 && r.rotateAbout(u.position, c.angle, n.position, u.position)), a.update(u.bounds, u.vertices, n.velocity);
                                }
                                c.angle *= o._warming, c.x *= o._warming, c.y *= o._warming;
                            }
                        }
                    };
                }();
            }, { "../core/Common": 14, "../core/Sleeping": 22, "../geometry/Axes": 25, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29 }], 13: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../geometry/Vertices"), r = e("../core/Sleeping"), s = e("../core/Mouse"), a = e("../core/Events"), l = e("../collision/Detector"), c = e("./Constraint"), d = e("../body/Composite"), u = e("../core/Common"), p = e("../geometry/Bounds");
                !function () {
                    o.create = function (e, t) {
                        var n = (e ? e.mouse : null) || (t ? t.mouse : null);
                        n || (e && e.render && e.render.canvas ? n = s.create(e.render.canvas) : t && t.element ? n = s.create(t.element) : (n = s.create(), u.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));
                        var i = c.create({ label: "Mouse Constraint", pointA: n.position, pointB: { x: 0, y: 0 }, length: .01, stiffness: .1, angularStiffness: 1,
                            render: { strokeStyle: "#90EE90", lineWidth: 3 } }), r = { type: "mouseConstraint", mouse: n, element: null, body: null, constraint: i, collisionFilter: { category: 1, mask: 4294967295, group: 0 } }, l = u.extend(r, t);
                        return a.on(e, "beforeUpdate", function () { var t = d.allBodies(e.world); o.update(l, t), o._triggerEvents(l); }), l;
                    }, o.update = function (e, t) { var n = e.mouse, o = e.constraint, s = e.body; if (0 === n.button) {
                        if (o.bodyB)
                            r.set(o.bodyB, !1), o.pointA = n.position;
                        else
                            for (var c = 0; c < t.length; c++)
                                if (s = t[c], p.contains(s.bounds, n.position) && l.canCollide(s.collisionFilter, e.collisionFilter))
                                    for (var d = s.parts.length > 1 ? 1 : 0; d < s.parts.length; d++) {
                                        var u = s.parts[d];
                                        if (i.contains(u.vertices, n.position)) {
                                            o.pointA = n.position, o.bodyB = e.body = s, o.pointB = { x: n.position.x - s.position.x, y: n.position.y - s.position.y }, o.angleB = s.angle, r.set(s, !1), a.trigger(e, "startdrag", { mouse: n, body: s });
                                            break;
                                        }
                                    }
                    }
                    else
                        o.bodyB = e.body = null, o.pointB = null, s && a.trigger(e, "enddrag", { mouse: n, body: s }); }, o._triggerEvents = function (e) {
                        var t = e.mouse, n = t.sourceEvents;
                        n.mousemove && a.trigger(e, "mousemove", { mouse: t }), n.mousedown && a.trigger(e, "mousedown", { mouse: t }), n.mouseup && a.trigger(e, "mouseup", { mouse: t }), s.clearSourceEvents(t);
                    };
                }();
            }, { "../body/Composite": 2, "../collision/Detector": 5, "../core/Common": 14, "../core/Events": 16, "../core/Mouse": 19, "../core/Sleeping": 22, "../geometry/Bounds": 26, "../geometry/Vertices": 29, "./Constraint": 12 }], 14: [function (e, t, n) {
                (function (n) {
                    var o = {};
                    t.exports = o, function () {
                        o._nextId = 0, o._seed = 0, o._nowStartTime = +new Date, o.extend = function (e, t) { var n, i; "boolean" == typeof t ? (n = 2, i = t) : (n = 1, i = !0); for (var r = n; r < arguments.length; r++) {
                            var s = arguments[r];
                            if (s)
                                for (var a in s)
                                    i && s[a] && s[a].constructor === Object ? e[a] && e[a].constructor !== Object ? e[a] = s[a] : (e[a] = e[a] || {}, o.extend(e[a], i, s[a])) : e[a] = s[a];
                        } return e; }, o.clone = function (e, t) { return o.extend({}, t, e); }, o.keys = function (e) { if (Object.keys)
                            return Object.keys(e); var t = []; for (var n in e)
                            t.push(n); return t; }, o.values = function (e) {
                            var t = [];
                            if (Object.keys) {
                                for (var n = Object.keys(e), o = 0; o < n.length; o++)
                                    t.push(e[n[o]]);
                                return t;
                            }
                            for (var i in e)
                                t.push(e[i]);
                            return t;
                        }, o.get = function (e, t, n, o) { t = t.split(".").slice(n, o); for (var i = 0; i < t.length; i += 1)
                            e = e[t[i]]; return e; }, o.set = function (e, t, n, i, r) { var s = t.split(".").slice(i, r); return o.get(e, t, 0, -1)[s[s.length - 1]] = n, n; }, o.shuffle = function (e) { for (var t = e.length - 1; t > 0; t--) {
                            var n = Math.floor(o.random() * (t + 1)), i = e[t];
                            e[t] = e[n], e[n] = i;
                        } return e; }, o.choose = function (e) { return e[Math.floor(o.random() * e.length)]; }, o.isElement = function (e) { return "undefined" != typeof HTMLElement ? e instanceof HTMLElement : !!(e && e.nodeType && e.nodeName); }, o.isArray = function (e) { return "[object Array]" === Object.prototype.toString.call(e); }, o.isFunction = function (e) { return "function" == typeof e; }, o.isPlainObject = function (e) { return "object" == typeof e && e.constructor === Object; }, o.isString = function (e) { return "[object String]" === toString.call(e); }, o.clamp = function (e, t, n) { return e < t ? t : e > n ? n : e; }, o.sign = function (e) { return e < 0 ? -1 : 1; }, o.now = function () {
                            if (window.performance) {
                                if (window.performance.now)
                                    return window.performance.now();
                                if (window.performance.webkitNow)
                                    return window.performance.webkitNow();
                            }
                            return new Date - o._nowStartTime;
                        }, o.random = function (e, n) { return e = void 0 !== e ? e : 0, n = void 0 !== n ? n : 1, e + t() * (n - e); };
                        var t = function () { return o._seed = (9301 * o._seed + 49297) % 233280, o._seed / 233280; };
                        o.colorToNumber = function (e) { return e = e.replace("#", ""), 3 == e.length && (e = e.charAt(0) + e.charAt(0) + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2)), parseInt(e, 16); }, o.logLevel = 1, o.log = function () { console && o.logLevel > 0 && o.logLevel <= 3 && console.log.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments))); }, o.info = function () { console && o.logLevel > 0 && o.logLevel <= 2 && console.info.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments))); }, o.warn = function () { console && o.logLevel > 0 && o.logLevel <= 3 && console.warn.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments))); }, o.nextId = function () { return o._nextId++; },
                            o.indexOf = function (e, t) { if (e.indexOf)
                                return e.indexOf(t); for (var n = 0; n < e.length; n++)
                                if (e[n] === t)
                                    return n; return -1; }, o.map = function (e, t) { if (e.map)
                            return e.map(t); for (var n = [], o = 0; o < e.length; o += 1)
                            n.push(t(e[o])); return n; }, o.topologicalSort = function (e) { var t = [], n = [], i = []; for (var r in e)
                            n[r] || i[r] || o._topologicalSort(r, n, i, e, t); return t; }, o._topologicalSort = function (e, t, n, i, r) { var s = i[e] || []; n[e] = !0; for (var a = 0; a < s.length; a += 1) {
                            var l = s[a];
                            n[l] || (t[l] || o._topologicalSort(l, t, n, i, r));
                        } n[e] = !1, t[e] = !0, r.push(e); }, o.chain = function () { for (var e = [], t = 0; t < arguments.length; t += 1) {
                            var n = arguments[t];
                            n._chained ? e.push.apply(e, n._chained) : e.push(n);
                        } var o = function () { for (var t, n = new Array(arguments.length), o = 0, i = arguments.length; o < i; o++)
                            n[o] = arguments[o]; for (o = 0; o < e.length; o += 1) {
                            var r = e[o].apply(t, n);
                            void 0 !== r && (t = r);
                        } return t; }; return o._chained = e, o; }, o.chainPathBefore = function (e, t, n) { return o.set(e, t, o.chain(n, o.get(e, t))); }, o.chainPathAfter = function (e, t, n) { return o.set(e, t, o.chain(o.get(e, t), n)); },
                            o._requireGlobal = function (t, o) { return ("undefined" != typeof window ? window[t] : void 0 !== n ? n[t] : null) || e(o); };
                    }();
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
            }, {}], 15: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../body/World"), r = e("./Sleeping"), s = e("../collision/Resolver"), a = e("../render/Render"), l = e("../collision/Pairs"), c = (e("./Metrics"), e("../collision/Grid")), d = e("./Events"), u = e("../body/Composite"), p = e("../constraint/Constraint"), f = e("./Common"), m = e("../body/Body");
                !function () {
                    o.create = function (e, t) {
                        t = f.isElement(e) ? t : e, e = f.isElement(e) ? e : null, t = t || {}, (e || t.render) && f.warn("Engine.create: engine.render is deprecated (see docs)");
                        var n = { positionIterations: 6, velocityIterations: 4, constraintIterations: 2, enableSleeping: !1, events: [], plugin: {}, timing: { timestamp: 0, timeScale: 1 }, broadphase: { controller: c } }, o = f.extend(n, t);
                        if (e || o.render) {
                            var r = { element: e, controller: a };
                            o.render = f.extend(r, o.render);
                        }
                        return o.render && o.render.controller && (o.render = o.render.controller.create(o.render)), o.render && (o.render.engine = o), o.world = t.world || i.create(o.world), o.pairs = l.create(), o.broadphase = o.broadphase.controller.create(o.broadphase), o.metrics = o.metrics || { extended: !1 }, o;
                    }, o.update = function (e, t, n) {
                        t = t || 1e3 / 60, n = n || 1;
                        var i, a = e.world, c = e.timing, f = e.broadphase, m = [];
                        c.timestamp += t * c.timeScale;
                        var v = { timestamp: c.timestamp };
                        d.trigger(e, "beforeUpdate", v);
                        var y = u.allBodies(a), g = u.allConstraints(a);
                        for (e.enableSleeping && r.update(y, c.timeScale), o._bodiesApplyGravity(y, a.gravity), o._bodiesUpdate(y, t, c.timeScale, n, a.bounds), p.preSolveAll(y), i = 0; i < e.constraintIterations; i++)
                            p.solveAll(g, c.timeScale);
                        p.postSolveAll(y), f.controller ? (a.isModified && f.controller.clear(f), f.controller.update(f, y, e, a.isModified), m = f.pairsList) : m = y, a.isModified && u.setModified(a, !1, !1, !0);
                        var x = f.detector(m, e), h = e.pairs, b = c.timestamp;
                        for (l.update(h, x, b), l.removeOld(h, b), e.enableSleeping && r.afterCollisions(h.list, c.timeScale),
                            h.collisionStart.length > 0 && d.trigger(e, "collisionStart", { pairs: h.collisionStart }), s.preSolvePosition(h.list), i = 0; i < e.positionIterations; i++)
                            s.solvePosition(h.list, c.timeScale);
                        for (s.postSolvePosition(y), p.preSolveAll(y), i = 0; i < e.constraintIterations; i++)
                            p.solveAll(g, c.timeScale);
                        for (p.postSolveAll(y), s.preSolveVelocity(h.list), i = 0; i < e.velocityIterations; i++)
                            s.solveVelocity(h.list, c.timeScale);
                        return h.collisionActive.length > 0 && d.trigger(e, "collisionActive", { pairs: h.collisionActive }), h.collisionEnd.length > 0 && d.trigger(e, "collisionEnd", { pairs: h.collisionEnd }), o._bodiesClearForces(y), d.trigger(e, "afterUpdate", v), e;
                    }, o.merge = function (e, t) { if (f.extend(e, t), t.world) {
                        e.world = t.world, o.clear(e);
                        for (var n = u.allBodies(e.world), i = 0; i < n.length; i++) {
                            var s = n[i];
                            r.set(s, !1), s.id = f.nextId();
                        }
                    } }, o.clear = function (e) { var t = e.world; l.clear(e.pairs); var n = e.broadphase; if (n.controller) {
                        var o = u.allBodies(t);
                        n.controller.clear(n), n.controller.update(n, o, e, !0);
                    } }, o._bodiesClearForces = function (e) {
                        for (var t = 0; t < e.length; t++) {
                            var n = e[t];
                            n.force.x = 0, n.force.y = 0, n.torque = 0;
                        }
                    }, o._bodiesApplyGravity = function (e, t) { var n = void 0 !== t.scale ? t.scale : .001; if ((0 !== t.x || 0 !== t.y) && 0 !== n)
                        for (var o = 0; o < e.length; o++) {
                            var i = e[o];
                            i.isStatic || i.isSleeping || (i.force.y += i.mass * t.y * n, i.force.x += i.mass * t.x * n);
                        } }, o._bodiesUpdate = function (e, t, n, o, i) { for (var r = 0; r < e.length; r++) {
                        var s = e[r];
                        s.isStatic || s.isSleeping || m.update(s, t, n, o);
                    } };
                }();
            }, { "../body/Body": 1, "../body/Composite": 2, "../body/World": 3, "../collision/Grid": 6, "../collision/Pairs": 8, "../collision/Resolver": 10, "../constraint/Constraint": 12, "../render/Render": 31, "./Common": 14, "./Events": 16, "./Metrics": 18, "./Sleeping": 22 }], 16: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("./Common");
                !function () {
                    o.on = function (e, t, n) { for (var o, i = t.split(" "), r = 0; r < i.length; r++)
                        o = i[r], e.events = e.events || {}, e.events[o] = e.events[o] || [], e.events[o].push(n); return n; }, o.off = function (e, t, n) {
                        if (!t)
                            return void (e.events = {});
                        "function" == typeof t && (n = t, t = i.keys(e.events).join(" "));
                        for (var o = t.split(" "), r = 0; r < o.length; r++) {
                            var s = e.events[o[r]], a = [];
                            if (n && s)
                                for (var l = 0; l < s.length; l++)
                                    s[l] !== n && a.push(s[l]);
                            e.events[o[r]] = a;
                        }
                    }, o.trigger = function (e, t, n) { var o, r, s, a; if (e.events) {
                        n || (n = {}), o = t.split(" ");
                        for (var l = 0; l < o.length; l++)
                            if (r = o[l], s = e.events[r]) {
                                a = i.clone(n, !1), a.name = r, a.source = e;
                                for (var c = 0; c < s.length; c++)
                                    s[c].apply(e, [a]);
                            }
                    } };
                }();
            }, { "./Common": 14 }], 17: [function (e, t, n) { var o = {}; t.exports = o; var i = e("./Plugin"), r = e("./Common"); !function () { o.name = "matter-js", o.version = "0.14.2", o.uses = [], o.used = [], o.use = function () { i.use(o, Array.prototype.slice.call(arguments)); }, o.before = function (e, t) { return e = e.replace(/^MatterJs./, ""), r.chainPathBefore(o, e, t); }, o.after = function (e, t) { return e = e.replace(/^MatterJs./, ""), r.chainPathAfter(o, e, t); }; }(); }, { "./Common": 14, "./Plugin": 20 }], 18: [function (e, t, n) { }, { "../body/Composite": 2, "./Common": 14 }], 19: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../core/Common");
                !function () {
                    o.create = function (e) {
                        var t = {};
                        return e || i.log("Mouse.create: element was undefined, defaulting to document.body", "warn"), t.element = e || document.body, t.absolute = { x: 0, y: 0 }, t.position = { x: 0, y: 0 }, t.mousedownPosition = { x: 0, y: 0 }, t.mouseupPosition = { x: 0, y: 0 }, t.offset = { x: 0, y: 0 }, t.scale = { x: 1, y: 1 }, t.wheelDelta = 0, t.button = -1, t.pixelRatio = t.element.getAttribute("data-pixel-ratio") || 1, t.sourceEvents = { mousemove: null, mousedown: null, mouseup: null, mousewheel: null }, t.mousemove = function (e) { var n = o._getRelativeMousePosition(e, t.element, t.pixelRatio); e.changedTouches && (t.button = 0, e.preventDefault()), t.absolute.x = n.x, t.absolute.y = n.y, t.position.x = t.absolute.x * t.scale.x + t.offset.x, t.position.y = t.absolute.y * t.scale.y + t.offset.y, t.sourceEvents.mousemove = e; }, t.mousedown = function (e) {
                            var n = o._getRelativeMousePosition(e, t.element, t.pixelRatio);
                            e.changedTouches ? (t.button = 0, e.preventDefault()) : t.button = e.button, t.absolute.x = n.x, t.absolute.y = n.y, t.position.x = t.absolute.x * t.scale.x + t.offset.x, t.position.y = t.absolute.y * t.scale.y + t.offset.y,
                                t.mousedownPosition.x = t.position.x, t.mousedownPosition.y = t.position.y, t.sourceEvents.mousedown = e;
                        }, t.mouseup = function (e) { var n = o._getRelativeMousePosition(e, t.element, t.pixelRatio); e.changedTouches && e.preventDefault(), t.button = -1, t.absolute.x = n.x, t.absolute.y = n.y, t.position.x = t.absolute.x * t.scale.x + t.offset.x, t.position.y = t.absolute.y * t.scale.y + t.offset.y, t.mouseupPosition.x = t.position.x, t.mouseupPosition.y = t.position.y, t.sourceEvents.mouseup = e; }, t.mousewheel = function (e) { t.wheelDelta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)), e.preventDefault(); }, o.setElement(t, t.element), t;
                    }, o.setElement = function (e, t) { e.element = t, t.addEventListener("mousemove", e.mousemove), t.addEventListener("mousedown", e.mousedown), t.addEventListener("mouseup", e.mouseup), t.addEventListener("mousewheel", e.mousewheel), t.addEventListener("DOMMouseScroll", e.mousewheel), t.addEventListener("touchmove", e.mousemove), t.addEventListener("touchstart", e.mousedown), t.addEventListener("touchend", e.mouseup); },
                        o.clearSourceEvents = function (e) { e.sourceEvents.mousemove = null, e.sourceEvents.mousedown = null, e.sourceEvents.mouseup = null, e.sourceEvents.mousewheel = null, e.wheelDelta = 0; }, o.setOffset = function (e, t) { e.offset.x = t.x, e.offset.y = t.y, e.position.x = e.absolute.x * e.scale.x + e.offset.x, e.position.y = e.absolute.y * e.scale.y + e.offset.y; }, o.setScale = function (e, t) { e.scale.x = t.x, e.scale.y = t.y, e.position.x = e.absolute.x * e.scale.x + e.offset.x, e.position.y = e.absolute.y * e.scale.y + e.offset.y; }, o._getRelativeMousePosition = function (e, t, n) { var o, i, r = t.getBoundingClientRect(), s = document.documentElement || document.body.parentNode || document.body, a = void 0 !== window.pageXOffset ? window.pageXOffset : s.scrollLeft, l = void 0 !== window.pageYOffset ? window.pageYOffset : s.scrollTop, c = e.changedTouches; return c ? (o = c[0].pageX - r.left - a, i = c[0].pageY - r.top - l) : (o = e.pageX - r.left - a, i = e.pageY - r.top - l), { x: o / (t.clientWidth / (t.width || t.clientWidth) * n), y: i / (t.clientHeight / (t.height || t.clientHeight) * n) }; };
                }();
            }, { "../core/Common": 14 }], 20: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("./Common");
                !function () {
                    o._registry = {}, o.register = function (e) { if (o.isPlugin(e) || i.warn("Plugin.register:", o.toString(e), "does not implement all required fields."), e.name in o._registry) {
                        var t = o._registry[e.name], n = o.versionParse(e.version).number, r = o.versionParse(t.version).number;
                        n > r ? (i.warn("Plugin.register:", o.toString(t), "was upgraded to", o.toString(e)), o._registry[e.name] = e) : n < r ? i.warn("Plugin.register:", o.toString(t), "can not be downgraded to", o.toString(e)) : e !== t && i.warn("Plugin.register:", o.toString(e), "is already registered to different plugin object");
                    }
                    else
                        o._registry[e.name] = e; return e; }, o.resolve = function (e) { return o._registry[o.dependencyParse(e).name]; }, o.toString = function (e) { return "string" == typeof e ? e : (e.name || "anonymous") + "@" + (e.version || e.range || "0.0.0"); }, o.isPlugin = function (e) { return e && e.name && e.version && e.install; }, o.isUsed = function (e, t) { return e.used.indexOf(t) > -1; }, o.isFor = function (e, t) {
                        var n = e.for && o.dependencyParse(e.for);
                        return !e.for || t.name === n.name && o.versionSatisfies(t.version, n.range);
                    }, o.use = function (e, t) { if (e.uses = (e.uses || []).concat(t || []), 0 === e.uses.length)
                        return void i.warn("Plugin.use:", o.toString(e), "does not specify any dependencies to install."); for (var n = o.dependencies(e), r = i.topologicalSort(n), s = [], a = 0; a < r.length; a += 1)
                        if (r[a] !== e.name) {
                            var l = o.resolve(r[a]);
                            l ? o.isUsed(e, l.name) || (o.isFor(l, e) || (i.warn("Plugin.use:", o.toString(l), "is for", l.for, "but installed on", o.toString(e) + "."), l._warned = !0), l.install ? l.install(e) : (i.warn("Plugin.use:", o.toString(l), "does not specify an install function."), l._warned = !0), l._warned ? (s.push("🔶 " + o.toString(l)), delete l._warned) : s.push("✅ " + o.toString(l)), e.used.push(l.name)) : s.push("❌ " + r[a]);
                        } s.length > 0 && i.info(s.join("  ")); }, o.dependencies = function (e, t) {
                        var n = o.dependencyParse(e), r = n.name;
                        if (t = t || {}, !(r in t)) {
                            e = o.resolve(e) || e, t[r] = i.map(e.uses || [], function (t) {
                                o.isPlugin(t) && o.register(t);
                                var r = o.dependencyParse(t), s = o.resolve(t);
                                return s && !o.versionSatisfies(s.version, r.range) ? (i.warn("Plugin.dependencies:", o.toString(s), "does not satisfy", o.toString(r), "used by", o.toString(n) + "."), s._warned = !0, e._warned = !0) : s || (i.warn("Plugin.dependencies:", o.toString(t), "used by", o.toString(n), "could not be resolved."), e._warned = !0), r.name;
                            });
                            for (var s = 0; s < t[r].length; s += 1)
                                o.dependencies(t[r][s], t);
                            return t;
                        }
                    }, o.dependencyParse = function (e) { if (i.isString(e)) {
                        return /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/.test(e) || i.warn("Plugin.dependencyParse:", e, "is not a valid dependency string."), { name: e.split("@")[0], range: e.split("@")[1] || "*" };
                    } return { name: e.name, range: e.range || e.version }; }, o.versionParse = function (e) {
                        /^\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?$/.test(e) || i.warn("Plugin.versionParse:", e, "is not a valid version or range.");
                        var t = e.split("-");
                        e = t[0];
                        var n = isNaN(Number(e[0])), o = n ? e.substr(1) : e, r = i.map(o.split("."), function (e) { return Number(e); });
                        return { isRange: n, version: o, range: e, operator: n ? e[0] : "", parts: r,
                            prerelease: t[1], number: 1e8 * r[0] + 1e4 * r[1] + r[2] };
                    }, o.versionSatisfies = function (e, t) { t = t || "*"; var n = o.versionParse(t), i = n.parts, r = o.versionParse(e), s = r.parts; if (n.isRange) {
                        if ("*" === n.operator || "*" === e)
                            return !0;
                        if ("~" === n.operator)
                            return s[0] === i[0] && s[1] === i[1] && s[2] >= i[2];
                        if ("^" === n.operator)
                            return i[0] > 0 ? s[0] === i[0] && r.number >= n.number : i[1] > 0 ? s[1] === i[1] && s[2] >= i[2] : s[2] === i[2];
                    } return e === t || "*" === e; };
                }();
            }, { "./Common": 14 }], 21: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("./Events"), r = e("./Engine"), s = e("./Common");
                !function () {
                    var e, t;
                    if ("undefined" != typeof window && (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame), !e) {
                        var n;
                        e = function (e) { n = setTimeout(function () { e(s.now()); }, 1e3 / 60); }, t = function () { clearTimeout(n); };
                    }
                    o.create = function (e) {
                        var t = { fps: 60, correction: 1, deltaSampleSize: 60,
                            counterTimestamp: 0, frameCounter: 0, deltaHistory: [], timePrev: null, timeScalePrev: 1, frameRequestId: null, isFixed: !1, enabled: !0 }, n = s.extend(t, e);
                        return n.delta = n.delta || 1e3 / n.fps, n.deltaMin = n.deltaMin || 1e3 / n.fps, n.deltaMax = n.deltaMax || 1e3 / (.5 * n.fps), n.fps = 1e3 / n.delta, n;
                    }, o.run = function (t, n) { return void 0 !== t.positionIterations && (n = t, t = o.create()), function i(r) { t.frameRequestId = e(i), r && t.enabled && o.tick(t, n, r); }(), t; }, o.tick = function (e, t, n) {
                        var o, s = t.timing, a = 1, l = { timestamp: s.timestamp };
                        i.trigger(e, "beforeTick", l), i.trigger(t, "beforeTick", l), e.isFixed ? o = e.delta : (o = n - e.timePrev || e.delta, e.timePrev = n, e.deltaHistory.push(o), e.deltaHistory = e.deltaHistory.slice(-e.deltaSampleSize), o = Math.min.apply(null, e.deltaHistory), o = o < e.deltaMin ? e.deltaMin : o, o = o > e.deltaMax ? e.deltaMax : o, a = o / e.delta, e.delta = o), 0 !== e.timeScalePrev && (a *= s.timeScale / e.timeScalePrev), 0 === s.timeScale && (a = 0), e.timeScalePrev = s.timeScale, e.correction = a, e.frameCounter += 1,
                            n - e.counterTimestamp >= 1e3 && (e.fps = e.frameCounter * ((n - e.counterTimestamp) / 1e3), e.counterTimestamp = n, e.frameCounter = 0), i.trigger(e, "tick", l), i.trigger(t, "tick", l), t.world.isModified && t.render && t.render.controller && t.render.controller.clear && t.render.controller.clear(t.render), i.trigger(e, "beforeUpdate", l), r.update(t, o, a), i.trigger(e, "afterUpdate", l), t.render && t.render.controller && (i.trigger(e, "beforeRender", l), i.trigger(t, "beforeRender", l), t.render.controller.world(t.render), i.trigger(e, "afterRender", l), i.trigger(t, "afterRender", l)), i.trigger(e, "afterTick", l), i.trigger(t, "afterTick", l);
                    }, o.stop = function (e) { t(e.frameRequestId); }, o.start = function (e, t) { o.run(e, t); };
                }();
            }, { "./Common": 14, "./Engine": 15, "./Events": 16 }], 22: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("./Events");
                !function () {
                    o._motionWakeThreshold = .18, o._motionSleepThreshold = .08, o._minBias = .9, o.update = function (e, t) {
                        for (var n = t * t * t, i = 0; i < e.length; i++) {
                            var r = e[i], s = r.speed * r.speed + r.angularSpeed * r.angularSpeed;
                            if (0 === r.force.x && 0 === r.force.y) {
                                var a = Math.min(r.motion, s), l = Math.max(r.motion, s);
                                r.motion = o._minBias * a + (1 - o._minBias) * l, r.sleepThreshold > 0 && r.motion < o._motionSleepThreshold * n ? (r.sleepCounter += 1, r.sleepCounter >= r.sleepThreshold && o.set(r, !0)) : r.sleepCounter > 0 && (r.sleepCounter -= 1);
                            }
                            else
                                o.set(r, !1);
                        }
                    }, o.afterCollisions = function (e, t) { for (var n = t * t * t, i = 0; i < e.length; i++) {
                        var r = e[i];
                        if (r.isActive) {
                            var s = r.collision, a = s.bodyA.parent, l = s.bodyB.parent;
                            if (!(a.isSleeping && l.isSleeping || a.isStatic || l.isStatic) && (a.isSleeping || l.isSleeping)) {
                                var c = a.isSleeping && !a.isStatic ? a : l, d = c === a ? l : a;
                                !c.isStatic && d.motion > o._motionWakeThreshold * n && o.set(c, !1);
                            }
                        }
                    } }, o.set = function (e, t) { var n = e.isSleeping; t ? (e.isSleeping = !0, e.sleepCounter = e.sleepThreshold, e.positionImpulse.x = 0, e.positionImpulse.y = 0, e.positionPrev.x = e.position.x, e.positionPrev.y = e.position.y, e.anglePrev = e.angle, e.speed = 0, e.angularSpeed = 0, e.motion = 0, n || i.trigger(e, "sleepStart")) : (e.isSleeping = !1, e.sleepCounter = 0, n && i.trigger(e, "sleepEnd")); };
                }();
            }, {
                "./Events": 16
            }], 23: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i, r = e("../geometry/Vertices"), s = e("../core/Common"), a = e("../body/Body"), l = e("../geometry/Bounds"), c = e("../geometry/Vector");
                !function () {
                    o.rectangle = function (e, t, n, o, i) { i = i || {}; var l = { label: "Rectangle Body", position: { x: e, y: t }, vertices: r.fromPath("L 0 0 L " + n + " 0 L " + n + " " + o + " L 0 " + o) }; if (i.chamfer) {
                        var c = i.chamfer;
                        l.vertices = r.chamfer(l.vertices, c.radius, c.quality, c.qualityMin, c.qualityMax), delete i.chamfer;
                    } return a.create(s.extend({}, l, i)); }, o.trapezoid = function (e, t, n, o, i, l) { l = l || {}, i *= .5; var c, d = (1 - 2 * i) * n, u = n * i, p = u + d, f = p + u; c = i < .5 ? "L 0 0 L " + u + " " + -o + " L " + p + " " + -o + " L " + f + " 0" : "L 0 0 L " + p + " " + -o + " L " + f + " 0"; var m = { label: "Trapezoid Body", position: { x: e, y: t }, vertices: r.fromPath(c) }; if (l.chamfer) {
                        var v = l.chamfer;
                        m.vertices = r.chamfer(m.vertices, v.radius, v.quality, v.qualityMin, v.qualityMax), delete l.chamfer;
                    } return a.create(s.extend({}, m, l)); }, o.circle = function (e, t, n, i, r) {
                        i = i || {};
                        var a = { label: "Circle Body", circleRadius: n };
                        r = r || 25;
                        var l = Math.ceil(Math.max(10, Math.min(r, n)));
                        return l % 2 == 1 && (l += 1), o.polygon(e, t, l, n, s.extend({}, a, i));
                    }, o.polygon = function (e, t, n, i, l) { if (l = l || {}, n < 3)
                        return o.circle(e, t, i, l); for (var c = 2 * Math.PI / n, d = "", u = .5 * c, p = 0; p < n; p += 1) {
                        var f = u + p * c, m = Math.cos(f) * i, v = Math.sin(f) * i;
                        d += "L " + m.toFixed(3) + " " + v.toFixed(3) + " ";
                    } var y = { label: "Polygon Body", position: { x: e, y: t }, vertices: r.fromPath(d) }; if (l.chamfer) {
                        var g = l.chamfer;
                        y.vertices = r.chamfer(y.vertices, g.radius, g.quality, g.qualityMin, g.qualityMax), delete l.chamfer;
                    } return a.create(s.extend({}, y, l)); }, o.fromVertices = function (e, t, n, o, d, u, p) {
                        i || (i = s._requireGlobal("decomp", "poly-decomp"));
                        var f, m, v, y, g, x, h, b, w;
                        for (o = o || {}, m = [], d = void 0 !== d && d, u = void 0 !== u ? u : .01, p = void 0 !== p ? p : 10, i || s.warn("Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull."), s.isArray(n[0]) || (n = [n]), b = 0; b < n.length; b += 1)
                            if (y = n[b], (v = r.isConvex(y)) || !i)
                                y = v ? r.clockwiseSort(y) : r.hull(y), m.push({ position: { x: e, y: t }, vertices: y });
                            else {
                                var S = y.map(function (e) { return [e.x, e.y]; });
                                i.makeCCW(S), !1 !== u && i.removeCollinearPoints(S, u);
                                var C = i.quickDecomp(S);
                                for (g = 0; g < C.length; g++) {
                                    var A = C[g], P = A.map(function (e) { return { x: e[0], y: e[1] }; });
                                    p > 0 && r.area(P) < p || m.push({ position: r.centre(P), vertices: P });
                                }
                            }
                        for (g = 0; g < m.length; g++)
                            m[g] = a.create(s.extend(m[g], o));
                        if (d) {
                            for (g = 0; g < m.length; g++) {
                                var B = m[g];
                                for (x = g + 1; x < m.length; x++) {
                                    var M = m[x];
                                    if (l.overlaps(B.bounds, M.bounds)) {
                                        var k = B.vertices, I = M.vertices;
                                        for (h = 0; h < B.vertices.length; h++)
                                            for (w = 0; w < M.vertices.length; w++) {
                                                var _ = c.magnitudeSquared(c.sub(k[(h + 1) % k.length], I[w])), T = c.magnitudeSquared(c.sub(k[h], I[(w + 1) % I.length]));
                                                _ < 5 && T < 5 && (k[h].isInternal = !0, I[w].isInternal = !0);
                                            }
                                    }
                                }
                            }
                        }
                        return m.length > 1 ? (f = a.create(s.extend({ parts: m.slice(0) }, o)), a.setPosition(f, { x: e, y: t }), f) : m[0];
                    };
                }();
            }, { "../body/Body": 1, "../core/Common": 14, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29 }], 24: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../body/Composite"), r = e("../constraint/Constraint"), s = e("../core/Common"), a = e("../body/Body"), l = e("./Bodies");
                !function () {
                    o.stack = function (e, t, n, o, r, s, l) { for (var c, d = i.create({ label: "Stack" }), u = e, p = t, f = 0, m = 0; m < o; m++) {
                        for (var v = 0, y = 0; y < n; y++) {
                            var g = l(u, p, y, m, c, f);
                            if (g) {
                                var x = g.bounds.max.y - g.bounds.min.y, h = g.bounds.max.x - g.bounds.min.x;
                                x > v && (v = x), a.translate(g, { x: .5 * h, y: .5 * x }), u = g.bounds.max.x + r, i.addBody(d, g), c = g, f += 1;
                            }
                            else
                                u += r;
                        }
                        p += v + s, u = e;
                    } return d; }, o.chain = function (e, t, n, o, a, l) { for (var c = e.bodies, d = 1; d < c.length; d++) {
                        var u = c[d - 1], p = c[d], f = u.bounds.max.y - u.bounds.min.y, m = u.bounds.max.x - u.bounds.min.x, v = p.bounds.max.y - p.bounds.min.y, y = p.bounds.max.x - p.bounds.min.x, g = { bodyA: u, pointA: { x: m * t, y: f * n }, bodyB: p, pointB: { x: y * o, y: v * a } }, x = s.extend(g, l);
                        i.addConstraint(e, r.create(x));
                    } return e.label += " Chain", e; }, o.mesh = function (e, t, n, o, a) {
                        var l, c, d, u, p, f = e.bodies;
                        for (l = 0; l < n; l++) {
                            for (c = 1; c < t; c++)
                                d = f[c - 1 + l * t], u = f[c + l * t], i.addConstraint(e, r.create(s.extend({ bodyA: d, bodyB: u }, a)));
                            if (l > 0)
                                for (c = 0; c < t; c++)
                                    d = f[c + (l - 1) * t], u = f[c + l * t], i.addConstraint(e, r.create(s.extend({ bodyA: d, bodyB: u }, a))), o && c > 0 && (p = f[c - 1 + (l - 1) * t], i.addConstraint(e, r.create(s.extend({ bodyA: p, bodyB: u }, a)))), o && c < t - 1 && (p = f[c + 1 + (l - 1) * t], i.addConstraint(e, r.create(s.extend({ bodyA: p, bodyB: u }, a))));
                        }
                        return e.label += " Mesh", e;
                    }, o.pyramid = function (e, t, n, i, r, s, l) { return o.stack(e, t, n, i, r, s, function (t, o, s, c, d, u) { var p = Math.min(i, Math.ceil(n / 2)), f = d ? d.bounds.max.x - d.bounds.min.x : 0; if (!(c > p)) {
                        c = p - c;
                        var m = c, v = n - 1 - c;
                        if (!(s < m || s > v)) {
                            1 === u && a.translate(d, { x: (s + (n % 2 == 1 ? 1 : -1)) * f, y: 0 });
                            return l(e + (d ? s * f : 0) + s * r, o, s, c, d, u);
                        }
                    } }); }, o.newtonsCradle = function (e, t, n, o, s) { for (var a = i.create({ label: "Newtons Cradle" }), c = 0; c < n; c++) {
                        var d = l.circle(e + c * (1.9 * o), t + s, o, { inertia: 1 / 0, restitution: 1, friction: 0, frictionAir: 1e-4, slop: 1 }), u = r.create({ pointA: { x: e + c * (1.9 * o), y: t }, bodyB: d });
                        i.addBody(a, d), i.addConstraint(a, u);
                    } return a; }, o.car = function (e, t, n, o, s) {
                        var c = a.nextGroup(!0), d = .5 * -n + 20, u = .5 * n - 20, p = i.create({ label: "Car"
                        }), f = l.rectangle(e, t, n, o, { collisionFilter: { group: c }, chamfer: { radius: .5 * o }, density: 2e-4 }), m = l.circle(e + d, t + 0, s, { collisionFilter: { group: c }, friction: .8 }), v = l.circle(e + u, t + 0, s, { collisionFilter: { group: c }, friction: .8 }), y = r.create({ bodyB: f, pointB: { x: d, y: 0 }, bodyA: m, stiffness: 1, length: 0 }), g = r.create({ bodyB: f, pointB: { x: u, y: 0 }, bodyA: v, stiffness: 1, length: 0 });
                        return i.addBody(p, f), i.addBody(p, m), i.addBody(p, v), i.addConstraint(p, y), i.addConstraint(p, g), p;
                    }, o.softBody = function (e, t, n, i, r, a, c, d, u, p) { u = s.extend({ inertia: 1 / 0 }, u), p = s.extend({ stiffness: .2, render: { type: "line", anchors: !1 } }, p); var f = o.stack(e, t, n, i, r, a, function (e, t) { return l.circle(e, t, d, u); }); return o.mesh(f, n, i, c, p), f.label = "Soft Body", f; };
                }();
            }, { "../body/Body": 1, "../body/Composite": 2, "../constraint/Constraint": 12, "../core/Common": 14, "./Bodies": 23 }], 25: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../geometry/Vector"), r = e("../core/Common");
                !function () {
                    o.fromVertices = function (e) {
                        for (var t = {}, n = 0; n < e.length; n++) {
                            var o = (n + 1) % e.length, s = i.normalise({ x: e[o].y - e[n].y, y: e[n].x - e[o].x }), a = 0 === s.y ? 1 / 0 : s.x / s.y;
                            a = a.toFixed(3).toString(), t[a] = s;
                        }
                        return r.values(t);
                    }, o.rotate = function (e, t) { if (0 !== t)
                        for (var n = Math.cos(t), o = Math.sin(t), i = 0; i < e.length; i++) {
                            var r, s = e[i];
                            r = s.x * n - s.y * o, s.y = s.x * o + s.y * n, s.x = r;
                        } };
                }();
            }, { "../core/Common": 14, "../geometry/Vector": 28 }], 26: [function (e, t, n) {
                var o = {};
                t.exports = o, function () {
                    o.create = function (e) { var t = { min: { x: 0, y: 0 }, max: { x: 0, y: 0 } }; return e && o.update(t, e), t; }, o.update = function (e, t, n) { e.min.x = 1 / 0, e.max.x = -1 / 0, e.min.y = 1 / 0, e.max.y = -1 / 0; for (var o = 0; o < t.length; o++) {
                        var i = t[o];
                        i.x > e.max.x && (e.max.x = i.x), i.x < e.min.x && (e.min.x = i.x), i.y > e.max.y && (e.max.y = i.y), i.y < e.min.y && (e.min.y = i.y);
                    } n && (n.x > 0 ? e.max.x += n.x : e.min.x += n.x, n.y > 0 ? e.max.y += n.y : e.min.y += n.y); }, o.contains = function (e, t) { return t.x >= e.min.x && t.x <= e.max.x && t.y >= e.min.y && t.y <= e.max.y; }, o.overlaps = function (e, t) { return e.min.x <= t.max.x && e.max.x >= t.min.x && e.max.y >= t.min.y && e.min.y <= t.max.y; }, o.translate = function (e, t) {
                        e.min.x += t.x,
                            e.max.x += t.x, e.min.y += t.y, e.max.y += t.y;
                    }, o.shift = function (e, t) { var n = e.max.x - e.min.x, o = e.max.y - e.min.y; e.min.x = t.x, e.max.x = t.x + n, e.min.y = t.y, e.max.y = t.y + o; };
                }();
            }, {}], 27: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = (e("../geometry/Bounds"), e("../core/Common"));
                !function () {
                    o.pathToVertices = function (e, t) {
                        "undefined" == typeof window || "SVGPathSeg" in window || i.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");
                        var n, r, s, a, l, c, d, u, p, f, m, v, y = [], g = 0, x = 0, h = 0;
                        t = t || 15;
                        var b = function (e, t, n) { var o = n % 2 == 1 && n > 1; if (!p || e != p.x || t != p.y) {
                            p && o ? (m = p.x, v = p.y) : (m = 0, v = 0);
                            var i = { x: m + e, y: v + t };
                            !o && p || (p = i), y.push(i), x = m + e, h = v + t;
                        } }, w = function (e) { var t = e.pathSegTypeAsLetter.toUpperCase(); if ("Z" !== t) {
                            switch (t) {
                                case "M":
                                case "L":
                                case "T":
                                case "C":
                                case "S":
                                case "Q":
                                    x = e.x, h = e.y;
                                    break;
                                case "H":
                                    x = e.x;
                                    break;
                                case "V": h = e.y;
                            }
                            b(x, h, e.pathSegType);
                        } };
                        for (o._svgPathToAbsolute(e), s = e.getTotalLength(), c = [], n = 0; n < e.pathSegList.numberOfItems; n += 1)
                            c.push(e.pathSegList.getItem(n));
                        for (d = c.concat(); g < s;) {
                            if (f = e.getPathSegAtLength(g), (l = c[f]) != u) {
                                for (; d.length && d[0] != l;)
                                    w(d.shift());
                                u = l;
                            }
                            switch (l.pathSegTypeAsLetter.toUpperCase()) {
                                case "C":
                                case "T":
                                case "S":
                                case "Q":
                                case "A": a = e.getPointAtLength(g), b(a.x, a.y, 0);
                            }
                            g += t;
                        }
                        for (n = 0, r = d.length; n < r; ++n)
                            w(d[n]);
                        return y;
                    }, o._svgPathToAbsolute = function (e) {
                        for (var t, n, o, i, r, s, a = e.pathSegList, l = 0, c = 0, d = a.numberOfItems, u = 0; u < d; ++u) {
                            var p = a.getItem(u), f = p.pathSegTypeAsLetter;
                            if (/[MLHVCSQTA]/.test(f))
                                "x" in p && (l = p.x), "y" in p && (c = p.y);
                            else
                                switch ("x1" in p && (o = l + p.x1), "x2" in p && (r = l + p.x2), "y1" in p && (i = c + p.y1), "y2" in p && (s = c + p.y2), "x" in p && (l += p.x), "y" in p && (c += p.y), f) {
                                    case "m":
                                        a.replaceItem(e.createSVGPathSegMovetoAbs(l, c), u);
                                        break;
                                    case "l":
                                        a.replaceItem(e.createSVGPathSegLinetoAbs(l, c), u);
                                        break;
                                    case "h":
                                        a.replaceItem(e.createSVGPathSegLinetoHorizontalAbs(l), u);
                                        break;
                                    case "v":
                                        a.replaceItem(e.createSVGPathSegLinetoVerticalAbs(c), u);
                                        break;
                                    case "c":
                                        a.replaceItem(e.createSVGPathSegCurvetoCubicAbs(l, c, o, i, r, s), u);
                                        break;
                                    case "s":
                                        a.replaceItem(e.createSVGPathSegCurvetoCubicSmoothAbs(l, c, r, s), u);
                                        break;
                                    case "q":
                                        a.replaceItem(e.createSVGPathSegCurvetoQuadraticAbs(l, c, o, i), u);
                                        break;
                                    case "t":
                                        a.replaceItem(e.createSVGPathSegCurvetoQuadraticSmoothAbs(l, c), u);
                                        break;
                                    case "a":
                                        a.replaceItem(e.createSVGPathSegArcAbs(l, c, p.r1, p.r2, p.angle, p.largeArcFlag, p.sweepFlag), u);
                                        break;
                                    case "z":
                                    case "Z": l = t, c = n;
                                }
                            "M" != f && "m" != f || (t = l, n = c);
                        }
                    };
                }();
            }, { "../core/Common": 14, "../geometry/Bounds": 26 }], 28: [function (e, t, n) {
                var o = {};
                t.exports = o, function () {
                    o.create = function (e, t) { return { x: e || 0, y: t || 0 }; }, o.clone = function (e) { return { x: e.x, y: e.y }; }, o.magnitude = function (e) { return Math.sqrt(e.x * e.x + e.y * e.y); }, o.magnitudeSquared = function (e) { return e.x * e.x + e.y * e.y; }, o.rotate = function (e, t, n) { var o = Math.cos(t), i = Math.sin(t); n || (n = {}); var r = e.x * o - e.y * i; return n.y = e.x * i + e.y * o, n.x = r, n; }, o.rotateAbout = function (e, t, n, o) { var i = Math.cos(t), r = Math.sin(t); o || (o = {}); var s = n.x + ((e.x - n.x) * i - (e.y - n.y) * r); return o.y = n.y + ((e.x - n.x) * r + (e.y - n.y) * i), o.x = s, o; }, o.normalise = function (e) {
                        var t = o.magnitude(e);
                        return 0 === t ? { x: 0, y: 0 } : { x: e.x / t, y: e.y / t };
                    }, o.dot = function (e, t) { return e.x * t.x + e.y * t.y; }, o.cross = function (e, t) { return e.x * t.y - e.y * t.x; }, o.cross3 = function (e, t, n) { return (t.x - e.x) * (n.y - e.y) - (t.y - e.y) * (n.x - e.x); }, o.add = function (e, t, n) { return n || (n = {}), n.x = e.x + t.x, n.y = e.y + t.y, n; }, o.sub = function (e, t, n) { return n || (n = {}), n.x = e.x - t.x, n.y = e.y - t.y, n; }, o.mult = function (e, t) { return { x: e.x * t, y: e.y * t }; }, o.div = function (e, t) { return { x: e.x / t, y: e.y / t }; }, o.perp = function (e, t) { return t = !0 === t ? -1 : 1, { x: t * -e.y, y: t * e.x }; }, o.neg = function (e) { return { x: -e.x, y: -e.y }; }, o.angle = function (e, t) { return Math.atan2(t.y - e.y, t.x - e.x); }, o._temp = [o.create(), o.create(), o.create(), o.create(), o.create(), o.create()];
                }();
            }, {}], 29: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../geometry/Vector"), r = e("../core/Common");
                !function () {
                    o.create = function (e, t) { for (var n = [], o = 0; o < e.length; o++) {
                        var i = e[o], r = { x: i.x, y: i.y, index: o, body: t, isInternal: !1 };
                        n.push(r);
                    } return n; }, o.fromPath = function (e, t) {
                        var n = /L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/gi, i = [];
                        return e.replace(n, function (e, t, n) { i.push({ x: parseFloat(t), y: parseFloat(n) }); }), o.create(i, t);
                    }, o.centre = function (e) { for (var t, n, r, s = o.area(e, !0), a = { x: 0, y: 0 }, l = 0; l < e.length; l++)
                        r = (l + 1) % e.length, t = i.cross(e[l], e[r]), n = i.mult(i.add(e[l], e[r]), t), a = i.add(a, n); return i.div(a, 6 * s); }, o.mean = function (e) { for (var t = { x: 0, y: 0 }, n = 0; n < e.length; n++)
                        t.x += e[n].x, t.y += e[n].y; return i.div(t, e.length); }, o.area = function (e, t) { for (var n = 0, o = e.length - 1, i = 0; i < e.length; i++)
                        n += (e[o].x - e[i].x) * (e[o].y + e[i].y), o = i; return t ? n / 2 : Math.abs(n) / 2; }, o.inertia = function (e, t) { for (var n, o, r = 0, s = 0, a = e, l = 0; l < a.length; l++)
                        o = (l + 1) % a.length, n = Math.abs(i.cross(a[o], a[l])), r += n * (i.dot(a[o], a[o]) + i.dot(a[o], a[l]) + i.dot(a[l], a[l])), s += n; return t / 6 * (r / s); }, o.translate = function (e, t, n) { var o; if (n)
                        for (o = 0; o < e.length; o++)
                            e[o].x += t.x * n, e[o].y += t.y * n;
                    else
                        for (o = 0; o < e.length; o++)
                            e[o].x += t.x, e[o].y += t.y; return e; }, o.rotate = function (e, t, n) {
                        if (0 !== t) {
                            for (var o = Math.cos(t), i = Math.sin(t), r = 0; r < e.length; r++) {
                                var s = e[r], a = s.x - n.x, l = s.y - n.y;
                                s.x = n.x + (a * o - l * i), s.y = n.y + (a * i + l * o);
                            }
                            return e;
                        }
                    }, o.contains = function (e, t) { for (var n = 0; n < e.length; n++) {
                        var o = e[n], i = e[(n + 1) % e.length];
                        if ((t.x - o.x) * (i.y - o.y) + (t.y - o.y) * (o.x - i.x) > 0)
                            return !1;
                    } return !0; }, o.scale = function (e, t, n, r) { if (1 === t && 1 === n)
                        return e; r = r || o.centre(e); for (var s, a, l = 0; l < e.length; l++)
                        s = e[l], a = i.sub(s, r), e[l].x = r.x + a.x * t, e[l].y = r.y + a.y * n; return e; }, o.chamfer = function (e, t, n, o, s) {
                        t = "number" == typeof t ? [t] : t || [8], n = void 0 !== n ? n : -1, o = o || 2, s = s || 14;
                        for (var a = [], l = 0; l < e.length; l++) {
                            var c = e[l - 1 >= 0 ? l - 1 : e.length - 1], d = e[l], u = e[(l + 1) % e.length], p = t[l < t.length ? l : t.length - 1];
                            if (0 !== p) {
                                var f = i.normalise({ x: d.y - c.y, y: c.x - d.x }), m = i.normalise({ x: u.y - d.y, y: d.x - u.x }), v = Math.sqrt(2 * Math.pow(p, 2)), y = i.mult(r.clone(f), p), g = i.normalise(i.mult(i.add(f, m), .5)), x = i.sub(d, i.mult(g, v)), h = n;
                                -1 === n && (h = 1.75 * Math.pow(p, .32)), h = r.clamp(h, o, s), h % 2 == 1 && (h += 1);
                                for (var b = Math.acos(i.dot(f, m)), w = b / h, S = 0; S < h; S++)
                                    a.push(i.add(i.rotate(y, w * S), x));
                            }
                            else
                                a.push(d);
                        }
                        return a;
                    }, o.clockwiseSort = function (e) { var t = o.mean(e); return e.sort(function (e, n) { return i.angle(t, e) - i.angle(t, n); }), e; }, o.isConvex = function (e) { var t, n, o, i, r = 0, s = e.length; if (s < 3)
                        return null; for (t = 0; t < s; t++)
                        if (n = (t + 1) % s, o = (t + 2) % s, i = (e[n].x - e[t].x) * (e[o].y - e[n].y), i -= (e[n].y - e[t].y) * (e[o].x - e[n].x), i < 0 ? r |= 1 : i > 0 && (r |= 2), 3 === r)
                            return !1; return 0 !== r || null; }, o.hull = function (e) { var t, n, o = [], r = []; for (e = e.slice(0), e.sort(function (e, t) { var n = e.x - t.x; return 0 !== n ? n : e.y - t.y; }), n = 0; n < e.length; n += 1) {
                        for (t = e[n]; r.length >= 2 && i.cross3(r[r.length - 2], r[r.length - 1], t) <= 0;)
                            r.pop();
                        r.push(t);
                    } for (n = e.length - 1; n >= 0; n -= 1) {
                        for (t = e[n]; o.length >= 2 && i.cross3(o[o.length - 2], o[o.length - 1], t) <= 0;)
                            o.pop();
                        o.push(t);
                    } return o.pop(), r.pop(), o.concat(r); };
                }();
            }, { "../core/Common": 14, "../geometry/Vector": 28 }], 30: [function (e, t, n) {
                var o = t.exports = e("../core/MatterJs");
                o.Body = e("../body/Body"), o.Composite = e("../body/Composite"),
                    o.World = e("../body/World"), o.Contact = e("../collision/Contact"), o.Detector = e("../collision/Detector"), o.Grid = e("../collision/Grid"), o.Pairs = e("../collision/Pairs"), o.Pair = e("../collision/Pair"), o.Query = e("../collision/Query"), o.Resolver = e("../collision/Resolver"), o.SAT = e("../collision/SAT"), o.Constraint = e("../constraint/Constraint"), o.MouseConstraint = e("../constraint/MouseConstraint"), o.Common = e("../core/Common"), o.Engine = e("../core/Engine"), o.Events = e("../core/Events"), o.Mouse = e("../core/Mouse"), o.Runner = e("../core/Runner"), o.Sleeping = e("../core/Sleeping"), o.Plugin = e("../core/Plugin"), o.Bodies = e("../factory/Bodies"), o.Composites = e("../factory/Composites"), o.Axes = e("../geometry/Axes"), o.Bounds = e("../geometry/Bounds"), o.Svg = e("../geometry/Svg"), o.Vector = e("../geometry/Vector"), o.Vertices = e("../geometry/Vertices"), o.Render = e("../render/Render"), o.RenderPixi = e("../render/RenderPixi"), o.World.add = o.Composite.add, o.World.remove = o.Composite.remove,
                    o.World.addComposite = o.Composite.addComposite, o.World.addBody = o.Composite.addBody, o.World.addConstraint = o.Composite.addConstraint, o.World.clear = o.Composite.clear, o.Engine.run = o.Runner.run;
            }, { "../body/Body": 1, "../body/Composite": 2, "../body/World": 3, "../collision/Contact": 4, "../collision/Detector": 5, "../collision/Grid": 6, "../collision/Pair": 7, "../collision/Pairs": 8, "../collision/Query": 9, "../collision/Resolver": 10, "../collision/SAT": 11, "../constraint/Constraint": 12, "../constraint/MouseConstraint": 13, "../core/Common": 14, "../core/Engine": 15, "../core/Events": 16, "../core/MatterJs": 17, "../core/Metrics": 18, "../core/Mouse": 19, "../core/Plugin": 20, "../core/Runner": 21, "../core/Sleeping": 22, "../factory/Bodies": 23, "../factory/Composites": 24, "../geometry/Axes": 25, "../geometry/Bounds": 26, "../geometry/Svg": 27, "../geometry/Vector": 28, "../geometry/Vertices": 29, "../render/Render": 31, "../render/RenderPixi": 32 }], 31: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../core/Common"), r = e("../body/Composite"), s = e("../geometry/Bounds"), a = e("../core/Events"), l = e("../collision/Grid"), c = e("../geometry/Vector"), d = e("../core/Mouse");
                !function () {
                    var e, t;
                    "undefined" != typeof window && (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (e) { window.setTimeout(function () { e(i.now()); }, 1e3 / 60); }, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame), o.create = function (e) {
                        var t = { controller: o, engine: null, element: null, canvas: null, mouse: null, frameRequestId: null, options: { width: 800, height: 600, pixelRatio: 1, background: "#18181d", wireframeBackground: "#0f0f13", hasBounds: !!e.bounds, enabled: !0, wireframes: !0, showSleeping: !0, showDebug: !1, showBroadphase: !1, showBounds: !1, showVelocity: !1, showCollisions: !1, showSeparations: !1, showAxes: !1, showPositions: !1, showAngleIndicator: !1, showIds: !1, showShadows: !1,
                                showVertexNumbers: !1, showConvexHulls: !1, showInternalEdges: !1, showMousePosition: !1 } }, r = i.extend(t, e);
                        return r.canvas && (r.canvas.width = r.options.width || r.canvas.width, r.canvas.height = r.options.height || r.canvas.height), r.mouse = e.mouse, r.engine = e.engine, r.canvas = r.canvas || n(r.options.width, r.options.height), r.context = r.canvas.getContext("2d"), r.textures = {}, r.bounds = r.bounds || { min: { x: 0, y: 0 }, max: { x: r.canvas.width, y: r.canvas.height } }, 1 !== r.options.pixelRatio && o.setPixelRatio(r, r.options.pixelRatio), i.isElement(r.element) ? r.element.appendChild(r.canvas) : r.canvas.parentNode || i.log("Render.create: options.element was undefined, render.canvas was created but not appended", "warn"), r;
                    }, o.run = function (t) { !function n(i) { t.frameRequestId = e(n), o.world(t); }(); }, o.stop = function (e) { t(e.frameRequestId); }, o.setPixelRatio = function (e, t) {
                        var n = e.options, o = e.canvas;
                        "auto" === t && (t = u(o)), n.pixelRatio = t, o.setAttribute("data-pixel-ratio", t), o.width = n.width * t, o.height = n.height * t, o.style.width = n.width + "px",
                            o.style.height = n.height + "px", e.context.scale(t, t);
                    }, o.lookAt = function (e, t, n, o) {
                        o = void 0 === o || o, t = i.isArray(t) ? t : [t], n = n || { x: 0, y: 0 };
                        for (var r = { min: { x: 1 / 0, y: 1 / 0 }, max: { x: -1 / 0, y: -1 / 0 } }, s = 0; s < t.length; s += 1) {
                            var a = t[s], l = a.bounds ? a.bounds.min : a.min || a.position || a, c = a.bounds ? a.bounds.max : a.max || a.position || a;
                            l && c && (l.x < r.min.x && (r.min.x = l.x), c.x > r.max.x && (r.max.x = c.x), l.y < r.min.y && (r.min.y = l.y), c.y > r.max.y && (r.max.y = c.y));
                        }
                        var u = r.max.x - r.min.x + 2 * n.x, p = r.max.y - r.min.y + 2 * n.y, f = e.canvas.height, m = e.canvas.width, v = m / f, y = u / p, g = 1, x = 1;
                        y > v ? x = y / v : g = v / y, e.options.hasBounds = !0, e.bounds.min.x = r.min.x, e.bounds.max.x = r.min.x + u * g, e.bounds.min.y = r.min.y, e.bounds.max.y = r.min.y + p * x, o && (e.bounds.min.x += .5 * u - u * g * .5, e.bounds.max.x += .5 * u - u * g * .5, e.bounds.min.y += .5 * p - p * x * .5, e.bounds.max.y += .5 * p - p * x * .5), e.bounds.min.x -= n.x, e.bounds.max.x -= n.x, e.bounds.min.y -= n.y, e.bounds.max.y -= n.y, e.mouse && (d.setScale(e.mouse, { x: (e.bounds.max.x - e.bounds.min.x) / e.canvas.width, y: (e.bounds.max.y - e.bounds.min.y) / e.canvas.height }),
                            d.setOffset(e.mouse, e.bounds.min));
                    }, o.startViewTransform = function (e) { var t = e.bounds.max.x - e.bounds.min.x, n = e.bounds.max.y - e.bounds.min.y, o = t / e.options.width, i = n / e.options.height; e.context.scale(1 / o, 1 / i), e.context.translate(-e.bounds.min.x, -e.bounds.min.y); }, o.endViewTransform = function (e) { e.context.setTransform(e.options.pixelRatio, 0, 0, e.options.pixelRatio, 0, 0); }, o.world = function (e) {
                        var t, n = e.engine, i = n.world, u = e.canvas, p = e.context, m = e.options, v = r.allBodies(i), y = r.allConstraints(i), g = m.wireframes ? m.wireframeBackground : m.background, x = [], h = [], b = { timestamp: n.timing.timestamp };
                        if (a.trigger(e, "beforeRender", b), e.currentBackground !== g && f(e, g), p.globalCompositeOperation = "source-in", p.fillStyle = "transparent", p.fillRect(0, 0, u.width, u.height), p.globalCompositeOperation = "source-over", m.hasBounds) {
                            for (t = 0; t < v.length; t++) {
                                var w = v[t];
                                s.overlaps(w.bounds, e.bounds) && x.push(w);
                            }
                            for (t = 0; t < y.length; t++) {
                                var S = y[t], C = S.bodyA, A = S.bodyB, P = S.pointA, B = S.pointB;
                                C && (P = c.add(C.position, S.pointA)),
                                    A && (B = c.add(A.position, S.pointB)), P && B && ((s.contains(e.bounds, P) || s.contains(e.bounds, B)) && h.push(S));
                            }
                            o.startViewTransform(e), e.mouse && (d.setScale(e.mouse, { x: (e.bounds.max.x - e.bounds.min.x) / e.canvas.width, y: (e.bounds.max.y - e.bounds.min.y) / e.canvas.height }), d.setOffset(e.mouse, e.bounds.min));
                        }
                        else
                            h = y, x = v;
                        !m.wireframes || n.enableSleeping && m.showSleeping ? o.bodies(e, x, p) : (m.showConvexHulls && o.bodyConvexHulls(e, x, p), o.bodyWireframes(e, x, p)), m.showBounds && o.bodyBounds(e, x, p), (m.showAxes || m.showAngleIndicator) && o.bodyAxes(e, x, p), m.showPositions && o.bodyPositions(e, x, p), m.showVelocity && o.bodyVelocity(e, x, p), m.showIds && o.bodyIds(e, x, p), m.showSeparations && o.separations(e, n.pairs.list, p), m.showCollisions && o.collisions(e, n.pairs.list, p), m.showVertexNumbers && o.vertexNumbers(e, x, p), m.showMousePosition && o.mousePosition(e, e.mouse, p), o.constraints(h, p), m.showBroadphase && n.broadphase.controller === l && o.grid(e, n.broadphase, p), m.showDebug && o.debug(e, p), m.hasBounds && o.endViewTransform(e),
                            a.trigger(e, "afterRender", b);
                    }, o.debug = function (e, t) { var n = t, o = e.engine, i = o.world, s = o.metrics, a = e.options; r.allBodies(i); if (o.timing.timestamp - (e.debugTimestamp || 0) >= 500) {
                        var l = "";
                        s.timing && (l += "fps: " + Math.round(s.timing.fps) + "    "), e.debugString = l, e.debugTimestamp = o.timing.timestamp;
                    } if (e.debugString) {
                        n.font = "12px Arial", a.wireframes ? n.fillStyle = "rgba(255,255,255,0.5)" : n.fillStyle = "rgba(0,0,0,0.5)";
                        for (var c = e.debugString.split("\n"), d = 0; d < c.length; d++)
                            n.fillText(c[d], 50, 50 + 18 * d);
                    } }, o.constraints = function (e, t) {
                        for (var n = t, o = 0; o < e.length; o++) {
                            var r = e[o];
                            if (r.render.visible && r.pointA && r.pointB) {
                                var s, a, l = r.bodyA, d = r.bodyB;
                                if (s = l ? c.add(l.position, r.pointA) : r.pointA, "pin" === r.render.type)
                                    n.beginPath(), n.arc(s.x, s.y, 3, 0, 2 * Math.PI), n.closePath();
                                else {
                                    if (a = d ? c.add(d.position, r.pointB) : r.pointB, n.beginPath(), n.moveTo(s.x, s.y), "spring" === r.render.type)
                                        for (var u, p = c.sub(a, s), f = c.perp(c.normalise(p)), m = Math.ceil(i.clamp(r.length / 5, 12, 20)), v = 1; v < m; v += 1)
                                            u = v % 2 == 0 ? 1 : -1,
                                                n.lineTo(s.x + p.x * (v / m) + f.x * u * 4, s.y + p.y * (v / m) + f.y * u * 4);
                                    n.lineTo(a.x, a.y);
                                }
                                r.render.lineWidth && (n.lineWidth = r.render.lineWidth, n.strokeStyle = r.render.strokeStyle, n.stroke()), r.render.anchors && (n.fillStyle = r.render.strokeStyle, n.beginPath(), n.arc(s.x, s.y, 3, 0, 2 * Math.PI), n.arc(a.x, a.y, 3, 0, 2 * Math.PI), n.closePath(), n.fill());
                            }
                        }
                    }, o.bodyShadows = function (e, t, n) { for (var o = n, i = (e.engine, 0); i < t.length; i++) {
                        var r = t[i];
                        if (r.render.visible) {
                            if (r.circleRadius)
                                o.beginPath(), o.arc(r.position.x, r.position.y, r.circleRadius, 0, 2 * Math.PI), o.closePath();
                            else {
                                o.beginPath(), o.moveTo(r.vertices[0].x, r.vertices[0].y);
                                for (var s = 1; s < r.vertices.length; s++)
                                    o.lineTo(r.vertices[s].x, r.vertices[s].y);
                                o.closePath();
                            }
                            var a = r.position.x - .5 * e.options.width, l = r.position.y - .2 * e.options.height, c = Math.abs(a) + Math.abs(l);
                            o.shadowColor = "rgba(0,0,0,0.15)", o.shadowOffsetX = .05 * a, o.shadowOffsetY = .05 * l, o.shadowBlur = 1 + 12 * Math.min(1, c / 1e3), o.fill(), o.shadowColor = null, o.shadowOffsetX = null, o.shadowOffsetY = null, o.shadowBlur = null;
                        }
                    } },
                        o.bodies = function (e, t, n) {
                            var o, i, r, s, a = n, l = (e.engine, e.options), c = l.showInternalEdges || !l.wireframes;
                            for (r = 0; r < t.length; r++)
                                if (o = t[r], o.render.visible)
                                    for (s = o.parts.length > 1 ? 1 : 0; s < o.parts.length; s++)
                                        if (i = o.parts[s], i.render.visible) {
                                            if (l.showSleeping && o.isSleeping ? a.globalAlpha = .5 * i.render.opacity : 1 !== i.render.opacity && (a.globalAlpha = i.render.opacity), i.render.sprite && i.render.sprite.texture && !l.wireframes) {
                                                var d = i.render.sprite, u = p(e, d.texture);
                                                a.translate(i.position.x, i.position.y), a.rotate(i.angle), a.drawImage(u, u.width * -d.xOffset * d.xScale, u.height * -d.yOffset * d.yScale, u.width * d.xScale, u.height * d.yScale), a.rotate(-i.angle), a.translate(-i.position.x, -i.position.y);
                                            }
                                            else {
                                                if (i.circleRadius)
                                                    a.beginPath(), a.arc(i.position.x, i.position.y, i.circleRadius, 0, 2 * Math.PI);
                                                else {
                                                    a.beginPath(), a.moveTo(i.vertices[0].x, i.vertices[0].y);
                                                    for (var f = 1; f < i.vertices.length; f++)
                                                        !i.vertices[f - 1].isInternal || c ? a.lineTo(i.vertices[f].x, i.vertices[f].y) : a.moveTo(i.vertices[f].x, i.vertices[f].y),
                                                            i.vertices[f].isInternal && !c && a.moveTo(i.vertices[(f + 1) % i.vertices.length].x, i.vertices[(f + 1) % i.vertices.length].y);
                                                    a.lineTo(i.vertices[0].x, i.vertices[0].y), a.closePath();
                                                }
                                                l.wireframes ? (a.lineWidth = 1, a.strokeStyle = "#bbb", a.stroke()) : (a.fillStyle = i.render.fillStyle, i.render.lineWidth && (a.lineWidth = i.render.lineWidth, a.strokeStyle = i.render.strokeStyle, a.stroke()), a.fill());
                                            }
                                            a.globalAlpha = 1;
                                        }
                        }, o.bodyWireframes = function (e, t, n) { var o, i, r, s, a, l = n, c = e.options.showInternalEdges; for (l.beginPath(), r = 0; r < t.length; r++)
                        if (o = t[r], o.render.visible)
                            for (a = o.parts.length > 1 ? 1 : 0; a < o.parts.length; a++) {
                                for (i = o.parts[a], l.moveTo(i.vertices[0].x, i.vertices[0].y), s = 1; s < i.vertices.length; s++)
                                    !i.vertices[s - 1].isInternal || c ? l.lineTo(i.vertices[s].x, i.vertices[s].y) : l.moveTo(i.vertices[s].x, i.vertices[s].y), i.vertices[s].isInternal && !c && l.moveTo(i.vertices[(s + 1) % i.vertices.length].x, i.vertices[(s + 1) % i.vertices.length].y);
                                l.lineTo(i.vertices[0].x, i.vertices[0].y);
                            } l.lineWidth = 1, l.strokeStyle = "#bbb", l.stroke(); },
                        o.bodyConvexHulls = function (e, t, n) { var o, i, r, s = n; for (s.beginPath(), i = 0; i < t.length; i++)
                            if (o = t[i], o.render.visible && 1 !== o.parts.length) {
                                for (s.moveTo(o.vertices[0].x, o.vertices[0].y), r = 1; r < o.vertices.length; r++)
                                    s.lineTo(o.vertices[r].x, o.vertices[r].y);
                                s.lineTo(o.vertices[0].x, o.vertices[0].y);
                            } s.lineWidth = 1, s.strokeStyle = "rgba(255,255,255,0.2)", s.stroke(); }, o.vertexNumbers = function (e, t, n) { var o, i, r, s = n; for (o = 0; o < t.length; o++) {
                        var a = t[o].parts;
                        for (r = a.length > 1 ? 1 : 0; r < a.length; r++) {
                            var l = a[r];
                            for (i = 0; i < l.vertices.length; i++)
                                s.fillStyle = "rgba(255,255,255,0.2)", s.fillText(o + "_" + i, l.position.x + .8 * (l.vertices[i].x - l.position.x), l.position.y + .8 * (l.vertices[i].y - l.position.y));
                        }
                    } }, o.mousePosition = function (e, t, n) { var o = n; o.fillStyle = "rgba(255,255,255,0.8)", o.fillText(t.position.x + "  " + t.position.y, t.position.x + 5, t.position.y - 5); }, o.bodyBounds = function (e, t, n) {
                        var o = n, i = (e.engine, e.options);
                        o.beginPath();
                        for (var r = 0; r < t.length; r++) {
                            if (t[r].render.visible)
                                for (var s = t[r].parts, a = s.length > 1 ? 1 : 0; a < s.length; a++) {
                                    var l = s[a];
                                    o.rect(l.bounds.min.x, l.bounds.min.y, l.bounds.max.x - l.bounds.min.x, l.bounds.max.y - l.bounds.min.y);
                                }
                        }
                        i.wireframes ? o.strokeStyle = "rgba(255,255,255,0.08)" : o.strokeStyle = "rgba(0,0,0,0.1)", o.lineWidth = 1, o.stroke();
                    }, o.bodyAxes = function (e, t, n) {
                        var o, i, r, s, a = n, l = (e.engine, e.options);
                        for (a.beginPath(), i = 0; i < t.length; i++) {
                            var c = t[i], d = c.parts;
                            if (c.render.visible)
                                if (l.showAxes)
                                    for (r = d.length > 1 ? 1 : 0; r < d.length; r++)
                                        for (o = d[r], s = 0; s < o.axes.length; s++) {
                                            var u = o.axes[s];
                                            a.moveTo(o.position.x, o.position.y), a.lineTo(o.position.x + 20 * u.x, o.position.y + 20 * u.y);
                                        }
                                else
                                    for (r = d.length > 1 ? 1 : 0; r < d.length; r++)
                                        for (o = d[r], s = 0; s < o.axes.length; s++)
                                            a.moveTo(o.position.x, o.position.y), a.lineTo((o.vertices[0].x + o.vertices[o.vertices.length - 1].x) / 2, (o.vertices[0].y + o.vertices[o.vertices.length - 1].y) / 2);
                        }
                        l.wireframes ? (a.strokeStyle = "indianred", a.lineWidth = 1) : (a.strokeStyle = "rgba(255, 255, 255, 0.4)", a.globalCompositeOperation = "overlay",
                            a.lineWidth = 2), a.stroke(), a.globalCompositeOperation = "source-over";
                    }, o.bodyPositions = function (e, t, n) { var o, i, r, s, a = n, l = (e.engine, e.options); for (a.beginPath(), r = 0; r < t.length; r++)
                        if (o = t[r], o.render.visible)
                            for (s = 0; s < o.parts.length; s++)
                                i = o.parts[s], a.arc(i.position.x, i.position.y, 3, 0, 2 * Math.PI, !1), a.closePath(); for (l.wireframes ? a.fillStyle = "indianred" : a.fillStyle = "rgba(0,0,0,0.5)", a.fill(), a.beginPath(), r = 0; r < t.length; r++)
                        o = t[r], o.render.visible && (a.arc(o.positionPrev.x, o.positionPrev.y, 2, 0, 2 * Math.PI, !1), a.closePath()); a.fillStyle = "rgba(255,165,0,0.8)", a.fill(); }, o.bodyVelocity = function (e, t, n) { var o = n; o.beginPath(); for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.render.visible && (o.moveTo(r.position.x, r.position.y), o.lineTo(r.position.x + 2 * (r.position.x - r.positionPrev.x), r.position.y + 2 * (r.position.y - r.positionPrev.y)));
                    } o.lineWidth = 3, o.strokeStyle = "cornflowerblue", o.stroke(); }, o.bodyIds = function (e, t, n) {
                        var o, i, r = n;
                        for (o = 0; o < t.length; o++)
                            if (t[o].render.visible) {
                                var s = t[o].parts;
                                for (i = s.length > 1 ? 1 : 0; i < s.length; i++) {
                                    var a = s[i];
                                    r.font = "12px Arial", r.fillStyle = "rgba(255,255,255,0.5)", r.fillText(a.id, a.position.x + 10, a.position.y - 10);
                                }
                            }
                    }, o.collisions = function (e, t, n) {
                        var o, i, r, s, a = n, l = e.options;
                        for (a.beginPath(), r = 0; r < t.length; r++)
                            if (o = t[r], o.isActive)
                                for (i = o.collision, s = 0; s < o.activeContacts.length; s++) {
                                    var c = o.activeContacts[s], d = c.vertex;
                                    a.rect(d.x - 1.5, d.y - 1.5, 3.5, 3.5);
                                }
                        for (l.wireframes ? a.fillStyle = "rgba(255,255,255,0.7)" : a.fillStyle = "orange", a.fill(), a.beginPath(), r = 0; r < t.length; r++)
                            if (o = t[r], o.isActive && (i = o.collision, o.activeContacts.length > 0)) {
                                var u = o.activeContacts[0].vertex.x, p = o.activeContacts[0].vertex.y;
                                2 === o.activeContacts.length && (u = (o.activeContacts[0].vertex.x + o.activeContacts[1].vertex.x) / 2, p = (o.activeContacts[0].vertex.y + o.activeContacts[1].vertex.y) / 2), i.bodyB === i.supports[0].body || !0 === i.bodyA.isStatic ? a.moveTo(u - 8 * i.normal.x, p - 8 * i.normal.y) : a.moveTo(u + 8 * i.normal.x, p + 8 * i.normal.y), a.lineTo(u, p);
                            }
                        l.wireframes ? a.strokeStyle = "rgba(255,165,0,0.7)" : a.strokeStyle = "orange", a.lineWidth = 1, a.stroke();
                    }, o.separations = function (e, t, n) { var o, i, r, s, a, l = n, c = e.options; for (l.beginPath(), a = 0; a < t.length; a++)
                        if (o = t[a], o.isActive) {
                            i = o.collision, r = i.bodyA, s = i.bodyB;
                            var d = 1;
                            s.isStatic || r.isStatic || (d = .5), s.isStatic && (d = 0), l.moveTo(s.position.x, s.position.y), l.lineTo(s.position.x - i.penetration.x * d, s.position.y - i.penetration.y * d), d = 1, s.isStatic || r.isStatic || (d = .5), r.isStatic && (d = 0), l.moveTo(r.position.x, r.position.y), l.lineTo(r.position.x + i.penetration.x * d, r.position.y + i.penetration.y * d);
                        } c.wireframes ? l.strokeStyle = "rgba(255,165,0,0.5)" : l.strokeStyle = "orange", l.stroke(); }, o.grid = function (e, t, n) {
                        var o = n;
                        e.options.wireframes ? o.strokeStyle = "rgba(255,180,0,0.1)" : o.strokeStyle = "rgba(255,180,0,0.5)", o.beginPath();
                        for (var r = i.keys(t.buckets), s = 0; s < r.length; s++) {
                            var a = r[s];
                            if (!(t.buckets[a].length < 2)) {
                                var l = a.split(/C|R/);
                                o.rect(.5 + parseInt(l[1], 10) * t.bucketWidth, .5 + parseInt(l[2], 10) * t.bucketHeight, t.bucketWidth, t.bucketHeight);
                            }
                        }
                        o.lineWidth = 1, o.stroke();
                    }, o.inspector = function (e, t) {
                        var n, o = (e.engine, e.selected), i = e.render, r = i.options;
                        if (r.hasBounds) {
                            var s = i.bounds.max.x - i.bounds.min.x, a = i.bounds.max.y - i.bounds.min.y, l = s / i.options.width, c = a / i.options.height;
                            t.scale(1 / l, 1 / c), t.translate(-i.bounds.min.x, -i.bounds.min.y);
                        }
                        for (var d = 0; d < o.length; d++) {
                            var u = o[d].data;
                            switch ((t.translate(.5, .5), t.lineWidth = 1, t.strokeStyle = "rgba(255,165,0,0.9)", t.setLineDash([1, 2]), u.type)) {
                                case "body":
                                    n = u.bounds, t.beginPath(), t.rect(Math.floor(n.min.x - 3), Math.floor(n.min.y - 3), Math.floor(n.max.x - n.min.x + 6), Math.floor(n.max.y - n.min.y + 6)), t.closePath(), t.stroke();
                                    break;
                                case "constraint":
                                    var p = u.pointA;
                                    u.bodyA && (p = u.pointB), t.beginPath(), t.arc(p.x, p.y, 10, 0, 2 * Math.PI), t.closePath(), t.stroke();
                            }
                            t.setLineDash([]), t.translate(-.5, -.5);
                        }
                        null !== e.selectStart && (t.translate(.5, .5), t.lineWidth = 1, t.strokeStyle = "rgba(255,165,0,0.6)",
                            t.fillStyle = "rgba(255,165,0,0.1)", n = e.selectBounds, t.beginPath(), t.rect(Math.floor(n.min.x), Math.floor(n.min.y), Math.floor(n.max.x - n.min.x), Math.floor(n.max.y - n.min.y)), t.closePath(), t.stroke(), t.fill(), t.translate(-.5, -.5)), r.hasBounds && t.setTransform(1, 0, 0, 1, 0, 0);
                    };
                    var n = function (e, t) { var n = document.createElement("canvas"); return n.width = e, n.height = t, n.oncontextmenu = function () { return !1; }, n.onselectstart = function () { return !1; }, n; }, u = function (e) { var t = e.getContext("2d"); return (window.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1); }, p = function (e, t) { var n = e.textures[t]; return n || (n = e.textures[t] = new Image, n.src = t, n); }, f = function (e, t) { var n = t; /(jpg|gif|png)$/.test(t) && (n = "url(" + t + ")"), e.canvas.style.background = n, e.canvas.style.backgroundSize = "contain", e.currentBackground = t; };
                }();
            }, { "../body/Composite": 2, "../collision/Grid": 6, "../core/Common": 14, "../core/Events": 16,
                "../core/Mouse": 19, "../geometry/Bounds": 26, "../geometry/Vector": 28 }], 32: [function (e, t, n) {
                var o = {};
                t.exports = o;
                var i = e("../geometry/Bounds"), r = e("../body/Composite"), s = e("../core/Common"), a = e("../core/Events"), l = e("../geometry/Vector");
                !function () {
                    var e, t;
                    "undefined" != typeof window && (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (e) { window.setTimeout(function () { e(s.now()); }, 1e3 / 60); }, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame), o.create = function (e) {
                        s.warn("RenderPixi.create: MatterJs.RenderPixi is deprecated (see docs)");
                        var t = { controller: o, engine: null, element: null, frameRequestId: null, canvas: null, renderer: null, container: null, spriteContainer: null, pixiOptions: null, options: { width: 800, height: 600, background: "#fafafa", wireframeBackground: "#222", hasBounds: !1, enabled: !0, wireframes: !0, showSleeping: !0, showDebug: !1,
                                showBroadphase: !1, showBounds: !1, showVelocity: !1, showCollisions: !1, showAxes: !1, showPositions: !1, showAngleIndicator: !1, showIds: !1, showShadows: !1 } }, n = s.extend(t, e), i = !n.options.wireframes && "transparent" === n.options.background;
                        return n.pixiOptions = n.pixiOptions || { view: n.canvas, transparent: i, antialias: !0, backgroundColor: e.background }, n.mouse = e.mouse, n.engine = e.engine, n.renderer = n.renderer || new PIXI.WebGLRenderer(n.options.width, n.options.height, n.pixiOptions), n.container = n.container || new PIXI.Container, n.spriteContainer = n.spriteContainer || new PIXI.Container, n.canvas = n.canvas || n.renderer.view, n.bounds = n.bounds || { min: { x: 0, y: 0 }, max: { x: n.options.width, y: n.options.height } }, a.on(n.engine, "beforeUpdate", function () { o.clear(n); }), n.textures = {}, n.sprites = {}, n.primitives = {}, n.container.addChild(n.spriteContainer), s.isElement(n.element) ? n.element.appendChild(n.canvas) : s.warn('No "render.element" passed, "render.canvas" was not inserted into document.'), n.canvas.oncontextmenu = function () { return !1; },
                            n.canvas.onselectstart = function () { return !1; }, n;
                    }, o.run = function (t) { !function n(i) { t.frameRequestId = e(n), o.world(t); }(); }, o.stop = function (e) { t(e.frameRequestId); }, o.clear = function (e) { for (var t = e.container, n = e.spriteContainer; t.children[0];)
                        t.removeChild(t.children[0]); for (; n.children[0];)
                        n.removeChild(n.children[0]); var o = e.sprites["bg-0"]; e.textures = {}, e.sprites = {}, e.primitives = {}, e.sprites["bg-0"] = o, o && t.addChildAt(o, 0), e.container.addChild(e.spriteContainer), e.currentBackground = null, t.scale.set(1, 1), t.position.set(0, 0); }, o.setBackground = function (e, t) { if (e.currentBackground !== t) {
                        var n = t.indexOf && -1 !== t.indexOf("#"), o = e.sprites["bg-0"];
                        if (n) {
                            var i = s.colorToNumber(t);
                            e.renderer.backgroundColor = i, o && e.container.removeChild(o);
                        }
                        else if (!o) {
                            var r = d(e, t);
                            o = e.sprites["bg-0"] = new PIXI.Sprite(r), o.position.x = 0, o.position.y = 0, e.container.addChildAt(o, 0);
                        }
                        e.currentBackground = t;
                    } }, o.world = function (e) {
                        var t, n = e.engine, s = n.world, a = e.renderer, c = e.container, d = e.options, u = r.allBodies(s), p = r.allConstraints(s), f = [];
                        d.wireframes ? o.setBackground(e, d.wireframeBackground) : o.setBackground(e, d.background);
                        var m = e.bounds.max.x - e.bounds.min.x, v = e.bounds.max.y - e.bounds.min.y, y = m / e.options.width, g = v / e.options.height;
                        if (d.hasBounds) {
                            for (t = 0; t < u.length; t++) {
                                var x = u[t];
                                x.render.sprite.visible = i.overlaps(x.bounds, e.bounds);
                            }
                            for (t = 0; t < p.length; t++) {
                                var h = p[t], b = h.bodyA, w = h.bodyB, S = h.pointA, C = h.pointB;
                                b && (S = l.add(b.position, h.pointA)), w && (C = l.add(w.position, h.pointB)), S && C && ((i.contains(e.bounds, S) || i.contains(e.bounds, C)) && f.push(h));
                            }
                            c.scale.set(1 / y, 1 / g), c.position.set(-e.bounds.min.x * (1 / y), -e.bounds.min.y * (1 / g));
                        }
                        else
                            f = p;
                        for (t = 0; t < u.length; t++)
                            o.body(e, u[t]);
                        for (t = 0; t < f.length; t++)
                            o.constraint(e, f[t]);
                        a.render(c);
                    }, o.constraint = function (e, t) {
                        var n = (e.engine, t.bodyA), o = t.bodyB, i = t.pointA, r = t.pointB, a = e.container, l = t.render, c = "c-" + t.id, d = e.primitives[c];
                        if (d || (d = e.primitives[c] = new PIXI.Graphics),
                            !l.visible || !t.pointA || !t.pointB)
                            return void d.clear();
                        -1 === s.indexOf(a.children, d) && a.addChild(d), d.clear(), d.beginFill(0, 0), d.lineStyle(l.lineWidth, s.colorToNumber(l.strokeStyle), 1), n ? d.moveTo(n.position.x + i.x, n.position.y + i.y) : d.moveTo(i.x, i.y), o ? d.lineTo(o.position.x + r.x, o.position.y + r.y) : d.lineTo(r.x, r.y), d.endFill();
                    }, o.body = function (e, t) { var o = (e.engine, t.render); if (o.visible)
                        if (o.sprite && o.sprite.texture) {
                            var i = "b-" + t.id, r = e.sprites[i], a = e.spriteContainer;
                            r || (r = e.sprites[i] = n(e, t)), -1 === s.indexOf(a.children, r) && a.addChild(r), r.position.x = t.position.x, r.position.y = t.position.y, r.rotation = t.angle, r.scale.x = o.sprite.xScale || 1, r.scale.y = o.sprite.yScale || 1;
                        }
                        else {
                            var l = "b-" + t.id, d = e.primitives[l], u = e.container;
                            d || (d = e.primitives[l] = c(e, t), d.initialAngle = t.angle), -1 === s.indexOf(u.children, d) && u.addChild(d), d.position.x = t.position.x, d.position.y = t.position.y, d.rotation = t.angle - d.initialAngle;
                        } };
                    var n = function (e, t) {
                        var n = t.render, o = n.sprite.texture, i = d(e, o), r = new PIXI.Sprite(i);
                        return r.anchor.x = t.render.sprite.xOffset, r.anchor.y = t.render.sprite.yOffset, r;
                    }, c = function (e, t) {
                        var n, o = t.render, i = e.options, r = new PIXI.Graphics, a = s.colorToNumber(o.fillStyle), l = s.colorToNumber(o.strokeStyle), c = s.colorToNumber(o.strokeStyle), d = s.colorToNumber("#bbb"), u = s.colorToNumber("#CD5C5C");
                        r.clear();
                        for (var p = t.parts.length > 1 ? 1 : 0; p < t.parts.length; p++) {
                            n = t.parts[p], i.wireframes ? (r.beginFill(0, 0), r.lineStyle(1, d, 1)) : (r.beginFill(a, 1), r.lineStyle(o.lineWidth, l, 1)), r.moveTo(n.vertices[0].x - t.position.x, n.vertices[0].y - t.position.y);
                            for (var f = 1; f < n.vertices.length; f++)
                                r.lineTo(n.vertices[f].x - t.position.x, n.vertices[f].y - t.position.y);
                            r.lineTo(n.vertices[0].x - t.position.x, n.vertices[0].y - t.position.y), r.endFill(), (i.showAngleIndicator || i.showAxes) && (r.beginFill(0, 0), i.wireframes ? r.lineStyle(1, u, 1) : r.lineStyle(1, c), r.moveTo(n.position.x - t.position.x, n.position.y - t.position.y),
                                r.lineTo((n.vertices[0].x + n.vertices[n.vertices.length - 1].x) / 2 - t.position.x, (n.vertices[0].y + n.vertices[n.vertices.length - 1].y) / 2 - t.position.y), r.endFill());
                        }
                        return r;
                    }, d = function (e, t) { var n = e.textures[t]; return n || (n = e.textures[t] = PIXI.Texture.fromImage(t)), n; };
                }();
            }, { "../body/Composite": 2, "../core/Common": 14, "../core/Events": 16, "../geometry/Bounds": 26, "../geometry/Vector": 28 }] }, {}, [30])(30);
});
var entryPoint = 'main';
var requirejs, require, define;
!function (global, setTimeout) { function commentReplace(e, t) { return t || ""; } function isFunction(e) { return "[object Function]" === ostring.call(e); } function isArray(e) { return "[object Array]" === ostring.call(e); } function each(e, t) { if (e) {
    var i;
    for (i = 0; i < e.length && (!e[i] || !t(e[i], i, e)); i += 1)
        ;
} } function eachReverse(e, t) { if (e) {
    var i;
    for (i = e.length - 1; i > -1 && (!e[i] || !t(e[i], i, e)); i -= 1)
        ;
} } function hasProp(e, t) { return hasOwn.call(e, t); } function getOwn(e, t) { return hasProp(e, t) && e[t]; } function eachProp(e, t) { var i; for (i in e)
    if (hasProp(e, i) && t(e[i], i))
        break; } function mixin(e, t, i, r) { return t && eachProp(t, function (t, n) { !i && hasProp(e, n) || (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[n] = t : (e[n] || (e[n] = {}), mixin(e[n], t, i, r))); }), e; } function bind(e, t) { return function () { return t.apply(e, arguments); }; } function scripts() { return document.getElementsByTagName("script"); } function defaultOnError(e) { throw e; } function getGlobal(e) { if (!e)
    return e; var t = global; return each(e.split("."), function (e) { t = t[e]; }), t; } function makeError(e, t, i, r) { var n = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e); return n.requireType = e, n.requireModules = r, i && (n.originalError = i), n; } function newContext(e) { function t(e) { var t, i; for (t = 0; t < e.length; t++)
    if ("." === (i = e[t]))
        e.splice(t, 1), t -= 1;
    else if (".." === i) {
        if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1])
            continue;
        t > 0 && (e.splice(t - 1, 2), t -= 2);
    } } function i(e, i, r) { var n, o, a, s, u, c, d, p, f, l, h = i && i.split("/"), m = y.map, g = m && m["*"]; if (e && (c = (e = e.split("/")).length - 1, y.nodeIdCompat && jsSuffixRegExp.test(e[c]) && (e[c] = e[c].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && h && (e = h.slice(0, h.length - 1).concat(e)), t(e), e = e.join("/")), r && m && (h || g)) {
    e: for (a = (o = e.split("/")).length; a > 0; a -= 1) {
        if (u = o.slice(0, a).join("/"), h)
            for (s = h.length; s > 0; s -= 1)
                if ((n = getOwn(m, h.slice(0, s).join("/"))) && (n = getOwn(n, u))) {
                    d = n, p = a;
                    break e;
                }
        !f && g && getOwn(g, u) && (f = getOwn(g, u), l = a);
    }
    !d && f && (d = f, p = l), d && (o.splice(0, p, d), e = o.join("/"));
} return getOwn(y.pkgs, e) || e; } function r(e) { isBrowser && each(scripts(), function (t) { if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === q.contextName)
    return t.parentNode.removeChild(t), !0; }); } function n(e) { var t = getOwn(y.paths, e); if (t && isArray(t) && t.length > 1)
    return t.shift(), q.require.undef(e), q.makeRequire(null, { skipMap: !0 })([e]), !0; } function o(e) { var t, i = e ? e.indexOf("!") : -1; return i > -1 && (t = e.substring(0, i), e = e.substring(i + 1, e.length)), [t, e]; } function a(e, t, r, n) { var a, s, u, c, d = null, p = t ? t.name : null, f = e, l = !0, h = ""; return e || (l = !1, e = "_@r" + (T += 1)), c = o(e), d = c[0], e = c[1], d && (d = i(d, p, n), s = getOwn(j, d)), e && (d ? h = r ? e : s && s.normalize ? s.normalize(e, function (e) { return i(e, p, n); }) : -1 === e.indexOf("!") ? i(e, p, n) : e : (d = (c = o(h = i(e, p, n)))[0], h = c[1], r = !0, a = q.nameToUrl(h))), u = !d || s || r ? "" : "_unnormalized" + (A += 1), { prefix: d, name: h, parentMap: t, unnormalized: !!u, url: a, originalName: f, isDefine: l, id: (d ? d + "!" + h : h) + u }; } function s(e) { var t = e.id, i = getOwn(S, t); return i || (i = S[t] = new q.Module(e)), i; } function u(e, t, i) { var r = e.id, n = getOwn(S, r); !hasProp(j, r) || n && !n.defineEmitComplete ? (n = s(e)).error && "error" === t ? i(n.error) : n.on(t, i) : "defined" === t && i(j[r]); } function c(e, t) { var i = e.requireModules, r = !1; t ? t(e) : (each(i, function (t) { var i = getOwn(S, t); i && (i.error = e, i.events.error && (r = !0, i.emit("error", e))); }), r || req.onError(e)); } function d() { globalDefQueue.length && (each(globalDefQueue, function (e) { var t = e[0]; "string" == typeof t && (q.defQueueMap[t] = !0), O.push(e); }), globalDefQueue = []); } function p(e) { delete S[e], delete k[e]; } function f(e, t, i) { var r = e.map.id; e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function (r, n) { var o = r.id, a = getOwn(S, o); !a || e.depMatched[n] || i[o] || (getOwn(t, o) ? (e.defineDep(n, j[o]), e.check()) : f(a, t, i)); }), i[r] = !0); } function l() { var e, t, i = 1e3 * y.waitSeconds, o = i && q.startTime + i < (new Date).getTime(), a = [], s = [], u = !1, d = !0; if (!x) {
    if (x = !0, eachProp(k, function (e) { var i = e.map, c = i.id; if (e.enabled && (i.isDefine || s.push(e), !e.error))
        if (!e.inited && o)
            n(c) ? (t = !0, u = !0) : (a.push(c), r(c));
        else if (!e.inited && e.fetched && i.isDefine && (u = !0, !i.prefix))
            return d = !1; }), o && a.length)
        return e = makeError("timeout", "Load timeout for modules: " + a, null, a), e.contextName = q.contextName, c(e);
    d && each(s, function (e) { f(e, {}, {}); }), o && !t || !u || !isBrowser && !isWebWorker || w || (w = setTimeout(function () { w = 0, l(); }, 50)), x = !1;
} } function h(e) { hasProp(j, e[0]) || s(a(e[0], null, !0)).init(e[1], e[2]); } function m(e, t, i, r) { e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(i, t, !1); } function g(e) { var t = e.currentTarget || e.srcElement; return m(t, q.onScriptLoad, "load", "onreadystatechange"), m(t, q.onScriptError, "error"), { node: t, id: t && t.getAttribute("data-requiremodule") }; } function v() { var e; for (d(); O.length;) {
    if (null === (e = O.shift())[0])
        return c(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
    h(e);
} q.defQueueMap = {}; } var x, b, q, E, w, y = { waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {} }, S = {}, k = {}, M = {}, O = [], j = {}, P = {}, R = {}, T = 1, A = 1; return E = { require: function (e) { return e.require ? e.require : e.require = q.makeRequire(e.map); }, exports: function (e) { if (e.usingExports = !0, e.map.isDefine)
        return e.exports ? j[e.map.id] = e.exports : e.exports = j[e.map.id] = {}; }, module: function (e) { return e.module ? e.module : e.module = { id: e.map.id, uri: e.map.url, config: function () { return getOwn(y.config, e.map.id) || {}; }, exports: e.exports || (e.exports = {}) }; } }, b = function (e) { this.events = getOwn(M, e.id) || {}, this.map = e, this.shim = getOwn(y.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0; }, b.prototype = { init: function (e, t, i, r) { r = r || {}, this.inited || (this.factory = t, i ? this.on("error", i) : this.events.error && (i = bind(this, function (e) { this.emit("error", e); })), this.depMaps = e && e.slice(0), this.errback = i, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check()); }, defineDep: function (e, t) { this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t); }, fetch: function () { if (!this.fetched) {
        this.fetched = !0, q.startTime = (new Date).getTime();
        var e = this.map;
        if (!this.shim)
            return e.prefix ? this.callPlugin() : this.load();
        q.makeRequire(this.map, { enableBuildCallback: !0 })(this.shim.deps || [], bind(this, function () { return e.prefix ? this.callPlugin() : this.load(); }));
    } }, load: function () { var e = this.map.url; P[e] || (P[e] = !0, q.load(this.map.id, e)); }, check: function () { if (this.enabled && !this.enabling) {
        var e, t, i = this.map.id, r = this.depExports, n = this.exports, o = this.factory;
        if (this.inited) {
            if (this.error)
                this.emit("error", this.error);
            else if (!this.defining) {
                if (this.defining = !0, this.depCount < 1 && !this.defined) {
                    if (isFunction(o)) {
                        if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)
                            try {
                                n = q.execCb(i, o, r, n);
                            }
                            catch (t) {
                                e = t;
                            }
                        else
                            n = q.execCb(i, o, r, n);
                        if (this.map.isDefine && void 0 === n && ((t = this.module) ? n = t.exports : this.usingExports && (n = this.exports)), e)
                            return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", c(this.error = e);
                    }
                    else
                        n = o;
                    if (this.exports = n, this.map.isDefine && !this.ignore && (j[i] = n, req.onResourceLoad)) {
                        var a = [];
                        each(this.depMaps, function (e) { a.push(e.normalizedMap || e); }), req.onResourceLoad(q, this.map, a);
                    }
                    p(i), this.defined = !0;
                }
                this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0);
            }
        }
        else
            hasProp(q.defQueueMap, i) || this.fetch();
    } }, callPlugin: function () { var e = this.map, t = e.id, r = a(e.prefix); this.depMaps.push(r), u(r, "defined", bind(this, function (r) { var n, o, d, f = getOwn(R, this.map.id), l = this.map.name, h = this.map.parentMap ? this.map.parentMap.name : null, m = q.makeRequire(e.parentMap, { enableBuildCallback: !0 }); return this.map.unnormalized ? (r.normalize && (l = r.normalize(l, function (e) { return i(e, h, !0); }) || ""), o = a(e.prefix + "!" + l, this.map.parentMap, !0), u(o, "defined", bind(this, function (e) { this.map.normalizedMap = o, this.init([], function () { return e; }, null, { enabled: !0, ignore: !0 }); })), void ((d = getOwn(S, o.id)) && (this.depMaps.push(o), this.events.error && d.on("error", bind(this, function (e) { this.emit("error", e); })), d.enable()))) : f ? (this.map.url = q.nameToUrl(f), void this.load()) : ((n = bind(this, function (e) { this.init([], function () { return e; }, null, { enabled: !0 }); })).error = bind(this, function (e) { this.inited = !0, this.error = e, e.requireModules = [t], eachProp(S, function (e) { 0 === e.map.id.indexOf(t + "_unnormalized") && p(e.map.id); }), c(e); }), n.fromText = bind(this, function (i, r) { var o = e.name, u = a(o), d = useInteractive; r && (i = r), d && (useInteractive = !1), s(u), hasProp(y.config, t) && (y.config[o] = y.config[t]); try {
        req.exec(i);
    }
    catch (e) {
        return c(makeError("fromtexteval", "fromText eval for " + t + " failed: " + e, e, [t]));
    } d && (useInteractive = !0), this.depMaps.push(u), q.completeLoad(o), m([o], n); }), void r.load(e.name, m, n, y)); })), q.enable(r, this), this.pluginMaps[r.id] = r; }, enable: function () { k[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (e, t) { var i, r, n; if ("string" == typeof e) {
        if (e = a(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, n = getOwn(E, e.id))
            return void (this.depExports[t] = n(this));
        this.depCount += 1, u(e, "defined", bind(this, function (e) { this.undefed || (this.defineDep(t, e), this.check()); })), this.errback ? u(e, "error", bind(this, this.errback)) : this.events.error && u(e, "error", bind(this, function (e) { this.emit("error", e); }));
    } i = e.id, r = S[i], hasProp(E, i) || !r || r.enabled || q.enable(e, this); })), eachProp(this.pluginMaps, bind(this, function (e) { var t = getOwn(S, e.id); t && !t.enabled && q.enable(e, this); })), this.enabling = !1, this.check(); }, on: function (e, t) { var i = this.events[e]; i || (i = this.events[e] = []), i.push(t); }, emit: function (e, t) { each(this.events[e], function (e) { e(t); }), "error" === e && delete this.events[e]; } }, q = { config: y, contextName: e, registry: S, defined: j, urlFetched: P, defQueue: O, defQueueMap: {}, Module: b, makeModuleMap: a, nextTick: req.nextTick, onError: c, configure: function (e) { if (e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/"), "string" == typeof e.urlArgs) {
        var t = e.urlArgs;
        e.urlArgs = function (e, i) { return (-1 === i.indexOf("?") ? "?" : "&") + t; };
    } var i = y.shim, r = { paths: !0, bundles: !0, config: !0, map: !0 }; eachProp(e, function (e, t) { r[t] ? (y[t] || (y[t] = {}), mixin(y[t], e, !0, !0)) : y[t] = e; }), e.bundles && eachProp(e.bundles, function (e, t) { each(e, function (e) { e !== t && (R[e] = t); }); }), e.shim && (eachProp(e.shim, function (e, t) { isArray(e) && (e = { deps: e }), !e.exports && !e.init || e.exportsFn || (e.exportsFn = q.makeShimExports(e)), i[t] = e; }), y.shim = i), e.packages && each(e.packages, function (e) { var t; t = (e = "string" == typeof e ? { name: e } : e).name, e.location && (y.paths[t] = e.location), y.pkgs[t] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, ""); }), eachProp(S, function (e, t) { e.inited || e.map.unnormalized || (e.map = a(t, null, !0)); }), (e.deps || e.callback) && q.require(e.deps || [], e.callback); }, makeShimExports: function (e) { return function () { var t; return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports); }; }, makeRequire: function (t, n) { function o(i, r, u) { var d, p, f; return n.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0), "string" == typeof i ? isFunction(r) ? c(makeError("requireargs", "Invalid require call"), u) : t && hasProp(E, i) ? E[i](S[t.id]) : req.get ? req.get(q, i, t, o) : (p = a(i, t, !1, !0), d = p.id, hasProp(j, d) ? j[d] : c(makeError("notloaded", 'Module name "' + d + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), q.nextTick(function () { v(), (f = s(a(null, t))).skipMap = n.skipMap, f.init(i, r, u, { enabled: !0 }), l(); }), o); } return n = n || {}, mixin(o, { isBrowser: isBrowser, toUrl: function (e) { var r, n = e.lastIndexOf("."), o = e.split("/")[0], a = "." === o || ".." === o; return -1 !== n && (!a || n > 1) && (r = e.substring(n, e.length), e = e.substring(0, n)), q.nameToUrl(i(e, t && t.id, !0), r, !0); }, defined: function (e) { return hasProp(j, a(e, t, !1, !0).id); }, specified: function (e) { return e = a(e, t, !1, !0).id, hasProp(j, e) || hasProp(S, e); } }), t || (o.undef = function (e) { d(); var i = a(e, t, !0), n = getOwn(S, e); n.undefed = !0, r(e), delete j[e], delete P[i.url], delete M[e], eachReverse(O, function (t, i) { t[0] === e && O.splice(i, 1); }), delete q.defQueueMap[e], n && (n.events.defined && (M[e] = n.events), p(e)); }), o; }, enable: function (e) { getOwn(S, e.id) && s(e).enable(); }, completeLoad: function (e) { var t, i, r, o = getOwn(y.shim, e) || {}, a = o.exports; for (d(); O.length;) {
        if (null === (i = O.shift())[0]) {
            if (i[0] = e, t)
                break;
            t = !0;
        }
        else
            i[0] === e && (t = !0);
        h(i);
    } if (q.defQueueMap = {}, r = getOwn(S, e), !t && !hasProp(j, e) && r && !r.inited) {
        if (!(!y.enforceDefine || a && getGlobal(a)))
            return n(e) ? void 0 : c(makeError("nodefine", "No define call for " + e, null, [e]));
        h([e, o.deps || [], o.exportsFn]);
    } l(); }, nameToUrl: function (e, t, i) { var r, n, o, a, s, u, c, d = getOwn(y.pkgs, e); if (d && (e = d), c = getOwn(R, e))
        return q.nameToUrl(c, t, i); if (req.jsExtRegExp.test(e))
        s = e + (t || "");
    else {
        for (r = y.paths, o = (n = e.split("/")).length; o > 0; o -= 1)
            if (a = n.slice(0, o).join("/"), u = getOwn(r, a)) {
                isArray(u) && (u = u[0]), n.splice(0, o, u);
                break;
            }
        s = n.join("/"), s = ("/" === (s += t || (/^data\:|^blob\:|\?/.test(s) || i ? "" : ".js")).charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : y.baseUrl) + s;
    } return y.urlArgs && !/^blob\:/.test(s) ? s + y.urlArgs(e, s) : s; }, load: function (e, t) { req.load(q, e, t); }, execCb: function (e, t, i, r) { return t.apply(r, i); }, onScriptLoad: function (e) { if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
        interactiveScript = null;
        var t = g(e);
        q.completeLoad(t.id);
    } }, onScriptError: function (e) { var t = g(e); if (!n(t.id)) {
        var i = [];
        return eachProp(S, function (e, r) { 0 !== r.indexOf("_@r") && each(e.depMaps, function (e) { if (e.id === t.id)
            return i.push(r), !0; }); }), c(makeError("scripterror", 'Script error for "' + t.id + (i.length ? '", needed by: ' + i.join(", ") : '"'), e, [t.id]));
    } } }, q.require = q.makeRequire(), q; } function getInteractiveScript() { return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function (e) { if ("interactive" === e.readyState)
    return interactiveScript = e; }), interactiveScript); } var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.3.5", commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1; if (void 0 === define) {
    if (void 0 !== requirejs) {
        if (isFunction(requirejs))
            return;
        cfg = requirejs, requirejs = void 0;
    }
    void 0 === require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function (e, t, i, r) { var n, o, a = defContextName; return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = i, i = r) : e = []), o && o.context && (a = o.context), (n = getOwn(contexts, a)) || (n = contexts[a] = req.s.newContext(a)), o && n.configure(o), n.require(e, t, i); }, req.config = function (e) { return req(e); }, req.nextTick = void 0 !== setTimeout ? function (e) { setTimeout(e, 4); } : function (e) { e(); }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = { contexts: contexts, newContext: newContext }, req({}), each(["toUrl", "undef", "defined", "specified"], function (e) { req[e] = function () { var t = contexts[defContextName]; return t.require[e].apply(t, arguments); }; }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], (baseElement = document.getElementsByTagName("base")[0]) && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (e, t, i) { var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"); return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r; }, req.load = function (e, t, i) { var r, n = e && e.config || {}; if (isBrowser)
        return (r = req.createNode(n, t, i)).setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = i, n.onNodeCreated && n.onNodeCreated(r, n, t, i), currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r; if (isWebWorker)
        try {
            setTimeout(function () { }, 0), importScripts(i), e.completeLoad(t);
        }
        catch (r) {
            e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + i, r, [t]));
        } }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (e) { if (head || (head = e.parentNode), dataMain = e.getAttribute("data-main"))
        return mainScript = dataMain, cfg.baseUrl || -1 !== mainScript.indexOf("!") || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0; }), define = function (e, t, i) { var r, n; "string" != typeof e && (i = t, t = e, e = null), isArray(t) || (i = t, t = null), !t && isFunction(i) && (t = [], i.length && (i.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function (e, i) { t.push(i); }), t = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript()) && (e || (e = r.getAttribute("data-requiremodule")), n = contexts[r.getAttribute("data-requirecontext")]), n ? (n.defQueue.push([e, t, i]), n.defQueueMap[e] = !0) : globalDefQueue.push([e, t, i]); }, define.amd = { jQuery: !0 }, req.exec = function (text) { return eval(text); }, req(cfg);
} }(this, "undefined" == typeof setTimeout ? void 0 : setTimeout);
requirejs([entryPoint]);
var Bunas = { onload: null };
requirejs([entryPoint, 'Bunas'], function (a, b) { if (Bunas.onload)
    Bunas.onload(b); });
define("Bunas", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameObject = (function () {
        function GameObject(x, y, _z, colWidth, clipWidth) {
            if (_z === void 0) { _z = 0; }
            if (colWidth === void 0) { colWidth = 0; }
            if (clipWidth === void 0) { clipWidth = -1; }
            this.x = x;
            this.y = y;
            this._z = _z;
            this.inView = true;
            if (typeof colWidth === 'number') {
                this.colBox = { x: 0, y: 0, width: colWidth, height: colWidth };
            }
            else {
                this.colBox = { x: colWidth.x || 0, y: colWidth.y || 0, width: colWidth.width, height: colWidth.height || colWidth.width };
            }
            if (typeof clipWidth === 'number') {
                if (clipWidth === -1) {
                    this.clipBox = this.colBox;
                }
                else {
                    this.clipBox = { x: 0, y: 0, width: clipWidth, height: clipWidth };
                }
            }
            else {
                this.clipBox = { x: clipWidth.x || 0, y: clipWidth.y || 0, width: clipWidth.width, height: clipWidth.height || clipWidth.width };
            }
            World.area.add(this);
        }
        Object.defineProperty(GameObject.prototype, "z", {
            get: function () { return this._z; },
            set: function (newZ) { this._z = newZ; this.area.zSort(this); },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype.step = function (delta) { };
        ;
        GameObject.prototype.draw = function (ctx, delta) { };
        ;
        GameObject.prototype.getCollisions = function (objects, onlyInView) {
            var _this = this;
            if (onlyInView === void 0) { onlyInView = false; }
            return objects.filter(function (o) { return ((!onlyInView || o.inView) && o.x + o.colBox.x < _this.x + _this.colBox.x + _this.colBox.width && o.x + o.colBox.x + o.colBox.width > _this.x + _this.colBox.x && o.y + o.colBox.y < _this.y + _this.colBox.y + _this.colBox.height && o.y + o.colBox.y + o.colBox.height > _this.y + _this.colBox.y); });
        };
        GameObject.prototype.checkCollision = function (x, y, w, h) {
            if (w === void 0) { w = 0; }
            if (h === void 0) { h = 0; }
            return (x < this.x + this.colBox.x + this.colBox.width && x + w > this.x + this.colBox.x && y < this.y + this.colBox.y + this.colBox.height && y + h > this.y + this.colBox.y);
        };
        GameObject.prototype.setShadowMask = function (poly) { if (typeof poly[0].x === 'number') {
            this.mask = poly;
        } };
        GameObject.prototype.delete = function () { this.area.remove(this); };
        return GameObject;
    }());
    exports.GameObject = GameObject;
    var Debug;
    (function (Debug) {
        var show = false, dTCounter = +new Date(), logs = [], permLog = [], container = document.createElement('div'), output = document.createElement('pre');
        container.setAttribute('style', "position: fixed;height: 100vh;padding-top: 20px; top: 0px;left: 20px;width: 60vw;pointer-events: none;text-shadow: 0 0 2px #000;");
        container.appendChild(output);
        Debug.fontSize = 14, Debug.color = 'dodgerblue', Debug.defaultOptions = { dt: true, view: true, input: true };
        function toggle(state) { if (state !== show) {
            show = state === undefined ? !show : state;
            show ? document.body.appendChild(container) : document.body.removeChild(container);
        } }
        Debug.toggle = toggle;
        ;
        function log(data, persist) {
            if (persist === void 0) { persist = false; }
            var entry = JSON.stringify(data, null, '\t');
            persist ? permLog.push(entry) : logs.push(entry);
        }
        Debug.log = log;
        ;
        function clear() { permLog = []; }
        Debug.clear = clear;
        ;
        function draw(ctx, dT) { if (+new Date() - dTCounter < 250) {
            logs = [];
            return;
        } dTCounter = +new Date(); output.setAttribute('style', "font-size: " + Debug.fontSize + ";color: " + Debug.color + ";max-height: 100%;overflow: hidden;white-space: pre-wrap;"); output.innerHTML = ''; if (Debug.defaultOptions.dt) {
            output.innerHTML += "dT    : " + dT.toFixed(3) + "<br/>";
        } if (Debug.defaultOptions.view) {
            output.innerHTML += "View  :<br/>" + ("    x: " + World.area.view.x.toFixed(2) + ",<br/>") + ("    y: " + World.area.view.y.toFixed(2) + ",<br/>") + ("    z: " + World.area.view.z.toFixed(2) + "<br/>");
        } if (Debug.defaultOptions.input) {
            output.innerHTML += "Input : " + getInputData() + "<br/><br/>";
        } output.innerHTML += permLog.concat(logs).join('<br/>'); output.scrollTop = output.scrollHeight; logs = []; }
        Debug.draw = draw;
        ;
        function getInputData() { var str = []; str.push("<br/>    keyPressed = [" + Input.key.pressed.join(', ') + "]"); str.push("    mouseState ="); str.push("        x: " + Input.mouse.x); str.push("        y: " + Input.mouse.y); if (Input.mouse.left.pressed)
            str.push("    left.pressed"); if (Input.mouse.left.dragging)
            str.push("    left.dragging " + (Input.mouse.left.drag ? ' left.drag' : '')); if (Input.mouse.left.dragPts.length) {
            str.push("        left.dragPts: [<br/>" + Input.mouse.left.dragPts.reduce(function (str, p) { return str = (str.length > 200 ? '...' + str.substr(-200) : str) + '(' + p.x + ', ' + p.y + ')'; }, '') + "]");
        } if (Input.mouse.right.pressed)
            str.push("    right.pressed"); if (Input.mouse.right.dragging)
            str.push("    right.dragging " + (Input.mouse.right.drag ? 'right.drag' : '')); if (Input.mouse.right.dragPts.length) {
            str.push("        right.dragPts: [<br/>" + Input.mouse.right.dragPts.reduce(function (str, p) { return str = (str.length > 200 ? '...' + str.substr(-200) : str) + '(' + p.x + ', ' + p.y + ')'; }, '') + "]");
        } return str.join('<br/>'); }
        ;
    })(Debug = exports.Debug || (exports.Debug = {}));
    var Engine;
    (function (Engine) {
        var can, ctx, dT = 0, currentT = +new Date(), frameDur = 33, assets;
        Engine.preStep = function () { }, Engine.postStep = function () { }, Engine.preDraw = function () { }, Engine.postDraw = function () { };
        function getDelta() { return dT; }
        Engine.getDelta = getDelta;
        ;
        function getCanvasEl() { return can; }
        Engine.getCanvasEl = getCanvasEl;
        ;
        function getCanvasContext() { return ctx; }
        Engine.getCanvasContext = getCanvasContext;
        ;
        function getSprite(name, isCheck) {
            if (isCheck === void 0) { isCheck = false; }
            var asset = assets.sprites[name];
            if (!asset) {
                if (isCheck) {
                    return null;
                }
                else {
                    console.error("Bunas Engine Error: No sprite asset with name \"" + name + "\" found.");
                }
            }
            return asset;
        }
        Engine.getSprite = getSprite;
        ;
        function getBackground(name, isCheck) {
            if (isCheck === void 0) { isCheck = false; }
            var asset = assets.bgs[name];
            if (!asset) {
                if (isCheck) {
                    return null;
                }
                else {
                    console.error("Bunas Engine Error: No background asset with name \"" + name + "\" found.");
                }
            }
            return asset;
        }
        Engine.getBackground = getBackground;
        ;
        function getSound(name, isCheck) {
            if (isCheck === void 0) { isCheck = false; }
            var asset = assets.sounds[name];
            if (!asset) {
                if (isCheck) {
                    return null;
                }
                else {
                    console.error("Bunas Engine Error: No sound asset with name \"" + name + "\" found.");
                }
            }
            return asset;
        }
        Engine.getSound = getSound;
        ;
        var _externalCallback, delayLoad, delayInit, initComplete = false;
        document.onreadystatechange = function () { if (document.readyState === 'complete' && delayInit) {
            delayInit();
        } };
        function init(externalCallback, canEl, canWidth, canHeight) { if (initComplete) {
            console.error('Bunas Error: Engine instance has already been initalised');
            return;
        } if (document.readyState !== 'complete') {
            delayInit = init.bind(null, externalCallback, canEl, canWidth, canHeight);
            return;
        }
        else {
            delayInit = null;
            initComplete = true;
        } if (canEl) {
            can = (typeof canEl === 'string' ? document.getElementById(canEl) : canEl);
            if (canWidth) {
                can.width = canWidth;
            }
            if (canHeight) {
                can.height = canHeight;
            }
        }
        else {
            can = document.getElementsByTagName('canvas')[0];
            if (!can) {
                can = document.createElement('canvas');
                document.body.appendChild(can);
            }
            can.width = canWidth || window.innerWidth;
            can.height = canHeight || window.innerHeight;
        } Engine.cW = can.width; Engine.cH = can.height; ctx = can.getContext('2d'); ctx.imageSmoothingEnabled = false; Input.init(); World.area = new World.Area('globalArea'); World.area.open(); _externalCallback = externalCallback; if (delayLoad) {
            delayLoad();
        }
        else {
            initLoop();
        } }
        Engine.init = init;
        ;
        var loading = 0, assetTotal, spriteLoader, soundLoader, bgLoader;
        function preLoad(assets, loadingDrawFunc) { if (initComplete) {
            console.error('Bunas Error: Engine already initalised. Assets can only be preloaded when called before Engine.init()');
            return;
        } if (!loadingDrawFunc) {
            loadingDrawFunc = function (ctx, fractionLoaded) { ctx.strokeStyle = '#fff'; ctx.fillStyle = '#fff'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(625, 295, 140, (-Math.PI / 2), (-Math.PI / 2) + ((Math.PI * 2) * (1 - fractionLoaded)), false); ctx.stroke(); };
        } delayLoad = internalLoad.bind(null, assets, loadingDrawFunc); }
        Engine.preLoad = preLoad;
        function internalLoad(assetRoutes, loadingDrawFunc) { spriteLoader = assetRoutes.sprites || {}; soundLoader = assetRoutes.sounds || {}; bgLoader = assetRoutes.bgs || {}; assetTotal = Object.keys(spriteLoader).length + Object.keys(soundLoader).length + Object.keys(bgLoader).length; assetLoader(); advanceLoading(loadingDrawFunc); }
        ;
        function advanceLoading(loadScreen) { if (loading > 0) {
            ctx.clearRect(0, 0, Engine.cW, Engine.cH);
            loadScreen(ctx, loading / assetTotal);
            window.requestAnimationFrame(advanceLoading.bind(null, loadScreen));
        }
        else {
            assets = { sprites: spriteLoader, sounds: soundLoader, bgs: bgLoader };
            initLoop();
        } }
        ;
        function assetLoader() { for (var element in spriteLoader) {
            loading += 1;
            var spr = new Image();
            spr.src = spriteLoader[element];
            spriteLoader[element] = spr;
            spr.onload = function () { return loading -= 1; };
        } for (var element in bgLoader) {
            loading += 1;
            var bg = new Image();
            bg.src = bgLoader[element];
            bgLoader[element] = bg;
            bg.onload = function () { return loading -= 1; };
        } for (var element in soundLoader) {
            loading += 1;
            var sound = new Audio();
            sound.src = soundLoader[element];
            soundLoader[element] = sound;
            sound.volume = 0.1;
            sound.load();
            sound.oncanplaythrough = function () { return loading -= 1; };
        } }
        ;
        function initLoop() { _externalCallback(); loop(); }
        ;
        function loop() {
            var _this = this;
            setTimeout(function () { var newT = +new Date(); dT = (newT - currentT) / frameDur; currentT = newT; Engine.preStep(dT); World.step(dT); Engine.postStep(dT); Input.step(); ctx.clearRect(-1, -1, Engine.cW + 1, Engine.cH + 1); Engine.preDraw(ctx, dT); World.draw(ctx, dT); Debug.draw(ctx, dT); Input.drawCursor(ctx, dT); Engine.postDraw(ctx, dT); window.requestAnimationFrame(loop.bind(_this)); }, frameDur - (+new Date()) + currentT);
        }
        ;
    })(Engine = exports.Engine || (exports.Engine = {}));
    var Graphics;
    (function (Graphics) {
        ;
        function setImageSmoothing(on) { Engine.getCanvasContext().imageSmoothingEnabled = on; }
        Graphics.setImageSmoothing = setImageSmoothing;
        var TileSet = (function () {
            function TileSet(tileImage, tileWidth, tileHeight) {
                this.tileSet = typeof tileImage === 'string' ? Engine.getBackground(tileImage) : tileImage;
                this.width = tileWidth;
                this.height = tileHeight || this.tileSet.height;
            }
            ;
            TileSet.prototype.draw = function (ctx, canX, canY, tileNum) { ctx.save(); ctx.translate(canX, canY); var x = tileNum * this.width, y = 0; if (x >= this.tileSet.width) {
                y = Math.floor(x / this.tileSet.width) * this.height;
                x %= this.tileSet.width;
            } ctx.drawImage(this.tileSet, x, y, this.width, this.height, 0, 0, this.width, this.height); ctx.restore(); };
            ;
            return TileSet;
        }());
        Graphics.TileSet = TileSet;
        ;
        var SpriteSheet = (function () {
            function SpriteSheet(sprite, frTotal, duration) {
                if (frTotal === void 0) { frTotal = 1; }
                if (duration === void 0) { duration = 0; }
                this.frTotal = frTotal;
                this.frCurrent = 0;
                this.paused = false;
                this.reversed = false;
                this.onEnd = function () { };
                this.sprite = typeof sprite === 'string' ? Engine.getSprite(sprite) : sprite;
                this.width = this.sprite.width / frTotal;
                this.height = this.sprite.height;
                this.frDur = duration / frTotal;
            }
            ;
            Object.defineProperty(SpriteSheet.prototype, "frame", {
                get: function () { return Math.floor(this.frCurrent); },
                set: function (val) { this.frCurrent = val; },
                enumerable: true,
                configurable: true
            });
            SpriteSheet.prototype.draw = function (ctx, canX, canY, ang, scale) {
                if (ang === void 0) { ang = 0; }
                if (scale === void 0) { scale = [1, 1]; }
                if (typeof scale === 'number') {
                    scale = [scale, scale];
                }
                ctx.save();
                ctx.translate(canX + (this.width / 2), canY + (this.height / 2));
                ctx.scale(scale[0], scale[1]);
                ctx.rotate(ang);
                var currentFrame = Math.floor(this.frCurrent) * this.width;
                if (this.reversed) {
                    currentFrame = this.frTotal - currentFrame;
                }
                ctx.drawImage(this.sprite, currentFrame, 0, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
                if (this.frDur > 0 && !this.paused) {
                    this.frCurrent += this.frDur;
                    if (this.frCurrent >= this.frTotal) {
                        this.frCurrent = 0;
                    }
                }
                ctx.restore();
            };
            ;
            SpriteSheet.prototype.setDuration = function (frames, perFrame) {
                if (perFrame === void 0) { perFrame = false; }
                this.frDur = perFrame ? frames : frames / this.frTotal;
            };
            SpriteSheet.prototype.toggle = function (play) { if (typeof play === 'undefined') {
                this.paused = !this.paused;
            }
            else {
                this.paused = !play;
            } };
            ;
            SpriteSheet.prototype.reverse = function (runBackwards) { if (typeof runBackwards === 'undefined') {
                this.reversed = !this.reversed;
            }
            else {
                this.reversed = runBackwards;
            } };
            ;
            return SpriteSheet;
        }());
        Graphics.SpriteSheet = SpriteSheet;
        ;
        var VectorSprite = (function () {
            function VectorSprite(drawFunction, keyframeSet, duration) {
                if (keyframeSet === void 0) { keyframeSet = null; }
                if (duration === void 0) { duration = 30; }
                this.drawFunction = drawFunction;
                this.keyframeSet = keyframeSet;
                this.duration = duration;
                this.fr = 0;
                this.paused = false;
                this.onEnd = function () { };
            }
            ;
            VectorSprite.prototype.draw = function (ctx, x, y, ang) {
                if (ang === void 0) { ang = 0; }
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(ang);
                this.drawFunction(this.keyframeSet ? tween(this.keyframeSet, this.fr) : null, ctx);
                ctx.restore();
                if (this.paused) {
                    return;
                }
                this.fr += (1 / this.duration) * Engine.getDelta();
                if (this.fr > 1 || this.fr < 0) {
                    this.fr = (this.fr + 1) % 1;
                    this.onEnd();
                }
            };
            ;
            VectorSprite.prototype.setDuration = function (frames) { this.duration = this.duration < 0 ? frames * -1 : frames; };
            VectorSprite.prototype.toggle = function (play) { if (typeof play === 'undefined') {
                this.paused = !this.paused;
            }
            else {
                this.paused = !play;
            } };
            ;
            VectorSprite.prototype.reverse = function (runBackwards) { if ((typeof runBackwards === 'undefined') || (this.duration < 0 && !runBackwards) || (this.duration > 0 && runBackwards)) {
                this.duration *= -1;
            } };
            ;
            return VectorSprite;
        }());
        Graphics.VectorSprite = VectorSprite;
        ;
        var Emitter = (function (_super) {
            __extends(Emitter, _super);
            function Emitter(x, y, ang, power, rate) {
                var _this = _super.call(this, x, y) || this;
                _this.x = x;
                _this.y = y;
                _this.parts = [];
                _this.currentRate = 0;
                _this._size = [2, 2];
                _this._color = 'dodgerblue';
                _this._lifespan = [100, 100];
                _this._ang = [0, 0];
                _this._power = [1, 1];
                _this._rate = [10, 10];
                if (ang) {
                    _this._ang = _this.configRange(ang);
                }
                if (power) {
                    _this._power = _this.configRange(power);
                }
                if (rate) {
                    _this._rate = _this.configRange(rate);
                }
                return _this;
            }
            ;
            Object.defineProperty(Emitter.prototype, "gravity", {
                set: function (g) { if (typeof g === 'number') {
                    this._grav = new Physics.Vec(g, Math.PI / 2, true);
                }
                else {
                    this._grav = g;
                } },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Emitter.prototype, "angle", {
                set: function (a) { this._ang = this.configRange(a); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Emitter.prototype, "power", {
                set: function (a) { this._power = this.configRange(a); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Emitter.prototype, "rate", {
                set: function (a) { this._rate = this.configRange(a); },
                enumerable: true,
                configurable: true
            });
            Emitter.prototype.configRange = function (p) { if (typeof p === 'object') {
                return [p[0], p[1] - p[0]];
            }
            else {
                return [p, 0];
            } };
            Emitter.prototype.setParticle = function (size, color, lifespan) { this._size = this.configRange(size); if (color) {
                this._color = color;
            } if (lifespan) {
                this._lifespan = this.configRange(lifespan);
            } };
            Emitter.prototype.step = function (dt) {
                var _this = this;
                this.currentRate += dt;
                if (this.currentRate > this._rate[0]) {
                    for (var i = this._rate[0]; i < this.currentRate; i += this._rate[0]) {
                        var s = this._size[0] + (Math.random() * this._size[1]), c = this._color, l = this._lifespan[0] + (Math.random() * this._lifespan[1]), a = this._ang[0] + (Math.random() * this._ang[1]), p = this._power[0] + (Math.random() * this._power[1]);
                        this.parts.push(new Particle(this.x, this.y, s, c, l, new Physics.Vec(p, a, true), (this.currentRate - i) / this._rate[0]));
                    }
                    this.currentRate %= this._rate[0];
                    this.currentRate += Math.random() * this._rate[1];
                }
                this.parts.forEach(function (p, i) { p.lifespan -= dt; if (p.lifespan < 0) {
                    p.delete(_this.parts, i);
                } p.step(_this._grav); });
            };
            Emitter.prototype.draw = function (ctx, dt) { ctx.beginPath(); this.parts.forEach(function (p) { p.draw(ctx); }); ctx.fill(); };
            return Emitter;
        }(GameObject));
        Graphics.Emitter = Emitter;
        var Particle = (function () {
            function Particle(x, y, size, color, lifespan, velocity, offset) {
                if (size === void 0) { size = 2; }
                if (color === void 0) { color = 'black'; }
                if (lifespan === void 0) { lifespan = 1000; }
                if (offset === void 0) { offset = 1; }
                var _this = this;
                this.x = x;
                this.y = y;
                this.size = size;
                this.color = color;
                this.lifespan = lifespan;
                this.velocity = velocity;
                this.opacity = 1;
                if (!velocity) {
                    this.velocity = new Physics.Vec(0, 0);
                }
                this.x += this.velocity.scale(offset).x - (this.size / 2);
                this.y += this.velocity.scale(offset).y - (this.size / 2);
                if (this.size <= 2) {
                    this.draw = function (ctx) { ctx.moveTo(_this.x, _this.y); ctx.rect(_this.x, _this.y, _this.size, _this.size); if (_this.opacity < 1) {
                        ctx.globalAlpha = _this.opacity;
                    } if (ctx.strokeStyle !== _this.color) {
                        ctx.strokeStyle = _this.color;
                        ctx.stroke();
                        ctx.beginPath();
                    } ctx.globalAlpha = 1; };
                }
                else {
                    this.draw = function (ctx) { ctx.moveTo(_this.x, _this.y); ctx.arc(_this.x, _this.y, _this.size, 0, Math.PI * 2); if (_this.opacity < 1) {
                        ctx.globalAlpha = _this.opacity;
                    } if (ctx.fillStyle !== _this.color) {
                        ctx.fillStyle = _this.color;
                        ctx.fill();
                        ctx.beginPath();
                    } ctx.globalAlpha = 1; };
                }
            }
            ;
            Particle.prototype.step = function (gravity) { if (gravity) {
                this.velocity = this.velocity.add(gravity);
            } this.x += this.velocity.x; this.y += this.velocity.y; };
            Particle.prototype.delete = function (parts, i) { this.opacity -= 0.2; if (this.opacity <= 0)
                parts.splice(i, 1); };
            return Particle;
        }());
        function tween(keyframeSet, currentFrame) { var params = {}; for (var key in keyframeSet) {
            if (typeof keyframeSet[key] === 'number') {
                params[key] = keyframeSet[key];
            }
            else {
                params[key] = interpolate(keyframeSet[key], currentFrame);
            }
        } return params; }
        ;
        function interpolate(keyframe, currentFrame) { var nextKeyframe = 0; keyframe = keyframe; if (typeof keyframe[0] === 'number') {
            keyframe = keyframe.map(function (k, i) { return [i / keyframe.length, k]; });
        } for (var k = 0; k < keyframe.length; k++) {
            if (currentFrame < keyframe[k][0]) {
                nextKeyframe = k;
                break;
            }
        } var end = keyframe[nextKeyframe], start = keyframe[nextKeyframe === 0 ? keyframe.length - 1 : nextKeyframe - 1]; if (end[0] === 1) {
            end[0] = 0.9999;
        } var frameDiff = (1 + end[0] - start[0]) % 1; return Easings[start[2] || 'sine'](currentFrame - start[0], start[1], end[1] - start[1], frameDiff); }
        ;
        var Easings = { linear: function (t, b, c, d) { return b + (c * (t / d)); }, sine: function (t, b, c, d) { return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b; }, cubic: function (t, b, c, d) { return (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b; }, quad: function (t, b, c, d) { return (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * ((--t) * (t - 2) - 1) + b; }, quart: function (t, b, c, d) { return (t /= d / 2) < 1 ? c / 2 * t * t * t * t + b : -c / 2 * ((t -= 2) * t * t * t - 2) + b; }, quint: function (t, b, c, d) { return (t /= d / 2) < 1 ? c / 2 * t * t * t * t * t + b : c / 2 * ((t -= 2) * t * t * t * t + 2) + b; }, expo: function (t, b, c, d) { if (t == 0)
                return b; if (t == d)
                return b + c; if ((t /= d / 2) < 1)
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b; return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b; }, back: function (t, b, c, d) { return (t /= d / 2) < 1 ? c / 2 * (t * t * ((3.6) * t - 2.6)) + b : c / 2 * ((t -= 2) * t * (3.6 * t + 2.6) + 2) + b; }, bounce: function (t, b, c, d) { return t < d / 2 ? Easings.bounceIn(t * 2, 0, c, d) * .5 + b : Easings.bounceOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b; }, elastic: function (t, b, c, d) { var s = 1.70158; var p = 0; var a = c; if (t == 0)
                return b; if ((t /= d / 2) == 2)
                return b + c; if (!p)
                p = d * (.3 * 1.5); if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(c / a); if (t < 1)
                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b; return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b; }, circular: function (t, b, c, d) { return (t /= d / 2) < 1 ? -c / 2 * (Math.sqrt(1 - t * t) - 1) + b : c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b; }, sineIn: function (t, b, c, d) { return -c * Math.cos(t / d * (Math.PI / 2)) + c + b; }, cubicIn: function (t, b, c, d) { return c * (t /= d) * t * t + b; }, quadIn: function (t, b, c, d) { return c * (t /= d) * t + b; }, quartIn: function (t, b, c, d) { return c * (t /= d) * t * t * t + b; }, expoIn: function (t, b, c, d) { return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b; }, circularIn: function (t, b, c, d) { return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b; }, backIn: function (t, b, c, d) { return c * (t /= d) * t * (2.7 * t - 1.7) + b; }, bounceIn: function (t, b, c, d) { return c - Easings.bounceOut(d - t, 0, c, d) + b; }, elasticIn: function (t, b, c, d) { var s = 1.70158; var p = 0; var a = c; if (t == 0)
                return b; if ((t /= d) == 1)
                return b + c; if (!p)
                p = d * .3; if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(c / a); return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b; }, sineOut: function (t, b, c, d) { return c * Math.sin(t / d * (Math.PI / 2)) + b; }, cubicOut: function (t, b, c, d) { return c * ((t = t / d - 1) * t * t + 1) + b; }, quadOut: function (t, b, c, d) { return -c * (t /= d) * (t - 2) + b; }, quartOut: function (t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b; }, expoOut: function (t, b, c, d) { return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b; }, circularOut: function (t, b, c, d) { return c * Math.sqrt(1 - (t = t / d - 1) * t) + b; }, backOut: function (t, b, c, d) { return c * ((t = t / d - 1) * t * (2.7 * t + 1.7) + 1) + b; }, bounceOut: function (t, b, c, d) { if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            }
            else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            }
            else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            }
            else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            } }, elasticOut: function (t, b, c, d) { var s = 1.70158; var p = 0; var a = c; if (t == 0)
                return b; if ((t /= d) == 1)
                return b + c; if (!p)
                p = d * .3; if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(c / a); return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b; } };
    })(Graphics = exports.Graphics || (exports.Graphics = {}));
    var Input;
    (function (Input) {
        ;
        ;
        ;
        var CLICKCODE = ['left', 'middle', 'right'];
        var dragCheck = { tolerance: 40, originX: 0, originY: 0, dragPts: [] }, dblClickWait = 500, customCursor, clickableObjects = [];
        Input.mouse = { x: 0, y: 0, left: { down: false, up: false, doubleUp: false, pressed: false, drag: false, startDrag: false, endDrag: false, dragging: false, dragPts: [] }, right: { down: false, up: false, doubleUp: false, pressed: false, drag: false, startDrag: false, endDrag: false, dragging: false, dragPts: [] } }, Input.key = { up: null, down: null, pressed: [] };
        function init() { window.addEventListener('mousemove', onMouseMove.bind(this)); window.addEventListener('mousedown', onMouseDown.bind(this)); window.addEventListener('mouseup', onMouseUp.bind(this)); window.onkeydown = onKeyDown.bind(this); window.onkeyup = onKeyUp.bind(this); toggleContextMenu(false); }
        Input.init = init;
        ;
        function step() { emitClickableObjectEvents(); resetMouseButton(Input.mouse.left); resetMouseButton(Input.mouse.right); Input.key.down = null; Input.key.up = null; }
        Input.step = step;
        ;
        function setDragTolerance(tolerance) { dragCheck.tolerance = tolerance; }
        Input.setDragTolerance = setDragTolerance;
        ;
        function setDoubleClickWait(v) { dblClickWait = v; }
        Input.setDoubleClickWait = setDoubleClickWait;
        ;
        function toggleContextMenu(show) {
            if (show === void 0) { show = true; }
            if (show) {
                window.oncontextmenu = function (e) { };
            }
            else {
                window.oncontextmenu = function (e) { e.preventDefault(); };
            }
        }
        Input.toggleContextMenu = toggleContextMenu;
        ;
        function isPressed() {
            var keys = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                keys[_i] = arguments[_i];
            }
            return keys.some(function (k) { return Input.key.pressed.indexOf(k) !== -1; });
        }
        Input.isPressed = isPressed;
        ;
        function mouseInArea(a) { var view = a ? a.view : World.area.view; return { x: (Input.mouse.x / view.z) + view.x, y: (Input.mouse.y / view.z) + view.y }; }
        Input.mouseInArea = mouseInArea;
        function setCursor(cursor) { if (typeof cursor === 'string') {
            Engine.getCanvasEl().style.cursor = cursor;
        }
        else {
            Engine.getCanvasEl().style.cursor = 'none';
            customCursor = cursor;
        } }
        Input.setCursor = setCursor;
        ;
        function drawCursor(ctx, delta) { if (customCursor) {
            ctx.save();
            ctx.translate(Input.mouse.x, Input.mouse.y);
            customCursor(ctx, delta);
            ctx.restore();
        } }
        Input.drawCursor = drawCursor;
        ;
        function setMouseListener(g, width, height, circular, centered) {
            if (circular === void 0) { circular = false; }
            if (centered === void 0) { centered = false; }
            var x0, y0, x1, y1 = 0;
            if (circular) {
                x1 = y1 = width / 2;
                if (!centered) {
                    x0 = y0 = width / 2;
                }
            }
            else if (centered) {
                x0 = -width / 2;
                x1 = width / 2;
                y0 = -height / 2;
                y1 = height / 2;
            }
            else {
                x1 = width;
                y1 = height;
            }
            clickableObjects.push({ obj: g, x0: x0, x1: x1, y0: y0, y1: y1, circ: circular });
        }
        Input.setMouseListener = setMouseListener;
        ;
        function setMouseListenerFromSprite(g, sprite, centered) {
            if (centered === void 0) { centered = false; }
            setMouseListener(g, sprite.width, sprite.height, false, centered);
        }
        Input.setMouseListenerFromSprite = setMouseListenerFromSprite;
        ;
        function onMouseDown(e) { dragCheck.originX = e.clientX; dragCheck.originY = e.clientY; Input.mouse[CLICKCODE[e.button]].pressed = true; Input.mouse[CLICKCODE[e.button]].down = true; }
        ;
        function onMouseUp(e) { var b = Input.mouse[CLICKCODE[e.button]]; b.pressed = false; b.up = true; if (b.dragging) {
            b.endDrag = true;
            b.dragging = false;
        } if (b.dblCheck) {
            b.doubleUp = true;
            b.dblCheck = false;
        }
        else {
            b.dblCheck = true;
            setTimeout(function () { return b.dblCheck = false; }, dblClickWait);
        } }
        ;
        function onMouseMove(e) { Input.mouse.x = e.clientX; Input.mouse.y = e.clientY; checkDrag(Input.mouse.left); checkDrag(Input.mouse.right); }
        ;
        function checkDrag(b) { if (b.pressed) {
            if (!b.dragging) {
                if (Math.sqrt(Math.pow(Input.mouse.y - dragCheck.originY, 2) + Math.pow(Input.mouse.x - dragCheck.originX, 2)) > dragCheck.tolerance) {
                    b.dragging = true;
                    b.dragPts = [];
                    dragCheck.dragPts.forEach(function (p) { return b.dragPts.push({ x: p.x, y: p.y }); });
                    dragCheck.dragPts = [];
                }
                else {
                    dragCheck.dragPts.push({ x: Input.mouse.x, y: Input.mouse.y });
                }
            }
            else {
                b.drag = true;
                b.dragPts.push({ x: Input.mouse.x, y: Input.mouse.y });
            }
        } }
        ;
        function resetMouseButton(b) { b.down = false; b.up = false; b.doubleUp = false; b.drag = false; b.startDrag = false; b.endDrag = false; }
        ;
        function onKeyDown(e) { Input.key.down = e.code; if (Input.key.pressed.indexOf(e.code) === -1) {
            Input.key.pressed.push(e.code);
        } }
        ;
        function onKeyUp(e) { Input.key.up = e.code; Input.key.pressed.splice(Input.key.pressed.indexOf(e.code), 1); }
        ;
        function emitClickableObjectEvents() { clickableObjects.forEach(function (o) { if (o.obj.onMouseOver) {
            var clicked = void 0;
            if (o.circ) {
                clicked = Math.sqrt(Math.pow(Input.mouse.y - (o.obj.y + o.y0), 2) + Math.pow(Input.mouse.x - (o.obj.x + o.x0), 2)) < o.x1;
            }
            else {
                clicked = o.obj.x - o.x0 < Input.mouse.x && o.obj.x + o.x1 > Input.mouse.x && o.obj.y - o.y0 > Input.mouse.y && o.obj.y + o.y1 > Input.mouse.y;
            }
            if (clicked) {
                o.obj.onMouseOver.call(o.obj, Input.mouse);
            }
        } }); }
        ;
    })(Input = exports.Input || (exports.Input = {}));
    var Light;
    (function (Light) {
        var can0, ctx0, can1, ctx1, can2, ctx2;
        function lightEngineInit() { can0 = document.createElement('canvas'); ctx0 = can0.getContext('2d'); can1 = document.createElement('canvas'); ctx1 = can1.getContext('2d'); can2 = document.createElement('canvas'); ctx2 = can2.getContext('2d'); can0.width = can1.width = can2.width = Engine.cW; can0.height = can1.height = can2.height = Engine.cH; ctx0.imageSmoothingEnabled = false; ctx1.imageSmoothingEnabled = false; ctx2.imageSmoothingEnabled = false; }
        function angDiff(a0, a1) { var a = a0 - a1; a += (a > Math.PI) ? -2 * Math.PI : (a < -Math.PI) ? 2 * Math.PI : 0; return a; }
        ;
        function getAng(x, y) { return (6.2832 + Math.atan2(y, x)) % 6.2832; }
        ;
        var LightArea = (function () {
            function LightArea(area, bgLight) {
                if (bgLight === void 0) { bgLight = '#000'; }
                this.area = area;
                this.active = true;
                this.sources = [];
                this.blocks = [];
                if (!can1) {
                    lightEngineInit();
                }
                ctx0.fillStyle = bgLight;
            }
            Object.defineProperty(LightArea.prototype, "bgLight", {
                set: function (color) { ctx0.fillStyle = color; },
                enumerable: true,
                configurable: true
            });
            LightArea.prototype.addSource = function (source) {
                var _this = this;
                [].concat(source).forEach(function (s) { s.delete(); s.lightArea = _this; _this.sources.push(s); });
            };
            LightArea.prototype.addBlock = function (block) {
                var _this = this;
                [].concat(block).forEach(function (s) { s.delete(); s.lightArea = _this; _this.blocks.push(s); });
            };
            LightArea.prototype.draw = function (ctx) {
                var _this = this;
                if (!this.active) {
                    return;
                }
                ctx1.clearRect(0, 0, can1.width, can1.height);
                ctx2.save();
                ctx2.scale(this.area.view.z, this.area.view.z);
                ctx2.translate(-this.area.view.x, -this.area.view.y);
                this.sources.filter(function (s) { return (s.active && s.x + s.rad > _this.area.view.x && s.x - s.rad < _this.area.view.x + _this.area.view.width && s.y + s.rad > _this.area.view.y && s.y - s.rad < _this.area.view.y + _this.area.view.height); }).forEach(function (source) { if (!source.castShadows) {
                    ctx1.save();
                    ctx1.scale(_this.area.view.z, _this.area.view.z);
                    ctx1.translate(source.x - _this.area.view.x, source.y - _this.area.view.y);
                    ctx1.rotate(source.ang);
                    ctx1.globalCompositeOperation = 'soft-light';
                    ctx1.drawImage(source.mask, -source.rad, -source.rad);
                    ctx1.restore();
                }
                else {
                    var nearBlocks_1 = [], sourceInBlock_1 = false;
                    _this.blocks.forEach(function (block) { var dis = Math.pow(block.x + block.maskCenter.x - source.x, 2) + Math.pow(block.y + block.maskCenter.y - source.y, 2); if (dis < Math.pow(source.rad + block.clipRad, 2)) {
                        if (block.blockLightInside && dis < Math.pow(block.clipRad, 2)) {
                            sourceInBlock_1 = true;
                        }
                        for (var i = 0; i <= nearBlocks_1.length; i++) {
                            if (i === nearBlocks_1.length) {
                                nearBlocks_1.push([block, dis]);
                                break;
                            }
                            if (dis > nearBlocks_1[i][1]) {
                                nearBlocks_1.splice(i, 0, [block, dis]);
                                break;
                            }
                        }
                    } });
                    if (!sourceInBlock_1) {
                        ctx2.save();
                        ctx2.translate(source.x, source.y);
                        ctx2.rotate(source.ang);
                        ctx2.globalCompositeOperation = 'source-over';
                        ctx2.drawImage(source.mask, -source.rad, -source.rad);
                        ctx2.restore();
                        nearBlocks_1.map(function (b) { return b[0]; }).forEach(function (block) { var corners = []; if (block.mask) {
                            var poly = block.mask.map(function (m) { return { x: m.x + block.x - source.x, y: m.y + block.y - source.y }; }), diff = 3.1416 - getAng(block.x + block.maskCenter.x - source.x, block.y + block.maskCenter.y - source.y), sAng_1 = Math.sin(diff), cAng_1 = Math.cos(diff), max_1 = 3.1416, min_1 = 3.1416, maxP_1, minP_1;
                            poly.forEach(function (p) { var a = getAng((p.x * cAng_1) - (p.y * sAng_1), (p.x * sAng_1) + (p.y * cAng_1)); if (a > max_1) {
                                max_1 = a;
                                maxP_1 = p;
                            }
                            else if (a < min_1) {
                                min_1 = a;
                                minP_1 = p;
                            } });
                            corners.push({ x: minP_1.x + source.x, y: minP_1.y + source.y }, { x: maxP_1.x + source.x, y: maxP_1.y + source.y });
                        }
                        else {
                            var angDiff_1 = getAng(block.x - source.x, block.y - source.y);
                            corners.push({ x: block.x + (Math.cos(angDiff_1 - (Math.PI / 2)) * block.clipRad), y: block.y + (Math.sin(angDiff_1 - (Math.PI / 2)) * block.clipRad) }, { x: block.x + (Math.cos(angDiff_1 + (Math.PI / 2)) * block.clipRad), y: block.y + (Math.sin(angDiff_1 + (Math.PI / 2)) * block.clipRad) });
                        } var ang = Math.atan2(corners[1].y - source.y, corners[1].x - source.x); corners.push({ x: source.x + (source.rad * Math.cos(ang)), y: source.y + (source.rad * Math.sin(ang)) }); ang = Math.atan2(corners[0].y - source.y, corners[0].x - source.x); corners.push({ x: source.x + source.rad * Math.cos(ang), y: source.y + source.rad * Math.sin(ang) }); ctx2.beginPath(); ctx2.moveTo(corners[0].x, corners[0].y); ctx2.lineTo(corners[1].x, corners[1].y); ctx2.lineTo(corners[2].x, corners[2].y); ctx2.lineTo(corners[3].x, corners[3].y); var ang0 = Math.atan2(corners[2].y - source.y, corners[2].x - source.x); var ang1 = Math.atan2(corners[3].y - source.y, corners[3].x - source.x); ctx2.arc(source.x, source.y, source.rad, ang0, ang1, angDiff(ang0, ang1) > 0); ctx2.lineTo(corners[0].x, corners[0].y); ctx2.fillStyle = block.translucentColor; ctx2.globalCompositeOperation = 'destination-out'; ctx2.fill(); if (block.translucentColor === '#000') {
                            ctx2.save();
                            block.spriteMask(ctx2);
                            ctx2.restore();
                        } ctx2.globalCompositeOperation = 'source-atop'; ctx2.fill(); });
                        ctx1.globalCompositeOperation = 'lighter';
                        ctx1.drawImage(can2, 0, 0);
                        ctx2.save();
                        ctx2.setTransform(1, 0, 0, 1, 0, 0);
                        ctx2.clearRect(0, 0, can2.width, can2.height);
                        ctx2.restore();
                    }
                } });
                ctx2.restore();
                ctx0.globalCompositeOperation = 'source-over';
                ctx0.clearRect(0, 0, can0.width, can0.height);
                ctx0.fillRect(0, 0, can0.width, can0.height);
                ctx0.globalCompositeOperation = 'destination-out';
                ctx0.drawImage(can1, 0, 0);
                ctx.globalCompositeOperation = 'source-over';
                ctx.drawImage(can0, 0, 0);
                ctx.globalCompositeOperation = 'lighter';
                ctx.drawImage(can1, 0, 0);
                ctx.globalCompositeOperation = 'source-over';
            };
            return LightArea;
        }());
        Light.LightArea = LightArea;
        var Source = (function () {
            function Source(x, y, rad, color, castShadows, arc, edgeBlur) {
                if (color === void 0) { color = '#fff'; }
                if (castShadows === void 0) { castShadows = true; }
                if (arc === void 0) { arc = 6.2832; }
                if (edgeBlur === void 0) { edgeBlur = 0; }
                this.x = x;
                this.y = y;
                this.castShadows = castShadows;
                this.active = true;
                this.ang = 0;
                this._rad = rad;
                this._arc = arc;
                this._edgeBlur = edgeBlur;
                this.mask = document.createElement('canvas');
                this.maskCtx = this.mask.getContext('2d');
                this.mask.width = this.mask.height = rad * 2;
                this.color = color;
                if (!World.area.light) {
                    console.error('Bunas Light Error: Can\'t add Block before calling Area.toggleLight()');
                    return;
                }
                World.area.light.addSource(this);
                this.lightArea = World.area.light;
            }
            Object.defineProperty(Source.prototype, "rad", {
                get: function () { return this._rad; },
                set: function (newRad) { if (newRad < 1) {
                    this._rad = 1;
                    this.active = false;
                }
                else if (newRad !== this._rad) {
                    this._rad = newRad;
                    this.active = true;
                    this.mask.width = this.mask.height = newRad * 2;
                    this.setMask();
                } },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Source.prototype, "opacity", {
                get: function () { return parseInt(this._color.substr(7, 2), 16) / 255; },
                set: function (val) { var val16 = Math.floor(Math.max(0, Math.min(1, val)) * 255).toString(16); this.color = this._color.substring(0, 7) + (val16.length === 1 ? '0' + val16 : val16); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Source.prototype, "color", {
                get: function () { return this._color; },
                set: function (val) { if (val.length === 4) {
                    val = '#' + val[1] + val[1] + val[2] + val[2] + val[3] + val[3];
                }
                else if (val.length === 5) {
                    val = '#' + val[1] + val[1] + val[2] + val[2] + val[3] + val[3] + val[4] + val[4];
                } if (val.length === 7) {
                    val += 'ff';
                } this._color = val; this.transColor = val.substring(0, 7) + '00'; this.setMask(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Source.prototype, "arc", {
                set: function (newArc) { if (newArc !== this._arc) {
                    this._arc = newArc;
                    this.setMask();
                } },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Source.prototype, "edgeBlur", {
                set: function (newBlur) { if (newBlur !== this._edgeBlur) {
                    this._edgeBlur = newBlur;
                    this.setMask();
                } },
                enumerable: true,
                configurable: true
            });
            Source.prototype.setMask = function () { this.maskCtx.save(); this.maskCtx.translate(this._rad, this._rad); if (this.customMask) {
                this.customMask(this.maskCtx, this._rad, this._color);
            }
            else {
                this.maskCtx.beginPath();
                this.maskCtx.moveTo(0, 0);
                this.maskCtx.arc(0, 0, this._rad, this._arc / -2, this._arc / 2);
                this.maskCtx.lineTo(0, 0);
                if (this._arc < 6.282 && this._edgeBlur > 0) {
                    var blurX = Math.asin(this._arc / 2) * this._edgeBlur, blurY = Math.acos(this._arc / 2) * this._edgeBlur;
                    var grdLinTop = this.maskCtx.createLinearGradient(0, 0, blurX, blurY);
                    grdLinTop.addColorStop(0, this.transColor);
                    grdLinTop.addColorStop(1, this._color);
                    var grdLinBtm = this.maskCtx.createLinearGradient(0, 0, blurX, -blurY);
                    grdLinBtm.addColorStop(0, this.transColor);
                    grdLinBtm.addColorStop(1, this._color);
                    this.maskCtx.fillStyle = grdLinTop;
                    this.maskCtx.fill();
                    this.maskCtx.globalCompositeOperation = 'source-in';
                    this.maskCtx.fillStyle = grdLinBtm;
                    this.maskCtx.fill();
                }
                var grdRad = this.maskCtx.createRadialGradient(0, 0, 0, 0, 0, this._rad);
                grdRad.addColorStop(0, this._color);
                grdRad.addColorStop(1, this.transColor);
                this.maskCtx.fillStyle = grdRad;
                this.maskCtx.fill();
            } this.maskCtx.restore(); };
            Source.prototype.delete = function () { if (this.lightArea) {
                this.lightArea.sources.splice(this.lightArea.sources.indexOf(this), 1);
            } this.lightArea = null; };
            return Source;
        }());
        Light.Source = Source;
        var Block = (function () {
            function Block(x, y, mask, spriteMask, blockLightInside, translucentColor) {
                if (blockLightInside === void 0) { blockLightInside = false; }
                if (translucentColor === void 0) { translucentColor = '#000'; }
                var _this = this;
                this.x = x;
                this.y = y;
                this.blockLightInside = blockLightInside;
                this.translucentColor = translucentColor;
                this._ang = 0;
                if (!World.area.light) {
                    console.error('Bunas Error - Light: Tried to add Block before calling Area.toggleLight().');
                    return;
                }
                World.area.light.addBlock(this);
                this.lightArea = World.area.light;
                if (typeof mask === 'number') {
                    this.clipRad = mask;
                }
                else {
                    if (!Array.isArray(mask)) {
                        var w = mask.width / 2, h = mask.height / 2;
                        mask = [{ x: this.x - w, y: this.y - h }, { x: this.x + w, y: this.y - h }, { x: this.x + w, y: this.y + h }, { x: this.x - w, y: this.y + h }];
                    }
                    this.mask = mask;
                    var minX = this.mask.reduce(function (min, p) { return Math.min(min, p.x); }, this.mask[0].x), maxX = this.mask.reduce(function (max, p) { return Math.max(max, p.x); }, this.mask[0].x), minY = this.mask.reduce(function (min, p) { return Math.min(min, p.y); }, this.mask[0].y), maxY = this.mask.reduce(function (max, p) { return Math.max(max, p.y); }, this.mask[0].y);
                    this.clipRad = Math.sqrt(Math.pow(maxX - minX, 2) + Math.pow(maxY - minY, 2)) / 2;
                    this.maskCenter = { x: minX + ((maxX - minX) / 2), y: minY + ((maxY - minY) / 2) };
                }
                if (typeof spriteMask === 'undefined') {
                    if (typeof this.mask === 'number') {
                        this.spriteMask = function (ctx) { ctx.beginPath(); ctx.arc(_this.x, _this.y, _this.clipRad, 0, Math.PI * 2); ctx.fill(); };
                    }
                    else {
                        this.spriteMask = function (ctx) { ctx.translate(_this.x, _this.y); ctx.rotate(_this._ang); ctx.beginPath(); _this.mask.forEach(function (p) { return ctx.lineTo(p.x, p.y); }); ctx.closePath(); ctx.fill(); };
                    }
                }
                else if (typeof spriteMask === 'function') {
                    this.spriteMask = spriteMask;
                }
                else {
                    this.spriteMask = function (ctx) { ctx.save(); ctx.translate(_this.x, _this.y); ctx.rotate(_this._ang); ctx.drawImage(spriteMask, _this.x, _this.y); ctx.restore(); };
                }
            }
            Object.defineProperty(Block.prototype, "ang", {
                get: function () { return this._ang; },
                set: function (newVal) {
                    var _this = this;
                    if (newVal !== this._ang) {
                        if (this.mask) {
                            var xDiff_1 = Math.cos(newVal - this._ang), yDiff_1 = Math.sin(newVal - this._ang);
                            this.mask.forEach(function (p) { p.x -= _this.maskCenter.x, p.y -= _this.maskCenter.y; var newX = (p.x * xDiff_1) - (p.y * yDiff_1), newY = (p.x * yDiff_1) + (p.y * xDiff_1); p.x = newX + _this.maskCenter.x; p.y = newY + _this.maskCenter.y; });
                        }
                        this._ang = newVal;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Block.prototype.delete = function () { if (this.lightArea) {
                this.lightArea.blocks.splice(this.lightArea.blocks.indexOf(this), 1);
            } this.lightArea = null; };
            return Block;
        }());
        Light.Block = Block;
    })(Light = exports.Light || (exports.Light = {}));
    var Matter;
    (function (Matter) {
        var M = MatterJs, mainEng;
        function init(topDown) {
            if (topDown === void 0) { topDown = false; }
            mainEng = M.Engine.create();
            if (topDown) {
                mainEng.world.gravity.y = 0;
            }
            M.Engine.run(mainEng);
        }
        Matter.init = init;
        ;
        Matter.Query = { ray: function (area, start, end, width) {
                if (width === void 0) { width = 1; }
                return area.objs.filter(function (b) { return b instanceof BodyBase && M.Query.ray([b.body], start, end, width); }).map(function (b) { return b; });
            } };
        var BodyBase = (function (_super) {
            __extends(BodyBase, _super);
            function BodyBase(body) {
                var _this = _super.call(this, body.position.x, body.position.y) || this;
                _this.body = body;
                M.World.add(mainEng.world, body);
                return _this;
            }
            BodyBase.prototype.delete = function () { M.World.remove(mainEng.world, this.body); _super.prototype.delete.call(this); };
            BodyBase.prototype.rotate = function (ang, p) { M.Body.rotate(this.body, ang, p); };
            BodyBase.prototype.scale = function (x, y, p) { M.Body.scale(this.body, x, y, p); };
            BodyBase.prototype.translate = function (v, y) { if (typeof v === 'number') {
                v = M.Vector.create(v, y);
            } M.Body.translate(this.body, v); };
            BodyBase.prototype.applyForce = function (f, p) { M.Body.applyForce(this.body, p || this.body.position, f); };
            BodyBase.prototype.setProp = function (p, v) { if (typeof p === 'string') {
                M.Body.set(this.body, p, v);
            }
            else {
                for (var prop in p) {
                    M.Body.set(this.body, prop, p[prop]);
                }
            } };
            BodyBase.prototype.collisions = function (bodies) {
                var _this = this;
                if (!bodies) {
                    bodies = this.area.objs.filter(function (b) { return b instanceof BodyBase && b !== _this; }).map(function (b) { return b; });
                }
                return bodies.filter(function (b) { return M.Query.collides(_this.body, [b.body]).length; });
            };
            Object.defineProperty(BodyBase.prototype, "ang", {
                get: function () { return this.body.angle; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(BodyBase.prototype, "x", {
                get: function () { return this.body.position.x; },
                set: function (v) { this.body ? M.Body.setPosition(this.body, { x: v, y: this.body.position.y }) : ''; },
                enumerable: true,
                configurable: true
            });
            ;
            ;
            Object.defineProperty(BodyBase.prototype, "y", {
                get: function () { return this.body.position.y; },
                set: function (v) { this.body ? M.Body.setPosition(this.body, { x: this.body.position.x, y: v }) : ''; },
                enumerable: true,
                configurable: true
            });
            ;
            ;
            return BodyBase;
        }(GameObject));
        ;
        var Rect = (function (_super) {
            __extends(Rect, _super);
            function Rect(x, y, w, h) {
                var _this = _super.call(this, M.Bodies.rectangle(x, y, w, h || w, { frictionAir: 0 })) || this;
                _this.w = w;
                _this.h = h;
                if (typeof _this.h === 'undefined') {
                    _this.h = _this.w;
                }
                return _this;
            }
            Rect.prototype.draw = function (ctx) { ctx.translate(this.x - (this.w / 2), this.y - (this.h / 2)); ctx.rotate(this.ang); ctx.fillRect(0, 0, this.w, this.h); };
            return Rect;
        }(BodyBase));
        Matter.Rect = Rect;
        ;
        var Circ = (function (_super) {
            __extends(Circ, _super);
            function Circ(x, y, r) {
                var _this = _super.call(this, M.Bodies.circle(x, y, r, { frictionAir: 0 })) || this;
                _this.r = r;
                return _this;
            }
            Circ.prototype.draw = function (ctx) { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill(); };
            return Circ;
        }(BodyBase));
        Matter.Circ = Circ;
        ;
    })(Matter = exports.Matter || (exports.Matter = {}));
    var Physics;
    (function (Physics) {
        Physics.GRAV = 41.18, Physics.TAU = 6.2832;
        var globalCtx;
        var Vec = (function () {
            function Vec(xm, ya, polar) {
                if (xm === void 0) { xm = 1; }
                if (ya === void 0) { ya = 0; }
                if (polar === void 0) { polar = false; }
                if (polar) {
                    this.setMagAng(xm, ya);
                }
                else {
                    this.x = xm;
                    this.y = ya;
                }
            }
            Vec.prototype.setAng = function (rad) { var mag = this.getMag(); this.x = Math.cos(rad) * mag; this.y = Math.sin(rad) * mag; };
            Vec.prototype.setMagAng = function (mag, ang) { this.x = Math.cos(ang) * mag; this.y = Math.sin(ang) * mag; };
            Vec.prototype.getAng = function () { return Math.atan2(this.y, this.x); };
            Vec.getAng = function (v) { return Math.atan2(v.y, v.x); };
            Vec.prototype.getMag = function () { return Math.sqrt((this.x * this.x) + (this.y * this.y)); };
            Vec.getMag = function (v) { return Math.sqrt((v.x * v.x) + (v.y * v.y)); };
            Vec.prototype.getNorm = function () { var ang = this.getAng(); return new Vec(Math.cos(ang), Math.sin(ang)); };
            Vec.prototype.add = function (v) { return new Vec(this.x + v.x, this.y + v.y); };
            Vec.prototype.sub = function (v) { return new Vec(this.x - v.x, this.y - v.y); };
            Vec.prototype.scale = function (s) { return new Vec(this.x * s, this.y * s); };
            Vec.prototype.dot = function (v) { return (this.x * v.x) + (this.y * v.y); };
            Vec.prototype.dis = function (v) { var a = (v.x - this.x) * (v.x - this.x); var b = (v.y - this.y) * (v.y - this.y); return Math.sqrt(a + b); };
            Vec.prototype.angWith = function (v) { return Math.atan2(v.y - this.y, v.x - this.x); };
            Vec.prototype.toString = function () { var pos = '<' + Math.round(this.x) + ', ' + Math.round(this.y) + '>'; var mag = Math.round(this.getMag() * 100) / 100; var angR = Math.round(this.getAng() * 100) / 1000; var angD = Math.round(angR * (180 / Math.PI)); return ('Pos: ' + pos + '\nMag: ' + mag + '\nAng: ' + angR + ' rads / ' + angD + '°'); };
            Vec.prototype.clone = function () { return new Vec(this.x, this.y); };
            return Vec;
        }());
        Physics.Vec = Vec;
        var Context = (function () {
            function Context(fric, gravity) {
                if (fric === void 0) { fric = 0; }
                if (gravity === void 0) { gravity = false; }
                this.fric = fric;
                this.objs = [];
                if (gravity === true) {
                    this.grav = new Vec(0, Physics.GRAV);
                }
                else if (typeof gravity === 'number') {
                    this.grav = new Vec(0, gravity);
                }
                else {
                    this.grav = gravity;
                }
            }
            Context.prototype.addParticle = function (p) { this.objs.push(p); p.phyCtx = this; return p; };
            return Context;
        }());
        Physics.Context = Context;
        var Particle = (function (_super) {
            __extends(Particle, _super);
            function Particle(x, y, rad, fric, el, m) {
                if (fric === void 0) { fric = 0; }
                if (el === void 0) { el = 0.5; }
                if (m === void 0) { m = rad / 2; }
                var _this = _super.call(this, x, y, 0, rad) || this;
                _this.x = x;
                _this.y = y;
                _this.rad = rad;
                _this.fric = fric;
                _this.el = el;
                _this.m = m;
                _this.v = new Vec(0, 0);
                _this.f = new Vec(0, 0);
                _this.collisionAndBounce = function () { for (var i = 0, len = this.phyCtx.objs.length; i < len; i++) {
                    if ((this.phyCtx.objs[i] != this) && ((this.p.dis(this.phyCtx.objs[i].p) - (this.rad + this.phyCtx.objs[i].rad) < 0))) {
                        var delta = this.p.sub(this.phyCtx.objs[i].p);
                        var d = delta.getMag();
                        var mtd = delta.scale(((this.rad + this.phyCtx.objs[i].rad) - d) / d);
                        var im1 = 1 / this.m;
                        var im2 = 1 / this.phyCtx.objs[i].m;
                        this.p = this.p.add(mtd.scale(im1 / (im1 + im2)));
                        this.phyCtx.objs[i].p = this.phyCtx.objs[i].p.sub(mtd.scale(im2 / (im1 + im2)));
                        var iv = this.v.sub(this.phyCtx.objs[i].v);
                        mtd = mtd.getNorm();
                        var vn = iv.dot(mtd);
                        if (vn <= 0) {
                            var imp = ((-1 * vn) * (1 + this.el)) / (im1 + im2);
                            var impulse = mtd.scale(imp);
                            this.v = this.v.add(impulse.scale(im1));
                            this.phyCtx.objs[i].v = this.phyCtx.objs[i].v.sub(impulse.scale(im2));
                        }
                    }
                } };
                _this.p = new Vec(x, y);
                if (!globalCtx) {
                    globalCtx = new Context();
                }
                globalCtx.addParticle(_this);
                return _this;
            }
            Particle.prototype.step = function (delta) { if (this.phyCtx.grav) {
                this.applyForce(this.phyCtx.grav);
            } var friction = this.v.clone(); friction.setAng((friction.getAng() + Math.PI) % (2 * Math.PI)); friction = friction.scale(this.m * this.phyCtx.fric * this.fric); this.f = this.f.add(friction); this.f.scale(delta); this.v = this.v.add(this.f); if (this.v.getMag() > 0.1) {
                this.p = this.p.add(this.v);
                this.x = this.p.x;
                this.y = this.p.y;
            }
            else if (this.v.getMag() !== 0) {
                this.v = new Vec(0, 0);
            } this.f = new Vec(0, 0); this.collisionAndBounce(); };
            Particle.prototype.draw = function (ctx, dT) { ctx.beginPath(); ctx.strokeStyle = 'dodgerblue'; ctx.arc(this.p.x, this.p.y, this.rad - 2, 0, Physics.TAU); ctx.stroke(); };
            Particle.prototype.applyForce = function (F) { this.f = this.f.add(F); };
            return Particle;
        }(GameObject));
        Physics.Particle = Particle;
    })(Physics = exports.Physics || (exports.Physics = {}));
    var World;
    (function (World) {
        var areas = {}, currentAreas = [];
        function step(dT) { currentAreas.forEach(function (a) { return a.step(dT); }); }
        World.step = step;
        ;
        function draw(ctx, dT) { currentAreas.forEach(function (a) { return a.draw(ctx, dT); }); }
        World.draw = draw;
        ;
        function goTo(areaName, replace) {
            if (replace === void 0) { replace = true; }
            if (replace) {
                currentAreas.forEach(function (a) { return a.close(); });
            }
            areas[areaName].open();
        }
        World.goTo = goTo;
        ;
        var Area = (function () {
            function Area(name, persist, zIndex, onInit, onOpen, onClose) {
                if (persist === void 0) { persist = false; }
                if (zIndex === void 0) { zIndex = 0; }
                if (onInit === void 0) { onInit = function () { }; }
                if (onOpen === void 0) { onOpen = function () { }; }
                if (onClose === void 0) { onClose = function () { }; }
                this.name = name;
                this.persist = persist;
                this.onInit = onInit;
                this.onOpen = onOpen;
                this.onClose = onClose;
                this.objs = [];
                this.active = false;
                this.backgrounds = [];
                this.foregrounds = [];
                areas[name] = this;
                this.view = new View();
                this._zIndex = zIndex;
            }
            ;
            Object.defineProperty(Area.prototype, "zIndex", {
                get: function () { return this._zIndex; },
                set: function (newVal) { this._zIndex = newVal; currentAreas.sort(function (a, b) { return a.zIndex - b.zIndex; }); },
                enumerable: true,
                configurable: true
            });
            Area.prototype.addBackground = function (asset, isForeGround, zIndex, parralax, offset, repeat, customName) {
                if (isForeGround === void 0) { isForeGround = false; }
                if (zIndex === void 0) { zIndex = 0; }
                if (parralax === void 0) { parralax = 1; }
                if (offset === void 0) { offset = 0; }
                if (repeat === void 0) { repeat = true; }
                var bg = { name: customName || asset, img: Engine.getBackground(asset, true) || asset, parralax: typeof parralax === 'number' ? { x: parralax, y: parralax } : parralax, offset: typeof offset === 'number' ? { x: offset, y: offset } : offset, repeat: typeof repeat === 'boolean' ? { x: repeat, y: repeat } : repeat, z: zIndex };
                if (isForeGround) {
                    this.foregrounds.push(bg);
                    this.foregrounds.sort(function (a, b) { return a.z - b.z; });
                }
                else {
                    this.backgrounds.push(bg);
                    this.backgrounds.sort(function (a, b) { return a.z - b.z; });
                }
                return bg;
            };
            Area.prototype.removeBackground = function (bg) { if (typeof bg !== 'string') {
                bg = bg.name;
            } this.backgrounds.splice(this.backgrounds.findIndex(function (x) { return bg === x.name; }), 1); this.foregrounds.splice(this.foregrounds.findIndex(function (x) { return bg === x.name; }), 1); };
            Area.prototype.step = function (dT) { this.objs.forEach(function (o) { return o.startStep && o.startStep(dT); }); this.objs.forEach(function (o) { return o.step(dT); }); this.objs.forEach(function (o) { return o.endStep && o.endStep(dT); }); };
            Area.prototype.draw = function (ctx, dT) {
                var _this = this;
                ctx.save();
                this.view.update();
                ctx.scale(this.view.z, this.view.z);
                ctx.translate(-this.view.x, -this.view.y);
                this.drawBackgrounds(ctx, false);
                var visibleObjs = this.objs.filter(function (o) { if (o.x + o.clipBox.x + o.clipBox.width > _this.view.x && o.x + o.clipBox.x < _this.view.x + _this.view.width && o.y + o.clipBox.y + o.clipBox.height > _this.view.y && o.y + o.clipBox.y < _this.view.y + _this.view.height) {
                    o.inView = true;
                }
                else {
                    o.inView = false;
                } return o.inView; });
                visibleObjs.forEach(function (o) { return o.startDraw && o.startDraw(ctx, dT); });
                visibleObjs.forEach(function (o) { return o.draw(ctx, dT); });
                visibleObjs.forEach(function (o) { return o.endDraw && o.endDraw(ctx, dT); });
                ctx.restore();
                if (this.light) {
                    this.light.draw(ctx);
                }
                if (this.foregrounds.length) {
                    ctx.save();
                    ctx.scale(this.view.z, this.view.z);
                    ctx.translate(-this.view.x, -this.view.y);
                    this.drawBackgrounds(ctx, true);
                    ctx.restore();
                }
            };
            Area.prototype.drawBackgrounds = function (ctx, isForeground) {
                var _this = this;
                this[isForeground ? 'foregrounds' : 'backgrounds'].forEach(function (bg) { if (typeof bg.img === 'string') {
                    ctx.save();
                    ctx.fillStyle = bg.img;
                    ctx.fillRect(_this.view.x, _this.view.y, Engine.cW / _this.view.z, Engine.cH / _this.view.z);
                    ctx.restore();
                }
                else {
                    var x = (_this.view.x * bg.parralax.x) - bg.offset.x;
                    if (bg.repeat.x) {
                        x %= bg.img.width;
                    }
                    x = _this.view.x - x;
                    var xEnd = bg.repeat.x ? _this.view.x + Engine.cW : x + 1;
                    for (; x < xEnd; x += bg.img.width) {
                        var y = (_this.view.y * bg.parralax.y) - bg.offset.y;
                        if (bg.repeat.y) {
                            y %= bg.img.width;
                        }
                        y = _this.view.y - y;
                        var yEnd = bg.repeat.y ? _this.view.y + Engine.cH : y + 1;
                        for (; y < yEnd; y += bg.img.height) {
                            ctx.drawImage(bg.img, x, y);
                        }
                    }
                } });
            };
            Area.prototype.setLayout = function (grid, objs, cellWidth, cellHeight, x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.layout = { grid: grid, objects: objs, width: cellWidth, height: cellHeight || cellWidth, x: x, y: y };
            };
            ;
            Area.prototype.createLayout = function () {
                var _this = this;
                var grid = this.layout.grid.split('\n');
                var startCol = -1, startRow = -1;
                for (var i = 0; i < grid.length; i++) {
                    var m = grid[i].match(/[a-z0-9]/i);
                    if (m) {
                        if (startCol === -1) {
                            startCol = i;
                        }
                        if (m.index < startRow) {
                            startRow = m.index;
                        }
                    }
                }
                grid.forEach(function (l, row) { l.replace(/[a-z0-9]/gi, function (o, col) {
                    var _a;
                    try {
                        var obj = _this.layout.objects[o];
                        var inst = new ((_a = obj[0]).bind.apply(_a, [void 0].concat(obj.slice(1))))();
                        inst.x = _this.layout.x + ((col - startCol) * _this.layout.width);
                        inst.y = _this.layout.y + ((row - startRow) * _this.layout.height);
                        _this.add(inst);
                    }
                    catch (_b) {
                        console.error("Bunas Error: Cannot create object for character \"" + o + "\" in level layout");
                    }
                    return o;
                }); });
            };
            ;
            Area.prototype.open = function () { if (!this.active) {
                if (this.layout) {
                    this.createLayout();
                }
                this.onInit();
                this.view.reset();
                this.active = true;
            } currentAreas.push(this); currentAreas.sort(function (a, b) { return a.zIndex - b.zIndex; }); this.onOpen(); };
            ;
            Area.prototype.close = function () { currentAreas.splice(1, currentAreas.indexOf(this)); this.onClose(); if (!this.persist) {
                this.objs = [];
            } };
            ;
            Area.prototype.delete = function () { this.objs = []; if (this.light) {
                this.light.sources.forEach(function (s) { return s.delete(); });
                this.light.blocks.forEach(function (s) { return s.delete(); });
            } delete areas[this.name]; };
            Area.prototype.add = function (objs) {
                var _this = this;
                [].concat(objs).forEach(function (o) { if (o.area) {
                    o.area.remove(o);
                } for (var i = 0; true; i++) {
                    if (i === _this.objs.length || o.z > _this.objs[i].z) {
                        _this.objs.splice(i, 0, o);
                        break;
                    }
                } o.area = _this; });
            };
            ;
            Area.prototype.remove = function (o) { this.objs.splice(this.objs.indexOf(o), 1); o.area = null; };
            ;
            Area.prototype.zSort = function (o) { this.objs.splice(this.objs.indexOf(o), 1); for (var i = 0; true; i++) {
                if (i === this.objs.length || o.z > this.objs[i].z) {
                    this.objs.splice(i, 0, o);
                    break;
                }
            } };
            Area.prototype.togglePersistance = function (persist) { this.persist = persist === undefined ? !this.persist : persist; if (!this.persist && currentAreas.indexOf(this) === -1) {
                this.objs = [];
            } };
            ;
            Area.prototype.toggleLight = function (on) { if (!this.light) {
                this.light = new Light.LightArea(this);
            }
            else {
                this.light.active = typeof on === 'undefined' ? !this.light.active : on;
            } };
            ;
            return Area;
        }());
        World.Area = Area;
        ;
        var View = (function () {
            function View(x, y, _z) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (_z === void 0) { _z = 1; }
                this.x = x;
                this.y = y;
                this._z = _z;
                this.trackOn = false;
                this.initX = x;
                this.initY = y;
                this.initZ = _z;
                this.width = Engine.cW / _z;
                this.height = Engine.cH / _z;
            }
            ;
            Object.defineProperty(View.prototype, "z", {
                get: function () { return this._z; },
                set: function (val) { this._z = val; this.width = Engine.cW / val; this.height = Engine.cH / val; },
                enumerable: true,
                configurable: true
            });
            View.prototype.track = function (object, padding, trackSpeed, bound) {
                if (padding === void 0) { padding = 0; }
                if (trackSpeed === void 0) { trackSpeed = 0; }
                this.tracking = object;
                this.trackLag = trackSpeed;
                this.trackOn = true;
                if (bound) {
                    bound[2] += bound[0];
                    bound[3] += bound[1];
                    bound[2] -= this.width;
                    bound[3] -= this.height;
                    this.trackBound = bound;
                }
                if (typeof padding === 'number') {
                    this.trackPad = [padding, padding, padding, padding];
                }
                else if (padding.length === 2) {
                    this.trackPad = padding.concat(padding);
                }
                else {
                    this.trackPad = padding;
                }
            };
            View.prototype.toggleTracking = function (turnOn) { if (typeof turnOn === undefined) {
                this.trackOn = !this.trackOn;
            }
            else {
                this.trackOn = turnOn;
            } };
            View.prototype.update = function () { if (this.tracking) {
                if (this.tracking.y < this.y + this.trackPad[0]) {
                    this.y -= (this.y - this.tracking.y + this.trackPad[0]) * this.trackLag;
                }
                if (this.tracking.y > this.y + this.height - this.trackPad[2]) {
                    this.y += (this.tracking.y - (this.y + this.height - this.trackPad[2])) * this.trackLag;
                }
                if (this.tracking.x < this.x + this.trackPad[3]) {
                    this.x -= (this.x - this.tracking.x + this.trackPad[3]) * this.trackLag;
                    ;
                }
                if (this.tracking.x > this.x + this.width - this.trackPad[1]) {
                    this.x += (this.tracking.x - (this.x + this.width - this.trackPad[1])) * this.trackLag;
                    ;
                }
                if (this.trackBound) {
                    if (this.y < this.trackBound[1]) {
                        this.y = this.trackBound[1];
                    }
                    else if (this.y > this.trackBound[3]) {
                        this.y = this.trackBound[3];
                    }
                    if (this.x < this.trackBound[0]) {
                        this.x = this.trackBound[0];
                    }
                    else if (this.x > this.trackBound[2]) {
                        this.x = this.trackBound[2];
                    }
                }
                this.x = Math.floor(this.x);
                this.y = Math.floor(this.y);
            } };
            View.prototype.reset = function () { this.x = this.initX; this.y = this.initY; this.z = this.initZ; };
            return View;
        }());
        World.View = View;
        ;
    })(World = exports.World || (exports.World = {}));
});
define("Block", ["require", "exports", "Bunas", "main"], function (require, exports, Bunas_1, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var blockWidth, tileWidth, bgTileSet, fgTileSet, gemsTile, caveBg;
    var default_1 = (function (_super) {
        __extends(default_1, _super);
        function default_1(x, y, gem, hardness, blockLayout) {
            if (gem === void 0) { gem = -1; }
            var _this = _super.call(this, x, y, 0.1, blockWidth, { x: -tileWidth, y: -tileWidth, width: blockWidth * 2 }) || this;
            _this.hardness = hardness;
            _this.isCave = false;
            _this.tiles = {
                bgSet: bgTileSet,
                fgSet: fgTileSet,
                bgType: [0, 0, 0, 0],
                fgType: [0, 0, 0, 0],
                x: [0, 0, 0, 0],
                y: [0, 0, 0, 0]
            };
            _this.width = blockWidth;
            main_1.levelBlocks.push(_this);
            if (gem > -1) {
                var ang_1 = main_1.rand(6.28, 0), dist = main_1.rand(25, 0, true);
                _this.gem = {
                    type: gem,
                    ang: ang_1,
                    x: _this.x + tileWidth + (Math.cos(ang_1) * dist),
                    y: _this.y + tileWidth + (Math.sin(ang_1) * dist),
                    source: null,
                    edge: false
                };
                _this.gem.source = new Bunas_1.Light.Source(_this.gem.x, _this.gem.y, 1, main_1.gems[gem].color + '0', false);
                _this.gem.source.customMask = (function (ctx, rad, color) {
                    [
                        { r: 0.6, s: 0, f: 6.283 },
                        { r: 0.85, s: ang_1, f: 0.5 + ang_1 },
                        { r: 1, s: 2.3 + ang_1, f: 2.8 + ang_1 },
                        { r: 0.7, s: 4 + ang_1, f: 4.5 + ang_1 }
                    ].forEach(function (arc) {
                        var grdRad = ctx.createRadialGradient(0, 0, 0, 0, 0, rad * arc.r);
                        grdRad.addColorStop(0, color);
                        grdRad.addColorStop(1, color.substring(0, 7) + '00');
                        ctx.fillStyle = grdRad;
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.arc(0, 0, rad * arc.r, arc.s, arc.f);
                        ctx.lineTo(0, 0);
                        ctx.fill();
                    });
                }).bind(_this);
                _this.gem.source.active = false;
            }
            _this.randTile = main_1.rand(4, 0, true);
            _this.setTiles(blockLayout);
            return _this;
        }
        default_1.setDefaultWidths = function (width) {
            blockWidth = width;
            tileWidth = width / 2;
            bgTileSet = new Bunas_1.Graphics.TileSet('block_bg', blockWidth, blockWidth);
            fgTileSet = new Bunas_1.Graphics.TileSet('block_fg', tileWidth, tileWidth);
            gemsTile = new Bunas_1.Graphics.TileSet('gemsTile', tileWidth, tileWidth);
            caveBg = new Bunas_1.Graphics.TileSet('caveBg', 64, 64);
        };
        default_1.prototype.setTiles = function (blocks) {
            var _this = this;
            if (blocks === void 0) { blocks = []; }
            var prevType = [];
            if (!blocks.length) {
                if (this.hardness === 0) {
                    this.tiles.bgType.forEach(function (t) { return prevType.push(t); });
                }
                for (var y = -1; y <= 1; y++) {
                    var _loop_1 = function (x) {
                        if (x !== 0 || y !== 0) {
                            var checkX_1 = this_1.x + (tileWidth) + (x * blockWidth), checkY_1 = this_1.y + (tileWidth) + (y * blockWidth);
                            blocks.push(main_1.levelBlocks.some(function (b) { return b.checkCollision(checkX_1, checkY_1); }));
                        }
                    };
                    var this_1 = this;
                    for (var x = -1; x <= 1; x++) {
                        _loop_1(x);
                    }
                }
            }
            var tileOffset = tileWidth;
            this.tiles.x = [
                this.x - tileOffset,
                this.x + tileOffset,
                this.x - tileOffset,
                this.x + tileOffset
            ];
            this.tiles.y = [
                this.y - tileOffset,
                this.y - tileOffset,
                this.y + tileOffset,
                this.y + tileOffset
            ];
            if (blocks[1]) {
                if (blocks[3]) {
                    this.tiles.bgType[0] = blocks[0] ? 6 : 9;
                }
                else {
                    this.tiles.bgType[0] = 5;
                }
            }
            else {
                this.tiles.bgType[0] = blocks[3] ? 1 : 0;
            }
            if (this.tiles.bgType[0] === 1 || this.tiles.bgType[0] === 6) {
                this.tiles.x[0] += tileOffset;
            }
            if (this.tiles.bgType[0] === 5 || this.tiles.bgType[0] === 6) {
                this.tiles.y[0] += tileOffset;
            }
            if (blocks[1]) {
                if (blocks[4]) {
                    this.tiles.bgType[1] = blocks[2] ? 6 : 8;
                }
                else {
                    this.tiles.bgType[1] = 7;
                }
            }
            else {
                this.tiles.bgType[1] = blocks[4] ? 1 : 2;
            }
            if (this.tiles.bgType[1] === 7 || this.tiles.bgType[1] === 6) {
                this.tiles.y[1] += tileOffset;
            }
            if (blocks[3]) {
                if (blocks[6]) {
                    this.tiles.bgType[2] = blocks[5] ? 6 : 4;
                }
                else {
                    this.tiles.bgType[2] = 11;
                }
            }
            else {
                this.tiles.bgType[2] = blocks[6] ? 5 : 10;
            }
            if (this.tiles.bgType[2] === 11 || this.tiles.bgType[2] === 6) {
                this.tiles.x[2] += tileOffset;
            }
            if (blocks[4]) {
                if (blocks[6]) {
                    this.tiles.bgType[3] = blocks[7] ? 6 : 3;
                }
                else {
                    this.tiles.bgType[3] = 11;
                }
            }
            else {
                this.tiles.bgType[3] = blocks[6] ? 7 : 12;
            }
            var t = this.tiles.bgType;
            if (t[0] !== 6 || t[1] !== 6 || t[2] !== 6 || t[3] !== 6) {
                var tilePad = 8;
                var lightMask = [
                    {
                        x: t[0] === 0 || t[0] === 5 ? tilePad : 0,
                        y: t[0] === 0 || t[0] === 1 ? tilePad : 0
                    },
                    {
                        x: t[1] === 2 || t[1] === 7 ? blockWidth - tilePad : blockWidth,
                        y: t[1] === 1 || t[1] === 2 ? tilePad : 0
                    },
                    {
                        x: t[3] === 7 || t[3] === 12 ? blockWidth - tilePad : blockWidth,
                        y: t[3] === 11 || t[3] === 12 ? blockWidth - tilePad : blockWidth
                    },
                    {
                        x: t[2] === 5 || t[2] === 10 ? tilePad : 0,
                        y: t[2] === 10 || t[2] === 11 ? blockWidth - tilePad : blockWidth
                    }
                ];
                if (this.lightBlock) {
                    this.lightBlock.mask = lightMask;
                }
                else {
                    this.lightBlock = new Bunas_1.Light.Block(this.x, this.y, lightMask, this.draw.bind(this), true);
                }
            }
            if (this.gem && this.tiles.bgType.some(function (t) { return t !== 6; })) {
                this.gem.edge = true;
            }
            this.tiles.fgType = this.tiles.bgType.map(function (t) {
                switch (t) {
                    case 0:
                        t = 11;
                        break;
                    case 1:
                        t = [12, 13][_this.randTile % 2];
                        break;
                    case 2:
                        t = 14;
                        break;
                    case 3:
                        t = 6;
                        break;
                    case 4:
                        t = 9;
                        break;
                    case 5:
                        t = [21, 31][_this.randTile % 2];
                        break;
                    case 6:
                        t = [22, 23, 32, 33][_this.randTile];
                        break;
                    case 7:
                        t = t = [24, 34][_this.randTile % 2];
                        break;
                    case 8:
                        t = 36;
                        break;
                    case 9:
                        t = 39;
                        break;
                    case 10:
                        t = 41;
                        break;
                    case 11:
                        t = [42, 43][_this.randTile % 2];
                        break;
                    case 12:
                        t = 44;
                        break;
                }
                return t;
            });
            this.tiles.bgType = this.tiles.bgType.map(function (t, i) {
                if (prevType && (prevType[i] === 6 || prevType[i] > 14)) {
                    return 30;
                }
                return t + (15 * _this.hardness);
            });
            this.tiles.fgType = this.tiles.fgType.map(function (t, i) {
                if (prevType && (prevType[i] === 6 || prevType[i] > 14)) {
                    return t + 60;
                }
                return t + (60 * _this.hardness);
            });
        };
        default_1.prototype.break = function () {
            var _this = this;
            this.delete();
            this.isCave = true;
            this.z -= 0.1;
            this.tiles.bgSet = caveBg;
            this.tiles.bgType = [0, 1, 2, 3];
            var blocks = [];
            for (var y = -1; y <= 1; y++) {
                var _loop_2 = function (x) {
                    if (x !== 0 || y !== 0) {
                        var checkX_2 = this_2.x + (tileWidth) + (x * blockWidth), checkY_2 = this_2.y + (tileWidth) + (y * blockWidth);
                        blocks.push(main_1.levelBlocks.some(function (b) { return b.checkCollision(checkX_2, checkY_2); }));
                    }
                };
                var this_2 = this;
                for (var x = -1; x <= 1; x++) {
                    _loop_2(x);
                }
            }
            this.tiles.x = [
                this.x + (blocks[3] ? -16 : 8),
                this.x + tileWidth + (blocks[4] ? 0 : -24),
                this.x + (blocks[3] ? -16 : 8),
                this.x + tileWidth + (blocks[4] ? 0 : -24),
            ];
            this.tiles.y = [
                this.y + (blocks[1] ? -16 : 8),
                this.y + (blocks[1] ? -16 : 8),
                this.y + tileWidth + (blocks[6] ? 0 : -24),
                this.y + tileWidth + (blocks[6] ? 0 : -24)
            ];
            var dis = Math.pow(blockWidth * 1.5, 2);
            main_1.levelBlocks.forEach(function (b) {
                if (b.inView &&
                    (Math.pow(b.x - _this.x, 2) + Math.pow(b.y - _this.y, 2) < dis)) {
                    b.setTiles();
                }
            });
        };
        default_1.prototype.startDraw = function (ctx) {
            var _this = this;
            var _loop_3 = function (i) {
                if ([3, 4, 6, 8, 9].indexOf(this_3.tiles.bgType[i] % 15) > -1) {
                    this_3.tiles.bgSet.draw(ctx, this_3.tiles.x[i], this_3.tiles.y[i], this_3.tiles.bgType[i]);
                }
                else {
                    main_1.camera.focusDraw(this_3, function () { return _this.tiles.bgSet.draw(ctx, _this.tiles.x[i], _this.tiles.y[i], _this.tiles.bgType[i]); });
                }
            };
            var this_3 = this;
            for (var i = 0; i < 4; i++) {
                _loop_3(i);
            }
        };
        default_1.prototype.draw = function (ctx) {
            var _this = this;
            if (!this.isCave) {
                main_1.camera.focusDraw(this, function () {
                    _this.tiles.fgSet.draw(ctx, _this.x, _this.y, _this.tiles.fgType[0]);
                    _this.tiles.fgSet.draw(ctx, _this.x + tileWidth, _this.y, _this.tiles.fgType[1]);
                    _this.tiles.fgSet.draw(ctx, _this.x, _this.y + tileWidth, _this.tiles.fgType[2]);
                    _this.tiles.fgSet.draw(ctx, _this.x + tileWidth, _this.y + tileWidth, _this.tiles.fgType[3]);
                    if (!_this.isCave && _this.gem) {
                        ctx.save();
                        ctx.translate(_this.gem.x, _this.gem.y);
                        ctx.rotate(_this.gem.ang);
                        gemsTile.draw(ctx, blockWidth / -4, blockWidth / -4, _this.gem.type);
                        ctx.restore();
                    }
                });
            }
        };
        default_1.prototype.delete = function () {
            main_1.levelBlocks.splice(main_1.levelBlocks.indexOf(this), 1);
            if (this.lightBlock) {
                this.lightBlock.delete();
            }
            if (this.gem) {
                this.gem.source.delete();
            }
        };
        return default_1;
    }(Bunas_1.GameObject));
    exports.default = default_1;
});
define("layout", ["require", "exports", "main", "Block"], function (require, exports, main_2, Block_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var caveSpacing = 8.5, maxCaveOffset = 3, maxCaveR = 4, minCaveR = 2.6, varCaveR = 0.4, outOfPlaceGem = 0.05, gemDepthVary = 1.5, gemDensityMin = 0.2, gemDensityMax = 0.6;
    function default_2(width, height, cellW, startY) {
        Block_1.default.setDefaultWidths(cellW);
        var caves = [];
        for (var x = caveSpacing / 4; x < width; x += caveSpacing) {
            for (var y = -0.5; y < height; y += caveSpacing) {
                var caveR = maxCaveR - ((maxCaveR - minCaveR) * y / height), gem = Math.max(0, Math.min(main_2.gems.length - 1, Math.floor(main_2.rand(-1, gemDepthVary) + ((main_2.gems.length - gemDepthVary + 1) * y / height))));
                caves.push({
                    x: (x + main_2.rand(maxCaveOffset, -maxCaveOffset)) * cellW,
                    y: (y + main_2.rand(maxCaveOffset, -maxCaveOffset)) * cellW,
                    r: Math.pow(cellW * caveR * main_2.rand(1 + varCaveR, 1 - varCaveR), 2),
                    gem: gem,
                    gemNum: main_2.rand(gemDensityMax, gemDensityMin)
                });
            }
        }
        var layout = [];
        var _loop_4 = function (y) {
            layout.push([]);
            var _loop_5 = function (x) {
                layout[layout.length - 1].push(!caves.some(function (c) { return Math.pow((x * cellW) - c.x, 2) + Math.pow((y * cellW) - c.y, 2) < c.r; }));
            };
            for (var x = 0; x < width; x++) {
                _loop_5(x);
            }
        };
        for (var y = 0; y < height; y++) {
            _loop_4(y);
        }
        layout.forEach(function (row, y) {
            row.forEach(function (col, x) {
                if (col) {
                    var blockLayout = [];
                    for (var checkY = -1; checkY <= 1; checkY++) {
                        for (var checkX = -1; checkX <= 1; checkX++) {
                            if (checkX !== 0 || checkY !== 0) {
                                blockLayout.push(layout[y + checkY] && layout[y + checkY][x + checkX]);
                            }
                        }
                    }
                    var nearCave = caves.map(function (c) {
                        return {
                            dist: (Math.pow(c.x - (x * cellW), 2) + Math.pow(c.y - (y * cellW), 2)),
                            gem: c.gem,
                            gemNum: c.gemNum
                        };
                    })
                        .sort(function (a, b) { return a.dist - b.dist; })[0];
                    var r = main_2.rand(), gem = void 0;
                    if (r < outOfPlaceGem) {
                        gem = main_2.rand(main_2.gems.length, 0, true);
                    }
                    else if (r < nearCave.gemNum) {
                        gem = nearCave.gem;
                    }
                    else {
                        gem = -1;
                    }
                    var hardness = 0;
                    if (y > 20) {
                        hardness++;
                    }
                    new Block_1.default(x * cellW, (startY + y) * cellW, gem, hardness, blockLayout);
                }
            });
        });
    }
    exports.default = default_2;
});
define("Camera", ["require", "exports", "Bunas", "main"], function (require, exports, Bunas_2, main_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_3 = (function () {
        function default_3(mainView) {
            this.mainView = mainView;
            this._on = false;
            this.dist = Bunas_2.Engine.cH / 4;
            this.focus = 2;
            this.easeVal = 0;
            this.ease = 0;
            this.viewPort = { x: 0, y: 0, w: Bunas_2.Engine.cW, h: Bunas_2.Engine.cH };
            this.drawingPhoto = false;
            this.album = [];
            this.view = new Bunas_2.World.View();
            this.photoCan = document.createElement('canvas');
            this.photoCan.width = Bunas_2.Engine.cW / 3;
            this.photoCan.height = (Bunas_2.Engine.cW / 3) * 0.75;
            this.photoCtx = this.photoCan.getContext('2d');
        }
        Object.defineProperty(default_3.prototype, "on", {
            get: function () {
                return this._on;
            },
            set: function (isOn) {
                if (isOn) {
                    this.view.x = this.mainView.x;
                    this.view.y = this.mainView.y;
                    this.view.z = this.mainView.z;
                    Bunas_2.World.area.view = this.view;
                    this.ease = 1;
                }
                else {
                    this.ease = -1;
                }
                this._on = isOn;
            },
            enumerable: true,
            configurable: true
        });
        default_3.prototype.draw = function (ctx) {
            if (this._on) {
                var ratio = this.dist / Bunas_2.Engine.cW * 3, w = 800 * ratio, h = 600 * ratio, r = 20 * ratio;
                this.viewPort = {
                    x: this.view.x + ((Bunas_2.Engine.cW - w) / 2 / this.view.z),
                    y: this.view.y + ((Bunas_2.Engine.cH - h) / 2 / this.view.z),
                    w: w / this.view.z,
                    h: h / this.view.z
                };
                if (this.drawingPhoto) {
                    return;
                }
                ctx.save();
                if (this.ease !== 0) {
                    ctx.globalAlpha = Math.max(0, (this.easeVal - 0.3) * 3);
                    if (this.easeVal > 0) {
                        w /= this.easeVal;
                        h /= this.easeVal;
                        r /= this.easeVal;
                    }
                }
                ctx.save();
                ctx.translate((Bunas_2.Engine.cW - w) / 2, (Bunas_2.Engine.cH - h) / 2);
                ctx.beginPath();
                ctx.moveTo(0, r);
                ctx.arcTo(0, 0, r, 0, r);
                ctx.lineTo(w - r, 0);
                ctx.arcTo(w, 0, w, r, r);
                ctx.lineTo(w, h - r);
                ctx.arcTo(w, h, w - r, h, r);
                ctx.lineTo(r, h);
                ctx.arcTo(0, h, 0, h - r, r);
                ctx.closePath();
                ctx.restore();
                ctx.rect(Bunas_2.Engine.cW, 0, -Bunas_2.Engine.cW, Bunas_2.Engine.cH);
                ctx.fillStyle = '#000b';
                ctx.lineWidth = 2;
                ctx.fill();
                w *= 0.85;
                h *= 0.8;
                r *= 2;
                ctx.beginPath();
                ctx.moveTo((Bunas_2.Engine.cW / 2) - 20, Bunas_2.Engine.cH / 2);
                ctx.lineTo((Bunas_2.Engine.cW / 2) + 20, Bunas_2.Engine.cH / 2);
                ctx.moveTo(Bunas_2.Engine.cW / 2, (Bunas_2.Engine.cH / 2) - 20);
                ctx.lineTo(Bunas_2.Engine.cW / 2, (Bunas_2.Engine.cH / 2) + 20);
                ctx.translate((Bunas_2.Engine.cW / 2) - (w / 2), (Bunas_2.Engine.cH / 2) - (h / 2));
                ctx.moveTo(0, r);
                ctx.lineTo(0, 0);
                ctx.lineTo(r, 0);
                ctx.moveTo(w - r, 0);
                ctx.lineTo(w, 0);
                ctx.lineTo(w, r);
                ctx.moveTo(w, h - r);
                ctx.lineTo(w, h);
                ctx.lineTo(w - r, h);
                ctx.moveTo(r, h);
                ctx.lineTo(0, h);
                ctx.lineTo(0, h - r);
                ctx.moveTo(w, r * 3);
                ctx.lineTo(w, h - (r * 3));
                ctx.moveTo(r * 3, h);
                ctx.lineTo(w - (r * 3), h);
                ctx.rect(w - (r / 2), (r * 3) + ((this.dist - 100) / ((Bunas_2.Engine.cW / 3) - 100) * (h - (r * 6))), r, 4);
                ctx.rect((r * 3) + ((this.focus - 0.5) / 4 * (w - 4 - (r * 6))), h - (r / 2), 4, r);
                ctx.strokeStyle = '#0004';
                ctx.stroke();
                ctx.restore();
            }
        };
        default_3.prototype.step = function () {
            if (Bunas_2.Input.key.down === 'KeyM') {
                this.on = !this.on;
            }
            if (this.ease === 1) {
                this.target = {
                    x: main_3.guy.x - (this.view.width / 2) + (this.dist * Math.cos(main_3.guy.ang)),
                    y: main_3.guy.y + 28 - (this.view.height / 2) + (this.dist * Math.sin(main_3.guy.ang)),
                    z: 1.5
                };
                if (this.easeVal <= 1) {
                    this.easeVal += 0.05;
                    this.view.x += (this.target.x - this.view.x) * (this.easeVal / 2);
                    this.view.y += (this.target.y - this.view.y) * (this.easeVal / 2);
                    this.view.z += (this.target.z - this.view.z) * Math.pow(this.easeVal, 2);
                }
                else {
                    this.view.z = this.target.z;
                    this.ease = 0;
                }
            }
            else if (this.ease === -1) {
                if (this.easeVal >= 0) {
                    this.easeVal -= 0.1;
                    this.view.x += (this.mainView.x - this.view.x) * ((1 - this.easeVal) / 2);
                    this.view.y += (this.mainView.y - this.view.y) * ((1 - this.easeVal) / 2);
                    this.view.z += (this.mainView.z - this.view.z) * Math.pow(1 - this.easeVal, 2);
                    this.mainView.update();
                }
                else {
                    this.ease = 0;
                    Bunas_2.World.area.view = this.mainView;
                }
            }
            else {
                if (this._on) {
                    if (Bunas_2.Input.isPressed('ArrowUp') && this.dist < Bunas_2.Engine.cH / 1.5) {
                        this.dist += 20;
                    }
                    if (Bunas_2.Input.isPressed('ArrowDown') && this.dist > 100) {
                        this.dist -= 20;
                    }
                    if (Bunas_2.Input.isPressed('ArrowLeft') && this.focus > 0.5) {
                        this.focus -= 0.1;
                    }
                    if (Bunas_2.Input.isPressed('ArrowRight') && this.focus < 4.5) {
                        this.focus += 0.1;
                    }
                    if (this.drawingPhoto) {
                        this.takePhoto();
                        this.drawingPhoto = false;
                    }
                    if (Bunas_2.Input.key.down === 'Space') {
                        this.drawingPhoto = true;
                    }
                    this.view.x = main_3.guy.x - (this.view.width / 2) + (this.dist * Math.cos(main_3.guy.ang));
                    this.view.y = main_3.guy.y + 28 - (this.view.height / 2) + (this.dist * Math.sin(main_3.guy.ang));
                }
            }
        };
        default_3.prototype.focusDraw = function (obj, drawFunc) {
            var ctx = Bunas_2.Engine.getCanvasContext(), blur = 0.9 - Math.pow(1 - Math.abs((obj.z - this.focus) / 4), 3);
            blur = blur < 0. ? 0 : blur * 2;
            if (!this.on ||
                this.ease !== 0 ||
                !obj.checkCollision(this.viewPort.x, this.viewPort.y, this.viewPort.w, this.viewPort.h) ||
                blur === 0) {
                drawFunc.call(obj);
            }
            else {
                ctx.save();
                if (this.drawingPhoto) {
                    ctx.imageSmoothingEnabled = true;
                    ctx.filter = 'blur(' + blur + 'px)';
                    if (obj !== main_3.guy) {
                        drawFunc.call(obj, ctx);
                    }
                }
                else {
                    ctx.globalAlpha = 0.5;
                    ctx.save();
                    ctx.translate(0, -blur);
                    drawFunc.call(obj);
                    ctx.translate(0, 2 * blur);
                    drawFunc.call(obj);
                    ctx.restore();
                    drawFunc.call(obj);
                }
                ctx.restore();
            }
        };
        default_3.prototype.takePhoto = function () {
            var pad = 10;
            this.photoCtx.fillRect(0, 0, this.photoCan.width, this.photoCan.height);
            this.photoCtx.drawImage(Bunas_2.Engine.getCanvasEl(), ((this.viewPort.x - this.view.x) * this.view.z) + pad, ((this.viewPort.y - this.view.y) * this.view.z) + pad, (this.viewPort.w * this.view.z) - pad, (this.viewPort.h * this.view.z) - pad, 0, 0, this.photoCan.width, this.photoCan.height);
            var image = document.createElement('img');
            image.src = this.photoCan.toDataURL('image/png');
            image.style.position = 'fixed';
            image.style.top = '0px';
            image.style.left = '0px';
            document.body.appendChild(image);
            this.album.push(image);
        };
        return default_3;
    }());
    exports.default = default_3;
});
define("Guy", ["require", "exports", "Bunas", "main"], function (require, exports, Bunas_3, main_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Guy = (function (_super) {
        __extends(Guy, _super);
        function Guy(x, y) {
            var _this = _super.call(this, x, y, 2, 58) || this;
            _this.sprite = new Bunas_3.Graphics.SpriteSheet('guy_front', 8, 3);
            _this.glow = new Bunas_3.Light.Source(0, 0, 250, '#110', true);
            _this.glow2 = new Bunas_3.Light.Source(0, 0, 200, '#1108', false);
            _this.torch = new Bunas_3.Light.Source(0, 0, 600, '#110', true, 1, 10);
            _this.torch2 = new Bunas_3.Light.Source(0, 0, 400, '#1108', false, 1, 10);
            _this.ang = 0;
            _this.dx = 0;
            _this.dy = 0;
            _this.dirLeft = false;
            _this.speed = 0;
            _this.width = 58;
            return _this;
        }
        Guy.prototype.step = function () {
            var _this = this;
            var newAng = -1;
            if (this.y < main_4.seaLevel) {
                newAng = Math.PI * 0.5;
            }
            else {
                if (Bunas_3.Input.isPressed('KeyD')) {
                    if (Bunas_3.Input.isPressed('KeyS')) {
                        newAng = Math.PI * 0.25;
                    }
                    else if (Bunas_3.Input.isPressed('KeyW')) {
                        newAng = Math.PI * 1.75;
                    }
                    else {
                        newAng = 0;
                    }
                }
                else if (Bunas_3.Input.isPressed('KeyA')) {
                    if (Bunas_3.Input.isPressed('KeyS')) {
                        newAng = Math.PI * 0.75;
                    }
                    else if (Bunas_3.Input.isPressed('KeyW')) {
                        newAng = Math.PI * 1.25;
                    }
                    else {
                        newAng = Math.PI;
                    }
                }
                else if (Bunas_3.Input.isPressed('KeyS')) {
                    newAng = Math.PI * 0.5;
                }
                else if (Bunas_3.Input.isPressed('KeyW')) {
                    newAng = Math.PI * 1.5;
                }
            }
            if (newAng !== -1) {
                var angDiff = newAng - this.ang;
                if (angDiff > Math.PI) {
                    this.ang += 2 * Math.PI;
                }
                else if (angDiff < -Math.PI) {
                    this.ang -= 2 * Math.PI;
                }
                newAng = (newAng - this.ang) * (main_4.camera.on ? 0.02 : 0.08);
                this.ang += 1 - (1 - newAng) * (1 - newAng);
                if (main_4.camera.on) {
                    if (this.speed < 2) {
                        this.speed += 0.1;
                    }
                    else {
                        this.speed *= 0.9;
                    }
                }
                else if (this.speed < 15) {
                    this.speed += 1;
                }
                this.sprite.setDuration(main_4.camera.on ? 1.5 : 3);
            }
            else {
                if (Math.abs(this.speed) < 0.5) {
                    this.speed = 0;
                }
                this.speed *= 0.9;
                if (this.sprite.frame === 0 || this.sprite.frame === 4) {
                    this.sprite.setDuration(0);
                }
            }
            this.dx = Math.cos(this.ang) * this.speed;
            this.dy = this.y < main_4.seaLevel ? this.dy + 2 : Math.sin(this.ang) * this.speed;
            if (this.y > main_4.seaLevel && this.dy + this.y < main_4.seaLevel) {
                this.dy *= 2;
            }
            if (newAng !== -1) {
                this.dirLeft = this.dx < 0;
            }
            this.x += this.dx;
            this.y += this.dy;
            main_4.levelBlocks
                .forEach(function (b) {
                if (b.inView &&
                    b.checkCollision(_this.x, _this.y, _this.width, _this.width)) {
                    var xDiff = void 0, yDiff = void 0;
                    if (_this.dx > 0) {
                        xDiff = b.x - (_this.x + _this.width);
                    }
                    else {
                        xDiff = b.x + b.width - _this.x;
                    }
                    if (_this.dy > 0) {
                        yDiff = b.y - (_this.y + _this.width);
                    }
                    else {
                        yDiff = b.y + b.width - _this.y;
                    }
                    if (Math.abs(xDiff / _this.dx) < Math.abs(yDiff / _this.dy)) {
                        if (Math.abs(xDiff) > 2) {
                            _this.dx = 0;
                        }
                        _this.x += xDiff;
                    }
                    else {
                        if (Math.abs(yDiff) > 2) {
                            _this.dy = 0;
                        }
                        _this.y += yDiff;
                    }
                }
                if (b.gem && b.gem.edge) {
                    var d = Math.pow(_this.x - b.x, 2) + Math.pow(_this.y - b.y, 2), a = Math.atan2(_this.y - b.y, _this.x - b.x);
                    var aDiff = _this.ang - a + 3.14;
                    aDiff += (aDiff > Math.PI) ? -2 * Math.PI : (aDiff < -Math.PI) ? 2 * Math.PI : 0;
                    aDiff = Math.abs(aDiff);
                    b.gem.source.ang = aDiff * 0.2;
                    if (d < 50000 || (d < 150000 && aDiff < 0.4)) {
                        if (b.gem.source.rad < 45) {
                            var glow = 1 - (Math.sqrt(d) / 400);
                            b.gem.source.rad += ((10 + (glow * 70)) - b.gem.source.rad) / 8;
                            b.gem.source.opacity = 0.2 * glow;
                            b.gem.source.active = true;
                        }
                    }
                    else if (b.gem.source.rad > 10) {
                        b.gem.source.rad -= b.gem.source.rad / 20;
                        b.gem.source.opacity = 0.2 * ((b.gem.source.rad - 10) / 80);
                    }
                    else {
                        b.gem.source.active = false;
                    }
                }
            });
            if (!main_4.camera.on && Bunas_3.Input.key.down === 'Space') {
                var colX_1 = this.x + 30 + (40 * Math.cos(this.ang)), colY_1 = this.y + 30 + (40 * Math.sin(this.ang));
                main_4.levelBlocks.forEach(function (b) {
                    if (b.inView && b.checkCollision(colX_1, colY_1)) {
                        b.break();
                        _this.speed *= 0.5;
                    }
                });
            }
            this.torch.ang = this.ang;
            this.torch.x = this.x + 32 + (Math.cos(this.ang) * 24);
            this.torch.y = this.y + 36 + (Math.sin(this.ang) * 24);
            this.torch2.ang = this.torch.ang;
            this.torch2.x = this.torch.x;
            this.torch2.y = this.torch.y;
            this.glow.x = this.x + 29;
            this.glow.y = this.y + 29;
            this.glow2.x = this.x + 29;
            this.glow2.y = this.y + 29;
        };
        Guy.prototype.draw = function (ctx) {
            var _this = this;
            ctx.save();
            ctx.imageSmoothingEnabled = true;
            main_4.camera.focusDraw(this, function () {
                if (main_4.camera.on) {
                    ctx.globalAlpha *= 0.5;
                }
                _this.sprite.draw(ctx, _this.x - 32 - (Math.cos(_this.ang) * 18), _this.y - 32 - (Math.sin(_this.ang) * 18), _this.dirLeft ? -_this.ang : _this.ang, _this.dirLeft ? [1, -1] : 1);
            });
            ctx.imageSmoothingEnabled = false;
            ctx.restore();
        };
        return Guy;
    }(Bunas_3.GameObject));
    exports.default = Guy;
});
define("Fish", ["require", "exports", "Bunas", "main"], function (require, exports, Bunas_4, main_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Fish = (function (_super) {
        __extends(Fish, _super);
        function Fish(x, y) {
            var _this = _super.call(this, x, y, 1 + (Math.random() * 3), { width: 25, height: 13 }) || this;
            _this.speedSlow = 1.5;
            _this.speedFast = 4;
            _this.dx = _this.speedSlow;
            _this.dy = 0;
            _this.dir = 0;
            _this.turnTimer = 0;
            _this.sprite = Bunas_4.Engine.getSprite('fish_1');
            _this.blocker = new Bunas_4.Light.Block(_this.x, _this.y, [
                { x: -12, y: -5 },
                { x: -10, y: 5 },
                { x: -7, y: 0 },
                { x: -1, y: 3 },
                { x: 2, y: 6 },
                { x: 12, y: 2 },
                { x: 12, y: -4 },
                { x: 8, y: -6 },
                { x: 3, y: -6 },
                { x: -9, y: 0 }
            ], _this.drawWithAlpha.bind(_this), false, '#f0f2');
            _this.light = new Bunas_4.Light.Source(x, y, 50, '#f0f2', false);
            return _this;
        }
        Fish.prototype.step = function () {
            var _this = this;
            this.turnTimer++;
            if (this.turnTimer > 20) {
                var gxDiff = this.x - main_5.guy.x, gyDiff = this.y - main_5.guy.y;
                if ((gxDiff * gxDiff) + (gyDiff * gyDiff) < 15000) {
                    this.dir = Math.atan2(gyDiff, gxDiff);
                    this.dx = Math.cos(this.dir) * this.speedFast;
                    this.dy = Math.sin(this.dir) * this.speedFast;
                }
                else {
                    this.dir = this.dir + (Math.random() * Math.PI / 8) - Math.PI / 16;
                    this.dx = Math.cos(this.dir) * this.speedSlow;
                    this.dy = Math.sin(this.dir) * this.speedSlow;
                    this.turnTimer = 0;
                }
            }
            if (this.y < main_5.seaLevel || main_5.levelBlocks.some(function (b) { return b.checkCollision(_this.x + _this.dx, _this.y + _this.dy); })) {
                this.dir = this.dir + (Math.PI / 2);
                this.dx = Math.cos(this.dir) * this.speedSlow;
                this.dy = Math.sin(this.dir) * this.speedSlow;
                this.turnTimer = 0;
            }
            this.x += this.dx;
            this.y += this.dy;
            this.light.x = this.x + 12;
            this.light.y = this.y + 6;
            this.blocker.x = this.x + 12;
            this.blocker.y = this.y + 6;
            this.blocker.ang = this.dir;
        };
        Fish.prototype.drawWithAlpha = function (ctx, alpha) {
            var _this = this;
            if (alpha === void 0) { alpha = 1; }
            ctx.save();
            ctx.translate(this.x + 12, this.y + 6);
            ctx.rotate(this.dir);
            main_5.camera.focusDraw(this, function () { return ctx.drawImage(_this.sprite, -12, -6); });
            ctx.restore();
        };
        Fish.prototype.draw = function (ctx) {
            this.drawWithAlpha(ctx, 1);
        };
        return Fish;
    }(Bunas_4.GameObject));
    exports.default = Fish;
});
define("HUD", ["require", "exports", "Bunas", "main"], function (require, exports, Bunas_5, main_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_4 = (function () {
        function default_4() {
            this.air = 1;
            this.airDec = 0.0005;
            this.battery = 1;
            this.batteryIcon = Bunas_5.Engine.getSprite('icon_battery');
        }
        default_4.prototype.step = function () {
            if (main_6.guy.y > main_6.seaLevel + 50) {
                if (this.air > 0.01) {
                    this.air -= this.airDec;
                }
            }
            else if (this.air < 0.24) {
                this.air += 0.01;
            }
        };
        default_4.prototype.draw = function (ctx) {
            if (this.air < 0.24 && !main_6.camera.drawingPhoto) {
                ctx.save();
                ctx.filter = 'saturate(' + Math.floor(400 * this.air) + '%)';
                ctx.drawImage(Bunas_5.Engine.getCanvasEl(), 0, 0);
                ctx.restore();
            }
            if (!main_6.camera.drawingPhoto) {
                ctx.save();
                ctx.globalAlpha = 0.4;
                ctx.beginPath();
                ctx.moveTo(60, Bunas_5.Engine.cH - 60);
                ctx.lineTo(60, 60 + ((Bunas_5.Engine.cH - 120) * (1 - this.air)));
                ctx.strokeStyle = this.air < 0.25 ? '#FFF' : '#555';
                ctx.lineCap = 'round';
                ctx.lineWidth = 18;
                ctx.stroke();
                ctx.strokeStyle = this.air < 0.25 ? '#F6A' : '#AAF';
                ctx.lineCap = 'round';
                ctx.lineWidth = 22;
                ctx.stroke();
                ctx.restore();
            }
        };
        return default_4;
    }());
    exports.default = default_4;
});
define("main", ["require", "exports", "Bunas", "layout", "Camera", "Guy", "Fish", "HUD"], function (require, exports, Bunas_6, layout_1, Camera_1, Guy_1, Fish_1, HUD_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.levelBlocks = [], exports.score = { money: 0 };
    exports.seaLevel = 500, exports.gems = [
        { name: 'Aquamarine', color: '#19A', pureColor: '#4CD', value: 1 },
        { name: 'Rhodonite', color: '#C15', pureColor: '#F48', value: 3 },
        { name: 'Amethyst', color: '#A0C', pureColor: '#D0F', value: 8 },
        { name: 'Lapis', color: '#00C', pureColor: '#31F', value: 15 },
        { name: 'Amber', color: '#CA2', pureColor: '#FC5', value: 24 },
        { name: 'Jade', color: '#2A1', pureColor: '#5D4', value: 35 },
        { name: 'Obsidian', color: '#405', pureColor: '#738', value: 50 }
    ];
    var wave, wavePulse = 0;
    var RNG = [0x80000000, 1103515245, 12345, 29];
    function rand(to, from, int) {
        if (to === void 0) { to = 1; }
        if (from === void 0) { from = 0; }
        if (int === void 0) { int = false; }
        RNG[3] = (RNG[1] * RNG[3] + RNG[2]) % RNG[0];
        var num = from + ((to - from) * RNG[3] / RNG[0]);
        return int ? Math.floor(num) : num;
    }
    exports.rand = rand;
    ;
    Bunas_6.Engine.preLoad({
        sprites: {
            guy_front: 'assets/sprites/guy_front.png',
            fish_1: 'assets/sprites/fish_1.png',
            icon_battery: 'assets/sprites/icon_battery.png'
        },
        bgs: {
            bgTile: 'assets/sprites/bgTile.png',
            bgWave: 'assets/sprites/bgWave.png',
            fgTile: 'assets/sprites/fgTile.png',
            block_bg: 'assets/sprites/block_bg.png',
            block_fg: 'assets/sprites/block_fg.png',
            caveBg: 'assets/sprites/caveBg.png',
            gemsTile: 'assets/sprites/gemsTile.png'
        },
    });
    Bunas_6.Engine.init(start);
    function start() {
        Bunas_6.Input.setCursor('none');
        Bunas_6.World.area.addBackground('#6C8AA4');
        Bunas_6.World.area.addBackground('bgTile', false, 0, { x: 0.7, y: 1 }, 0, { x: true, y: false });
        wave = Bunas_6.World.area.addBackground('bgWave', false, 1, 1, { x: 0, y: exports.seaLevel - 17 }, { x: true, y: false });
        Bunas_6.World.area.toggleLight();
        Bunas_6.World.area.view.z = 1;
        Bunas_6.Debug.toggle();
        Bunas_6.Debug.defaultOptions.view = false;
        Bunas_6.Debug.defaultOptions.input = false;
        Bunas_6.Debug.log('WASD to move', true);
        Bunas_6.Debug.log('Space when next to blocks', true);
        Bunas_6.Debug.log('Swim to bottom left till you see fish, press M, then Arrow Keys and Space', true);
        var gridWidth = 60, gridHeight = 100, gridCellWidth = 96;
        layout_1.default(gridWidth, gridHeight, gridCellWidth, Math.ceil(exports.seaLevel / gridCellWidth) + 2);
        exports.guy = new Guy_1.default(500, 600);
        for (var i = 0; i < 100; i++) {
            new Fish_1.default(1900 + (Math.random() * 500), 2000 + (Math.random() * 500));
        }
        Bunas_6.World.area.view.track(exports.guy, [
            (Bunas_6.Engine.cH / 2) - 28,
            (Bunas_6.Engine.cW / 2) + 28,
            (Bunas_6.Engine.cH / 2) + 28,
            (Bunas_6.Engine.cW / 2) - 28
        ], 0.2, [0, 0, gridWidth * gridCellWidth, gridHeight * gridCellWidth]);
        exports.camera = new Camera_1.default(Bunas_6.World.area.view);
        exports.HUD = new HUD_1.default();
    }
    Bunas_6.Engine.postStep = function () {
        wavePulse += 0.01;
        wavePulse %= Math.PI * 2;
        wave.offset.x = -800 - (Math.sin(wavePulse) * 800);
        exports.camera.step();
        exports.HUD.step();
    };
    Bunas_6.Engine.preDraw = function (ctx) {
        var depth = Math.max(Math.min(1, (exports.guy.y - exports.seaLevel) / 4000), 0);
        Bunas_6.World.area.light.bgLight = 'rgba(25, 60, 100, ' + (1 - Math.pow(1 - depth, 3)) + ')';
    };
    Bunas_6.Engine.postDraw = function (ctx) {
        exports.camera.draw(ctx);
        exports.HUD.draw(ctx);
    };
});
