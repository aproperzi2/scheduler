export default function GetAppointmentsForDay(state, day) {

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