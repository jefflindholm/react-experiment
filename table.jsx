import React from 'react';
import './table.css';
import tableData from './table.json';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {data: 'id', title: 'Id', width: '30%', header: '30%'},
            {data: 'name', title: 'Name', width: '30%', sortable: true, header: '30%'},
            {data: 'city', title: 'City', width: '20%', sortable: true, header: '20%'},
            {data: 'zip', title: 'Zip', width: '10%', sortable: true, header: '10%'},
        ];
        this.state = {
            page: 1,
            sort: this.columns[2],
            sortAsc: true,
            data: tableData,
        };
    }
    render() {
        return (
            <div>
                <Table
                    data={this.state.data}
                    columns={this.columns}
                />
            </div>
        )
    }
}

class Table extends React.Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired,
        columns: React.PropTypes.array.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            headerWidth: []
        }
    }
    componentDidMount() {
        console.log('componentDidMount');
        if ( this.state.headerWidth.length < 1 ) {
            let count = 0;
            let widths = this.props.columns.map(c => {
                count++;
                const key = this.props.data[0].id.toString() + count.toString();
                console.log(key, this.refs[key].offsetWidth);
                return this.refs[key].offsetWidth;
            });
            this.setState({headerWidth: widths});
        }
    }

    buildHeaders = () => {
        let col = 0;
        return this.props.columns.map(c => {
            let width = c.header;
            if (this.state.headerWidth.length > 1) {
                width = this.state.headerWidth[col] - 2;
            }
            col++;
            const style = { width: width, textAlign: 'left' };
            return (
                <th ref={c.title} key={c.title} style={style}><a href="#">{c.title}</a></th>
            );
        })
    };
    buildRow = (d) => {
        let count = 0;
        return this.props.columns.map(c => {
            const style = { width: c.width, textAlign: 'left' };
            count++;
            const key = d.id.toString() + count.toString();
            return (
                <td ref={key} key={key} style={style}>{d[c.data]}</td>
            );
        });
    };
    buildRows = () => {
        const even = 'normalRow';
        const odd = 'alternateRow';
        let count = 1;
        return this.props.data.map(i => {
            return (
                <tr key={count} className={count++ % 2 === 0 ? even : odd}>
                    {this.buildRow(i)}
                </tr>
            );
        });
    };

    render() {
        this.props.columns.map(c => {
            const key = c.title;
            if ( this.refs[key] ) {
                console.log(key, this.refs[key].offsetWidth, '.');
            }
        });

        return (
            <div id="tableContainer" className="tableContainer">
                <table
                    border="0"
                    cellPadding="0"
                    cellSpacing="0"
                    width="100%"
                    className="scrollTable">
                    <thead className="fixedHeader">
                    	<tr>{this.buildHeaders()}</tr>
                    </thead>
                    <tbody className="scrollContent">
                        {this.buildRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
