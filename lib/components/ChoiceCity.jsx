import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScrollAnim from 'rc-scroll-anim';
import {
    Icon,
    InputItem
} from 'antd-mobile';
import {
    StyleNavBar
} from './styledComponents/global';
import { QueueAnimation, Province } from '../styledComponents/choiceCity';
import cityData from '../cityData/cityData.json';
const Link = ScrollAnim.Link;
const getQueryString = (name) => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
const _source = getQueryString('source');
let _timer;
export default class ChoiceCity extends Component {
    state = {
        scrollTop: 0,
        citys: [],
        hotCitys: [],
        searchCity: '',
        searchCityId: 'page1'
    }
    componentDidMount() {
        const { cityArr, hotCitys } = cityData;
        this.setState({
            citys: cityArr,
            hotCitys: hotCitys
        });
    }
    render() {
        return (
            <QueueAnimation>
                <StyleNavBar
                key="choiceCity1"
                mode="light"
                icon={ <Icon type="left" size="md" color="#333333"/> }
                onLeftClick={ () => this.props.history.goBack() }
                >选择城市</StyleNavBar>
                <div className="search">
                    <div className="searchShadow">
                        <InputItem placeholder="输入城市名查询" labelNumber="2"
                            value={ this.state.searchCity }
                            onChange={async e => {
                                this.setState({
                                    searchCity: e
                                })
                                await clearTimeout(_timer);
                                _timer = setTimeout(() => {
                                    console.log(e);
                                    this.state.citys.forEach((value, index) => {
                                        value.city.forEach((v, i) => {
                                            if ( v.name === e ) {
                                                this.setState({
                                                    searchCityId: `page${index}${i}`
                                                });
                                                document.getElementById('searchLink').click();                                                
                                            }
                                        });
                                    });
                                }, 1000);
                            }}
                        >
                            <Link id="searchLink" ref="searchLink"
                            to={ this.state.searchCityId } targetId="box" offsetTop="90">
                                <Icon type="search" size="md" color="#c8c8c8"/>
                            </Link>
                        </InputItem>
                    </div>
                </div>
                <div className="scrollBox" id="box" ref="cityBox">
                    <div className="city" onClick={
                        (e) => {
                            if ( e.target.attributes.class.value === "list" ) {
                                this.props.history.push( `/${ _source }?cityId=${e.target.attributes.cityId.value}&cityName=${e.target.attributes.cityName.value}&provinceName=${e.target.attributes.parentName.value}` )
                            }
                        }
                    }>
                    {
                        this.state.hotCitys.length !== 0 && (<div className="hotCity" id="page">
                            <div className="title">热门城市</div>
                            <div className="hotBox">
                            {
                                this.state.hotCitys.map(value => {
                                    return (
                                        <div className="list"
                                        cityId={ value.id }
                                        cityName={ value.name }
                                        parentName={ value.parentName }
                                        >{ value.name }</div>
                                    )
                                })
                            }
                            </div>
                        </div>)
                    }
                        {
                            this.state.citys.map((value, index) => {
                                return (
                                    <div className="allCity" id={ `page${index}` }>
                                        <div className="title">{ value.name }</div>
                                        {value.city.map((v, i) => {
                                            return (
                                                <div className="list"
                                                id={ `page${index}${i}` }
                                                cityId={ v.id }
                                                cityName={ v.name }
                                                parentName={ v.parentName }
                                                >{ v.name }</div>
                                            )
                                        })}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Province top={ this.state.scrollTop }>
                        {
                            this.state.citys.map((value, index) => {
                                return (
                                    <Link className="list" to={ `page${index}` } targetId="box" offsetTop="90">{ value.name }</Link>
                                )
                            })
                        }
                    </Province>
                </div>
            </QueueAnimation>
        );
    }
}