import React from 'react';
import { getHero } from '../services/hero-svc';
import './hero-details.css';

export default class HeroDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hero: null };
        this.getHero(props.id || props.params.id);
    }
    getHero(id) {
        console.log('getHero')
        getHero(Number(id)).then(hero => {
            this.setState({ hero });
        });
    }
    onChange = (e) => {
        const hero = Object.assign({}, this.state.hero, {name: e.target.value});
        this.props.onChange(this.state.hero, hero);
        this.setState({ hero });
    }
    render() {
        if ( !this.state.hero ) {
            return <div></div>;
        }
        return (
            <div>
                <h2>{this.state.hero.name} details!</h2>
                <div>
                    <label>id: </label>
                    <label>{this.state.hero.id}</label>
                </div>
                <div>
                    <label forHtml="name">name: </label>
                    <input id="name" value={this.state.hero.name} onChange={this.onChange}></input>
                </div>
                <button onClick={this.context.router.goBack}>Back</button>
            </div>
        )
    }
}

HeroDetails.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
