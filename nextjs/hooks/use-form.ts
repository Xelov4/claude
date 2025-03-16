import { useState } from "react"
import { z } from "zod"

interface UseFormProps<T extends z.ZodType> {
  schema: T
  onSubmit: (values: z.infer<T>) => Promise<void>
  initialValues?: Partial<z.infer<T>>
}

interface FormState<T> {
  values: Partial<T>
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isValid: boolean
}

export function useForm<T extends z.ZodType>({
  schema,
  onSubmit,
  initialValues = {},
}: UseFormProps<T>) {
  const [state, setState] = useState<FormState<z.infer<T>>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: false,
  })

  const validateForm = (values: Partial<z.infer<T>>) => {
    try {
      schema.parse(values)
      return {}
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors.reduce((acc, curr) => {
          const path = curr.path[0] as keyof z.infer<T>
          acc[path] = curr.message
          return acc
        }, {} as Record<keyof z.infer<T>, string>)
      }
      return {}
    }
  }

  const handleChange = (name: keyof z.infer<T>, value: any) => {
    const newValues = { ...state.values, [name]: value }
    const errors = validateForm(newValues as z.infer<T>)
    const isValid = Object.keys(errors).length === 0

    setState({
      ...state,
      values: newValues,
      errors,
      touched: { ...state.touched, [name]: true },
      isValid,
    })
  }

  const handleBlur = (name: keyof z.infer<T>) => {
    if (!state.touched[name]) {
      const errors = validateForm(state.values as z.infer<T>)
      setState({
        ...state,
        errors,
        touched: { ...state.touched, [name]: true },
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validateForm(state.values as z.infer<T>)
    const isValid = Object.keys(errors).length === 0

    if (!isValid) {
      setState({
        ...state,
        errors,
        touched: Object.keys(state.values).reduce((acc, key) => {
          acc[key as keyof z.infer<T>] = true
          return acc
        }, {} as Record<keyof z.infer<T>, boolean>),
        isValid,
      })
      return
    }

    setState({ ...state, isSubmitting: true })

    try {
      await onSubmit(state.values as z.infer<T>)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setState({ ...state, isSubmitting: false })
    }
  }

  const resetForm = () => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: false,
    })
  }

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    isValid: state.isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  }
} 