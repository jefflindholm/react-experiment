import Heroes from './heroes-data.json';

export function getHeroes() {
    return Heroes;
}

export function getHeroesSlowly() {
    return new Promise(resolve => setTimeout(() => resolve(Heroes),2000));
}

export function getHero(id) {
    return new Promise(resolve => resolve(Heroes))
        .then(heroes => heroes.filter(hero => hero.id === id)[0]);
}
