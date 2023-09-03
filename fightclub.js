const club = {
    rounds: 50,
    contestants: [],
    endOfGameStats: "",
}
const firstNames = {
    female: ["Charlotte","Amelia","Emma","Alice","Eleanor","Mia","Ava","Evelyn","Olivia","Ella","Isabella","Chloe","Abigail","Aurora","Emily","Scarlett","Sophia","Ava","Camila","Scarlett","Elizabeth","Mila","Violet","Penelope","Aria","Avery","Ella","Lily","Layla","Nova","Madison","Ellie","Grace","Zoe","Riley"],
    male: ["James","Joseph","Benjamin","Jack","Alexander","Samuel","Daniel","Michael","David","Thomas","Leo","John","Liam","Noah","Oliver","Elijah","Henry","Lucas","Theodore","Mateo","Levi","Sebastian","Jackson","Hudson","Mason","Logan","Luke"],
}
const lastNames = ["Smith","Anderson","Jones","Campbell","Wilson","Davis","Miller","Carter","Taylor","Johnson","Garcia","Williams","Lewis","Martinez","Rodriguez","Murphy","Harris","Clark","Brown","Davis","Lopez","Wilson","Martin","Robinson","Thompson","Walker","Young","Allen","King","Wright","Scorr","Torres","Nguyen","Hill","Flores","Green","Adams","Nelson","Baker","Hall","Rivera","Mitchell","Roberts","Gomez","Phillips"];
const actions = ["& sucker punched ","& used magic to destroy ","& abruptly ended ","& stuck a used needle into ","& made sure ! didnt respawn","& gave ! the wrong pills","& threw ! out a window","& smited ","& possessed ","& chopped !'s head off","& ran ! over","! couldn't bite &'s bullet","& called ! a slur","& ripped !'s heart out","& made sure ! never moves again","& made ! think too hard","! was tripped by &","& gave ! too much cough syrup","& straight up shot ","& struck ! with a frozen turkey leg","& caught the flu from ","& sent ! to the ranch","! got eaten by &'s cat","& laced !'s weed","& tried to exorcise ! but failed","& baptized ! in acid","& replaced their blank space with "]
function randInt(min, max) {
    let tmp = max + 1;
    return Math.floor(Math.random() * (tmp - min) + min)
}
function setGender() {
    let gender = randInt(1,2);
    if (gender === 1) {
        return "male";
    }
    else {
        return "female";
    }
}
function randName(f, l) {
    let first = f;
    let last = l;
    return {
        first,
        last,
    }
}
function person(i) {
    let id = i;
    let gender = setGender();
    let name = "";
    let age = randInt(18,100);
    let hitsTaken = 0;
    let hitsGiven = 0;
    if (gender === "male") {
        name = randName(firstNames.male[randInt(0,firstNames.male.length - 1)],lastNames[randInt(0,lastNames.length - 1)])
    }
    else if (gender === "female") {
        name = randName(firstNames.female[randInt(0,firstNames.female.length - 1)],lastNames[randInt(0,lastNames.length - 1)])
    }
    return {
        id,
        gender,
        name,
        age,
        hitsTaken,
        hitsGiven,
    }
}
for (let i = 0; i < 10; i++) {
    club.contestants.push(person(i))
}
function interval() {
    return randInt(500,1000);
}
function commitAction(contestants) {
    let isDupe = true;
    let person1 = randInt(0,9);
    let person2;
    while (isDupe) {
        person2 = randInt(0,9);
        if (person1 === person2) {
            person2 = randInt(0,9);
        }
        else {
            isDupe = false;
        }
    }
    contestants[person1].hitsGiven++;
    contestants[person2].hitsTaken++;
    let act = actions[randInt(0,actions.length - 1)];
    let hasEx = false;
    for (let i = 0; i < act.length; i++) {
        if (act[i] === "!") {
            hasEx = true;
        }
    }
    if (hasEx) {
        for (let i = 0; i < act.length; i++) {
            if (act[i] === "&") {
                act = act.replace("&", (contestants[person1].name.first));
            }
            if (act[i] === "!") {
                act = act.replace("!", (contestants[person2].name.first));
            }
        }
    }
    else {
        for (let i = 0; i < act.length; i++) {
            if (act[i] === "&") {
                act = act.replace("&", contestants[person1].name.first);
            }
        }
        act += contestants[person2].name.first;
    }
    return act;
}
function compileStats(club) {
    for (let i = 0; i < club.contestants.length; i++) {
        club.endOfGameStats += `${club.contestants[i].name.first + " " + club.contestants[i].name.last} (${club.contestants[i].gender + ", " + club.contestants[i].age})
    Hits: ${club.contestants[i].hitsGiven}
    Hits Taken: ${club.contestants[i].hitsTaken}\n`
    }
}
function timeout() {
    setTimeout(() => {
        console.log(commitAction(club.contestants));
        club.rounds--;
        if (club.rounds === 0){
            compileStats(club);
            console.log(club.endOfGameStats);
        }
        else {
            timeout();
        }
    }, interval())
}
timeout();