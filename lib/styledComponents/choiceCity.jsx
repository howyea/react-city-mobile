import styled, { css } from "styled-components";
import QueueAnim from 'rc-queue-anim';
import {
    NavBar
} from 'antd-mobile';
const alignCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const justifyCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const justifyGrid = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
`;
export const QueueAnimation = styled(QueueAnim)`
    .scrollBox{
        height: 100vh;
        overflow-y: scroll;
    }
    .search {
        background-color: #fff;
        padding: 0.16rem 0.3rem;
        .searchShadow {
            ${ justifyCenter }
            height: 0.6rem;
            background-color: #f3f3f3;
            border-radius: 0.08rem;
            .am-list-item {
                width: 3.46rem;
                background-color: #f3f3f3;
                &.am-input-item {
                    padding-left: 0;
                    height: 0.6rem;
                    min-height: auto;
                    .am-input-label {
                        ${ alignCenter }
                    }
                    .am-input-control {
                        input {
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
    .city {
        .hotCity {
            padding: 0.2rem 0.3rem;
            .title {
                font-size: 0.26rem;
                color: #6e6e6e;
                margin-bottom: 0.2rem;
            }
            .hotBox {
                height: 2.24rem;
                ${ justifyGrid }
                .list {
                    width: 1.98rem;
                    height: 0.58rem;
                    line-height: 0.58rem;
                    background-color: #fff;
                    border: 1px solid #dfdfdf;
                    border-radius: 0.08rem;
                    color: #3c3c3c;
                    text-align: center;
                }
            }
        }
        .allCity {
            .title {
                font-size: 0.26rem;
                color: #6e6e6e;
                height: 0.4rem;
                line-height: 0.4rem;
                padding-left: 0.3rem;
            }
            .list {
                font-size: 0.3rem;
                color: #3c3c3c;
                height: 0.9rem;
                line-height: 0.9rem;
                padding-left: 0.3rem;
                background-color: #fff;
            }
        }
    }
`;

export const Province = styled.div`
    height: ${ window.innerHeight/50 }rem;
    position: fixed;
    right: 0.3rem;
    animation: top .5s;
    top: ${ props => props.top/50 }rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .list {
        color: #22a666;
        margin-bottom: 0.1rem;
    }
`;

export const StyleNavBar = styled(NavBar)`
    border-bottom: 1px solid #dedede;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    & + div {
        margin-top: 45px;
    }
`;