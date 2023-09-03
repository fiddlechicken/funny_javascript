const randInt = (min, max) => Math.floor(Math.random() * ((max + 1) - min) + min)
for (let i = 0; i < 100; i++) {
    console.log(randInt(0,20));
}