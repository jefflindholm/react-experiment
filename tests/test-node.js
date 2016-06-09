import Heroes from '../tour-of-heroes/services/heroes-data.json';

export function getHero(id) {
    return new Promise(resolve => resolve(Heroes))
        .then(heroes => heroes.filter(hero => hero.id === id)[0]);
}

new Promise(resolve => resolve([1,2,3,4,5]))
    .then(data => console.log(data));
    
getHero(12).then(d => console.log(d));