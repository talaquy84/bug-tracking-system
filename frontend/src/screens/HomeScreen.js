import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chart from '../components/Chart'
import { Bar } from 'react-chartjs-2';
import PieChart from '../components/PieChart'
import Loader from '../components/Loader'
import { Container, Row, Col } from 'react-bootstrap'
import { listAllProject } from '../actions/projectActions'
import { listAllTicket } from '../actions/ticketActions'
import { listAllUser } from '../actions/userActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const [chartTicketsData, setChartTicketsData] = useState({})
  const [chartData, setChartData] = useState({})
  let lowTicket = 0, mediumTicket = 0, highTicket = 0
  let numberTickets = 0, numberUsers = 0, numberProjects = 0

  const chart = () => {
    if (tickets) {

      tickets.map(ticket => {
        numberTickets += 1
        if (ticket.priority == 'Low') {
          lowTicket += 1
        } else if (ticket.priority == 'Medium') {
          mediumTicket += 1
        } else {
          highTicket += 1
        }
      })
    }
    setChartTicketsData({
      labels: ['Low', 'Medium', 'High'],
      datasets: [
        {
          label: 'Tickets',
          data: [
            lowTicket,
            mediumTicket,
            highTicket,
          ],
          backgroundColor: [
            'rgba(255, 206, 86, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
          ]
        }
      ]
    })

    if (users && tickets && projects) {
      users.map(user => {
        numberUsers += 1
      })
      projects.map(project => {
        numberProjects += 1
      })
    }
    setChartData({
      labels: ['Tickets', 'Users', 'Projects'],
      datasets: [
        {
          data: [
            numberTickets,
            numberUsers,
            numberProjects,
          ],
          backgroundColor: [
            'rgb(128,128,128)'
          ]
        }
      ]
    })
  }

  const getAllTicket = useSelector(state => state.getAllTicket)
  const { loading, error, tickets } = getAllTicket

  const getAllUser = useSelector(state => state.getAllUser)
  const { loading: loadingUser, error: errorUser, users } = getAllUser

  const getAllProject = useSelector(state => state.getAllProject)
  const { loading: loadingProject, error: errorProject, projects } = getAllProject

  useEffect(() => {
    dispatch(listAllProject())
    dispatch(listAllTicket())
    dispatch(listAllUser())
    chart()
    console.log(chartData)
  }, [dispatch])

  return (
    <>
      <main>
        {loadingProject || loadingUser || loading && <Loader />}
        <Container className='py-3 ml-auto'>

          <Row className='my-2' style={{ height: '300' }}>
            <Col>
              <Bar data={chartTicketsData} height={'100'} options={{
                title: {
                  display: true,
                  text: 'Summary of Bug Tickets',
                  fontSize: 25
                },
                legend: {
                  display: true,
                  position: 'right'
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      autoSkip: true,
                      beginAtZero: true,
                    }
                  }]
                },
                responsive: true,
                maintainAspectRatio: true,
              }} />
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col>
              <Bar data={chartData} style={{ height: '180' }} options={{
                title: {
                  display: true,
                  text: 'Summary of Tracking System',
                  fontSize: 25
                },
                legend: {
                  display: false,
                  position: 'right'
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      autoSkip: true,
                      beginAtZero: true,
                    }
                  }]
                },
                responsive: true,
                maintainAspectRatio: true,
              }} />
            </Col>
            <Col><PieChart /></Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default HomeScreen
