import { SparkIcon } from '@bosch-web-dds/spark-ui-react'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

interface backButtonProps{
  navigateTo: string;
}

function BackButton(props: backButtonProps) {
    const navigate = useNavigate()
  return (
    <button onClick={()=>navigate(props.navigateTo)}>
        <SparkIcon icName={"back-left"} noPadding={true} />
    </button>
  )
}

export default BackButton