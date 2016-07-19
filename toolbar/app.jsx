import React from 'react';
import Toolbar, {Region} from 'react-simple-toolbar';

export default class App extends React.Component {
    render1() {
        return (
<Toolbar>
    <Region>
        Export
    </Region>

    <Region flex={2}>
        <Toolbar>
            <Region align="center">Import from CSV</Region>
            <Region align="center">Import from Excel</Region>
        </Toolbar>
    </Region>

    <Region>
        Save
    </Region>
</Toolbar>
        );
    }
    render2() {
        return (

//second example
<Toolbar>
    <Region align="left">
        Export
    </Region>

    <Region align="right">
        Save
    </Region>
</Toolbar>
        );
    }
    render() {
        return this.render1();
    }
}
