import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';

const t = new class Temperature {
    @observable unit = 'C';
    @observable temperatureCelsius = 25;

    @computed get temperatureFahrenheit() {
        console.log('calculating Fahrenheit');
        return this.temperatureCelsius * (9 / 5) + 32;
    }

    @computed get temperatureKelvin() {
        console.log('calculating Kelvin');
        return this.temperatureCelsius + 273.15;
    }

    @computed get temperature() {
        console.log('calculating temperature');
        switch (this.unit) {
            case 'K': return this.temperatureKelvin + 'ºK';
            case 'F': return this.temperatureFahrenheit + 'ºF';
            default:
            case 'C': return this.temperatureCelsius + 'ºC';
        }
    }
};
window.t = t;

const App = observer(({ temperature }) => (
    <div>
        {temperature.temperature}
        <DevTools />
    </div>
));

export default class Container extends Component {
    render() {
        return <App temperature={t} />;
    }
}
