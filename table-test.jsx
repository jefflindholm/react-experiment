import React from 'react';
import tableData from './table-test.json';
import Table from './table';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {data: 'id', title: 'Id', width: '40%'},
            {data: 'name', title: 'Name', width: '20%', sortable: true},
            {data: 'city', title: 'City', width: '20%', sortable: true},
            {data: 'zip', title: 'Zip', width: '10%', sortable: true},
            //{data: 'number', title: 'Number', width: '10%', sortable: true},
            {data: 'none', title: '', width:'10%', sortable: true},
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
    };
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
                    width="100%"
                    height="300px"
                />
            </div>
        )
    }
}
