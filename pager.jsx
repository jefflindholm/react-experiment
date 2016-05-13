import React from 'react';
import './pager.css';

export default class Pager extends React.Component {
    static propTypes = {
        pages: React.PropTypes.number.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        maxShown: React.PropTypes.number.isRequired,
        pagerStart: React.PropTypes.number.isRequired,
        onPage: React.PropTypes.func.isRequired,
    }

    pagerForward = () => {
        const {maxShown, pages} = this.props;
        let {pagerStart} = this.props;
        pagerStart += (maxShown - 1);
        pagerStart = (pagerStart <= pages ? pagerStart : pages);
        this.props.onPage(pagerStart, pagerStart);
    };

    pagerBack = () => {
        const {maxShown} = this.props;
        let {pagerStart} = this.props;
        pagerStart -= (maxShown - 1);
        pagerStart = (pagerStart < 1 ? 1 : pagerStart);
        this.props.onPage(pagerStart, pagerStart);
    };

    pageLeft = () => {
        let {currentPage,pagerStart} = this.props;
        if ( currentPage > 1 ) {
            currentPage--;
            if ( pagerStart > currentPage ) {
                pagerStart = currentPage;
            }
            this.props.onPage(currentPage, pagerStart);
        }
    };
    pageRight = () => {
        const {maxShown, pages} = this.props;
        let {currentPage,pagerStart} = this.props;
        if ( currentPage < pages ) {
            currentPage++;
            if ((pagerStart + maxShown) <= currentPage ) {
                pagerStart = currentPage;
            }
            this.props.onPage(currentPage, pagerStart);
        }
    };

    render() {
        let {pagerStart} = this.props;
        const pages = Math.round(this.props.pages);
        const {maxShown} = this.props;
        const size = Math.round(pages > maxShown ? maxShown : pages);
        while ( pagerStart > 1 && (pagerStart + maxShown) > (pages + 1)) {
            pagerStart--;
        }
        let pager = Array.from(Array(size).keys()).map(offset => {
            const page = offset + pagerStart;
            const className = page === (this.props.currentPage) ? 'active' : '';
            return (
                <li key={page}>
                    <a className={className} onClick={this.props.onPage.bind(this, page, pagerStart)}>{page}</a>
                </li>
            );
        });
        if ( pages > maxShown ) {
            if ( pagerStart > 1 ) {
                pager.unshift(<li key={'back'} ><a onClick={this.pagerBack}>...</a></li>);
            }
            if (pagerStart + maxShown <= pages ) {
                pager.push(<li key={'forward'}><a onClick={this.pagerForward}>...</a></li>);
            }
        }

        return (
            <div className="center">
                <ul className="pagination">
                    <li><a onClick={this.pageLeft}>«</a></li>
                    {pager}
                    <li><a onClick={this.pageRight}>»</a></li>
                </ul>
            </div>
        );
    }
}
