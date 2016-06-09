import React from 'react';
import { getHeroes } from '../services/hero-svc';
import './hero-list.css';

export default class HeroList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHero: null,
            heroes: getHeroes(),
        };
    }
    selectHero(hero) {
        this.setState({selectedHero: hero});
    }
    renderHeroes() {
        return this.state.heroes.map(h => {
            let className = h === this.state.selectedHero ? 'selected' : '';
            return (
                <li key={h.id} className={className} onClick={this.selectHero.bind(this, h)}>
                    <span className="badge">{h.id}</span>{h.name}
                </li>
            );
        });
    }
    gotoDetail = () => {
        if (this.state.selectedHero) {
            this.context.router.push(`/Hero/${this.state.selectedHero.id}`)
        }
    }
    renderDetails() {
        if ( !this.state.selectedHero ) {
            return null;
        }
        return (
            <div>
                <h2>{this.state.selectedHero.name.toUpperCase()} is my Hero</h2>
                <button onClick={this.gotoDetail}>View Details</button>
            </div>
        );
    }
    onChange = (orig, changed) => {
        const index = this.state.heroes.findIndex((i) => i === orig);
        const heroes = this.state.heroes;
        this.setState({
            heroes: [...heroes.slice(0, index), changed, ...heroes.slice(index + 1)],
            selectedHero: changed,
        });
    };
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>My Heroes</h2>
                <ul className="heroes">
                    {this.renderHeroes()}
                </ul>
                <div>
                    {this.renderDetails()}
                </div>
            </div>
        )
    }
}
HeroList.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
