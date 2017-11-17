import React from 'react'
import ReactDOM from 'react-dom'
import VariableSelection from './VariableSelection'
import styled from 'styled-components'
import fetchJson from './../xhr'

const ReactHighstock = require('react-highcharts/ReactHighstock')

class ContractViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {currentVariable: null, variableData: []}
        this.variableClicked = this.variableClicked.bind(this)
    }

    fetchVariableHistory(varName) {
        const url = `/contracts/${this.props.contract.address}/history?variable=${varName}`
        return fetchJson(url)
    }

    variableClicked(varName) {
        this.fetchVariableHistory(varName)
            .then(history => {
                const processedHistory = history.map(item => {
                    item.value = parseFloat(item.value)
                    return [item.time * 1000, item.value]
                })
                this.setState({
                    currentVariable: varName,
                    variableData: processedHistory.sort()
                })
            })
    }

    render() {
        const variables = this.props.contract.variables
        const abi = this.props.contract.abi;

        const centeredP = styled.p `font-size: 130pt`

        if (!abi || abi.length === 0) {
            return <centeredP> No ABI for this variable </centeredP>
        }

        if (!variables || variables.length === 0) {
            return <centeredP> No variables in this contract </centeredP>
        }

        return (
            <div>
                <VariableSelection variables={variables} variableClicked={this.variableClicked}/>

                <ReactHighstock
                    config={{
                        rangeSelector: {
                            selected: 1
                        },
                        title: {
                            text: 'Smart Contract Explorer'
                        },
                        series: [
                            {
                                name: 'Explorer',
                                data: this.state.variableData,
                                tooltip: {
                                    valueDecimals: 2
                                }
                            }
                        ],
                        credits: {
                            enabled: false
                        }
                    }}
                />
            </div>
        )
    }
}

export default ContractViewer
