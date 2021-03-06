import React, { useRef, useCallback, useState } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { useToast } from '../../context/ToastContext'
import logoImg from '../../assets/logo.svg'
import getValidationErros from '../../utils/getValidationErros'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, AnimationContainer, Background } from './styles'

interface ResetPasswordFormData {
  password: string
  password_confirmation: string
}

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.',
        })

        history.push('/signin')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, history],
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ResetPassword
