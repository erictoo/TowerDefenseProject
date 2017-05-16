const db = require("commonData"),
    //dbt = require("commonData").turretSpecifications,
    //dbe = require("commonData").enemyData,
    ag = require("autoGen"),
    Enemy = require("Enemy"),
    fixedDelta = 1 / 60;

var frame = 0,
    td = {
        turrets: [],
        enemies: [],
        preview: [],
    },             // all Turrets, Enemies and Previews data
    record = {
        f: [],
        p: [],
        y: [],
        t: [],
        g: [],
    },
    waven = 0,
    wavem = 100,
    tSerial = 1,    // Turret Serial
    eSerial = 1,    // Enemy Serial
    gaming = true;    // True = playing a real game, False = running a simulation

var getRandomInt = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

cc.Class({
    extends: cc.Component,

    properties: {
        mLayer: cc.Node,    // Muzzle Flash Effects Layer
        mPrefab: cc.Prefab,

        tLayer: cc.Node,    // Turrets Layer
        tPrefab: cc.Prefab,

        eLayer: cc.Node,    // Enemies Layer
        ePrefab: cc.Prefab,

        xLayer: cc.Node,    // Explosion Effects Layer
        xPrefab: cc.Prefab,

        preLayer: cc.Node,

        eLabel: cc.Label,

        //tTest: cc.Prefab,
    },

    start: function() {
        this.initTower();

        /*
        let newT = cc.instantiate(this.tTest);
        newT.x = 480;
        newT.y = 320;
        newT.getComponent("expoTest").init();
        this.tLayer.addChild(newT);
        */
    },

    initTower: function () {
        let agtf = ag.turretFormation;
        for (let k = 0; k < agtf.length; k++) {
            this.buildTower(agtf[k].posX, agtf[k].posY, agtf[k].id, agtf[k].name, tSerial++);
        }

        //this.spawnEnemy(this.randomY(), 1, eSerial++);
        console.log(td);
    },

    buildTower: function (posX, posY, id, name, serial) {
        let dbt = db.turretSpecifications[id],
            temp = {
                x: posX,
                y: posY,
                id: id,
                name: name,
                serial: serial,
                range: dbt.range,
                damage: dbt.damage,
                fire: dbt.interval * 60,
                interval: dbt.interval * 60,
                aoe: dbt.aoe,
                recoilT: dbt.recoilT,
                recoil: 0,
                rotation: posY > 320 ? 270 : 90,
            };
        td.turrets.push(temp);

        if (gaming) {
            let newTurret = cc.instantiate(this.tPrefab);
            newTurret.x = posX;
            newTurret.y = posY;
            newTurret.getComponent("Turret").init(id);
            //if (posY > 320) newTurret.getComponent("Turret").gun.rotation += 180;
            newTurret.getComponent("Turret").gun.rotation = temp.rotation;
            this.tLayer.addChild(newTurret, 1, serial);
        }
    },

    spawnPreview: function(posY, id, serial) {
        let dbe = db.enemyData[id],
            temp = {
                x: -50,
                y: posY,
                id: id,
                serial: serial,
                hp: dbe.hp,
                maxhp: dbe.hp,
                speed: dbe.speed / 2,
                radius: dbe.radius,
                name: dbe.name,
                change: true,
            };
        td.preview.push(temp);

        this.spawnEnemy(posY, id, serial);

        /*
        record.p.push(frame);
        record.y.push(posY);
        record.t.push(id);
        */

        if (gaming) {
            let newEnemy = cc.instantiate(this.ePrefab);
            newEnemy.x = temp.x;
            newEnemy.y = temp.y;
            newEnemy.getComponent(Enemy).initPreview(id);
            this.preLayer.addChild(newEnemy, 1, serial);
        }
    },

    spawnEnemy: function(posY, id, serial) {
        let dbe = db.enemyData[id],
            temp = {
                //x: 270,
                x: -420,
                y: posY,
                id: id,
                serial: serial,
                hp: dbe.hp,
                maxhp: dbe.hp,
                speed: dbe.speed,
                radius: dbe.radius,
                name: dbe.name,
            };
        td.enemies.push(temp);

        record.f.push(frame);
        record.y.push(posY);
        record.t.push(id);

        if (gaming) {
            let newEnemy = cc.instantiate(this.ePrefab);
            newEnemy.x = temp.x;
            newEnemy.y = temp.y;
            newEnemy.getComponent(Enemy).init(id);
            this.eLayer.addChild(newEnemy, 1, serial);
        }
    },

    spawnMuzzleFlash: function(posX, posY, angle, id) {
        let newMF = cc.instantiate(this.mPrefab);
        newMF.x = posX;
        newMF.y = posY;
        newMF.rotation = angle;
        newMF.getComponent("muzzleFlash").init(id);
        this.mLayer.addChild(newMF);
    },

    checkFire: function() {

        for (let i = 0, li = td.turrets.length; i < li; i++) {
            let ti = td.turrets[i],
            closest = -1,
            closestX = -1;

            if (ti.recoil == 0) {

                for (let j = 0, lj = td.enemies.length; j < lj; j++) {
                    let ej = td.enemies[j];
                    let dist = cc.pDistance(cc.v2(ti.x, ti.y), cc.v2(ej.x, ej.y));

                    if (dist <= ti.range && ej.x > closestX) {
                        closestX = ej.x;
                        closest = j;
                    }
                } // for j - enemies

                if (closest > -1) {
                    let ec = td.enemies[closest];
                    var angle = Math.atan2(ec.x - ti.x, ec.y - ti.y) / Math.PI * 180 + 90;
                    if (angle < 0) angle += 360;
                    var nowAng = ti.rotation;
                    /*
                    console.log("ex:" + ec.x + " / tx:" + ti.x);
                    console.log("ey:" + ec.y + " / ty:" + ti.y);
                    console.log("ang: " + angle + " / rot:" + nowAng);
                    console.log("\n");
                    */

                    if (angle > nowAng) {
                        nowAng += 10;
                        if (nowAng > angle) nowAng = angle;
                    } else {
                        nowAng -=10;
                        if (nowAng < angle) nowAng = angle;
                    }

                    ti.rotation = nowAng;

                    // Fire if ready

                    if (ti.fire < 0 && nowAng == angle) {   // Fire!!
                        ti.fire = ti.interval;
                        ti.recoil = 2;
                        ti.timer = 0;

                        ec.hp -= ti.damage;

                        if (gaming) {
                            let tm = ti.id ? ti.id : 3;
                            this.spawnMuzzleFlash(ti.x, ti.y, nowAng, tm);
                        }
                    }
                }

            } // if recoil

        } // for i - turrets
    },

    moveObjects: function () {
        for (let m = 0; m < td.turrets.length; m++) {
            let tm = td.turrets[m];
            tm.fire--;

            switch(tm.recoil) {
                case 2:
                    tm.timer += fixedDelta;
                    if (tm.timer >= tm.recoilT) tm.recoil = 1;
                    break;
                case 1:
                    tm.timer -= fixedDelta;
                    if (tm.timer <= 0) {
                        tm.recoil = 0;
                        tm.timer = 0;
                    }
            }
        }

        for (let o = 0; o < td.preview.length; o++) {
            let po = td.preview[o];
            po.x += po.speed * fixedDelta;
            /*if (po.x > 290 && po.change) {
                this.spawnEnemy(po.y, po.id, po.serial);
                po.change = false;
            } else*/ if (po.x > 360) {
                td.preview.splice(o--, 1);
                if (gaming) {
                    let del = this.preLayer.getChildByTag(po.serial);
                    del.destroy();
                }
            }
        }

        for (let n = 0; n < td.enemies.length; n++) {
            let ej = td.enemies[n];
            if (ej.hp <= 0) {
                waven++;
                td.enemies.splice(n--, 1);
                if (gaming) {
                    let del = this.eLayer.getChildByTag(ej.serial);
                    del.destroy();
                }
                continue;
            }

            ej.x += ej.speed * fixedDelta;
            
            if (ej.x > 1280 + ej.radius) {

                let goalStr = ej.name + " arrives the goal at frame "
                                + frame + " with "
                                + Math.round(ej.hp / ej.maxhp * 100) + "% HP";
                console.log(goalStr);
                record.g.push(goalStr);

                waven++;
                td.enemies.splice(n--, 1);
                if (gaming) {
                    let del = this.eLayer.getChildByTag(ej.serial);
                    del.destroy();
                }
            }
        }

    },

    renderScene: function() {
        for (let m = 0; m < td.turrets.length; m++) {
            let tm = td.turrets[m],
                child = this.tLayer.getChildByTag(tm.serial);
            child.getComponent("Turret").gun.rotation = tm.rotation;
            if (tm.recoil) child.getComponent("Turret").turretUpdate(tm.timer);
        }

        for (let n = 0; n < td.enemies.length; n++) {
            let ej = td.enemies[n],
                child = this.eLayer.getChildByTag(ej.serial);
            child.x = ej.x;

            let hpRatio = ej.hp / ej.maxhp
            if (hpRatio < 0) hpRatio = 0;
            child.getComponent("Enemy").updateBar(hpRatio);
        }

        for (let o = 0; o < td.preview.length; o++) {
            let po = td.preview[o],
                child = this.preLayer.getChildByTag(po.serial);
            child.x = po.x;
        }

        this.eLabel.string = waven + " / " + wavem;
    },

    muzzleFlashUpdate: function() {
        let mf = this.mLayer.getChildren();
        for (let k = 0; k < mf.length; k++) {
            mf[k].getComponent("muzzleFlash").mfUpdate(fixedDelta);
        }
    },

    update: function (dt) {
        dt = fixedDelta;    // to ensure that the simulation is exactly the same with a real game
        this.randomSpawn();
        this.moveObjects();
        this.checkFire();
        this.renderScene();
        this.muzzleFlashUpdate();

        frame++;
        if (frame > 5000) {
            console.log(record);
            let old = new Date();
            this.emuGame(record);
            let time = new Date() - old;
            console.warn(time + "millis");
            //console.log(record);

            this.node.active = false;
        }
    },

    emuGame: function() {
        let step = 0;
        eSerial = 0;
        tSerial = 0;
        gaming = false;
        var rerun = JSON.parse(JSON.stringify(record));

        td = {
            turrets: [],
            enemies: [],
            preview: [],
        };
        this.initTower();
        for (let o = 0; o < 901; o++) {
            frame = o;
            if (rerun.f[step] == frame) {
                this.spawnEnemy(rerun.f[step], rerun.t[step], eSerial++);
                step++;
            }

            this.moveObjects();
            this.checkFire();
        }
        console.log(rerun);
    },

    randomSpawn: function() {
        if (frame % 60 == 0) {
            //this.spawnPreview(getRandomInt(200, 450), getRandomInt(0,1), eSerial++);
            let rnd = getRandomInt(0, 5) * 72 + 180;
            //let rnd = getRandomInt(0, 4) * 86 + 187;
            this.spawnPreview(rnd, getRandomInt(0,1), eSerial++);
        }
    }
});
