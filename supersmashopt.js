let game = {
    names: [`Mario`,`Luigi`,`Bowser`,`Peach`,`Donkey Kong`,`Dry Bones`,`Goomba`,`Sonic`,`Mewtwo`,`Pikachu`,`Kirby`,`King Dedede`,`Link`,],
    active: [],
    knocked: [],
    endState: [],
    currMessage: 'null',
    isOver: false,
}
const randInt = (min, max) => Math.floor(Math.random() * ((max + 1) - min) + min);
const interval = () => randInt(500,1000);
const copy = (obj) => {
    return {...obj}
};
const char = ( { n='', i=0, h=10, d=0, e=0} ) => {
    const name = n;
    const id = i;
    const hp = h;
    const damage = d;
    const elims = e;
    return {
        name,
        id,
        hp,
        damage,
        elims,
    }
}
const compileStats = (game) => {
    let finalString = '';
    let position = ['','st','nd','rd','th']
    game.endState.sort((a, b) => {
        if (a.hp > b.hp) {
            return -1;
        }
        else if (a.hp < b.hp) {
            return 1;
        }
        else if (a.elims > b.elims) {
            return -1;
        }
        else if (a.elims < b.elims) {
            return 1;
        }
        else if (a.damage > b.damage) {
            return -1;
        }
        else if (a.damage < b.damage) {
            return 1;
        }
        return 0;
    })
    for (let i = 1; i < game.endState.length + 1; i++) {
        finalString += 
        `${game.endState[i - 1].name}: ${i + position[i]} place
        damage: ${game.endState[i - 1].damage}
        elims: ${game.endState[i - 1].elims}\n`
    }
    return finalString;
}
const action = (sending=null, recieving=null) => {
    let attackStr = 0;
    const getAttackType = () => {
        let heavy = 0;
        let heavyWeight = 25;
        let normal = 1;
        let normalWeight = 75;
        let attackRange = [];
        for (let i = 0; i < heavyWeight; i++) {
            attackRange.push(heavy);
        }
        for (let i = 0; i < normalWeight; i++) {
            attackRange.push(normal);
        }
        if (attackRange[randInt(0,attackRange.length - 1)] === 0) {
            return 0;
        }
        else {
            return 1;
        }
    }
    const setNormAttack = (e='', s, r) => `${s} struck ${r}. ${e}`
    const setHeavyAttack = (e='', s, r, T, T2='.') => `${s}${T}${r}${T2} ${e}`
    let attack = getAttackType();
    let e = '';
    switch (attack) {
        case 1:
            e = '(-1)'
            recieving.hp--;
            sending.damage++;
            if (recieving.hp < 1) {
                e = 'Elimination!'
                sending.elims++;
            }
            attackStr = setNormAttack(e, sending.name, recieving.name);
            break;
        case 0: 
            e = '(-3)';
            recieving.hp -= 3;
            sending.damage += 3;
            if (recieving.hp < 1) {
                e = 'Elimination!'
                sending.elims++;
            }
            if (sending.id === 0) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' fireballed ');
                break;
            }
            else if (sending.id === 1) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' fireballed ');
                break;
            }
            else if (sending.id === 2) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' Burnt ', ' to a crisp.');
                break;
            }
            else if (sending.id === 3) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' struck ', ' with parasol.');
                break;
            }
            else if (sending.id === 4) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' spun and hit ');
                break;
            }
            else if (sending.id === 5) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' threw a bone at ');
                break;
            }
            else if (sending.id === 6) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' headbutted ');
                break;
            }
            else if (sending.id === 7) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' charged and struck ');
                break;
            }
            else if (sending.id === 8) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' used Foresight on ');
                break;
            }
            else if (sending.id === 9) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' used Thunderbolt on ');
                break;
            }
            else if (sending.id === 10) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' duplicated and mirrored ');
                break;
            }
            else if (sending.id === 11) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' smashed ', ' over the head.');
                break;
            }
            else if (sending.id === 12) {
                attackStr = setHeavyAttack(e, sending.name, recieving.name, ' threw a bomb at ');
                break;
            }
        default:
            attackStr = 'ERROR: NO CHARACTER NAME FOUND'
    }
    return {
        sending,
        recieving,
        attackStr
    };
}
const gameTick = (game) => {
    let p1Selector = randInt(0,game.active.length - 1);
    let p2Selector = randInt(0,game.active.length - 1);
    while (p1Selector === p2Selector) {
        p1Selector = randInt(0,game.active.length - 1);
        p2Selector = randInt(0,game.active.length - 1);
    }
    let p1 = copy(game.active[p1Selector]);
    let p2 = copy(game.active[p2Selector]);
    let fightAftermath = action(p1,p2);
    for (let i = 0; i < game.active.length; i++) {
        if (game.active[i].id === p1.id) {
            game.active[i] = copy(fightAftermath.sending);
        }
        if (game.active[i].id === p2.id) {
            game.active[i] = copy(fightAftermath.recieving);
        }
    }
    let c = game.knocked.length - 1;
    for (let i = 0; i < game.active.length; i++) {
        if (game.active[i].hp <= 0) {
            game.knocked.push(copy(game.active[i]));
            c++;
            game.active.splice(i, 1)
            i--;
        }
    }
    if (game.active.length === 1) {
        game.isOver = true;
        for (let i = 0; i < game.knocked.length; i++) {
            game.endState.push(copy(game.knocked[i]))
            game.knocked.splice(i, 1);
            i--;
        }
        game.endState.push(copy(game.active[0]))
        return fightAftermath.attackStr;
    }
    return fightAftermath.attackStr;
}
const setActive = ( names ) => {
    let hasCharacters = false;
    let c = 0;
    let characters = [];
    let charactersId = [];
    while (!hasCharacters) {
        if (charactersId.length === 0) {
            let id = randInt(0,names.length - 1);
            characters[c] = char({n: names[id], i: id});
            charactersId[c] = id;
            c++;
        }
        else {
            const checkDupe = () => {
                let id = randInt(0,names.length - 1);
                let isDupe = false;
                for (let i = 0; i < charactersId.length; i++) {
                    if (id === charactersId[i]) {
                        isDupe = true;
                    }
                }
                if (isDupe) {
                    return id = checkDupe();
                }
                else {
                    return id;
                }
            }
            let id = checkDupe();
            characters[c] = char({n: names[id], i: id});
            charactersId[c] = id;
            c++;
        }
        if (c === 4) {
            hasCharacters = true;
        }
    }
    for (let i = 0; i < characters.length; i++) {
        characters[i].id = charactersId[i];
    }
    return characters;
}
const gameStep = () => {
    setTimeout(() => {
        if (game.isOver) {
            game.currMessage = compileStats(game);
            console.log('')
            console.log(game.currMessage);
        }
        else {
            game.currMessage = gameTick(game);
            console.log(game.currMessage);
            gameStep();
        }
    }, interval())
}
game.active = setActive(game.names);
gameStep();