import React from 'react';
import { getHeroes } from '../services/hero-svc';
import './dashboard.css';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { heroes: getHeroes().slice(0,4) };
    }
    gotoDetail = (hero) => {
        console.log(hero);
        this.context.router.push(`/Hero/${hero.id}`)
    };
    renderHeroes() {
        return this.state.heroes.map(h => {
            return (
                <div key={h.id} onClick={this.gotoDetail.bind(this, h)} className="col-1-4">
                    <div className="module hero">
                        <h4>{h.name}</h4>
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div>
                <h3>Top Heroes</h3>
                <div className="grid grid-pad">
                    {this.renderHeroes()}
                </div>
            </div>
        )
    }
}

Dashboard.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
