import React, { Component } from 'react'
import SurveySelector from './surveySelector/SurveySelector';
import SurveyAdder from './surveyAdder/SurveyAdder';

import { connect } from 'react-redux';
import { getSondageData, getKeywordList, getGroupData } from '../../../../redux/admin/actions/manageSurveyAction';

const firstDivStyle = { padding:'3vh', backgroundColor:'#2c3e50', minHeight:"100vh" }

class SurveyManager extends Component {

    componentDidMount(){
        this.props.getSondageData();
        this.props.getGroupData();
        this.props.getKeywordList();
    }
    
    render(){
        return(
            <div style={firstDivStyle} >
                {!(this.props.loadedSondage && this.props.loadedGroup) && <h1>Chargement</h1>}  
                {(this.props.loadedSondage && this.props.loadedGroup) && <SurveySelector currentSondage={this.props.currentSondage} sondageList={this.props.sondageList} />}
                <SurveyAdder/>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return state.manageSurvey
}

const mapActionsToProps = {
    getSondageData: getSondageData,
    getKeywordList: getKeywordList,
    getGroupData: getGroupData,
}

export default connect(mapStateToProps, mapActionsToProps)(SurveyManager)
