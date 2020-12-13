import { useEffect, useState } from 'react'
import "components/Application.scss";
import axios from 'axios'

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day })

  useEffect(() => {
    const first = 'http://localhost:8001/api/days';
    const second = 'http://localhost:8001/api/appointments';
    const third = 'http://localhost:8001/api/interviewers';
    Promise.all([
      axios.get(first),
      axios.get(second),
      axios.get(third)
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  const bookInterview = (id, interview) => {
    const days = findSpotsRemaining(state, id, state.appointments[id].interview ? 0 : -1)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return (axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(response => {
        if (response.status === 204) {
          setState({
            ...state,
            days, 
            appointments
          })
        }
      }
    ))
  }

  const cancelInterview = (id) => {
    const days = findSpotsRemaining(state, id, 1)
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return (axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        setState({
          ...state,
          days, 
          appointments
        })
      })
    )
  }

  const findSpotsRemaining = (state, id, num) => {
    const days = state.days.find(day => day.appointments.includes(id));
    const copyDaysObj = { ...days, spots: days.spots + num}
    const daysArr = state.days.map((day) => {
      if (day.id === copyDaysObj.id) {
        return copyDaysObj
      } else {
        return day
      }
    })
    return daysArr
  }

  return { state, setDay, bookInterview, cancelInterview, findSpotsRemaining }
}