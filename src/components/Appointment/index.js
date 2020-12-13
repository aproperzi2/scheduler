import React from 'react';
// import classnames from 'classnames'
import 'components/Appointment/styles.scss'
import Header from 'components/Appointment/Header'
import Form from 'components/Appointment/Form'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import Status from 'components/Appointment/Status'
import Confirm from 'components/Appointment/Confirm'
import Error from 'components/Appointment/Error'
import useVisualMode from 'hooks/useVisualMode'

export default function Appointment(props) {

  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(response => {
      transition(SHOW)
    })
    .catch(error => {
      transition(ERROR_SAVE, true)
    })
  }

  const cancel = () => {
    transition(DELETING)
    props.cancelInterview(props.id, props.interview)
    .then(response => {
      transition(EMPTY)
    })
    .catch(error => {
      transition(ERROR_DELETE, true)
    })
  }

  return (
    <article className="appointment">
      <Header 
        time={props.time}
      />
      {/* {--------------------------------------       EMPTY       } */}
      {mode === EMPTY && (
        <Empty 
          onAdd={() => transition(CREATE)}
          />
        )}
      {/* {--------------------------------------      CREATE       } */}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {/* {--------------------------------------        EDIT       } */}
      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {/* {--------------------------------------      SAVING       } */}
      {mode === SAVING && (
        <Status 
          message={SAVING}
        />
      )}
      {/* {--------------------------------------     CONFIRM       } */}
      {mode === CONFIRM && (
        <Confirm 
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={cancel}
        />
      )}
      {/* {--------------------------------------    DELETING       } */}
      {mode === DELETING && (
        <Status 
          message={DELETING}
        />
      )}
      {/* {--------------------------------------        SHOW       } */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {/* {--------------------------------------   ERROR_SAVE       } */}
      {mode === ERROR_SAVE && (
        <Error 
          message="Saving error..."
          onClose={back}
        />
      )}
      {/* {---------------------------------      ERROR_DELETE       } */}
      {mode === ERROR_DELETE && (
        <Error 
          message="Deleting error..."
          onClose={back}
        />
      )}
      
    </article>
  )
}
