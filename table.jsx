import React from 'react';
import './font-awesome-4.6.2/css/font-awesome.css';
import './table.css';

export default class Table extends React.Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired,
        columns: React.PropTypes.array.isRequired,
        sort: React.PropTypes.object,
        sortAsc: React.PropTypes.bool,
        onSort: React.PropTypes.func,
        width: React.PropTypes.string,
        height: React.PropTypes.string
    };
    static defaultProps = {
        onSort: function(i) {}
    };
    constructor(props) {
        super(props);
        this.state = {
            headerWidth: [],
            tableContainer: 0,
            fixedHeader: 0,
            scrollContent: 0,
            width: 0
        }
    }
    componentDidMount() {
        if ( this.state.width < 1 ) {
            this.setState({
                tableContainer: this.refs.tableContainer.offsetHeight,
                fixedHeader: this.refs.fixedHeader.offsetHeight,
                scrollContent: this.refs.scrollContent.offsetHeight,
                width: this.refs.tableContainer.offsetWidth
            });
        }
    }
    componentDidUpdate() {
        if ( this.state.headerWidth.length < 1 && this.state.tableContainer > 0) {
            this.measureHeaders();
        }
    }
    measureHeaders = () => {
        let count = 0;
        let widths = this.props.columns.map(c => {
            count++;
            const key = this.props.data[0].id.toString() + count.toString();
            return this.refs[key].offsetWidth;
        });
        this.setState({headerWidth:widths});
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
            let width = c.width;
            if (this.state.headerWidth.length > 1) {
                width = this.state.headerWidth[col] - 2;
            }
            col++;

            if (c.sortable) {
                title = <a href="#" onClick={this.props.onSort.bind(this, c)}>{title}</a>
            } else {
                title = <a href="#">{title}</a>
            }
            const style = { width: width, textAlign: 'left' };
            return (
                <th ref={c.title} key={c.title} style={style}>
                    {title}
                </th>
            );
        })
    };
    buildRow = (d) => {
        let count = 0;
        return this.props.columns.map(c => {
            let width = c.width||' ';
            if ( typeof width === 'string') {
                const index = width.indexOf('%');
                if (index > 0 && this.state.width) {
                    width = Number(width.substring(0,index)) * this.state.width / 100;
                }
            }
            const style = { width, textAlign: 'left' };
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
        console.log('state', this.state);
        let style = {};
        if (this.props.width) {
            style.width = this.props.width;
        }
        if (this.props.height) {
            style.height = this.props.height;
        }
        let scrollContentStyle = {};
        if (this.state.fixedHeader > 0) {
            scrollContentStyle.height = this.state.tableContainer - this.state.fixedHeader;
        }
        return (
            <div ref="tableContainer" className="tableContainer" style={style}>
                <table
                    border="0"
                    cellPadding="0"
                    cellSpacing="0"
                    className="scrollTable">
                    <thead ref="fixedHeader" className="fixedHeader">
                    	<tr>{this.buildHeaders()}</tr>
                    </thead>
                    <tbody ref="scrollContent" className="scrollContent" style={scrollContentStyle}>
                        {this.buildRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
