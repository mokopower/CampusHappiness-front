import axios from 'axios';
import id_generator from '../../../customFunction/idGenerator'

import { 
    GET_SONDAGE_DATA_ACTION,
    GET_GROUP_DATA_ACTION,
    CHANGE_SONDAGE_SELECTION_ACTION ,
    CHANGE_GROUP_SELECTION_ACTION,
    POST_SURVEY_ACTION,
    GET_KEYWORDS_ACTION,
    CLOSE_POSTMESSAGE_ACTION,
    CLOSE_SURVEY_MESSAGE_ACTION,
    OPEN_SURVEY_MESSAGE_ACTION
} from "./adminTypes";

const getSondageData = ()=>(dispatch)=> {
    axios.get("http://localhost:4200/admin/getSondage")
    .then( res => {
        const sondage_list = res.data
        let currentSondage = sondage_list[0]
        dispatch({
            type: GET_SONDAGE_DATA_ACTION,
            payload: {
                sondageList: sondage_list,
                loaded: true,
                currentSondage: currentSondage,
                selectedSondage: currentSondage,
            }
        })
    });
}

const getGroupData = ()=>(dispatch)=> {
    axios.get("http://localhost:4200/admin/getGroups")
    .then( res => {
        const group_list = res.data
        let currentGroup = group_list[0]
        dispatch({
            type: GET_GROUP_DATA_ACTION,
            payload: {
                groupList: group_list,
                loaded: true,
                currentGroup: currentGroup,
                selectedGroup: currentGroup,
            }
        })
    });
}

const getKeywordList = () => (dispatch) => {
    axios.get("http://localhost:4200/admin/getKeywords")
    .then( res => {
        dispatch({  
            type: GET_KEYWORDS_ACTION,
            payload: {
                list: res.data,
            }
        })
    })
}

const addKeyword = (newKeyword) => (dispatch) => {
    axios.post("http://localhost:4200/admin/addKeyWord", {name: newKeyword})
        .then(res => {
            console.log("add keyword action")
            console.log(res.data)
            dispatch({  
                type: GET_KEYWORDS_ACTION,
                payload: {
                    list: res.data,
                }
            })
        }
    );
}

const changeSondageSelection = (sondage)=>(dispatch)=>{
    dispatch({
        type: CHANGE_SONDAGE_SELECTION_ACTION,
        payload: {selectedSondage: sondage}
    })
}

const changeGroupSelection = (group)=>(dispatch)=>{
    dispatch({
        type: CHANGE_GROUP_SELECTION_ACTION,
        payload: {selectedGroup: group}
    })
}

const changeGroupSondage = (sondage_id, group_id) => (dispatch) => {
    axios.post("http://localhost:4200/admin/changeNextSondage", {sondage_id: sondage_id, group_id: group_id})
    .then(() => {
        dispatch({
            type: OPEN_SURVEY_MESSAGE_ACTION,
            payload: {
                message: 'Selection Confirmed'
            }
        })
    })
}

const postSurvey = (survey, sondageList)=>(dispatch)=>{
    axios.post("http://localhost:4200/admin/postSondage",survey).then((serverRes)=>{
        if (serverRes.data) {
            const newSondageList = sondageList
            // id from the server (real one)
            survey.id = serverRes.data.sondageId
            // fake thematique id and question id (only for correct front display)
            survey.thematiqueList.forEach(thematique=>{
                thematique.id = id_generator()
                thematique.questionList.forEach(question=>{
                    question.id = id_generator()
                })
            })
            survey.current = false
            newSondageList.push(survey)
            dispatch({
                type: POST_SURVEY_ACTION,
                payload: {
                    newSondageList: newSondageList
                }
            })
        }
    })
}

const closePostMessage = ()=>(dispatch)=>{
    dispatch({
        type: CLOSE_POSTMESSAGE_ACTION,
        payload: {
            openPostMessage: false
        }
    })
}

const closeSurveyMessage = ()=>(dispatch)=>{
    dispatch({
        type: CLOSE_SURVEY_MESSAGE_ACTION,
        payload: {
            closingStatue: false,
            message: ''
        }
    })
}

export { getSondageData, getGroupData, changeSondageSelection, changeGroupSelection, changeGroupSondage, postSurvey, getKeywordList, addKeyword, closePostMessage, closeSurveyMessage }
