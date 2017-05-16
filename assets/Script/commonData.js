const turretSpecifications = [
    {
        id: 0,
        name: "Rifle",
        range: 300,
        interval: 0.25,
        damage: 15,
        aoe: 0,
        anchorX: 0.7,
        anchorY: 0.7,
        scale: 1,
        base: 2,
        mf: 1,
        mfd: 1.5,
        recoilT: 0.1,
        recoilD: 0.075,
    },
    {
        id: 1,
        name: "Cannon",
        range: 400,
        interval: 1.2,
        damage: 35,
        aoe: 200,
        anchorX: 0.7,
        anchorY: 0.5,
        scale: 1,
        base: 0,
        mf: 1,
        mfd: 1.5,
        recoilT: 0.15,
        recoilD: 0.15,
    },
    {
        id: 2,
        name: "Fireball",
        range: 500,
        interval: 2,
        damage: 30,
        aoe: 220,
        anchorX: 0.6,
        anchorY: 0.5,
        scale: 1,
        base: 1,
        mf: 1,
        mfd: 1.5,
        recoilT: 0.15,
        recoilD: 0.2,
    },
    {
        id: 3,
        name: "Machine Gun",
        range: 300,
        interval: 0.1,
        damage: 15,
        aoe: 0,
        anchorX: 0.7,
        anchorY: 0.5,
        scale: 1,
        base: 2,
        mf: 1,
        mfd: 1.5,
        recoilT: 0.1,
        recoilD: 0.075,
    },
];

const enemyData = [
                {
                    name: "Red Tank",
                    frame: 0,
                    speed: 160,
                    hp: 150,
                    radius: 35,
                },
                {
                    name: "Yellow Tank",
                    frame: 1,
                    speed: 180,
                    hp: 100,
                    radius: 35,
                },

];

module.exports = {
    turretSpecifications,
    enemyData,
};