// react-heatpack
import React from 'react';
import './node_modules/font-awesome/css/font-awesome.css';
import './table-div.css';
import Pager from './pager';

export default class Table extends React.Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired,
        columns: React.PropTypes.array.isRequired,
        sort: React.PropTypes.object,
        sortAsc: React.PropTypes.bool,
        onSort: React.PropTypes.func,
        width: React.PropTypes.string,
        height: React.PropTypes.string,
        pages: React.PropTypes.number,
        currentPage: React.PropTypes.number,
        maxShown: React.PropTypes.number,
        pagerStart: React.PropTypes.number,
        onPage: React.PropTypes.func,
        bootstrap: React.PropTypes.bool,
    };
    static defaultProps = {
        onSort: (i) => {},
    };
    constructor(props) {
        super(props);
        this.state = {
            header: null,
        };
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
    componentDidMount() {
        window.addEventListener('resize', this.resize);
        this.setState({header: this.refs.tableHeader.offsetHeight});
    }
    resize = () => {
    };
    buildHeaders = () => {
        let col = 0;
        return this.props.columns.map(c => {
            // build the title to include sort info
            let title = c.title;
            if ( this.props.sort === c ) {
                const className = `fa fa-sort-alpha-${(this.props.sortAsc ? 'asc' : 'desc')}`;
                const style = {float: 'right'};
                title = <span>{title}<span className={className} style={style}></span></span>;
            }
            // set the width if we have calculated the columns
            const width = c.width;
            col++;

            if (c.sortable) {
                title = <a href="#" onClick={this.props.onSort.bind(this, c)}>{title}</a>
            } else {
                title = <a href="#">{title}</a>
            }
            const style = { width, textAlign: 'left' };
            return (
                <div className="div-table-col" ref={c.title} key={c.title} style={style}>
                    {title}
                </div>
            );
        })
    };
    buildRow = (d) => {
        let count = 0;
        return this.props.columns.map(c => {
            const width = c.width || ' ';
            const style = { width, textAlign: 'left' };
            count++;
            const key = d.id.toString() + count.toString();
            return (
                <div className="div-table-col" ref={key} key={key} style={style}>{d[c.data]}</div>
            );
        });
    };
    buildRows = () => {
        const even = 'normalRow';
        const odd = 'alternateRow';
        let count = 1;
        return this.props.data.map(i => {
            return (
                <div key={count} className={`div-table-row ${(count++ % 2 === 0 ? even : odd)}`}>
                    {this.buildRow(i)}
                </div>
            );
        });
    };
    render() {
        let style = {};
        let scrollContentStyle = {};
        if (this.props.width) {
            style.width = this.props.width;
            scrollContentStyle.width = this.props.width;
        }
        if (this.props.height) {
            style.height = this.props.height;
            let offset = style.height.indexOf('px');
            offset = offset === -1 ? style.height.length : offset;
            const height = Number(this.props.height.substring(0,offset));
            scrollContentStyle.height = `${height - (this.state.header || 26)}px`;
        }
        console.log('scrollContentStyle', scrollContentStyle);
        const table = (
            <div className="div-table"
                border="0"
                cellPadding="0"
                cellSpacing="0"
                className="scrollTable">
                <div className="div-table-header" ref="tableHeader">
                    {this.buildHeaders()}
                </div>
                <div ref="scrollContent" className="scrollContent" style={scrollContentStyle}>
                    {this.buildRows()}
                </div>
            </div>
        );
        const pager = this.props.pages && this.props.pages > 1
                ? (
                    <Pager
                        pages={this.props.pages}
                        currentPage={this.props.currentPage}
                        maxShown={this.props.maxShown}
                        pagerStart={this.props.pagerStart}
                        onPage={this.props.onPage}
                    />
                )
                : '';
        return (
            <div>
                <div ref="tableContainer" className="tableContainer" style={style}>
                    {table}
                </div>
                {pager}
            </div>
        )
    }
}
