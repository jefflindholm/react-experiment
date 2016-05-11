// react-heatpack
// heatpack table.js
import React from 'react';

class ProductCatRow extends React.Component {
    static propTypes = {
        category: React.PropTypes.string.isRequired
    }
    render() {
        return (
            <tr>
                <th colSpan="2"  style={{textAlign: "center", color: 'blue'}} >{this.props.category}</th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    static propTypes = {
        stocked: React.PropTypes.bool,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.string.isRequired
    }
    render() {
        const style = this.props.stocked ? {} : {color: 'red'};
        const name = (<span style={style}>{this.props.name}</span>);
        return (
            <tr>
                <td>{name}</td>
                <td style={{textAlign: "right"}}>{this.props.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    static propTypes = {
        products: React.PropTypes.array.isRequired
    }
    render() {
        let rows = [];
        let lastCategory = null;
        this.props.products.forEach((p) => {
            if (p.name.indexOf(this.props.filterText) === -1 || (!p.stocked && this.props.inStockOnly)) {
                return;
            }
            if (p.category != lastCategory ) {
                rows.push(<ProductCatRow category={p.category} key={p.category} />);
            }
            rows.push(<ProductRow {...p} key={p.name} />);
            lastCategory = p.category;
        });
        return (
            <table>
                <thead>
                    <tr><th  style={{textAlign: "left"}}>Name</th><th style={{textAlign: "right"}}>Price</th></tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    static propTypes = {
        filterText: React.PropTypes.string,
        inStockOnly: React.PropTypes.bool,
        onUserInput: React.PropTypes.func.isRequired
    };
    handleChange = () => {
        this.props.onUserInput(this.refs.filterTextInput.value, this.refs.inStockOnlyInput.checked)
    };
    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange}/>
                <p>
                    <input type="checkbox" checked={this.props.inStockOnly} ref="inStockOnlyInput" onChange={this.handleChange}/>
                    {' '}
                    Only show products in stocked
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    static propTypes = {
        products: React.PropTypes.array.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };
    }
    handleUserInput = (filterText, inStockOnly) => {
        this.setState({ filterText, inStockOnly });
    }
    render() {
        return (
            <div>
                <SearchBar {...this.state} onUserInput={this.handleUserInput} />
                <ProductTable products={this.props.products} {...this.state}/>
            </div>
        )
    }
}

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

export default class Page extends React.Component {
    render() {
        return <FilterableProductTable products={PRODUCTS} />;
    }
}
