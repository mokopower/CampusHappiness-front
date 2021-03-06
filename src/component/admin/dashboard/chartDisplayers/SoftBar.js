import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { Bar } from 'react-chartjs-2'

const SoftBar = ({data}) => {
    const cardStyle = {height:'22vh', backgroundColor: data.boxColor, padding: '3vh', paddingBottom: 0, marginBottom:0, border: '1px black'}
    const firstStyle = {color:'white', fontFamily: 'Roboto', fontWeight:300}
    const secondStyle = {color:'white', fontFamily: 'Roboto', fontWeight:100, fontSize:'1em'}
    return (
    <Card style={cardStyle} >
        <Typography variant='h4' style={firstStyle} >{data.total}</Typography>
        <Typography variant='h4' style={secondStyle} >
        {data.name}
        </Typography>
        <Bar data={data.chartData} options={data.option} />
    </Card>
)}


export default SoftBar