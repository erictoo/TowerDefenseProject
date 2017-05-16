const MG1 = require("Turret"),
    Tank3 = require("Tank3"),
    theMF = require("theMF"),
    testLoop = require("testLoop"),
    muzzleFlash = require("muzzleFlash"),
    eXplosion = require("eXplosion"),
    Enemy = require("Enemy"),
    autoGen = require("autoGen"),
    cD = require("commonData");

const delta = 1 / 60; //standard delta value

cc.Class({
    extends: cc.Component,

    properties: {
        MG1: cc.Prefab,
        Tank3: cc.Prefab,
        mf: cc.Prefab,
        ex: cc.Prefab,
        tLayer: cc.Node,
        eLayer: cc.Node,
        mLayer: cc.Node,
        xLayer: cc.Node,
        loop: cc.Node
    },
    
    cal: function () {
        var x = 1;
        for (var i=0; i<100000000; i++) {
            x += Math.random();
        }
        return x;
    },

    // use this for initialization
    onLoad: function () {

        var temp = autoGen.turretFormation;

        for (var j = 0, l = temp.length; j < l; j++) {
            this.buildTurret(temp[j].posX, temp[j].posY, temp[j].id);
        }

        this.timer = 0;
        this.frame = 0;
        this.serial = 1;

        this.flow = {
            enemy: [],
            y: [],
            frames: [],
            goal: [],
        };

        /*
        var newTurrent = cc.instantiate(this.MG1);
        newTurrent.x = 480;
        newTurrent.y = 70;
        newTurrent.getComponent("Turrent").init(0);
        this.tLayer.addChild(newTurrent);

        var newTurrent = cc.instantiate(this.MG1);
        newTurrent.x = 320;
        newTurrent.y = 575;
        newTurrent.getComponent("Turrent").init(0);
        this.tLayer.addChild(newTurrent);
        

        var newTurrent = cc.instantiate(this.MG1);
        newTurrent.x = 520;
        newTurrent.y = 575;
        newTurrent.getComponent("Turrent").init(1);
        this.tLayer.addChild(newTurrent);

        this.timer = 0;

        this.node.on('hello', function() {
            console.warn('loop end');
        });
        */
    },

    buildTurret: function(xx, yy, id) {
        var newTurrent = cc.instantiate(this.MG1);
        newTurrent.x = xx;
        newTurrent.y = yy;
        newTurrent.getComponent("Turret").init(id);

        if (yy > 320) newTurrent.getComponent("Turret").gun.rotation += 180;

        this.tLayer.addChild(newTurrent);
    },

    spawnEnemy: function(id) {
        var newEnemy = cc.instantiate(this.Tank3);
        var ry = Math.round(Math.random() * 250 + 200);
        newEnemy.x = -50;
        newEnemy.y = ry;
        newEnemy.getComponent("Enemy").init(id);
        newEnemy.getComponent("Enemy").serial = this.serial;
        this.serial++;
        this.eLayer.addChild(newEnemy);

        //record
        this.flow.enemy.push(id);
        this.flow.y.push(ry);
        this.flow.frames.push(this.frame);

        //console.log("spawn");

        // Test async
        //this.scheduleOnce(function () { console.log(this.cal()); }, 0);
        //this.loop.getComponent("testLoop").cal();
    },

    spawnMuzzleFlash: function(xx, yy, aa, id) {
        var newMF = cc.instantiate(this.mf);
        newMF.x = xx;
        newMF.y = yy;
        newMF.rotation = aa;
        newMF.getComponent("muzzleFlash").init(id);
        this.mLayer.addChild(newMF);

        //console.log("mf spawn: xx=" + xx + " / aa = " + aa);
    },

    spawnExplosion: function(xx, yy, id) {
        var newEX = cc.instantiate(this.ex);
        newEX.x = xx;
        newEX.y = yy;
        newEX.getComponent("eXplosion").init(id);
        this.xLayer.addChild(newEX);

        //console.log("mf spawn: xx=" + xx + " / aa = " + aa);
    },

    randomSpawn: function() {
        if (this.timer > 1) {
            this.timer = 0;
            this.spawnEnemy(this.getRandomInt(0, 1));

            //this.spawnExplosion(480, 320, 0);
        }
    },

    update: function (dt) {

        dt = delta; // make delta value to match exactly 1/60 second to emulate correctly

        this.timer += dt;
        this.randomSpawn();

        this.frame += 1;

        if (this.frame > 900) {
            console.log(this.flow);

            this.emulateGame(this.flow);
            this.node.active = false;
        }

        //if (this.frame > 300) this.node.active = false;

        var turrents = this.tLayer.getChildren();
        var enemies = this.eLayer.getChildren();
        var muzzleFlashes = this.mLayer.getChildren();
        var explosions = this.xLayer.getChildren();

        for (var i = 0; i < turrents.length; i++) {

                var vt = cc.v2(turrents[i].x, turrents[i].y);
                var closest = -1;
                var closestX = -1;
                var closestD = -1;
                var ti = turrents[i].getComponent("Turrent");

            if (ti.recoil == 0) { // check enemies distance only when the turrent is not in recoil mode

                for (var j = 0; j < enemies.length; j++) {

                    var ve = cc.v2(enemies[j].x, enemies[j].y);

                    var dist = cc.pDistance(vt, ve);

                    if (dist < ti.range) {
                        //enemies[j].getComponent("Tank3").tank.opacity = 50;
                        if (enemies[j].x > closestX) {
                            closestX = enemies[j].x;
                            closest = j;
                            closestD = dist;
                        }
                    } //else {
                        //enemies[j].getComponent("Tank3").tank.opacity = 255;
                    //}
                } // for j

                if (closest > -1) { // if there is an enemy in target range
                    var angle = Math.atan2(enemies[closest].x - turrents[i].x, enemies[closest].y - turrents[i].y) / Math.PI * 180 + 90;
                    if (angle < 0) angle += 360;
                    var nowAng = ti.gun.rotation;

                    if (angle > nowAng) {
                        nowAng += 10;
                        if (nowAng > angle) nowAng = angle;
                    } else {
                        nowAng -= 10;
                        if (nowAng < angle) nowAng = angle;
                    }

                    ti.gun.rotation = nowAng;

                    // Fire if ready
                    
                    if (ti.fire < 0 && nowAng == angle) { // Fire!!
                        ti.fire = ti.interval;
                        ti.recoil = 2;
                        ti.timer = 0;
                        var tm = ti.id;

                        if (ti.id == 0) tm = 3;
                        this.spawnMuzzleFlash(turrents[i].x, turrents[i].y, nowAng, tm);

                        if (ti.id == 1) {
                            this.spawnExplosion(enemies[closest].x, enemies[closest].y, 1);
                        }

                        if (ti.id == 0) {
                            var useAng = (nowAng - 90) / 180 * Math.PI;
                            var xx = enemies[closest].x + Math.sin(useAng) * 40;
                            var yy = enemies[closest].y + Math.cos(useAng) * 40;
                            this.spawnExplosion(xx, yy, 0);
                        }

                        enemies[closest].getComponent("Enemy").getHit(ti.damage);

                        if (ti.aoe) { // if the attack type is Area of Effect
                            for (j = 0; j < enemies.length; j++) {
                                if (j == closest) continue;
                                dist = cc.pDistance(cc.v2(enemies[closest].x, enemies[closest].y), cc.v2(enemies[j].x, enemies[j].y));
                                if (dist < ti.aoe) {
                                    enemies[j].getComponent("Enemy").getHit(ti.damage);
                                    this.spawnExplosion(enemies[j].x, enemies[j].y, 1);
                                }
                            }
                        }

                        //ti.mzf.rotation = nowAng;
                        //ti.mzf.opacity = 255;

                    } else { // Not Ready...
                        ti.fire -= dt;
                    }
                } // end if enemy in target range

            } // end if not in recoil mode



                //turrents[i].getComponent("Turrent").mzf.rotation = nowAng;

        } //for i

        //console.log("tanks: " + enemies.length);
        
        for (var j = 0; j < turrents.length; j++) {
            turrents[j].getComponent("Turrent").turrentUpdate(dt);
        }

        for (var j = 0; j < enemies.length; j++) {
            //enemies[j].getComponent("Enemy").moving(dt);
            var ej = enemies[j].getComponent("Enemy");

            enemies[j].x += ej.speed * dt;

            if (enemies[j].x > 960 + ej.radius) {
                var percent = Math.round(ej.hp / ej.maxhp * 100);
                var goalStr = ej.name + "(" + ej.serial + ") reaches the goal at frame " + this.frame + " with " + percent + "% Hit Point";
                console.log(goalStr);
                this.flow.goal.push(goalStr);
                enemies[j].destroy();
            }
        }

        for (var j = 0; j < muzzleFlashes.length; j++) {
            muzzleFlashes[j].getComponent("muzzleFlash").mfUpdate(dt);
        }

        for (var j = 0; j < explosions.length; j++) {
            explosions[j].getComponent("eXplosion").exUpdate(dt);
        }
    },
    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
   },
   emulateGame: function(flow) { // Emulate the game without visual effects
       var frame = 0,
        place = 0,
        serial = 1,
        dt = delta,
        turrets = autoGen.turretFormation,
        enemies = [];

        // init turrets
        for (var k = 0; k < turrets.length; k++) {
            var tx = cD.turretSpecifications[turrets[k].id];
            turrets[k].range = tx.range;
            turrets[k].interval = tx.interval;
            turrets[k].fire = -1;
            turrets[k].damage = tx.damage;
            turrets[k].aoe = tx.aoe;
            turrets[k].recoilT = tx.recoilT * 2; // The real recoil includes backward and forward
            turrets[k].recoil = 0;
            turrets[k].timer = 0;
            turrets[k].x = turrets[k].posX;
            turrets[k].y = turrets[k].posY;

            if (turrets[k].posY > 320) {
                turrets[k].r = 180;
            } else {
                turrets[k].r = 0;
            }

            console.log(turrets[k]);
        }


       for (var i = 1; i < 901; i++) {
            if (flow.frames[place] == i) {
                var ex = cD.enemyData[flow.enemy[place]];
                var newEnemy = {
                    id: flow.enemy[place],
                    x: -50,
                    y: flow.y[place],
                    speed: ex.speed,
                    hp: ex.hp,
                    maxhp: ex.hp,
                    radius: ex.radius,
                    name: ex.name,
                    serial: serial,
                }
                enemies.push(newEnemy);
                place++;
                serial++;
                //console.warn("spawn");
                //console.log(newEnemy);
                //console.log("i:"+i+", place:"+place);
            } // if

            for (var m = 0; m < turrets.length; m++) {
                //var turrets[m] = turrets[m];

                if (turrets[m].recoil == 0) {

                    for (var n = 0; n < enemies.length; n++) {
                        var ej = enemies[n];
                        var dist = cc.pDistance(cc.v2(turrets[m].x, turrets[m].y), cc.v2(ej.x, ej.y));
                        var closest = -1, closestX = -1;
                        if (dist <= turrets[m].range) {
                            if (ej.x > closestX) {
                                closestX = ej.x;
                                closest = n;
                            }
                        }
                    } // for n

                    if (closest > -1) {
                        //console.log("in range");
                        var ec = enemies[closest];
                        var angle = Math.atan2(ec.x - turrets[m].x, ec.y - turrets[m].y) / Math.PI * 180 + 90;
                        if (angle < 0) angle += 360;
                        var nowAng = turrets[m].r;

                        if (angle > nowAng) {
                            nowAng += 10;
                            if (nowAng > angle) nowAng = angle;
                        } else {
                            nowAng -= 10;
                            if (nowAng < angle) nowAng = angle;
                        }

                        turrets[m].r = nowAng;

                        // fire if ready

                        //console.log(m + " : " + turrets[m].fire);

                        if (turrets[m].fire < 0 && nowAng == angle) {
                            turrets[m].fire = turrets[m].interval;
                            turrets[m].recoil = 2;
                            turrets[m].timer = 0;

                            enemies[closest].hp -= turrets[m].damage;
                            //console.log("fire");
                            
                            if (turrets[m].aoe) {
                                for (var j = 0; j < enemies.length; j++) {
                                    if (j == closest) continue;
                                    var dist = cc.pDistance(cc.v2(enemies[closest].x, enemies[closest].y), cc.v2(enemies[j].x, enemies[j].y));
                                    if (dist < turrets[m].aoe) {
                                        enemies[j].hp -= turrets[m].damage;
                                        console.log("(" + enemies[j].serial + ") " + enemies[j].hp + " - " + turrets[m].damage + " damage / aoe=" + turrets[m].aoe);
                                    }
                                }
                            }

                            for (var j = 0; j < enemies.length; j++) {
                                if (enemies[j].hp <= 0) {
                                    enemies.splice(j, 1);
                                    j--;
                                }
                            }
                        } else {
                            turrets[m].fire -= delta;
                        }
                    }

                } // if recoil

                if (turrets[m].recoil == 2) {
                    turrets[m].timer += delta;
                    if (turrets[m].timer > turrets[m].recoilT) turrets[m].recoil = 0;
                }
            } // for m

            for (var j = 0; j < enemies.length; j++) {
                var ej = enemies[j];

                enemies[j].x += ej.speed * delta;

                if (enemies[j].x > 960 + ej.radius) {
                    var percent = Math.round(ej.hp / ej.maxhp * 100);
                    var goalStr = "EMU: " + ej.name + "(" + ej.serial + ") reaches the goal at frame " + i + " with " + percent + "% Hit Point";
                    console.log(goalStr);
                    //console.log(enemies[j]);
                    enemies.splice(j, 1);
                    j--;
                }
            }
            //for (var j = 0, l = flow.enemy.length; j < l; j++) {
            //}
       } // for i
   }
});
