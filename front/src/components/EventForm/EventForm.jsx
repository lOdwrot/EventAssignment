import React, { useState } from 'react'
import { Form, Input, Button, DatePicker, message, Modal } from 'antd'
import { saveEventAssignment } from '../../store/eventsAssignment/eventsAssignment.service'
import styles from './EventForm.module.scss'
import moment from 'moment'

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    }
}

const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 16,
    },
}

const formFields = [
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        rules: [
            {required: true}
        ]
    },
    {
        label: 'Surname',
        name: 'surname',
        type: 'text',
        rules: [
            {required: true}
        ]
    },
    {
        label: 'Email',
        name: 'email',
        type: 'text',
        rules: [
            {required: true},
            {type: 'email'}
        ]
    },
    {
        label: 'Event Date',
        name: 'date',
        type: 'date',
        rules: [
            {required: true}
        ]
    }
]

const disabledDate = (current) => current < moment().startOf('day')

const getInpurForField = ({type}) => {
    if (type === 'text') return <Input/>
    if (type === 'date') return <DatePicker disabledDate={disabledDate}/>
}

export default () => {
    const [isSavePening, setIsSavePening] = useState(false)

    const onFinish = async (values) => {
        setIsSavePening(true)
        try {
            const resp = await saveEventAssignment({
                ...values,
                date: values.date._d.toISOString()
            })
            Modal.success({
                title: 'Success',
                content: 'Assigned for an event successfully'
            })
        } catch(e) {
            Modal.error({
                title: 'Error',
                content: e.response.status === 400 
                    ? e.response.data.errors.map((v, index) => <div key={index}>{v}</div>)
                    : 'There was a with processing request'
            })
            console.error(e)
        }
        setIsSavePening(false)
    }

    const onFinishFailed = (errorInfo) => {
        message.error('Correct errors on fields below')
    }

    return (
        <Form
            {...layout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles['container']}
        >
            {
                formFields.map((field, index) => (
                    <Form.Item
                        key={index}
                        label={field.label}
                        name={field.name}
                        rules={field.rules}
                    >
                        {getInpurForField(field)}
                    </Form.Item>
                ))
            }
            <Form.Item {...tailLayout}>
                <Button 
                    type="primary" 
                    htmlType="submit"
                    loading={isSavePening}
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}