import React from 'react';
import './font-awesome-4.6.2/css/font-awesome.css';
import './table.css';
import tableData from './table.json';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {data: 'id', title: 'Id', width: '40%'},
            {data: 'name', title: 'Name', width: '20%', sortable: true},
            {data: 'city', title: 'City', width: '20%', sortable: true},
            {data: 'zip', title: 'Zip', width: '10%', sortable: true},
            {data: 'none', title: '', width: '10%', sortable: true},
        ];
        this.state = {
            page: 1,
            sort: this.columns[2],
            sortAsc: true,
            data: tableData,
        };
    }
    sortChanged = (item) => {
        let sortAsc = this.state.sortAsc;
        this.setState({sort: item, sortAsc: (item === this.state.sort ? !sortAsc : true)});
    };
    sortItem = (a, b) => {
        const sortAsc = this.state.sortAsc;
        if ( a && b ) {
            return (sortAsc ? 1 : -1) * a[this.state.sort.data].localeCompare(b[this.state.sort.data]);
        }
        return (sortAsc ? 1 : -1) * (a ? 1 : -1);
    }
    render() {
        let data = this.state.data;
        data.sort(this.sortItem);
        return (
            <div>
                <Table
                    data={data}
                    columns={this.columns}
                    sort={this.state.sort}
                    sortAsc={this.state.sortAsc}
                    onSort={this.sortChanged}
                />
            </div>
        )
    }
}

class Table extends React.Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired,
        columns: React.PropTypes.array.isRequired,
        sort: React.PropTypes.object,
        sortAsc: React.PropTypes.bool,
        onSort: React.PropTypes.func
    };
    static defaultProps = {
        onSort: function(i) {}
    };
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
            let title = c.title;
            if ( this.props.sort === c ) {
                const className = `fa fa-sort-alpha-${(this.props.sortAsc ? 'asc' : 'desc')}`;
                const style = {float: 'right'};
                title = <span>{title}<span className={className} style={style}></span></span>;
                console.log('sorted on', c);
            }
            let width = c.width;
            if (this.state.headerWidth.length > 1) {
                width = this.state.headerWidth[col] - 2;
            }
            col++;
            const style = { width: width, textAlign: 'left' };
            return (
                <th ref={c.title} key={c.title} style={style}><a href="#" onClick={this.props.onSort.bind(this, c)}>{title}</a></th>
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
