function getAppointmentsForDay(state, day) {

  let appArr = [];

  for (let obj of state.days) {
    if (obj.name === day) {
      for (let num of obj.appointments) {
        appArr.push(state.appointments[num])
      }
    }
  }

  return appArr;
}

function getInterviewersForDay(state, day) {

  let appArr = [];

  for (let obj of state.days) {
    if (obj.name === day) {
      for (let num of obj.interviewers) {
        appArr.push(state.interviewers[num])
      }
    }
  }

  return appArr;
}

function getInterview(state, interview) {

  const interviewObj = {};

  if (interview) {
    const id = interview.interviewer;
    interviewObj.student = interview.student;
    interviewObj.interviewer = state.interviewers[id];
    return interviewObj;
  } else {
    return null;
  }

}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }
