/*
 * @Author: Micheal.Ye 
 * @Date: 2018-04-21 18:50:39 
 * @Last Modified by: Micheal.Ye
 * @Last Modified time: 2018-04-22 09:32:57
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ScrollAnim from 'rc-scroll-anim';

import { QueueAnimation, Province } from '../styledComponents/choiceCity';

const Link = ScrollAnim.Link;
const EventListener = ScrollAnim.Event;
let _timer,aCitys,hotCitys;
export default class ChoiceCity extends Component {
    state = {
        cityArr: [],
        catalog: [],
        hotCitys: [],
        searchCity: '',
        searchCityId: 'pageA'
    }
    async componentWillMount() {                    
        const { resCitys, hots } = await (() => {
            const _citys = this.props.citys;
            if ( _citys != 'undefined' ) {
                return _citys;
            } else {
                return false;
            }
        })();
        await ::this.loadData( resCitys, hots );
        aCitys = resCitys;
    }
    hasChosenToCallback = async (e) => {
        console.log(e.target.attributes.cityId.value);   
    }
    loadAllCitys( value, index ) {
        const allCitys = value.map((v, i) => {
            return (
                <div className="list"
                id={ `page${index}${i}` }
                cityId={ v.region_id }
                cityName={ v.name }
                >{ v.name }</div>
            )
        })
        return (
            <div className="allCity" id={ `page${index}` }>
                <div className="title">{ index }</div>
                {
                    allCitys
                }
            </div>
        );
         
    }
    loadAllCitysAndCatalog( citys ) {
        console.log('loadAllCitysAndCatalog', citys);
        const catalog = [];
        const cityArr = [];
        for (let index in citys) {
            const value = citys[index];
            cityArr.push(this.loadAllCitys( value, index ));
            catalog.push(<Link className="list" to={ `page${index}` } targetId="box" offsetTop="46">{ index }</Link>);
        }
        return { catalog, cityArr };
    }
    loadHotCitys( hots ) {
        console.log('loaHotCitys', hots);
        return hots.map(value => {
            return (
                <div className="list"
                cityId={ value.region_id }
                cityName={ value.name }
                >{ value.name }</div>
            )
        })
    }
    async loadData( citys, hots ) {
        const { catalog, cityArr } = await this.loadAllCitysAndCatalog( citys );
        const hotCitys = await this.loadHotCitys( hots );
        this.setState({
            cityArr,
            catalog,
            hotCitys
        });  
    }
    render() {
        return (
            <QueueAnimation>
                <div className="search">
                    <div className="searchShadow">
                        <input placeholder="输入城市名查询"
                            onChange={async e => {
                                const _target = e.target.value;
                                this.setState({
                                    searchCity: e.target.value
                                })
                                await clearTimeout(_timer);
                                _timer = setTimeout(() => {
                                    for ( let index in aCitys ) {
                                        const value = aCitys[ index ];
                                        let search_index = 0;
                                        const hasBeenFound = value.some((element, index) => {
                                            element.name === _target && (search_index = index);
                                            return element.name === _target;
                                        });
                                        
                                        if ( hasBeenFound ) {
                                            this.setState({
                                                searchCityId: `page${index}${search_index}`
                                            });
                                            document.getElementById('searchLink').click();
                                            break;
                                        }
                                    }
                                }, 1000);
                            }}
                        />
                        <Link id="searchLink" className="search_link" ref="searchLink"
                        to={ this.state.searchCityId } targetId="box" offsetTop="46"></Link>
                    </div>
                </div>
                <div className="scrollBox" id="box" ref="cityBox">
                    <div className="city" onClick={ this.hasChosenToCallback }>
                    {
                        this.state.hotCitys.length !== 0 && (<div className="hotCity" id="page">
                            <div className="title">热门城市</div>
                            <div className="hotBox">
                            {
                                this.state.hotCitys
                            }
                            </div>
                        </div>)
                    }
                        {
                            this.state.cityArr.length ? this.state.cityArr : <div id="pageA"></div>
                        }
                    </div>
                    <Province top="0">
                        {
                            this.state.catalog
                        }
                    </Province>
                </div>
            </QueueAnimation>
        );
    }
}