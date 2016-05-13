import React from 'react';
import tableData from './table-test.json';
//import Table from './table';
import Table from './table-div';
import './node_modules/bootstrap/dist/css/bootstrap.css';
const bootstrap = true;

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {data: 'id', title: 'Id', width: '40%'},
            {data: 'name', title: 'Name', width: '20%', sortable: true},
            {data: 'city', title: 'City', width: '20%', sortable: true},
            {data: 'zip', title: 'Zip', width: '10%', sortable: true},
            {data: 'number', title: 'Number', width: '10%', sortable: true},
            {data: 'none', title: '', width:'50%', sortable: true},
        ];
        this.sortAsc = true;
        this.sort = this.columns[2];
        const data = tableData.sort(this.sortItem);

        this.state = {
            page: 1,
            sort: this.columns[2],
            sortAsc: true,
            data,
            pagerStart: 1,
            pageData: data.slice(0, 50),
        };
    }
    sortChanged = (item) => {
        const sortAsc = this.state.sortAsc;
        this.sortAsc = (item === this.state.sort ? !sortAsc : true);
        this.sort = item;
        const data = this.state.data.sort(this.sortItem);

        const {page} = this.state;

        this.setState({
            sort: item,
            sortAsc: this.sortAsc,
            data,
            pageData: this.state.data.slice((page - 1) * 50, page * 50),
        });
    };
    sortItem = (a, b) => {
        const sortAsc = this.sortAsc;
        const item = this.sort;

        let result = 0;
        if ( a && b ) {
            if ( item.data === 'number' ) {
                result = Number(a[item.data]) - Number(b[item.data]);
            } else {
                result = a[item.data].localeCompare(b[item.data]);
            }
        } else {
            result = (a ? 1 : -1);
        }
        return (sortAsc ? 1 : -1) * result;
    };

    onPage = (page, pagerStart) => {
        this.setState({
            pagerStart,
            page,
            pageData: this.state.data.slice((page - 1) * 50, page * 50),
        });
    };
    render() {
        const className = bootstrap ? 'col-md-8 col-md-offset-2' : 'center';
        const style = bootstrap ? {} : {width: '600px'};

        return (
            <div style={style} className={className}>
                <Table
                    data={this.state.data}
                    columns={this.columns}
                    sort={this.state.sort}
                    sortAsc={this.state.sortAsc}
                    onSort={this.sortChanged}
                    width="100%"
                    height="300px"
                    bootstrap={bootstrap}
                />
                <Table
                    data={this.state.pageData}
                    columns={this.columns}
                    sort={this.state.sort}
                    sortAsc={this.state.sortAsc}
                    onSort={this.sortChanged}
                    pages={Math.floor(this.state.data.length / 50) + 1}
                    currentPage={this.state.page}
                    maxShown={3}
                    pagerStart={this.state.pagerStart}
                    onPage={this.onPage}
                    width="100%"
                    height="300px"
                    bootstrap={bootstrap}
                />
            </div>
        )
    }
}
