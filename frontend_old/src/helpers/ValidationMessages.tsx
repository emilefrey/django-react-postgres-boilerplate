import React, { useEffect, useState } from 'react'
import MuiAlert from '@material-ui/lab/Alert';


const ValidationMessages = (props: { validationErrors: Record<string, string[]> | undefined }) => {
  const { validationErrors } = props
  const [errorMessages, setErrorMessages] = useState<string[]>([])

  useEffect(() => {
    let temp: string[] = []
    if (validationErrors && validationErrors !== {}) {
      const errorKey = Object.keys(validationErrors)
      errorKey.forEach(key => {
        temp = [...temp, ...validationErrors[key]]
      })
      setErrorMessages(temp)
    }
  }, [validationErrors])

  return (
    <>
      {errorMessages.map((value, index) =>
        <MuiAlert key={index} style={{ margin: 10 }} elevation={6} variant="filled" severity="warning" id="Validation-Message">{value}</MuiAlert>
      )}
    </>
  )
}

export default ValidationMessages